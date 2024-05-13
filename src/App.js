import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [sehir, setSehir] = useState("");
  const [havaDurumu, setHavaDurumu] = useState(null);

  useEffect(() => {
    const havaDurumuAl = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${sehir}&lang=tr&units=metric&appid=${API_KEY}`
        );
        setHavaDurumu(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (sehir !== "") {
      havaDurumuAl();
    }
  }, [sehir]);

  const sehirDegistir = (event) => {
    setSehir(event.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500">
      <div className="bg-gray-200 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Hava Durumu</h1>
        <div className="mb-4">
          <label htmlFor="sehir" className="block font-medium mb-1">
            Şehir
          </label>
          <input
            type="text"
            id="sehir"
            name="sehir"
            value={sehir}
            onChange={sehirDegistir}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        {havaDurumu && (
          <div>
            <div className="mb-4 flex items-center">
              <img
                className="w-12 h-12 mr-4 "
                src={`http://openweathermap.org/img/wn/${havaDurumu.weather[0].icon}.png`}
                alt={havaDurumu.weather[0].description}
              />
              <div>
                <h2 className="text-xl font-bold">
                  {havaDurumu.name} ({havaDurumu.sys.country})
                </h2>
                <p className="font-semibold">
                  {havaDurumu.weather[0].description.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg shadow-md">
                <p className="text-lg font-bold">Sıcaklık</p>
                <p className="text-4xl font-bold">
                  {Math.round(havaDurumu.main.temp)}&deg;C
                </p>
              </div>
              <div className="p-4 rounded-lg shadow-md">
                <p className="text-lg font-bold">Nem</p>
                <p className="text-4xl font-bold">
                  {havaDurumu.main.humidity}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
