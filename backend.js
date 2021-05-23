#!/usr/bin/env node

const fs = require("fs");

const speech = require("@google-cloud/speech");
const { Storage } = require("@google-cloud/storage");

const { getTranscript } = require("./libs/trans");
const { outputSummary } = require("./libs/summarizer");
const { isVideo } = require("./libs/misc");

const main = async () => {
  if (process.argv.length === 2) {
    console.log("Usage: summarize <video folder path(including last \\ or /)> <private json key path> <gcloud bucket name>");
    process.exit(1);
  }
  if (process.argv.length !== 5) {
    console.error("INSUFFICIENT ARGUMENTS");
    process.exit(1);
  }

  const SRCPATH = process.argv[2];
  const KEYPATH = process.argv[3];
  const BUCKET = process.argv[4];

  const opt = { keyFilename: KEYPATH };

  const clients = {
    speech: new speech.SpeechClient(opt),
    storage: new Storage(opt)
  };

  console.log("uploading to:" + BUCKET);

  fs.readdirSync(SRCPATH).forEach(async (file) => {
    if (!isVideo(file)) return;
    const minusext = file.replace(/\.[^/\\.]+$/, "");

    try {
      console.log(`getting a transcript for ${file}...`);
      const full = await getTranscript(clients, BUCKET, SRCPATH + file, 'en-US');
      console.log(`received transcript for ${file}`);

      const RES = SRCPATH + minusext + ".txt";
      fs.writeFileSync(RES, full);

      console.log(`summarizing ${file}...`);
      await outputSummary(SRCPATH + minusext + "_summary.txt", RES, 5);
      console.log(`sumarizing ${file} is done!`);
    } catch (err) {
      console.error('ERROR: ' + err);
    }
  });
}

main();