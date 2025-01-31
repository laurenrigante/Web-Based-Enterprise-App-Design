class UnknownCommand {
    constructor(request, response) {
      this.request = request;
      this.response = response;
    }
  
    process() {
      this.response.render('missingdataView');
    }
  }
  
  module.exports = UnknownCommand;
  