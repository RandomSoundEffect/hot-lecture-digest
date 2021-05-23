const fs = require("fs");

const speech = require("@google-cloud/speech");
const { Storage } = require("@google-cloud/storage");

const { getTranscript } = require("./libs/trans");
const { outputSummary } = require("./libs/summarizer");
const { isVideo } = require("./libs/misc");

const main = async () => {
  const SRCPATH = './src/';
  const KEYPATH = './gcloud/private_key.json';
  const BUCKET = fs.readFileSync('./gcloud/bucket.txt', "utf8").trim();

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