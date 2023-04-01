const checkExtension = (filename) => {
  const EXTENSIONS = ["txt", "json", "xml", "js", "html", "css"];
  ("file.js");
  const index = filename.lastIndexOf(".");
  const slicedExts = filename.slice(index + 1);

  console.log(slicedExts);

  return {
    extension: slicedExts,
    permission: EXTENSIONS.includes(slicedExts),
  };
};
module.exports = checkExtension;
// checkExtension("file.js");
