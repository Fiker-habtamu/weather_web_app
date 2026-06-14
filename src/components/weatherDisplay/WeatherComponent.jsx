import React, { useEffect, useState } from "react";
import "./weather.css";

function WeatherComponent() {
  const apiKeyUrl = import.meta.env.VITE_WEATHER_API;
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyUrl}`,
        )
          .then((response) => response.json())
          .then((data) => {
            setWeather(data);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
          });
      },
      (error) => {
        console.log(`some thing went wrong: ${error.message}`);
        setLoading(false);
      },
    );
  }, []);

  let tempInKelvin = null;
  let tempInCelsius = null;
  if (loading) {
    return (
      <>
        <div className="main_container bg-[#240046] text-[#e0aaff] text-3xl flex justify-center items-center">
          Loading ...
        </div>
      </>
    );
  } else {
    tempInKelvin = weather.main.temp;
    tempInCelsius = tempInKelvin - 273.15;
    const today = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const dayName = days[today.getDay()];
    const date = today.getDate();
    const month = months[today.getMonth()];
    const iconCode = weather.weather[0].icon;
    return (
      <>
        <div className="main_container flex flex-col justify-center gap-5 items-center bg-[#240046] h-[100vh ] text-[#e0aaff]">
          <div className="contents w-4/5">
            {/* just hero text here  */}
            <div className="w-full flex justify-center items-center mb-10">
              <h1 className="text-3xl text-center">
                Get you current location weather{" "}
              </h1>
            </div>
            {/* The real info */}
            <div>
              <div className="text-8xl mb-10">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                />
              </div>
              <h2 className="text-5xl mb-5 text-center">
                {Math.round(tempInCelsius)}
                <sup>o</sup>c
              </h2>
              <h2 className="text-3xl mb-5 text-center">
                {weather.weather[0].main}
              </h2>
              <h3 className="text-2xl font-normal mb-5 text-center">{weather.name}</h3>
              <p className="text-center">
                {month},{date},{dayName}
              </p>
            </div>
            {/* wind and humidity */}
            <div className="flex justify-around items-center w-1/2 text-[18px] font-light text-center">
              <div>
                wind 💨
                <br />{" "}
                <span className="font-bold">{weather.wind.speed}m/s</span>
              </div>
              <div>
                humidity 💧
                <br />{" "}
                <span className="font-bold">{weather.main.humidity}%</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default WeatherComponent;
