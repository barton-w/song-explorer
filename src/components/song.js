import React, {useState, useEffect} from "react"
import SongFeatures from "./songFeatures.js"

export default function Song(props) {
  const [showSongFeatures, setShowSongFeatures] = useState(false)
  useEffect(() => {
    setShowSongFeatures(false)
  }, [props.track])
  return (
    <div className="song">
      <h5 id="song-title">{props.track.name}</h5>
      <h6 id="song-artist">{artistDisplayName(props.track.artist)}</h6>
      <img src={props.track.image.url} alt={props.track.name}/>
      <div className="song-actions">
        <button
          id={
            showSongFeatures ?
            "active" : "inactive"
          }
          className="waves-effect waves-light btn-large show-features-button"
          onClick={() => {
            setShowSongFeatures(!showSongFeatures)
          }}
          >Song Features</button>
        <a
          id="listen-on-spotify"
          target="_blank"
          rel="noopener noreferrer"
          href={props.track.urls.spotify}
          ></a>
      </div>
      {
        typeof props.track.lyrics_url !== "undefined" ?
          <a
            id="lyrics"
            target="_blank"
            rel="noopener noreferrer"
            href={props.track.lyrics_url}
          >See the Lyrics</a>
        : null
      }
      {
        showSongFeatures ?
        <SongFeatures
          id={props.track.id}
        />
        : null
      }
    </div>
  )
}

//Function to handle multiple artists on a track
const artistDisplayName = (artistArray) => {
  let displayName = ""
  for (let i=0; i < artistArray.length; i++) {
    if (i === artistArray.length - 1) {
      displayName += artistArray[i].name
    } else {
      displayName += artistArray[i].name + " & "
    }
  }
  return displayName
}
