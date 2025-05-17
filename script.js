const apiKey = "6204f7abe119421c91d100323251705" // Aqui debes poner tu api key de weatherApi

document.getElementById("weatherForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p style='color: red;'>Por favor, ingresa una ciudad.</p>";
    return;
  }

  resultDiv.innerHTML = "Cargando...";

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=es`
    );

    if (!res.ok) throw new Error("No se pudo obtener el clima para esa ciudad.");

    const data = await res.json();

    resultDiv.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p>${data.current.condition.text}</p>
      <img src="https:${data.current.condition.icon}" alt="Icono del clima">
      <p>🌡️ Temperatura: ${data.current.temp_c}°C</p>
      <p>💨 Viento: ${data.current.wind_kph} km/h</p>
      <p>💧 Humedad: ${data.current.humidity}%</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
});
