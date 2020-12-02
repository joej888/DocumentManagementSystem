const mongoose = require("mongoose");

fileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: false,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
      validate: /[a-zA-Z0-9\^w]/,
    },
    fileContent: {
      type: String,
      required: true,
      validate: /[a-zA-Z0-9\^w]/,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
