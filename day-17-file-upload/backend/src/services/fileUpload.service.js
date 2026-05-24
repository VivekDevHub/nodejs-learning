const sendFiles = require("../config/imagekit");
const FileModel = require("../models/file.model");

let fileUploadService = async (file) => {
  if (!file) throw new Error("file is required");

  let uploadedFile = await sendFiles(file.buffer, file.originalname);
  console.log(uploadedFile);

  let newFile = await FileModel.create({
    name: "trial 1",
    images: uploadedFile.url,
  });

  return newFile;
};

let multipleUploadService = async (files) => {
  if (!files) throw new Error("files is required");

  let uploadedFiles = await Promise.all(
    files.map(async (elem) => {
      return await sendFiles(elem.buffer, elem.originalname);
    }),
  );

  let newFiles = await FileModel.create({
    name: "trial 1",
    images: uploadedFiles.map((elem) => elem.url),
  });

  return newFiles;
};

module.exports = { fileUploadService, multipleUploadService };
