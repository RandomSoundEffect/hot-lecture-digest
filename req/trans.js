const reqtrans = require("./reqtrans.js");
const storage = require("./storage.js")
const audio = require("./audio.js");

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

/*
function main() {

  const src = "PathForYourVideoFileHere";
  const key = "PathForYourJSONprivateKeyHere";
  const lang_code = "ko-KR"; // or en-US, etc. depending on language
  const bucket = "NameOfYourStorageBucketHere";

  const options = { // credentials
    keyFilename: key
  }

  const sp = new speech.SpeechClient(options); // reuse client as much as possible
  const st = new Storage(options); // reuse client as much as possible

  const clients = {
    speech: sp,
    storage: st
  };

  getTranscript(clients, bucket, src, lang_code) // calling example function
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
}

main();
*/