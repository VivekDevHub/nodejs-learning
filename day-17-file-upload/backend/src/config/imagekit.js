let Imagekit = require("imagekit");

let storageInstance = new Imagekit({
  privateKey: process.env.IK_PRIVATE_KEY,
  publicKey: process.env.IK_PUBLIC_KEY,
  urlEndpoint: process.env.IK_URL,
});

let sendFiles = async (file, fileName) => {
  try {
    let options = {
      file,
      fileName,
      folder: "kodex",
    };

    return await storageInstance.upload(options);
  } catch (error) {
    console.log("error in ik", error);
  }
};

module.exports = sendFiles;
