const VideoExtensions = ['.avi', '.mp4', '.flv', '.mkv'];

function isVideo(path) {
  const tmp = path.match(/\.[^/\\.]+$/);
  if (tmp == null) return false;

  const ext = tmp[0];
  return VideoExtensions.findIndex(i => i === ext) !== -1;
};

exports.isVideo = isVideo;