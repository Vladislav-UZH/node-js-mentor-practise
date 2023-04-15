const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");
//
const createFile = async (req, res, next) => {
  try {
    const { filename, content } = req.body;

    const result = dataValidator({ filename, content });

    if (result.error) {
      res.status(400).json({
        message: `Please specify ${result.error.details[0].context.key}" parameter`,
      });
      return;
    }

    const { permission, extension } = checkExtension(filename);
    if (!permission) {
      res.status(400).json({
        message: `Sorry, this app doesn't support ${extension} extension! `,
      });
      return;
    }

    await fs.writeFile(
      path.join(__dirname, "./files", filename),
      content,
      "utf-8"
    );
    res.status(201).json({ message: "File  was successfully created!" });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};
const getFiles = async (req, res, next) => {
  try {
    const files = await fs.readdir(path.join(__dirname, "./files"));
    console.log(files);
    if (!files.length) {
      res.status(404).json({ message: "No files here" });
      return;
    }
    res.status(200).json({ data: files });
  } catch (e) {
    res.status(500).json({ message: "server error" });
  }
};

//
const getFile = async (req, res, next) => {
  try {
    const { filename } = req.params;

    const files = await fs.readdir(path.join(__dirname, "./files"));
    if (!files.includes(filename)) {
      res.status(404).json({ message: `No file with filename: ${filename}!` });
      return;
    }

    const content = await fs.readFile(
      path.join(__dirname, "./files", filename),
      "utf8"
    );
    const index = filename.lastIndexOf(".");
    const name = filename.slice(0, index);
    const extension = filename.slice(index + 1);
    res.status(200).json({
      name,
      extension,
      content,
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
module.exports = { getFile, getFiles, createFile };
