const Artist = require('../domain/artist');
const Repo = require('../repository')

class ArtistCommand {
  constructor(request, response) {
    this.request = request;
    this.response = response;
    this.repo = new Repo();
  }

  process() {
    const artist = this.repo.queryArtist(this.request.query.name); 
    if (artist) {
        this.response.render('artistView', { 
          artistName: artist.getName(), 
          albums: artist.getAlbums() 
        });
    } else {
        this.response.render('missingdataView'); 
    }
  }
}

module.exports = ArtistCommand;
