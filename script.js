const apiKey = "3ce3adf7a636ac6c41342ddd14393d14";

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

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=th`);

  if (response.ok) {
    const data = await response.json();
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("description").innerText = data.weather[0].description;
    document.getElementById("temp").innerText = data.main.temp;
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("wind").innerText = data.wind.speed;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

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
