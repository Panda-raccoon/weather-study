import React from "react";

const WeatherBox = ({ weather }) => {
  console.log("날씨", weather);

  // weather 데이터가 없거나 필요한 속성이 없으면 로딩 메시지 표시
  if (!weather || !weather.main || !weather.main.temp) {
    return (
      <div className="weather-box">
        <div>날씨 정보를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="weather-box">
      <div>{weather?.name}</div>
      <h2>
        {weather?.main.temp.toFixed(1)}°C /{" "}
        {Math.round(weather?.main.temp * 1.8 + 32)}°F
      </h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;

// ({}) destructuring props
// 화씨 = 섭씨*1.8 +32
