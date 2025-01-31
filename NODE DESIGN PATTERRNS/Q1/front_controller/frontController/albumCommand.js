const Album = require("../domain/albums");
const Repo = require("../repository");

class AlbumCommand {
  constructor(request, response) {
    this.request = request;
    this.response = response;
    this.repo = new Repo();
  }

  process() {
    const album = this.repo.queryAlbum(this.request.query.name);
    console.log("Querying for album name:", album);

    if (album) {
      this.response.render("albumView", {
        album: album,
      });
    } else {
      this.response.render("missingdataView");
    }
  }
}

module.exports = AlbumCommand;
