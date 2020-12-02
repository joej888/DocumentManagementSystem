const mongoose = require("mongoose");

folderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    folderName: {
      type: String,
      required: true,
    },
    folderContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Files",
        required: false,
      },
    ],
    folderPath: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Folder", folderSchema);
