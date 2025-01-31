const { colorConsoleFactory } = require('./colorConsole');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Function to ask for color and text
function askForInput() {
    rl.question('Enter a color (red, blue, green): ', (color) => {
      rl.question('Enter text to log: ', (text) => {
        try {
          const colorConsole = colorConsoleFactory(color);
          colorConsole.log(text);
        } catch (error) {
          console.error(error.message);
        } finally {
          rl.close();
        }
      });
    });
  }
  
  // Start the input prompts
  askForInput();