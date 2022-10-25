import * as elements from "./index.js";

export async function LocationPic(query) {
  const picture = await fetch(
    `https://api.unsplash.com/search/photos?query=${
      query ? query : "new york"
    }&orientation=landscape&client_id=xHyBjjGOjpWTD91jlwrkDarW_bLp1zpMRCNS7qyE37k`,
    { mode: "cors" }
  );
  const picData = await picture.json();
  // conditional to execute picture fade when a new query is searched.  The layered background elements use css-transition: opacity and class toggling
  // to give the fade effect between images
  if (elements.background1.classList.contains("active-bg")) {
    elements.background2.style.backgroundImage = `url(${picData.results[0].urls.regular})`;
    elements.background1.classList.toggle("active-bg");
    elements.background2.classList.toggle("active-bg");
  } else {
    elements.background1.style.backgroundImage = `url(${picData.results[0].urls.regular})`;
    elements.background2.classList.toggle("active-bg");
    elements.background1.classList.toggle("active-bg");
  }
}

export async function LocationWeather(query) {
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${
      query ? query : "new york"
    }&units=imperial&appid=89241ba92f96e488e73448b0513d1f8b`,
    { mode: "cors" }
  );
  const locale = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${
      query ? query : "new york"
    }&limit=1&appid=89241ba92f96e488e73448b0513d1f8b`,
    { mode: "cors" }
  );
  const weatherData = await weather.json();
  const localeData = await locale.json();

  console.log(weatherData);
  console.log(localeData);

  return {
    icon: weatherData.weather[0].icon,
    weather: weatherData.weather[0].description,
    temp: weatherData.main.temp,
    feel: weatherData.main.feels_like,
    name: weatherData.name,
    wind: weatherData.wind.speed,
    humidity: weatherData.main.humidity,
    state: localeData[0].state ? localeData[0].state : null,
    country: localeData[0].country
  };
}
