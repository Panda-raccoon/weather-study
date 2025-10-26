import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({
  cities,
  setCity,
  getCurrentLocation,
  activeButton,
  setActiveButton,
}) => {
  console.log("도시들", cities);

  // const searchByCity = async (cityName) => {
  //   setCity(cityName);
  //   let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4c972f331d80f188bdbb3159463aa34c&units=metric`;
  //   let res = await fetch(url);
  //   let data = await res.json();
  //   setWeather(data);
  // };

  return (
    <div>
      <div className="weather-button">
        <Button
          variant={activeButton === "current" ? "warning" : "secondary"}
          onClick={getCurrentLocation}
        >
          CurrentLocation
        </Button>

        {cities.map((item, index) => (
          <Button
            variant={activeButton === item ? "warning" : "secondary"}
            key={index}
            onClick={() => setCity(item)}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WeatherButton;
