import "./style.css";
import * as API from "./api-data.js";

const searchValue = document.querySelector("#search");
const btn = document.querySelector("button");

export const background1 = document.querySelector(".background1");
export const background2 = document.querySelector(".background2");

const name = document.querySelector("#name");
const temp = document.querySelector("#temp");
const feel = document.querySelector("#feel");
const icon = document.querySelector("#icon");
const iconDescription = document.querySelector("#icon-descrip");

background1.style.backgroundImage =
  "url(https://images.unsplash.com/photo-1475522003475-eb5f96f1f930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzQ5NDB8MHwxfHNlYXJjaHw4fHxjYWxpZm9ybmlhfGVufDB8fHx8MTY2NjYzNTI3MA&ixlib=rb-4.0.3&q=80&w=1080)";

btn.addEventListener("click", Location);

// our async function executed when the user searches a new city.  The Unsplash API is used to retrieve a tagged picture of the searched city
// and the Open Weather API is used to retrieve weather data
async function Location() {
  let keyword = searchValue.value;

  API.LocationPic(keyword);  // function to pull pic of locale from unsplash.com

  let weatherObj = await API.LocationWeather(keyword); // fucntion to pull weather data of locale from openweather.org

  console.log(weatherObj);

  name.textContent = `${weatherObj.name}${weatherObj.state ?', ' + weatherObj.state : ''}${weatherObj.country == 'US' ? '' :', ' + weatherObj.country}`;
  temp.textContent = `${Math.floor(weatherObj.temp)} \u00B0F`
  feel.textContent = `Feels like: ${Math.floor(weatherObj.feel)} \u00B0F`
  icon.src = `http://openweathermap.org/img/wn/${weatherObj.icon}@2x.png`;
}
