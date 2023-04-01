const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");
const createFile = (filename, content) => {
  const data = {
    filename,
    content,
  };

  const result = dataValidator(data);

  if (result.error) {
    console.log(
      chalk.red(
        `Please specify "${result.error.details[0].context.key}" parameter`
      )
    );
    return;
  }
  const { permission, extension } = checkExtension(filename);
  if (!permission) {
    console.log(
      chalk.red(`Sorry, this app doesn't support ${extension} extension! `)
    );
  }
  fs.writeFile(path.join(__dirname, "./files", filename), content, "utf-8")
    .then(console.log(chalk.greenBright("File  was successfully created!")))
    .catch(console.error);
  // chalk "Please specify "key" parametr "
};
const getFiles = () => {
  fs.readdir(path.join(__dirname, "./files"))
    .then((files) => {
      if (!files.length) {
        console.log(chalk.red("No files here!"));
      }
      console.log(files);
    })
    .catch(console.error);
};
const getFile = (filename) => {
  fs.readdir(path.join(__dirname, "./files"))
    .then((files) => {
      if (!files.includes(filename)) {
        console.log(
          chalk.red(`No file with filename: ${filename} in this directory!`)
        );
      }
      fs.readFile(path.join(__dirname, "./files", filename), "utf8")
        .then((content) => {
          const index = filename.lastIndexOf(".");
          const name = filename.slice(0, index);
          const extension = filename.slice(index + 1);
          console.log({
            name,
            extension,
            content,
          });
        })
        .catch(console.error);
      //   `Filename: name extension content`;
    })
    .catch(console.error);
};
module.exports = { getFile, getFiles, createFile };

// HW
// rewrite in async
// add to getFile new keys: size,
