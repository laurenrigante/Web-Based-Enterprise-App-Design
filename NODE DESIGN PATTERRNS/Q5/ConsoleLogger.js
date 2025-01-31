const Logger = require('./Logger');

class ConsoleLogger extends Logger {
  write(message) {
    console.log(message); // Logs to the console
  }
}

module.exports = ConsoleLogger;
