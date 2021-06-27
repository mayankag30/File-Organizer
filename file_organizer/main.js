#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const helpObj = require("./commands/help");
const organizeObj = require("./commands/organize");
const treeObj = require("./commands/tree");
// how to take input from command line
// first is "node", second is "filename.js", from third are the args
const inputArr = process.argv.slice(2);
// console.log(inputArr);

const types = {
  media: ["mp4", "mkv"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
    "txt",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
  prog: ["js", "css", "html"],
};

// node main.js tree "path or directory"
// node main.js organize "directory or path"
// node main.js help
const command = inputArr[0];
switch (command) {
  case "tree":
    treeObj.treeKey(inputArr[1]);
    break;
  case "organize":
    organizeObj.organizeKey(inputArr[1]);
    break;
  case "help":
    helpObj.helpKey();
    break;

  default:
    console.log("Please 🙏🏻 input right command 😎😎");
}
