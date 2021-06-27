// Help Function
function helpFn() {
  console.log(`
      List of all the commands:
                  node main.js tree "path or directory"
                  node main.js organize "directory or path"
                  node main.js help
    `);
}

module.exports = {
  helpKey: helpFn,
};
