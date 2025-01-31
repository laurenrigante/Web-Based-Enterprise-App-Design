const Logger = require('./Logger');
const fs = require('fs');
const path = require('path');

class FileLogger extends Logger {
  constructor(filePath) {
    super(); // Call the constructor of the parent class
    this.filePath = filePath || path.join(__dirname, 'log.txt'); // Default log file path
  }

  write(message) {
    fs.appendFileSync(this.filePath, message + '\n'); // Append log message to the file
  }
}

module.exports = FileLogger;
