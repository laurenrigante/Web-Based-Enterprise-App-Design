const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./db/musicians.db', (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the database.');
    // Enable foreign key constraints
    db.run('PRAGMA foreign_keys = ON;', (err) => {
      if (err) {
        console.error('Failed to enable foreign keys:', err.message);
      } else {
        console.log('Foreign key enforcement is enabled.');
      }
    });
  }
});

app.use(cors());
app.use(express.json());

// Route: Get musician details and their albums
app.get('/musicians/:name', (req, res) => {
  const musicianName = req.params.name;

  //directly querying from the db tables, first check for existence of the musician
  db.get(
    'SELECT * FROM Musician WHERE name = ?',
    [musicianName],
    (err, musician) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }

      if (!musician) {
        res.status(404).json({ error: `No musician found with the name ${musicianName}` });
        return;
      }

      // if musician exists, we then query the albums for the musician using the musician id since its the FK of the album table
      db.all(
        'SELECT id, title, release_year, genre FROM Album WHERE musician_id = ?',
        [musician.id],
        (err, albums) => {
          if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
            return;
          }

          // Create album links that can be clicked to fetch tracks later
          const albumsWithLinks = albums.map((album) => ({
            id: album.id,
            title: album.title,
            release_year: album.release_year,
            genre: album.genre, 
            albumLink: `/albums/${album.id}/tracks`, // Link to fetch tracks for this album
          }));

          res.json({
            musician: {
              id: musician.id,
              name: musician.name,
              genre: musician.genre,
              country: musician.country,
              debut_year: musician.debut_year,
            },
            albums: albumsWithLinks,
          });
        }
      );
    }
  );
});

// Route: Get tracks for a specific album
app.get('/albums/:albumId/tracks', (req, res) => {
  const albumId = req.params.albumId;

  // Query tracks for the album, using album id since its the fk for the track table
  db.all(
    'SELECT * FROM Track WHERE album_id = ?',
    [albumId],
    (err, tracks) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }

      if (tracks.length === 0) {
        res.status(404).json({ error: 'No tracks found for this album' });
        return;
      }

      res.json({
        tracks: tracks.map((track) => ({
          id: track.id,
          title: track.title,
          duration: track.duration,
          track_number: track.track_number,
        })),
      });
    }
  );
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
