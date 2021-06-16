import "./styles.css";
let dateSpan = document.querySelector("#currentDate");
let currentTime = new Date();

let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
dateSpan.innerHTML = `${day} | ${hours}:${minutes}`;

// display weather
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function changeToCelcius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = 23;
}

function changeToFahr(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = 47;
}

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", changeToCelcius);

let fahrLink = document.querySelector("#fahrenheit");
fahrLink.addEventListener("click", changeToFahr);

//search entered city
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-name").value;
  let apiKey = "98c018b858756dd24b79954fa9c811ec";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Current position button
function showPosition(position) {
  let apiKey = "98c018b858756dd24b79954fa9c811ec";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#locationButton");
currentLocationButton.addEventListener("click", getPosition);
