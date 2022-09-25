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
  console.log("accessTemperature");
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(function (response) {
    displayWeather(response, units);
    console.log("accessTemperature", response);
    getForecast(response.data.coord.lat, response.data.coord.lon, units);
  });
}

function displayWeather(response, units) {
  displayTemperature(response);
  displayDescription(response);
  displayHumidity(response);
  displayRealFeel(response);
  displayForecastIcon(response.data.weather[0].icon, "weatherConditionId");

  if (units == "metric") {
    displayWind(response);
  }
}

function displayForecastIcon(response, id) {
  accessSunny(response, id);
  accessPartlyCloudy(response, id);
  accessCloudy(response, id);
  accessRainy(response, id);
  accessThunder(response, id);
  accessSnowy(response, id);
  accessFoggy(response, id);
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
  getForecast(latitude, longitude);
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

function accessSunny(response, id) {
  let sunny = ["01d", "01n"];
  if (sunny.includes(response)) {
    displaySunIcon(id);
  }
}

function accessPartlyCloudy(response, id) {
  let partlyCloudy = ["02d", "02n"];
  if (partlyCloudy.includes(response)) {
    displayPartlyCloudyIcon(id);
  }
}

function accessCloudy(response, id) {
  let cloudy = ["03d", "03n", "04d", "04n"];
  if (cloudy.includes(response)) {
    displayCloudyIcon(id);
  }
}

function accessRainy(response, id) {
  let rainy = ["09d", "09n", "10d", "10n"];
  if (rainy.includes(response)) {
    displayRainIcon(id);
  }
}

function accessThunder(response, id) {
  let thunder = ["11d", "11n"];
  if (thunder.includes(response)) {
    displayThunderIcon(id);
  }
}

function accessSnowy(response, id) {
  let snowy = ["13d", "13n"];
  if (snowy.includes(response)) {
    displaySnowIcon(id);
  }
}

function accessFoggy(response, id) {
  let foggy = ["50d", "50n"];
  if (foggy.includes(response)) {
    displayFogIcon(id);
  }
}

function displaySunIcon(id) {
  var sunny = document.getElementById(id);
  sunny.src = "images/sunny.svg";
}

function displayPartlyCloudyIcon(id) {
  var partlyCloudy = document.getElementById(id);
  partlyCloudy.src = "images/partly_cloudy.svg";
}

function displayCloudyIcon(id) {
  console.log(id);
  var cloudy = document.getElementById(id);
  cloudy.src = "images/cloudy.svg";
}

function displayRainIcon(id) {
  var rainy = document.getElementById(id);
  rainy.src = "images/rainy.svg";
}

function displayThunderIcon(id) {
  var thunder = document.getElementById(id);
  thunder.src = "images/stormy.svg";
}

function displaySnowIcon(id) {
  var snowy = document.getElementById(id);
  snowy.src = "images/snowy.svg";
}

function displayFogIcon(id) {
  var foggy = document.getElementById(id);
  foggy.src = "images/foggy.svg";
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecastId");

  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      console.log(forecastDay);
      forecastHTML =
        forecastHTML +
        `<div>
        <div class="highlight-style" class="forecast-date">${formatDay(
          forecastDay.dt
        )}</div>
          <img
            src=""
            name=${forecastDay.weather[0].icon}
            alt="Forecast"
            style="max-width: 60px"
            id ="daily_${index}"
            class="forecast-icon daily_icon"
          />
          <div>
            <strong class="highlight-style"
              ><span class="max-temp">${Math.round(
                forecastDay.temp.max
              )}</span>°</strong
            >
            <span class="min-temp">${Math.round(forecastDay.temp.min)}</span>°
        </div>
      </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;

  let dailyIcons = document.getElementsByClassName("daily_icon");

  for (let index = 0; index < dailyIcons.length; index++) {
    let iconElement = dailyIcons[index];
    console.log(iconElement);
    displayForecastIcon(iconElement.name, iconElement.id);
  }
}

function getForecast(latitude, longitude, units) {
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  console.log(day);
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}
