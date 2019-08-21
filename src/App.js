import React, {useEffect} from "react"
import Search from "./components/search.js"
import {base_url} from "./components/constants.js"
import "./css/materialize.css"
import "./css/main.css"

export default function App() {
  //GET call on render to wake up the API on heroku, in case it's unloaded from their servers
  useEffect(() => {
    fetch(base_url + "/wakes")
    .then(response => response.json())
    .then(json => console.log(json.response))
    .catch(error => console.log(error))
  }, [])
  return (
    <div className="container main">
      <div className="powered">
        <p id="powered-by">Powered by</p>
        <div id="spotify-logo"></div>
        <div id="genius-logo"></div>
      </div>
      <div id="se-logo"></div>
      <h1>Song Explorer</h1>
      <h6>Search by song or lyrics and discover song-data like key, tempo, danceability, energy, and more</h6>
      <Search />
    </div>
  );
}
