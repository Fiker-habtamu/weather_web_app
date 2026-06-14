import React from "react";
import "./weather.css";

function WeatherComponent() {
  return (
    <>
      <div className="main_container flex justify-center items-center">
        <div className="contents">
          {/* just hero text here  */}
          <div>
            <h1>Get you current location weather </h1>
          </div>
          {/* The real info */}
          <div>
            <div>a big icon of weather</div>
            <h2>temperature of the current location</h2>
            <h3>city name</h3>
            <p>day</p>
          </div>
          {/* wind and humidity */}
          <div>
            <div>wind</div>
            <div>humidity</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherComponent;
