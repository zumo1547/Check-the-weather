const apiKey = "3ce3adf7a636ac6c41342ddd14393d14";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherCard = document.getElementById("weatherCard");
  const errorMsg = document.getElementById("errorMsg");

  if (!city) {
    errorMsg.innerText = "⚠️ กรุณาใส่ชื่อเมืองก่อนค้นหา";
    errorMsg.style.display = "block";
    weatherCard.style.display = "none";
    return;
  }

  try {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.length) {
      errorMsg.innerText = "❌ ไม่พบเมืองที่คุณใส่";
      errorMsg.style.display = "block";
      weatherCard.style.display = "none";
      return;
    }

    const { lat, lon, name, country } = geoData[0];

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=th&appid=${apiKey}`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    document.getElementById("cityName").innerText = `${name}, ${country}`;
    document.getElementById("description").innerText = weatherData.weather[0].description;
    document.getElementById("temp").innerText = weatherData.main.temp;
    document.getElementById("humidity").innerText = weatherData.main.humidity;
    document.getElementById("wind").innerText = weatherData.wind.speed;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    weatherCard.style.display = "block";
    errorMsg.style.display = "none";
  } catch (err) {
    errorMsg.innerText = "เกิดข้อผิดพลาดในการโหลดข้อมูล";
    errorMsg.style.display = "block";
    weatherCard.style.display = "none";
  }
}
