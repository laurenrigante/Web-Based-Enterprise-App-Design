import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [musicianName, setMusicianName] = useState("");
  const [musicianData, setMusicianData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumTracks, setAlbumTracks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const regex = /^[A-Za-z\s]+$/;
  
    if (!musicianName.trim()) {
      alert("Please enter a query to search.");
    } else if (!regex.test(musicianName)) {
      alert("Please enter a valid musician name (no special characters allowed).");
    } else {
      try {
        const encodedName = encodeURIComponent(musicianName);
        const response = await axios.get(
          `http://localhost:5000/musicians/${encodedName}`
        );
        console.log(response.data); 
        setMusicianData(response.data);
        setError(null);
      } catch (err) {
        setMusicianData(null);
        setError(`No musician found with the name ${musicianName}`);
      }
    }
  };

  const handleAlbumClick = async (albumId) => {
    if (selectedAlbum && selectedAlbum.id === albumId) {
      setSelectedAlbum(null);
      setAlbumTracks([]);  
    } else {
      const album = musicianData.albums.find((album) => album.id === albumId);
      setSelectedAlbum(album);

      try {
        const response = await axios.get(
          `http://localhost:5000/albums/${albumId}/tracks`
        );
        setAlbumTracks(response.data.tracks);  
      } catch (err) {
        setAlbumTracks([]);  
        console.error('Error fetching tracks:', err);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h4>Please enter the name of a musician you want to query</h4>
        <h5>No special characters are allowed</h5>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-div">
            <p>Musician Name:</p>
            <input
              type="text"
              name="musician"
              required
              value={musicianName}
              onChange={(e) => setMusicianName(e.target.value)}
            />
          </div>
          <button className="btn" type="submit">Submit</button>
        </form>
      </header>

      {/* Show error if no musician is found */}
      {error && <p>{error}</p>}

      {/* If musician data is available, show details */}
      {musicianData && (
        <div className="artist-details-container">
          <h4>Details for {musicianData.musician.name}:</h4>

          <div className="artist-details"> 
            <p><strong>Genre:</strong> {musicianData.musician.genre}</p>
            <p><strong>Country:</strong> {musicianData.musician.country}</p>
            <p><strong>Debut Year:</strong> {musicianData.musician.debut_year}</p>
          </div>

          <h4>Albums:</h4>
          {musicianData.albums.length > 0 ? (
            <ul>
              {musicianData.albums.map((album) => (
                <li key={album.id} className="album-item">
                  <button
                    className="album-button"
                    onClick={() => handleAlbumClick(album.id)}
                  >
                    <p><strong>Album Title:</strong> {album.title}</p>  
                  </button>
                  <p><strong>Release Year:</strong> {album.release_year}</p>
                  <p><strong>Genre:</strong> {album.genre}</p>

                  {/* If album is selected, display its track list */}
                  {selectedAlbum && selectedAlbum.id === album.id && (
                    <div className="track-container">
                      <p><strong>Tracks In This Album:</strong></p>
                      {albumTracks.length > 0 ? (
                        <ul className="track-list">
                          {albumTracks.map((track) => (
                            <li key={track.id}>
                              {track.track_number}. {track.title} ({track.duration})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No tracks available for this album.</p>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No albums found for this musician.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
