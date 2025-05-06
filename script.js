const apiKey = "3ce3adf7a636ac6c41342ddd14393d14";  // API Key ของ OpenWeather

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherCard = document.getElementById("weatherCard");
  const errorMsg = document.getElementById("errorMsg");

  if (!city) {
    errorMsg.innerText = "กรุณาใส่ชื่อเมือง";
    errorMsg.style.display = "block";
    weatherCard.style.display = "none";
    return;
  }

  // เรียกข้อมูลจาก OpenWeather API สำหรับสภาพอากาศ
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=th`);

  if (response.ok) {
    const data = await response.json();
    // แสดงข้อมูลสภาพอากาศ
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("description").innerText = data.weather[0].description;
    document.getElementById("temp").innerText = data.main.temp;
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("wind").innerText = data.wind.speed;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // เรียกข้อมูล PM 2.5 จาก OpenWeather API
    const airQualityResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`);
    
    if (airQualityResponse.ok) {
      const airData = await airQualityResponse.json();
      document.getElementById("pm25").innerText = airData.list[0].components.pm2_5;  // แสดงค่า PM 2.5
    }

    weatherCard.style.display = "block";
    errorMsg.style.display = "none";
  } else {
    errorMsg.innerText = "ไม่พบเมืองที่คุณใส่";
    errorMsg.style.display = "block";
    weatherCard.style.display = "none";
  }
}

// Dark Mode
document.getElementById("toggleDark").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Toggle Menu
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("show");
});


