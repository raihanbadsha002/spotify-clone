import React from "react";
import "./SongRow.css";

function SongRow({ track, playSong }) {
  console.log(track);
  return (
    <div className="songRow" onClick={() => playSong(track.id)}>
      <img className="songRow__album" src="http://s3.amazonaws.com/NRNArt/Todd-Dulaney--To-Africa-With-Love-album-cover.jpg" alt="" />
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  );
}

export default SongRow;