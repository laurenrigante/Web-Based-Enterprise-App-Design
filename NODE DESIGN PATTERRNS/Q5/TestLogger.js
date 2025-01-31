const ConsoleLogger = require('./ConsoleLogger');
const FileLogger = require('./FileLogger');

// Use ConsoleLogger
const consoleLogger = new ConsoleLogger();
consoleLogger.debug('This is a debug message');
consoleLogger.info('This is an info message');
consoleLogger.warn('This is a warning');
consoleLogger.error('This is an error');

// Switch to FileLogger
const fileLogger = new FileLogger('./my-log.txt');
fileLogger.debug('Debugging to the file');
fileLogger.info('Info message to the file');
fileLogger.warn('Warning to the file');
fileLogger.error('Error to the file');
