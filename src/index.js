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

let currentLocation = document.querySelector("#location");
currentLocation.addEventListener("click", searchUserLocation);

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

  accessTemperature(cityInput.value, "metric");
}

function convertToCelsius(event) {
  event.preventDefault();
  accessTemperature(cityName, "metric");
}

function convertToFahrenheit(event) {
  event.preventDefault();
  accessTemperature(cityName, "imperial");
}

function accessTemperature(cityInput, units) {
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let temperatureElement = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperatureId");
  temperature.innerHTML = temperatureElement;
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
