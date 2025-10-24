import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";

// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
// 2. 날씨정보에는 도시, 섭씨 화씨 날씨상태
// 3. 5개의 버튼이 있다. ( 1개는 현재위치 , 4개는 다른도시 )
// 4. 도시버튼을 클릭할때마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다

function App() {
  const [weather, setWeather] = useState(null); // 데이터가 왔을 때 저장하는 곳

  // 현재위치정보를 가져오는 함수
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  // 자바스크립트 공부하기.....
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4c972f331d80f188bdbb3159463aa34c&units=metric`;
    let response = await fetch(url); //await을 쓰고 싶으면, async함수 안에서 써야함
    let data = await response.json();
    // console.log("데이터", data);
    setWeather(data);
  };

  // useEffect : 컴포넌트가 렌더링된 이후에 특정 작업을 수행하고 싶을 때 사용하는 훅
  // useEffect() : 파라미터 매개변수가 2개 ( 함수, 의존성배열 )
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div>
      <div class="container">
        <WeatherBox weather={weather} />
        <WeatherButton />
      </div>
    </div>
  );
}

export default App;
