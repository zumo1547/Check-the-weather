const apiKey = "3ce3adf7a636ac6c41342ddd14393d14";

async function getWeather() {
  const city = document.getElementById("cityInput").value;

  // Step 1: แปลงชื่อเมืองเป็นพิกัด (latitude, longitude)
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoData.length) {
    document.getElementById("result").innerHTML = `<p style="color:red;">❌ ไม่พบเมืองที่คุณใส่</p>`;
    return;
  }

  const lat = geoData[0].lat;
  const lon = geoData[0].lon;

  // Step 2: ใช้ One Call API
  const onecallUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric&lang=th`;

  try {
    const res = await fetch(onecallUrl);
    if (!res.ok) throw new Error("ไม่สามารถดึงข้อมูลอากาศได้");
    const data = await res.json();

    const current = data.current;
    const daily = data.daily[0];

    document.getElementById("result").innerHTML = `
      <h2>${city}</h2>
      <p>🌡 อุณหภูมิ: ${current.temp} °C</p>
      <p>🌥 สภาพอากาศ: ${current.weather[0].description}</p>
      <p>💧 ความชื้น: ${current.humidity}%</p>
      <p>💨 ลม: ${current.wind_speed} m/s</p>
      <hr>
      <p><b>📅 พยากรณ์วันนี้:</b><br>
      ${daily.weather[0].description}<br>
      🌡 สูงสุด: ${daily.temp.max}°C | ต่ำสุด: ${daily.temp.min}°C</p>
    `;
  } catch (err) {
    document.getElementById("result").innerHTML = `<p style="color:red;">❌ ${err.message}</p>`;
  }
}
