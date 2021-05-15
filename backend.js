const { SummarizerManager } = require("node-summarizer");
const fs = require("fs");

async function outputSummary(dst, file, lines) {
  const text = fs.readFileSync(file, 'utf8');

  let Summarizer = new SummarizerManager(text, lines);
  const { summary } = await Summarizer.getSummaryByRank();

  return new Promise((resolve, reject) => {
    fs.writeFile(dst, summary, { encoding: 'utf8', flag: 'w' }, (err) => {
      if (!err) resolve();
      else reject(new Error(err));
    });
  });
}

const speech = require("@google-cloud/speech");
const { Storage } = require("@google-cloud/storage");
const { getTranscript } = require("./req/trans");

function validate(ext) {
  return ext == '.avi' || ext == '.mp4' || ext == '.flv' || ext == '.mkv';
}

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
    const extension = file.match(/\.[^/\\.]+$/)[0];
    const minusext = file.replace(/\.[^/\\.]+$/, "");
    if (!validate(extension)) return;

    try {
      console.log(`getting a transcript for ${file}...`);
      const full = await getTranscript(clients, BUCKET, SRCPATH + file, 'en-US');
      console.log(`received transcript for ${file}`);

      const RES = SRCPATH + minusext + ".txt";
      fs.writeFileSync(RES, full);

      console.log(`summarizing ${file}...`);
      outputSummary(SRCPATH + minusext + "_summary.txt", RES, 5)
        .then(() => {
          console.log(`sumarizing ${file} is done!`);
        })
        .catch(e => {
          console.error('ERROR: ' + e);
        });
    } catch (err) {
      console.error('ERROR: ');
    }
  });
}

main();