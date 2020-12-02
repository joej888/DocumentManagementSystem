const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

router.get("/", userControllers.getUsers);
//router.post("/", userControllers.postUsers);
//router.put("/:userId", userControllers.updateUser);
//router.delete("/:userId", userControllers.deleteUser);

module.exports = router;
