const express = require("express");
const router = express.Router();

const folderControllers = require("../controllers/folderControllers");

router.get("/", folderControllers.getFolders);
router.post("/", folderControllers.createFolder);
//router.put("/id", folderControllers.renameFolder);
//router.delete("/:id", folderControllers.deletefolder);

module.exports = router;
