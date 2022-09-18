import "./styles.css";
function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let month = [
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
    "December"
  ];

  let hours = now.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let formatDateString =
    days[now.getDay()] +
    ", " +
    month[now.getMonth()] +
    " " +
    now.getDate() +
    ", " +
    hours +
    ":" +
    minutes;
  return formatDateString;
}

let dateEl = document.querySelector("#date");
dateEl.innerHTML = formatDate(new Date());

//function searchCity(event) {
//event.preventDefault();
//let cityElement = document.querySelector("#city");
//let cityInput = document.querySelector("#city-input");
//cityElement.innerHTML = cityInput.value;
//}

//let searchForm = document.querySelector("#search-form");
//searchForm.addEventListener("submit", searchCity);

function toFahrenheit(event) {
  event.preventDefault();
  let temperatureEl = document.querySelector("span#temperature");
  temperatureEl.innerHTML = 66; //Number(temperatureEl.value) * 1.8 + 32;
}

function toCelsius(event) {
  event.preventDefault();
  let temperatureEl = document.querySelector("#temperature");
  temperatureEl.innerHTML = 19; //(temperatureEl.value - 32) / 1.8;
}

let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", toFahrenheit);
let celsiusButton = document.querySelector("#celsius-link");
celsiusButton.addEventListener("click", toCelsius);

///+++

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#precipitation").innerHTML = response.data.clouds.all;

  document.querySelector(
    "#weather-icon"
  ).src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  // console.log(response);
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
  // console.log(apiUrl);
}

function handleSubmit(event) {
  event.preventDefault();
  var city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("New York");
