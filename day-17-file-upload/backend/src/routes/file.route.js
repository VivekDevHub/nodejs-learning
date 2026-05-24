let express = require("express");
const {
  imageUploadController,
  multipleUploadController,
} = require("../controllers/file.controller");
const upload = require("../config/multer");

let router = express.Router();

router.post("/image-upload", upload.single("image"), imageUploadController);
router.post(
  "/multi-uploads",
  upload.array("images", 5),
  multipleUploadController,
);

module.exports = router;
