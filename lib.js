var os = require("os"); // add at top
const path = require("path");
const fs = require("fs");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");

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
function getAudio(callback) {
  //async problem
  //joining path of directory
  const directoryPath = path.join(__dirname, "src");
  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach

    // console.log(files);

    files.forEach(function (file, callback) {
      // Do whatever you want to do with the file
      //2-2. video file to audiofile conversion -- ffmpeg
      console.log(file);
      if (file.includes(".mp4")) {
        // for video files
        var filename = file;
        filename = "./src/".concat(filename);

        var outputName = filename;
        outputName = outputName.split(".mp4");
        outputName = outputName[0].concat("_audio.mp3"); // "*_audio.mp3"
        // console.log(outputName);

        ffmpeg.setFfmpegPath(ffmpegPath);
        /**
         *    input - string, path of input file
         *    output - audio.mp3; tentative
         *    callback - function, node-style callback fn (error, result)
         */
        //debug
        // var filename = "test.mp4";
        //
        var full_path = path.resolve(filename);
        // console.log(full_path);

        // var command = ffmpeg(full_path);
        // command.outputOptions(["-vn", "-acodec copy"]).save("output-audio.mp3");
        ffmpeg(full_path)
          .output(outputName)
          .on("end", function () {
            // console.log("conversion ended");
            console.log("conversion complete");
            // callback(null);
          })
          .on("error", function (err) {
            // console.log("error: ", e.code, e.msg);
            // callback(err);
            console.log("conversion error: check your file");
          })
          .run();
      }
    });
    // console.log(fileDir);
  });

  // console.log(src);
}

//3. Summary/ Full-text change button

//4. Display the text that matches the type of current state (Summary / Full-text)

//5. Class add/delete function

//6. Program exit function

module.exports = { getAudio };
