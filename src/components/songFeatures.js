import React, {useState, useEffect} from "react"
import {base_url} from "./constants.js"

export default function SongFeatures(props) {
  const [loading, setLoading] = useState(true)
  const [songFeatures, setSongFeatures] = useState({})
  useEffect(() => {
    setLoading(true)
    fetch(base_url + "/tracks/features?id=" + props.id)
    .then(response => response.json())
    .then((json) => {
      setSongFeatures(json)
      setLoading(false)
    })
    .catch(error => console.log(error))
  }, [props.id])
  return (
    <div className="song-features">
      {
        loading ?
        <div id="loader" className="preloader-wrapper big active">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
        :
        <div className="song-features-detail">
          <table className="striped">
            <thead>
              <tr>
                <th>Song Attributes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Key Signature</td>
                <td>{describeKey(songFeatures.features.key, songFeatures.features.mode)}</td>
              </tr>
              <tr>
                <td>Time Signature</td>
                <td>{describeTimeSignature(songFeatures.features.time_signature)}</td>
              </tr>
              <tr>
                <td>Tempo</td>
                <td>{describeTempo(songFeatures.features.tempo)}</td>
              </tr>
              <tr>
                <td>Length</td>
                <td>{describeDuration(songFeatures.features.duration_ms)}</td>
              </tr>
            </tbody>
          </table>
          <table className="striped">
            <thead>
              <tr>
                <th>Song Features</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Positivity</td>
                <td>{describeValence(songFeatures.features.valence)}</td>
              </tr>
              <tr>
                <td>Energy</td>
                <td>{describeEnergy(songFeatures.features.energy)}</td>
              </tr>
              <tr>
                <td>Danceability</td>
                <td>{describeDanceability(songFeatures.features.danceability)}</td>
              </tr>
              <tr>
                <td>Acousticness</td>
                <td>{describeAcousticness(songFeatures.features.acousticness)}</td>
              </tr>
              <tr>
                <td>Instrumentalness</td>
                <td>{describeInstrumentalness(songFeatures.features.instrumentalness)}</td>
              </tr>
              <tr>
                <td>Liveness</td>
                <td>{describeLiveness(songFeatures.features.liveness)}</td>
              </tr>
              <tr>
                <td>Spoken-word</td>
                <td>{describeSpeechiness(songFeatures.features.speechiness)}</td>
              </tr>
              <tr>
                <td>Loudness</td>
                <td>{describeLoudness(songFeatures.features.loudness)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

const describeAcousticness = (num) => {
  if (typeof num === "undefined" || num === null) {
    return "No acousticness score available :("
  } else {
    const score = parseFloat((num * 100).toFixed(1))
    return `${score}% confidence the song is acoustic`
  }
}

const describeDanceability = (num) => {
  if (typeof num === "undefined" || num === null) {
    return "No danceability score avaiable :("
  } else {
    let response = ""
    const score = parseFloat((num * 100).toFixed(1))
    if (score < 25) {
      response = `Not danceable: ${score}% on the danceability scale`
    } else if (score >= 25 && score < 50) {
      response = `Slightly dancy: ${score}% on the danceability scale`
    } else if (score >= 50 && score < 75) {
      response = `Moderately dancy: ${score}% on the danceability scale`
    } else if (score >= 75) {
      response = `Dancy af! ${score}% on the danceability scale`
    } else {
      response = "No danceability score avaiable :("
    }
    return response
  }
}

const describeDuration = (num) => {
  if (typeof num === "undefined" || num === null) {
    return "No duration avaiable :("
  } else {
    const seconds = num / 1000
    const minutes = Math.floor(seconds/60)
    const remainingSeconds = Math.round(seconds - (minutes*60))
    return `${minutes} minutes, ${remainingSeconds} seconds`
  }
}

const describeEnergy = (num) => {
  if (typeof num === "undefined" || num === null) {
    return "No energy score available :("
  } else {
    let response = ""
    const score = parseFloat((num * 100).toFixed(1))
    if (score < 25) {
      response = `Chill af: ${score}% on the energy scale`
    } else if (score >= 25 && score < 50) {
      response = `Fairly mellow: ${score}% on the energy scale`
    } else if (score >= 50 && score < 75) {
      response = `Pretty energetic: ${score}% on the energy scale`
    } else if (score >= 75) {
      response = `In yo face! ${score}% on the energy scale`
    } else {
      response = "No energy score avaiable :("
    }
    return response
  }
}

const describeInstrumentalness = (num) => {
  if (typeof num === "undefined" || num === null) {
    return "No instrumentalness score available :("
  } else {
    const score = parseFloat((num * 100).toFixed(1))
    return `${score}% confidence the song is instrumental (no vocals)`
  }
}

const describeKey = (key, mode) => {
  let responseMode = ""
  let responseKey = ""
  if (typeof mode === "undefined" || mode === null) {
    responseMode = ""
  } else {
    if (mode === 1) {
      responseMode = "Major"
    } else {
      responseMode = "minor"
    }
  }
  if (typeof key === "undefined" || key === null) {
    responseKey = ""
  } else {
    switch (key) {
      case 0:
        responseKey = "C"
        break;
      case 1:
        responseKey = "C# (or D♭)"
        break;
      case 2:
        responseKey = "D"
        break;
      case 3:
        responseKey = "D# (or E♭)"
        break;
      case 4:
        responseKey = "E"
        break;
      case 5:
        responseKey = "F"
        break;
      case 6:
        responseKey = "F# (or G♭)"
        break;
      case 7:
        responseKey = "G"
        break;
      case 8:
        responseKey = "G# (or A♭)"
        break;
      case 9:
        responseKey = "A"
        break;
      case 10:
        responseKey = "A# (or B♭)"
        break;
      case 11:
        responseKey = "B"
        break;
      default:
        responseKey = ""
    }
  }
  if (responseMode === "" && responseKey === "") {
    return "No key data available :("
  } else {
    return `${responseKey} ${responseMode}`
  }
}

const describeLiveness = (num) => {
  if (typeof num === "undefined" || num === null) {
    return "No liveness score available :("
  } else {
    const score = parseFloat((num * 100).toFixed(1))
    return `${score}% confidence the song is performed live`
  }
}

const describeLoudness = (num) => {
  if (typeof num === "undefined" || num === null) {
    return "No loudness data available :("
  } else {
    let response = ""
    const score = parseFloat((num).toFixed(1))
    if (score < -30) {
      response = `A hushed whisper, averaging ${score}db`
    } else if (score >= -30 && score < -20) {
      response = `Fairly quiet, averaging ${score}db`
    } else if (score >= -20 && score < -10) {
      response = `Moderately loud, averaging ${score}db`
    } else if (score >= -10) {
      response = `Hot track! averaging ${score}db`
    } else {
      response = "No loudness score avaiable :("
    }
    return response
  }
}

const describeSpeechiness = (num) => {
  if (typeof num === "undefined" || num === null) {
    return "No spoken-word score available :("
  } else {
    let response = ""
    const score = parseFloat((num * 100).toFixed(1))
    if (score < 33.3) {
      response = `${score}% spoken-word score - likely little to no spoken words`
    } else if (score >= 33.3 && score < 66.6) {
      response = `${score}% spoken-word score - a mix of music and spoken words`
    } else if (score >= 66.6) {
      response = `${score}% spoken-word score - mostly spoken words`
    } else {
      response = "No spoken-word score avaiable :("
    }
    return response
  }
}

const describeTempo = (num) => {
  if (typeof num === "undefined" || num === null) {
    return "No tempo available :("
  } else {
    const score = parseFloat(num.toFixed(1))
    return `${score} bpm`
  }
}

const describeTimeSignature = (num) => {
  if (typeof num === "undefined" || num === null) {
    return "No time signature available :("
  } else {
    return `${num}`
  }
}

const describeValence = (num) => {
  if (typeof num === "undefined" || num === null) {
    return "No positivity score avaiable :("
  } else {
    let response = ""
    const score = parseFloat((num * 100).toFixed(1))
    if (score < 25) {
      response = `Dark: ${score}% on the positivity scale`
    } else if (score >= 25 && score < 50) {
      response = `Moody: ${score}% on the positivity scale`
    } else if (score >= 50 && score < 75) {
      response = `Pretty upbeat: ${score}% on the positivity scale`
    } else if (score >= 75) {
      response = `Happy! ${score}% on the positivity scale`
    } else {
      response = "No positivity score avaiable :("
    }
    return response
  }
}
