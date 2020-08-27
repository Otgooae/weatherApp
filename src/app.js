let currentTime = new Date();
function formatDate(date) {
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
let now = document.querySelector("h2");
now.innerHTML = formatDate(currentTime);
function formatTime(time) {
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
let nowTime = document.querySelector("h3");
nowTime.innerHTML = formatTime(currentTime);
function showCityTemp(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let searchedCity = document.querySelector("h1");
  searchedCity.innerHTML = `${cityName}`;
  searchedCity.innerHTML = searchedCity.innerHTML.toUpperCase();
  let cityTemp = document.querySelector("#currentTemp");
  cityTemp.innerHTML = `${temp}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
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
