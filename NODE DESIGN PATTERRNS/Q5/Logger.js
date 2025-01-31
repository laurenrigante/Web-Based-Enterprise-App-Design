class Logger {
    log(level, message) {
      const formattedMessage = this.formatMessage(level, message);
      this.write(formattedMessage);
    }
  
    formatMessage(level, message) {
      return `[${level}]: ${message}`; // Define a basic message format
    }
  
    // This method will be implemented by subclasses
    write(message) {
     
    }
  
    debug(message) {
      this.log('DEBUG', message);
    }
  
    info(message) {
      this.log('INFO', message);
    }
  
    warn(message) {
      this.log('WARN', message);
    }
  
    error(message) {
      this.log('ERROR', message);
    }
  }
  
  module.exports = Logger;
  