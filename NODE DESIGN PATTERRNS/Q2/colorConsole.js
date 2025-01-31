const chalk = require('chalk');

class ColorConsole {
  log(message) {
    
  }
}

class RedConsole extends ColorConsole {
  log(message) {
    console.log(chalk.red(message));
  }
}

class BlueConsole extends ColorConsole {
  log(message) {
    console.log(chalk.blue(message));
  }
}

class GreenConsole extends ColorConsole {
  log(message) {
    console.log(chalk.green(message));
  }
}


function colorConsoleFactory(color) {
  switch (color.toLowerCase()) {
    case 'red':
      return new RedConsole();
    case 'blue':
      return new BlueConsole();
    case 'green':
      return new GreenConsole();
    default:
      throw new Error('Invalid color. Please use "red", "blue", or "green".');
  }
}

module.exports = { colorConsoleFactory };
