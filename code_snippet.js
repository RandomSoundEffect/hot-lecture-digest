// var os = require("os"); // add at top
// const path = require("path");
// const fs = require("fs");
// const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
// const ffmpeg = require("fluent-ffmpeg");

// //2. Video file import button

// //2-1. file open
// //user input
// function getAudio(callback) {
//   //async problem
//   //joining path of directory
//   const directoryPath = path.join(__dirname, "src");
//   //passsing directoryPath and callback function
//   fs.readdir(directoryPath, function (err, files) {
//     //handling error
//     if (err) {
//       return console.log("Unable to scan directory: " + err);
//     }
//     //listing all files using forEach

//     console.log(files);

//     files.forEach(function (file) {
//       // Do whatever you want to do with the file
//       //2-2. video file to audiofile conversion -- ffmpeg
//       var filename = file;
//       var outputName = filename;
//       outputName = outputName.split(".mp4");
//       outputName = outputName[0].concat("_audio.mp3"); // "*_audio.mp3"
//       // console.log(outputName);

//       ffmpeg.setFfmpegPath(ffmpegPath);
//       /**
//        *    input - string, path of input file
//        *    output - audio.mp3; tentative
//        *    callback - function, node-style callback fn (error, result)
//        */
//       //debug
//       // var filename = "test.mp4";
//       //
//       var full_path = path.resolve(filename);
//       console.log(full_path);

//       // var command = ffmpeg(full_path);
//       // command.outputOptions(["-vn", "-acodec copy"]).save("output-audio.mp3");
//       ffmpeg(full_path)
//         .output(outputName)
//         .on("end", function () {
//           console.log("conversion ended");
//           callback(null);
//         })
//         .on("error", function (err) {
//           console.log("error: ", e.code, e.msg);
//           callback(err);
//         })
//         .run();
//     });
//     // console.log(fileDir);
//   });

//   // console.log(src);
// }

// module.exports = { getAudio };

// const a = { a: 1 };

// a.a = 0;
// console.log(a.a);
