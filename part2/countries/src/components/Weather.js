import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
  const [weather, setWeather] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
      axios
          .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
          .then(response => {
              setWeather(response.data)
          })
          .catch(error => {
            console.log(error)
          })
  },[])
  console.log(weather, capital)

  if(weather === null || weather.success === (false)) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div>Temperature : {weather.current.temperature} </div>
      <div>
        <img height={100} width={150} src={weather.current.weather_icons.map(icon => icon)} alt="weather"></img>
      </div>
      <div>
        Wind : {weather.current.wind_speed} mph {weather.current.wind_dir}
      </div>
    </div>
  )

}

export default Weather;