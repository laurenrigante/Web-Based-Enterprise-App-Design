const AlbumCommand = require('./albumCommand');
const ArtistCommand = require('./artistCommand');
const UnknownCommand = require('./unknownCommand');
const Repository = require('../repository');

class FrontController {
  constructor(request, response) {
    this.request = request;
    this.response = response;
    this.artistRepo = new Repository(); 
  
  }

  getCommand() {
    const commandName = this.request.query.command || 'Unknown';
    switch (commandName) {
      case 'Artist':
        return new ArtistCommand(this.request, this.response);
      case 'Album':
        return new AlbumCommand(this.request, this.response);
      default:
        return new UnknownCommand(this.request, this.response);
    }
  }

  processRequest() {
    const command = this.getCommand();
    command.process();
  }
}

module.exports = FrontController;
