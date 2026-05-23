let Imagekit = require("imagekit");

let storageInstance = new Imagekit({
  urlEndpoint: "yourUrl",
  privateKey: "yourKey",
  publicKey: "yourKey",
});

let sendFiles = async (file, fileName) => {
  let options = {
    file,
    fileName,
  };

  return await storageInstance.upload(options);
};

module.exports = sendFiles;