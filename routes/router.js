const express = require("express");
const fileRouter = express.Router();
const { getFiles, createFile, getFile } = require("../files");
// getAll
// get
fileRouter.get("/", getFiles);
fileRouter.get("/:filename", getFile);
fileRouter.post("/", createFile);

module.exports = fileRouter;
