import { useState, useEffect } from 'react'
import axios from 'axios';

function Weather() {
  const [city, setCity] = useState("Multan");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cityChange = (event) => {
    setCity(event.target.value)
  }

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      setWeather(response);
    }
    catch (error) {
      setError('City not found. Try again');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <>
      <div className="Weather-container">
        <input type="text" placeholder='Enter city Name(e.g. Multan )'
          value={city} onChange={cityChange} />
        <div className="button">
          <button onClick={fetchWeather}>Get Weather</button>
          {loading && <p>loading....</p>}
          {error && <p style={{ color: "red" }}> {error}</p>}
          {weather && <>
            <div className="weather-info">
              <h1>{weather.data.name}</h1>
              <p><b>Temp:</b> {weather.data.main.temp} °C</p>
              <p><b>Condition:</b> {weather.data.weather[0].description}</p>
              <p><b>Humidity:</b> {weather.data.main.humidity} %</p>
              <p><b>Wind:</b> {weather.data.wind.speed} m/s</p>
            </div>
          </>}
        </div>
      </div>
    </>
  )
}

export default Weather;