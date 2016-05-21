var fs = require('fs');

module.exports = function(path) {
  let fileExists = true;
  try {
    fs.accessSync(path);
  } catch (e) {
    fileExists = false;
  }

  return fileExists;
}
