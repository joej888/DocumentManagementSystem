const File = require("../models/file");
const Folder = require("../models/folder");

exports.getFiles = (req, res, next) => {
  if (req.params.folderId != null) {
    File.find({folderId:req.params.folderId})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    File.find({folderId:req.params.folderId})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.createFiles = (req, res, next) => {
  const file = new File({
    userId: req.body.userId,
    fileName: req.body.fileName,
    fileType: req.body.fileType,
    folderId: req.body.folderId,
    fileContent: req.body.fileContent,
  });
  file
    .save()
    .then((result) => {
      if (req.body.folderId != null) {
        Folder.updateOne(
          { _id: req.body.folderId },
          { $addToSet: { folderContent: result._id } },
          function (err, result) {
            if (err) {
              console.log(err);
            }
          }
        );
      }
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.deletefiles = (req, res, next) => {
  File.deleteOne({ _id: req.params.id })
    .then((result) => {
      Folder.updateOne(
        {},
        { $pull: { folderContent: req.params.id } },
        function (err, result) {
          if (err) {
            console.log(err);
          }
        }
      );
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
