import React from "react";
import "./home.css";
import { fetchWeather } from "../store/Slice";
import { ALLSTATUS } from "../store/Slice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import wind from "../pages/images/wind-icon.png";

const Home = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const { data: weathers, status } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather());
  }, []);

  if (status === ALLSTATUS.LOADING) {
    return <h2>Loading...</h2>;
  }

  if (status === ALLSTATUS.ERROR) {
    return <h2>Ooops...Something went Wrong!</h2>;
  }

  return (
    <>
      <div className="mainContainer">
        <div class="center">
          <div id="cloud"></div>
        </div>

        <div className="searchBar">
          <input
            className="searchInput"
            placeholder="Type City Name"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
        </div>
        <button className="btn" onClick={() => dispatch(fetchWeather(city))}>
          Search
        </button>
        {weathers.name ? (
          <div className="mainWrapper">
            <div className="leftSide">
              <div className="leftTop">
                <div className="iconContainer">
                  {weathers.weather ? (
                    <img
                      className="image"
                      src={`http://openweathermap.org/img/wn/${weathers.weather[0].icon}@2x.png`}
                      alt="img"
                    ></img>
                  ) : (
                    ""
                  )}
                </div>
                {weathers.weather ? (
                  <span className="description">
                    {weathers.weather[0].description}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="leftBottom">
                {weathers.wind ? (
                  <img className="windIcon" src={wind} alt="img"></img>
                ) : (
                  ""
                )}
                {weathers.wind ? (
                  <span className="windSpeed">{weathers.wind.speed} Km/hr</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="centerSide">
              <h2 className="cityName">
                {weathers.name}{" "}
                <span className="rightSide">{weathers.sys.country}</span>
              </h2>
              {weathers.main ? (
                <h3 className="temperature">
                  {Math.floor(weathers.main.temp) / 10} °C
                </h3>
              ) : (
                ""
              )}
              {weathers.main ? (
                <h3 className="humidity">
                  Humidity: {Math.floor(weathers.main.humidity)} %
                </h3>
              ) : (
                ""
              )}
              {weathers.main ? (
                <h3 className="tempMax">
                  Max: {Math.floor(weathers.main.temp_max) / 10} °C
                </h3>
              ) : (
                ""
              )}
              {weathers.main ? (
                <h3 className="tempMin">
                  Min: {Math.floor(weathers.main.temp_min) / 10} °C
                </h3>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <h2 className="noCity">Oops... No City Found</h2>
        )}
      </div>
    </>
  );
};

export default Home;
