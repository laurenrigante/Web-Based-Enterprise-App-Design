//will log to a file
const fs = require('fs');
const path = require('path');

class FileStrategy {
  constructor(filePath) {
    // Define the log file path, defaulting to 'log.txt'
    this.filePath = filePath || path.join(__dirname, 'log.txt');
  }

  log(level, message) {
    const logMessage = `[${level}]: ${message}\n`;
    fs.appendFileSync(this.filePath, logMessage); // Synchronous writing to file
  }
}
module.exports = FileStrategy;