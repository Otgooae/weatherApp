function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let currentDate = date.getDate();
  return `${day}, ${month} ${currentDate}`;
}
function formatTime(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function showCityTemp(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;
  let temp = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let searchedCity = document.querySelector("h1");
  let cityTemp = document.querySelector("#currentTemp");
  let currentDate = document.querySelector("#date");
  let currentTime = document.querySelector("#time");
  let icon = document.querySelector("img#mainIcon");
  let iconCode = response.data.weather[0].icon;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  searchedCity.innerHTML = `${cityName}`;
  searchedCity.innerHTML = searchedCity.innerHTML.toUpperCase();
  cityTemp.innerHTML = `${temp}`;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  currentTime.innerHTML = formatTime(response.data.dt * 1000);
  icon.setAttribute("alt", response.data.weather[0].description);
  if (iconCode.indexOf("n") > -1) {
    icon.setAttribute("src", `images/nightImages/${iconCode}.svg`);
  } else {
    icon.setAttribute("src", `images/dayImages/${iconCode}.svg`);
  }
}
function search(city) {
  let apiKey = `c518c03770222f903df8ad86b5e217d8`;
  let unit = `metric`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCityTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#citySearch");
  let city = cityInput.value;
  search(city);
}
let searchValue = document.querySelector("form");
searchValue.addEventListener("submit", handleSubmit);
search("New York");
function showCurrentTemp(event) {
  event.preventDefault();
  function showCurrentPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = `c518c03770222f903df8ad86b5e217d8`;
    let unit = `metric`;
    let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
    let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showCityTemp);
  }
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
let currentButton = document.querySelector("#showCurrent");
currentButton.addEventListener("click", showCurrentTemp);

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}
function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = Math.round(celsiusTemp);
}

celsiusTemp = null;

let fahrenheitLink = document.querySelector(".fahrenheitLink");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);
let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", showCelsiusTemp);
