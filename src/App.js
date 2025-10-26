import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import { ClipLoader } from "react-spinners";

// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
// 2. 날씨정보에는 도시, 섭씨 화씨 날씨상태
// 3. 5개의 버튼이 있다. ( 1개는 현재위치 , 4개는 다른도시 )
// 4. 도시버튼을 클릭할때마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다

function App() {
  const [weather, setWeather] = useState(null); // 데이터가 왔을 때 저장하는 곳
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [activeButton, setActiveButton] = useState("current");
  const [apiError, setApiError] = useState(""); // 에러 상태 추가

  // 현재위치정보를 가져오는 함수
  const getCurrentLocation = () => {
    setActiveButton("current");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeatherByCurrentLocation(lat, lon);
      },
      (error) => {
        // 위치 권한 거부나 에러 처리
        console.error("위치 정보를 가져올 수 없습니다:", error);
        setApiError(
          "위치 권한이 거부되어 기본 도시(서울)의 날씨를 표시합니다."
        );
        setCity("seoul");
      }
    );
  };

  // 자바스크립트 공부하기.....
  const getWeatherByCurrentLocation = async (lat, lon) => {
    setApiError(""); // 에러 초기화
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4c972f331d80f188bdbb3159463aa34c&units=metric`;
    setLoading(true);

    try {
      let response = await fetch(url);

      // HTTP 상태 코드 확인
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("날씨 데이터를 가져오는데 실패했습니다:", error);
      setApiError("날씨 정보를 가져오는데 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    setApiError(""); // 에러 초기화
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4c972f331d80f188bdbb3159463aa34c&units=metric`;
    setLoading(true);

    try {
      let response = await fetch(url);

      // HTTP 상태 코드 확인
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();
      setWeather(data);
      setActiveButton(city);
    } catch (error) {
      console.error("날씨 데이터를 가져오는데 실패했습니다:", error);
      setApiError(`${city}의 날씨 정보를 가져오는데 실패했습니다.`);
    } finally {
      setLoading(false);
    }
  };

  // useEffect : 컴포넌트가 렌더링된 이후에 특정 작업을 수행하고 싶을 때 사용하는 훅
  // useEffect() : 파라미터 매개변수가 2개 ( 함수, 의존성배열 )
  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader
            color="#f800cbff"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="container">
          {/* 에러 메시지 표시 */}
          {apiError && (
            <div className="alert alert-warning text-center my-2" role="alert">
              {apiError}
            </div>
          )}
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            setCity={setCity}
            getCurrentLocation={getCurrentLocation}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        </div>
      )}
    </div>
  );
}

export default App;
