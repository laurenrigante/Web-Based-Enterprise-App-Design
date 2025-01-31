//will log to the console
class ConsoleStrategy {
    log(level, message) {
      console.log(`[${level}]: ${message}`);
    }
  }
  module.exports = ConsoleStrategy;