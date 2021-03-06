const reqtrans = require("./reqtrans");
const storage = require("./storage")
const audio = require("./audio");

const fs = require("fs");

/** 
 * Get a transcription file from cloud
 * you must set up Google Service Account, API, and Google storage bucket beforehand at this point in time.
 */
async function getTranscript(clients, bucket_name, src, language, context) {

  /* STEP 1: Get a temporary audio from video */
  const tempWAV = src.replace(/\.[^/\\.]+$/, "") + ".wav";

  await audio.extractAudioFromVideo(tempWAV, src, {
    samplingRate: 16000,
    encoding: audio.Encoding.PCM_SIGNED16
  });

  /* STEP 2: Upload to cloud (and delete temporary) */
  const uri = await storage.uploadToCloud(clients.storage, bucket_name, tempWAV);
  fs.unlink(tempWAV, (err) => { if (err) console.error("Error:" + err); });

  /* STEP 3: Send request to Google API */
  const request = {
    config: reqtrans.getConfig(language, context),
    audio: { uri }
  };

  return reqtrans.requestLong(clients.speech, request);
}

exports.getTranscript = getTranscript;