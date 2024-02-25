import { useState } from 'react';
import axios from 'axios';

const API_KEY = "APIキー";

// JSONデータ用インターフェース定義
interface WeatherData {
  "weather": [
    {
      "description": string;//天気の説明
      "icon": string;//アイコン番号
    }
  ],
  "main": {
    "temp": number;//気温
  }
}
function OpenWeather() {
  // useStateの宣言
  const [city, setCity] = useState('Tokyo');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  
  // 天気データの取得部分
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ja`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('データー取得エラー:', error);
    }
  }
  return (
    <>
      <input type="text"
        placeholder="地域名を入力"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeatherData}>天気取得</button>
      {weatherData && (
        <div>
          <h2>{city}の天気</h2>
          <p><img src={"http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png"} /></p>
          <p>天気:{weatherData.weather[0].description}</p>
          <p>気温:{weatherData.main.temp}℃</p>
        </div>
      )}
    </>
  );
};

export default OpenWeather;