const ffmpeg = require('fluent-ffmpeg');

const Encoding = {
  PCM_SIGNED16: "pcm_s16le",
  PCM_MULAW: "pcm_mulaw"
};

/**
 * options for extracting audio
 * @typedef {Object} AudioOptions
 * @property {number} samplingRate - sampling rate for output audio, mostly in 44100 or 48000 but 16000 reduces wav size significantly
 * @property {string} encoding - encoding for output audio, Encoding.PCM_SIGNED16 for lossless, Encoding.PCM_MULAW for lossy encoding
 */

/**
 * Extract WAV audio file from given file
 * @param {string} dst - file to create
 * @param {string} src - file to extract
 * @param {AudioOptions} options - specify samplingRate, encoding, etc.
 */
function extractAudioFromVideo(dst, src, options) {
  return new Promise((resolve, reject) => {
    ffmpeg().outputOptions([
      '-ar ' + options.samplingRate,
      '-codec:a ' + options.encoding,
      '-ac 1'
    ])
      .input(src)
      .output(dst)
      .on('end', resolve)
      .on('error', e => reject(new Error(e)))
      .run();
  });
}

exports.extractAudioFromVideo = extractAudioFromVideo;
exports.Encoding = Encoding;
