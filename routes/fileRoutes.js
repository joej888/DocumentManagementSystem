const express = require("express");
const router = express.Router();

const fileControllers = require("../controllers/fileControllers");

//router.get("/id", fileControllers.getFileContent);
//router.put("/:id", fileControllers.upateFile);

router.get("/:folderId", fileControllers.getFiles);
router.post("/", fileControllers.createFiles);
router.delete("/:id", fileControllers.deletefiles);
module.exports = router;
