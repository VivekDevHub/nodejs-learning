const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

let ListModel = mongoose.model("lists", listSchema);

module.exports = ListModel;
