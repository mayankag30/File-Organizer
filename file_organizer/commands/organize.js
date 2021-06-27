const fs = require("fs");
const path = require("path");

// Organize Function
function organizeFn(dirPath) {
  console.log("Organize Command implemented for ", dirPath);
  // 1. Input -> directory path given
  let destPath;
  if (dirPath === undefined) {
    // Pick the path of the current working directory
    destPath = process.cwd();
    // organizeHelper(destPath, "");
    return;
  } else {
    const doesExist = fs.existsSync(dirPath);
    if (doesExist) {
      // 2. Create -> Organized_files -> directory
      destPath = path.join(dirPath, "organized_file");
      if (fs.existsSync(destPath) === false) {
        fs.mkdirSync(destPath);
      }
    } else {
      console.log("Kindly enter the correct path");
      return;
    }
  }
  // 3. Identify categories of all the files present in that input directory ->
  // 4. Copy / Cut files to that organized directory inside of any of the category folder
  organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest) {
  // 3. Identify categories of all the files present in that input directory ->
  const childNames = fs.readdirSync(src);
  //   console.log(childNames);
  for (let i = 0; i < childNames.length; i++) {
    const childAddress = path.join(src, childNames[i]);
    console.log(childAddress);
    const isFile = fs.lstatSync(childAddress).isFile();
    if (isFile) {
      //   console.log(childNames[i]);
      const category = getCategory(childNames[i]);
      // console.log(childNames[i], " belongs to -->", category);
      // 4. Copy / Cut files to that organized directory inside of any of the category folder
      sendFiles(childAddress, dest, category);
    }
  }
}

function getCategory(name) {
  var extension = path.extname(name);
  extension = extension.slice(1); // to remove the dot from the front
  //   console.log(extension);
  for (let type in types) {
    const cTypeArray = types[type];
    // console.log(cTypeArray);
    for (let i = 0; i < cTypeArray.length; i++) {
      if (extension === cTypeArray[i]) {
        return type;
      }
    }
  }
  return "others";
}

function sendFiles(srcFilePath, dest, category) {
  const categoryPath = path.join(dest, category);
  if (fs.existsSync(categoryPath) === false) {
    fs.mkdirSync(categoryPath);
  }
  const fileName = path.basename(srcFilePath);
  const destFilePath = path.join(categoryPath, fileName);
  // copy the content of orignal file to the destination file
  fs.copyFileSync(srcFilePath, destFilePath);
  // Delete the orignal file
  fs.unlinkSync(srcFilePath);
  console.log(fileName, "copied to ", category);
}

module.exports = {
  organizeKey: organizeFn,
};
