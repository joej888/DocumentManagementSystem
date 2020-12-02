const User = require("../models/user");
const File = require("../models/file");
const Folder = require("../models/folder");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashpwsd) {
    if (err) {
      res.json({
        error,
      });
    }
    let user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashpwsd,
    });
    user
      .save()
      .then((user) => {
        res.status(200).json({ message: "User registered successfully!" });
      })
      .catch((error) => {
        res.json({
          message: "An error has occured while registering the user !!",
        });
      });
  });
};

async function login(req, res) {
  let userName = req.body.userName;
  let password = req.body.password;
  try {
    const logDetails = await userValidation(userName, password);
    const homeFiles = await homeFileItems(logDetails.user);
    const homeFolders = await homeFolderItems(logDetails.user);
    let displayItem = homeFiles.concat(homeFolders);
    res.status(200).json({ logDetails, displayItem });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Unable to login please check details entered." });
  }
}

async function userValidation(userName, password) {
  let user;
  try {
    user = await User.findOne({
      $or: [{ userName: userName }, { email: userName }],
    });
    if (!user) {
      return { message: "No user by that email" };
    }
  } catch (error) {
    return error;
  }

  let match = await bcrypt.compare(password, user.password);
  if (!match) {
    return { message: "Password does not match" };
  } else {
    let token = jwt.sign({ name: user.userName }, "MyverySecret", {
      expiresIn: "1h",
    });
    process.env.TOKEN = "Bearer " + token;
    return { message: "Logged In successfully", user: user._id, token };
  }
}

async function homeFileItems(user) {
  const files = await File.find({
    $and: [{ folderId: { $exists: false } }, { userId: user }],
  });
  if (files) {
    fileList = files.map(function (obj) {
      return {
        itemId: obj._id,
        itemName: obj.fileName,
        itemType: "fi",
      };
    });
    return fileList;
  }
}

async function homeFolderItems(user) {
  const folders = await Folder.find({ userId: user });
  if (folders) {
    folderList = folders.map(function (obj) {
      return {
        itemId: obj._id,
        itemName: obj.folderName,
        itemType: "fo",
      };
    });
    return folderList;
  }
}

module.exports.login = login;
