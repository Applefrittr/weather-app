import * as elements from "./index.js";

// async function which pulls a landscape picture with the query target tag from unsplash.com
export async function LocationPic(query) {
  const picture = await fetch(
    `https://api.unsplash.com/search/photos?query=${
      query ? query : "new york"
    }&orientation=landscape&client_id=xHyBjjGOjpWTD91jlwrkDarW_bLp1zpMRCNS7qyE37k`,
    { mode: "cors" }
  );
  const picData = await picture.json();

  // Since our fetch request will return data on hundreds of photos with the query tag, pick one at random from the first 5
  const num = Math.floor(Math.random() * 5);
  const randomImg = picData.results[num];
  console.log(randomImg);
  // conditional to execute picture fade when a new query is searched.  The layered background elements use css-transition: opacity and class toggling
  // to give the fade effect between images
  if (elements.background1.classList.contains("active-bg")) {
    elements.background2.style.backgroundImage = `url(${randomImg.urls.regular}`;
    elements.background1.classList.toggle("active-bg");
    elements.background2.classList.toggle("active-bg");
  } else {
    elements.background1.style.backgroundImage = `url(${randomImg.urls.regular}`;
    elements.background2.classList.toggle("active-bg");
    elements.background1.classList.toggle("active-bg");
  }

  return {
    photographer: `${randomImg.user.first_name}${
      randomImg.user.last_name ? " " + randomImg.user.last_name : ""
    }`,
    link: randomImg.user.links.html,
  };
}

// async function that pulls weather and location info of the target query from openweather.org
export async function LocationWeather(query) {
  const key = "89241ba92f96e488e73448b0513d1f8b";

  // geo locate API call to openweather.org, to pull location info, specifically state and country
  const locale = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${
      query ? query : "new york"
    }&limit=1&appid=${key}`,
    { mode: "cors" }
  );

  const localeData = await locale.json();

  // weather API call to openweather.org, pull all relevent weather info as well as current time at query location
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${
      query ? query : "new york"
    }&units=imperial&appid=89241ba92f96e488e73448b0513d1f8b`,
    { mode: "cors" }
  );

  const weatherData = await weather.json();

  console.log(weatherData);

  const time = new Date((weatherData.dt + weatherData.timezone) * 1000)
    .toUTCString()
    .slice(0, 22);

  // Nightmode!  Pulls current time and sunrise - sunset data from API query to determine if night-mode applies.
  if (
    weatherData.dt < weatherData.sys.sunrise ||
    weatherData.dt > weatherData.sys.sunset
  ) {
    elements.searchElement.classList.add("night-mode");
    elements.weatherInfo.classList.add("night-mode");
    elements.footer.classList.add("night-mode");
  } else {
    elements.searchElement.classList.remove("night-mode");
    elements.weatherInfo.classList.remove("night-mode");
    elements.footer.classList.remove("night-mode");
  }

  // return an object which contains all info weather and location info to be displayed to the user
  return {
    icon: weatherData.weather[0].icon,
    weather: weatherData.weather[0].description,
    temp: weatherData.main.temp,
    feel: weatherData.main.feels_like,
    name: weatherData.name,
    wind: weatherData.wind.speed,
    humidity: weatherData.main.humidity,
    state: localeData[0].state ? localeData[0].state : null,
    country: localeData[0].country,
    min: weatherData.main.temp_min,
    max: weatherData.main.temp_max,
    time,
  };
}
