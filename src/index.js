let now = new Date();
let paragraph = document.querySelector("p.date");

let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]; //value between 0 and 6
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]; //value between 0 and 11
let month = months[now.getMonth()];

paragraph.innerHTML = `${day} ${date} ${month}`;

let cityName = "Berlin";

let form = document.querySelector("#city-form");
form.addEventListener("submit", city);

let currentLocation = document.querySelector("#locationId");
currentLocation.addEventListener("click", searchUserLocation);
window.addEventListener("load", searchUserLocation);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", convertToCelsius);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);

function city(event) {
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");

  if (cityInput.value) {
    h1.innerHTML = `${cityInput.value.toUpperCase().trim()}`;
  } else {
    h1.innerHTML = null;
    alert("⛔ Please type a city name!");
  }
  event.preventDefault();

  cityName = cityInput.value;

  accessTemperature(cityName, "metric");

  cityInput.value = "";
}

function convertToCelsius(event) {
  event.preventDefault();
  accessTemperature(cityName, "metric");
}

function convertToFahrenheit(event) {
  event.preventDefault();
  accessTemperature(cityName, "imperial");
}

function accessTemperature(city, units) {
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(function (response) {
    displayWeather(response, units);
  });
}

function displayWeather(response, units) {
  displayTemperature(response);
  displayDescription(response);
  displayHumidity(response);
  displayRealFeel(response);
  accessSunny(response);
  accessPartlyCloudy(response);
  accessCloudy(response);
  accessRainy(response);
  accessThunder(response);
  accessSnowy(response);
  accessFoggy(response);

  if (units == "metric") {
    displayWind(response);
  }
}

function displayTemperature(response) {
  let temperatureElement = Math.round(response.data.main.temp);
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = temperatureElement;
}

function displayDescription(response) {
  let descriptionElement = response.data.weather[0].description;
  let description = document.querySelector("#descriptionId");
  description.innerHTML = descriptionElement;
}

function displayRealFeel(response) {
  let realFeelElement = Math.round(response.data.main.feels_like);
  let realFeel = document.querySelector("#realFeelId");
  realFeel.innerHTML = realFeelElement;
}

function displayHumidity(response) {
  let humidityElement = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidityId");
  humidity.innerHTML = humidityElement;
}

function displayWind(response) {
  let windElement = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#windId");
  wind.innerHTML = windElement;
}

function searchUserLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  accessLocationCity(latitude, longitude);
}

function accessLocationCity(latitude, longitude) {
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCityTemp);
}

function displayCityTemp(response) {
  let cityElement = response.data.name;
  cityName = cityElement;
  accessTemperature(cityElement, "metric");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityElement.toUpperCase().trim()}`;
}

function accessSunny(response) {
  let sunny = ["01d", "01n"];
  if (sunny.includes(response.data.weather[0].icon)) {
    displaySunIcon(response);
  }
}

function accessPartlyCloudy(response) {
  let partlyCloudy = ["02d", "02n"];
  if (partlyCloudy.includes(response.data.weather[0].icon)) {
    displayPartlyCloudyIcon();
  }
}

function accessCloudy(response) {
  let cloudy = ["03d", "03n", "04d", "04n"];
  if (cloudy.includes(response.data.weather[0].icon)) {
    displayCloudyIcon();
  }
}

function accessRainy(response) {
  let rainy = ["09d", "09n", "10d", "10n"];
  if (rainy.includes(response.data.weather[0].icon)) {
    displayRainIcon();
  }
}

function accessThunder(response) {
  let thunder = ["11d", "11n"];
  if (thunder.includes(response.data.weather[0].icon)) {
    displayThunderIcon();
  }
}

function accessSnowy(response) {
  let snowy = ["13d", "13n"];
  if (snowy.includes(response.data.weather[0].icon)) {
    displaySnowIcon();
  }
}

function accessFoggy(response) {
  let foggy = ["50d", "50n"];
  if (foggy.includes(response.data.weather[0].icon)) {
    displayFogIcon();
  }
}

function displaySunIcon() {
  var sunny = document.getElementById("weatherConditionId");
  sunny.src = "images/sunny.svg";
}

function displayPartlyCloudyIcon() {
  var partlyCloudy = document.getElementById("weatherConditionId");
  partlyCloudy.src = "images/partly_cloudy.svg";
}

function displayCloudyIcon() {
  var cloudy = document.getElementById("weatherConditionId");
  cloudy.src = "images/cloudy.svg";
}

function displayRainIcon() {
  var rainy = document.getElementById("weatherConditionId");
  rainy.src = "images/rainy.svg";
}

function displayThunderIcon() {
  var thunder = document.getElementById("weatherConditionId");
  thunder.src = "images/stormy.svg";
}

function displaySnowIcon() {
  var snowy = document.getElementById("weatherConditionId");
  snowy.src = "images/snowy.svg";
}

function displayFogIcon() {
  var foggy = document.getElementById("weatherConditionId");
  foggy.src = "images/foggy.svg";
}
