const { SummarizerManager } = require("node-summarizer");
const fs = require("fs");

async function getSummary(text, lines) {
  const Summarizer = new SummarizerManager(text, lines);
  const { summary } = await Summarizer.getSummaryByRank();
  return summary;
}

async function outputSummary(dst, file, lines) {
  const text = fs.readFileSync(file, 'utf8');
  const summary = await getSummary(text, lines);

  return new Promise((resolve, reject) => {
    fs.writeFile(dst, summary, { encoding: 'utf8', flag: 'w' },
    (err) => {
      if (!err) resolve();
      else reject(new Error(err));
    });
  });
}

exports.outputSummary = outputSummary;
