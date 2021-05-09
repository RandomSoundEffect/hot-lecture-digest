var os = require("os"); // add at top

//1. Retrieve data upon start using folders -- in main
// function initializeAndSaveData(dataObj) {
//   //local storage

//   function loadData() {
//     let lastItem = localStorage.getItem("dataObj");
//     if (!lastItem) return;

//     dataObj = JSON.parse(lastTasks);
//     dataObj.forEach(addToList);
//   }
//   function saveTasks() {
//     localStorage.setItem("dataObj", JSON.stringify(dataObj));
//     return null;
//   }

//   function addToList(obj) {}

//   window.addEventListener("load", () => {
//     loadData(dataObj);
//   });
//   window.onbeforeunload = saveTasks;
// }
//2. Video file import button

//2-1. file open

//user input

//2-2. video file to audiofile conversion -- ffmpeg
function getAudio(filename, callback) {
  const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
  const ffmpeg = require("fluent-ffmpeg");
  ffmpeg.setFfmpegPath(ffmpegPath);
  /**
   *    input - string, path of input file
   *    output - audio.mp3; tentative
   *    callback - function, node-style callback fn (error, result)
   */

  const path = require("path");

  var filename = "test.mp4";
  var full_path = path.resolve(filename);
  console.log(full_path);

  // var command = ffmpeg(full_path);
  // command.outputOptions(["-vn", "-acodec copy"]).save("output-audio.mp3");
  ffmpeg(full_path)
    .output("./audio.mp3")
    .on("end", function () {
      console.log("conversion ended");
      callback(null);
    })
    .on("error", function (err) {
      console.log("error: ", e.code, e.msg);
      callback(err);
    })
    .run();
}

//3. Summary/ Full-text change button

//4. Display the text that matches the type of current state (Summary / Full-text)

//5. Class add/delete function

//6. Program exit function

module.exports = { getAudio };
