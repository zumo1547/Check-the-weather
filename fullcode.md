เว็บฉัน
index.html
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>🌤️ เช็กอากาศวันนี้</title>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav>
    <h2>🌦️ Weather Checker</h2>
    <button id="toggleDark">🌙</button>
  </nav>

  <main>
    <h1>🌤️ เช็กอากาศวันนี้</h1>
    <div class="input-group">
      <input type="text" id="cityInput" placeholder="ใส่ชื่อเมือง เช่น Bangkok">
      <button onclick="getWeather()">ดูอากาศ</button>
    </div>

    <div class="card" id="weatherCard" style="display: none;">
      <h2 id="cityName"></h2>
      <img id="weatherIcon" class="weather-icon" src="" alt="weather icon">
      <p id="description"></p>
      <p><strong>🌡️ อุณหภูมิ:</strong> <span id="temp"></span>°C</p>
      <p><strong>💧 ความชื้น:</strong> <span id="humidity"></span>%</p>
      <p><strong>💨 ลม:</strong> <span id="wind"></span> m/s</p>
    </div>

    <p class="error" id="errorMsg" style="display:none;"></p>
  </main>

  <script src="script.js"></script>
</body>
</html>


script.js
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

// toggle dark mode
document.getElementById("toggleDark").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});



style.css
body {
  font-family: 'Prompt', sans-serif;
  background: linear-gradient(135deg, #c3ecf5, #f5f7fa);
  margin: 0;
  padding: 0;
  color: #333;
  transition: background 0.3s, color 0.3s;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #4c4caf;
  color: #fff;
  padding: 1rem 2rem;
}

nav h2 {
  margin: 0;
}

#toggleDark {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

main {
  text-align: center;
  margin-top: 50px;
}

.input-group {
  margin: 20px 0;
}

input[type="text"] {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #aaa;
  border-radius: 5px;
  width: 250px;
}

button {
  padding: 10px 20px;
  background-color: #4c4caf;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

button:hover {
  background-color: #3a3a99;
  transform: scale(1.05);
}

.card {
  margin: 30px auto;
  padding: 20px;
  border-radius: 10px;
  background: #ffffffaa;
  max-width: 300px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.weather-icon {
  width: 80px;
  height: 80px;
}

.error {
  color: red;
  font-weight: bold;
}

body.dark {
  background: #1e1e1e;
  color: #eee;
}

body.dark nav {
  background: #222;
}

body.dark .card {
  background: #2c2c2c;
  color: #ddd;
}

body.dark input[type="text"] {
  background: #444;
  color: white;
  border-color: #666;

}


