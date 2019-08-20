import React, {useState, useEffect} from "react"
import SongFeatures from "./songFeatures.js"

export default function Song(props) {
  const [showSongFeatures, setShowSongFeatures] = useState(false)
  useEffect(() => {
    setShowSongFeatures(false)
  }, [props.track])
  return (
    <div className="song">
      <h3>{props.track.name}</h3>
      <h4>{artistDisplayName(props.track.artist)}</h4>
      <a href={props.track.urls.spotify}>Listen on Spotify</a>
      <img src={props.track.image.url} alt={props.track.name}/>
      {
        typeof props.track.lyrics_url !== "undefined" ?
        <a href={props.track.lyrics_url}>See the Lyrics</a>
        : null
      }
      <button
        onClick={() => {
          setShowSongFeatures(!showSongFeatures)
        }}
        >Song Features</button>
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
