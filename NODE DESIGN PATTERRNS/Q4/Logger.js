//contains all of the main methods that will accept a strategy to decide where logs should go
class Logger {
    constructor(strategy) {
      this.strategy = strategy;
    }
  
    // Setting the strategy dynamically
    setStrategy(strategy) {
      this.strategy = strategy;
    }
  
    // Log methods for various levels
    debug(message) {
      this.strategy.log('DEBUG', message);
    }
  
    info(message) {
      this.strategy.log('INFO', message);
    }
  
    warn(message) {
      this.strategy.log('WARN', message);
    }
  
    error(message) {
      this.strategy.log('ERROR', message);
    }
  }
  module.exports = Logger;