//file to test the behaviour of the logger, run node TestLogger.js to see behaviour

const Logger = require('./Logger');
const ConsoleStrategy = require('./ConsoleStrategy');
const FileStrategy = require('./FileStrategy');

// Create a logger instance with console strategy
const logger = new Logger(new ConsoleStrategy());

// Log messages using the console strategy
logger.debug('This is a debug message');
logger.info('This is an info message');
logger.warn('This is a warning');
logger.error('This is an error');

// Switch to file logging strategy
logger.setStrategy(new FileStrategy('./my-log.txt'));

// Log messages using the file strategy
logger.debug('Debugging to the file');
logger.info('Info message to the file');
logger.warn('Warning to the file');
logger.error('Error to the file');