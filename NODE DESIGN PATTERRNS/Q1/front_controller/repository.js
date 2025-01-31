// artistRepository.js
const Artist = require("./domain/artist");
const Album = require("./domain/albums");

class Repository {
  constructor() {
    this.data = {
      "Pink Floyd": {
        albums: [
          {
            title: "Wish You Were Here",
            songs: ["Shine On You Crazy Diamond", "Welcome to the Machine"],
          },
          {
            title: "The Wall",
            songs: ["Another Brick in the Wall", "Comfortably Numb"],
          },
        ],
      },
      "The Beatles": {
        albums: [
          { title: "Abbey Road", songs: ["Come Together", "Something"] },
          { title: "Let It Be", songs: ["Let It Be", "Get Back"] },
        ],
      },
      "Billie Eilish": {
        albums: [
          {
            title: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
            songs: ["bad guy", "bury a friend"],
          },
          { title: "Happier Than Ever", songs: ["Your Power", "NDA"] },
        ],
      },
      "One Direction": {
        albums: [
          {
            title: "Up All Night",
            songs: ["What Makes You Beautiful", "Gotta Be You", "One Thing"],
          },
          {
            title: "Midnight Memories",
            songs: [
              "Best Song Ever",
              "Story of My Life",
              "Diana",
              "Midnight Memories",
            ],
          },
          {
            title: "FOUR",
            songs: [
              "Night Changes",
              "No Control",
              "Fireproof",
              "Spaces",
              "Stockholm Syndrome",
            ],
          },
          {
            title: "Made in the AM",
            songs: [
              "Perfect",
              "What a Feeling",
              "History",
              "Walking in the Wind",
            ],
          },
        ],
      },
    };
  }

  queryArtist(artistName) {
    const artistData = this.data[artistName];
    if (artistData) {
      const albums = artistData.albums.map(
        (album) => new Album(album.title, album.songs)
      );
      return new Artist(artistName, albums);
    }
    return null;
  }

  queryAlbum(albumName) {
    for (const artistName in this.data) {
        const albums = this.data[artistName].albums;
        for (const album of albums) {
            if (album.title.toLowerCase() === albumName.toLowerCase()) {
                return new Album(album.title, album.songs);
            }
        }
    }
    return null; 
}

}

module.exports = Repository;
