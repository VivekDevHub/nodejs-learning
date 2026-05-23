const { default: mongoose } = require("mongoose");

let fileSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
        required: true,
      },
    ],
    name: String,
  },
  {
    timestamps: true,
  }
);

let FileModel = mongoose.model("files", fileSchema);
module.exports = FileModel;