const { Storage } = require("@google-cloud/storage");

/**
 * uploads file to gcloud
 * @param {Storage} client storage client
 * @param {string} bucket bucket for uploading
 * @param {string} file full path of file to upload
 * @returns {string} uri
 */
async function uploadToCloud(client, bucket, file) {
  const fn = file.replace(/^.*[\\\/]/, '');
  await client.bucket(bucket).upload(file);

  return 'gs://' + bucket + '/' + fn;
}

exports.uploadToCloud = uploadToCloud;
