const speech = require("@google-cloud/speech");

// enums (see: Google Cloud Docs)
const InteractionType = {
  UNSPECIFIED: "INTERACTION_TYPE_UNSPECIFIED",
  DISCUSSION: "DISCUSSION",
  PRESENTATION: "PRESENTATION",
  PHONE_CALL: "PHONE_CALL",
  VOICEMAIL: "VOICEMAIL",
  PROFESSIONAL: "PROFESSIONALLY_PRODUCED",
  VOICE_SEARCH: "VOICE_SEARCH",
  VOICE_COMMAND: "VOICE_COMMAND",
  DICTATION: "DICTATION"
};

const MicrophoneDistance = {
  UNSPECIFIED: "MICROPHONE_DISTANCE_UNSPECIFIED",
  NEAR: "NEARFIELD",
  MID: "MIDFIELD",
  FAR: "FARFIELD"
};

const RecordingDeviceType = {
  UNSPECIFIED: "RECORDING_DEVICE_TYPE_UNSPECIFIED",
  SMARTPHONE: "SMARTPHONE",
  PC: "PC",
  PHONE_LINE: "PHONE_LINE",
  VEHICLE: "VEHICLE",
  OTHER_OUTDOOR_DEVICE: "OTHER_OUTDOOR_DEVICE",
  OTHER_INDOOR_DEVICE: "OTHER_INDOOR_DEVICE"
};

const OriginalMediaType = {
  UNSPECIFIED: "ORIGINAL_MEDIA_TYPE_UNSPECIFIED",
  AUDIO: "AUDIO",
  VIDEO: "VIDEO"
};

/**
 * returns a configuration object for Google text to speech API from given context
 * @param {string} lang language code (see: https://cloud.google.com/speech-to-text/docs/languages)
 * @param {Object?} context (optional) context for configuration 
 * @returns {Object} config object
 */
function getConfig(lang, context) {
  let config = {
    languageCode: lang,
    profanityFilter: true,
    enableWordTimeOffsets: false,
    enableAutomaticPunctuation: true,
    metadata: {
      interactionType: InteractionType.PRESENTATION,
      microphoneDistance: MicrophoneDistance.NEAR,
      originalMediaType: OriginalMediaType.VIDEO,
      recordingDeviceType: RecordingDeviceType.PC,
    }
  }
  if (context == null) return config; // null or undefined check

  if ('phrases' in context) {
    config.speechContexts = [{ phrases: [context.phrases] }];
  }
  if ('topic' in context) {
    config.audioTopic = context.topic;
  }
  return config;
}

/**
 * Request for transcription longer then 1 minutes (slow)
 * @param {speech.SpeechClient} client 
 * @param {*} request 
 * @returns 
 */
async function requestLongTranscript(client, request) {
  const [operation] = await client.longRunningRecognize(request);
  const [response] = await operation.promise();
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  return transcription;
}

async function requestTranscript(client, request) {
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  return transcription;
}

exports.requestShort = requestTranscript;
exports.requestLong = requestLongTranscript;
exports.getConfig = getConfig;
