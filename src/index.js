import "./style.css";
import * as API from "./api-data.js";

const searchValue = document.querySelector("#search");
const btn = document.querySelector("button");
const weatherInfo = document.querySelector("#weather-container");
const banner = document.querySelector("#banner");

export const background1 = document.querySelector(".background1");
export const background2 = document.querySelector(".background2");

const name = document.querySelector("#name");
const temp = document.querySelector("#temp");
const feel = document.querySelector("#feel");
const icon = document.querySelector("#icon");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const time = document.querySelector("#time");
const range = document.querySelector("#range");
const photographer = document.querySelector("#photographer");
const iconDescription = document.querySelector("#icon-descrip");

background1.style.backgroundImage =
  "url(https://images.unsplash.com/photo-1475522003475-eb5f96f1f930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzQ5NDB8MHwxfHNlYXJjaHw4fHxjYWxpZm9ybmlhfGVufDB8fHx8MTY2NjYzNTI3MA&ixlib=rb-4.0.3&q=80&w=1080)";
background1.style.backgroundPosition = "50% 40%";

btn.addEventListener("click", Location);

// our async function executed when the user searches a new city.  The Unsplash API is used to retrieve a tagged picture of the searched city
// and the Open Weather API is used to retrieve weather data
async function Location() {
  banner.style.display = "none";
  weatherInfo.style.opacity = "1";
  let keyword = searchValue.value; // User query value which will be used in our fetch requests to Unsplash and Openweather

  let weatherObj = await API.LocationWeather(keyword); // fucntion to pull weather data of locale from Openweather.org

  let photoObj = await API.LocationPic(keyword); // function to pull pic of locale from Unsplash.com along with photographer info (for crediting purposes)
  console.log(photoObj);
  // console.log(weatherObj);

  name.textContent = `${weatherObj.name}${
    weatherObj.state ? ", " + weatherObj.state : ""
  }${weatherObj.country == "US" ? "" : ", " + weatherObj.country}`;
  temp.textContent = `${Math.round(weatherObj.temp)} \u00B0F`;
  feel.textContent = `Feels like ${Math.round(weatherObj.feel)} \u00B0F with ${
    weatherObj.weather
  }`;
  icon.src = `http://openweathermap.org/img/wn/${weatherObj.icon}@2x.png`;
  humidity.textContent = `Humidity: ${weatherObj.humidity}%`;
  wind.textContent = `Wind Speed: ${Math.round(weatherObj.wind)} mph`;
  range.textContent = `A low of ${Math.round(
    weatherObj.min
  )} \u00B0F to a high of ${Math.round(weatherObj.max)} \u00B0F`;
  time.textContent = weatherObj.time;
  photographer.href = photoObj.link
  photographer.textContent = photoObj.photographer
}
