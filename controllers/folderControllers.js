const Folder = require("../models/folder");

exports.getFolders = (req, res, next) => {
  Folder.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createFolder = (req, res, next) => {
  const folder = new Folder({
    userId: req.body.userId,
    folderName: req.body.folderName,
    folderContent: req.body.folderContent,
    folderPath: req.body.folderPath,
  });
  folder
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};
