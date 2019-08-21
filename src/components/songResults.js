import React from "react"
import Song from "./song.js"

export default function SongResults(props) {
  return (
    <div className="song-results">
      <h1>RESULTS</h1>
      {
        props.songResults.tracks.map((track, index) => {
          return (
            <Song
              key={index}
              track={track}
            />
          )
        })
      }
    </div>
  )
}
