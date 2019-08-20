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
      <h1>Song Features</h1>
      <Search />
    </div>
  );
}
