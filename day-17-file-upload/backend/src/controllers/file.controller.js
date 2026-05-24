const {
  fileUploadService,
  multipleUploadService,
} = require("../services/fileUpload.service");

let imageUploadController = async (req, res) => {
  try {
    let file = req.file;

    let result = await fileUploadService(file);

    return res.status(201).json({
      message: "File uploaded successfully",
      file: result,
    });
  } catch (error) {
    throw new Error("internal server error ");
  }
};

let multipleUploadController = async (req, res) => {
  try {
    let files = req.files;

    let result = await multipleUploadService(files);

    return res.status(201).json({
      message: "Files uploaded successfully",
      file: result,
    });
  } catch (error) {
    throw new Error("internal server error ");
  }
};

module.exports = {
  imageUploadController,
  multipleUploadController,
};
