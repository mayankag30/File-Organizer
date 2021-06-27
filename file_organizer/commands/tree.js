const fs = require("fs");
const path = require("path");

// Tree Function
function treeFn(dirPath) {
  // 1. Input -> directory path given
  if (dirPath === undefined) {
    // Pick the path of the current working directory
    const cwdPath = process.cwd();
    treeHelper(cwdPath, "");
    return;
  } else {
    const doesExist = fs.existsSync(dirPath);
    if (doesExist) {
      treeHelper(dirPath, "");
    } else {
      console.log("Kindly enter the correct path");
      return;
    }
  }
}

function treeHelper(dirPath, indent) {
  // is file or folder
  const isFile = fs.lstatSync(dirPath).isFile();
  if (isFile === true) {
    let fileName = path.basename(dirPath);
    console.log(indent + "├──" + fileName);
  } else {
    const dirName = path.basename(dirPath);
    console.log(indent + "└──" + dirName);
    const childrens = fs.readdirSync(dirPath);
    for (let i = 0; i < childrens.length; i++) {
      const childPath = path.join(dirPath, childrens[i]);
      treeHelper(childPath, indent + "\t");
    }
  }
}

module.exports = {
  treeKey: treeFn,
};
