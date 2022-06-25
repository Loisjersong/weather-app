const search_btn = document.getElementById("search-btn");
const weatherCard = document.getElementById("weather-container");
const weather_input = document.getElementById("weather-input");
const city_span = document.getElementById("city");
const country_span = document.getElementById("country");
const weather_span = document.getElementById("weather");
const temperature_span = document.getElementById("temperature");
const img = document.getElementById("weather-img");
const err_msg = document.querySelector(".error-msg");
const content = document.getElementById("content");

img.style.display = "none";

const getWeather = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c93b4a8b109c5f02f069ab08ba9f3de1`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.cod);
    if (data.cod == 404) {
        err_msg.style.display = "block";
        err_msg.innerHTML = "Not found";
        content.style.display = "none";
        return;
    }

    createWeatherDetails(data);
};

const createWeatherDetails = (data) => {
    const weatherStatus = data.weather[0].description;
    const weatherTemp = Math.round(data.main.temp);
    const cityName = data.name;
    const country = data.sys.country;
    err_msg.style.display = "none";
    content.style.display = "block";

    if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
        img.src = "./assets/imgs/thunderstorms-line.svg";
    } else if (data.weather[0].id >= 300 && data.weather[0].id <= 321) {
        img.src = "./assets/imgs/drizzle-line.svg";
    } else if (data.weather[0].id >= 500 && data.weather[0].id <= 504) {
        img.src = "./assets/imgs/rainy-line.svg";
    } else if (data.weather[0].id == 511) {
        img.src = "./assets/imgs/snowy-line.svg";
    } else if (data.weather[0].id >= 520 && data.weather[0].id <= 531) {
        img.src = "./assets/imgs/drizzle-line.svg";
    } else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
        img.src = "./assets/imgs/snowy-line.svg";
    } else if (data.weather[0].id >= 701 && data.weather[0].id <= 781) {
        img.src = "./assets/imgs/mist-line.svg";
    } else if (data.weather[0].id == 800) {
        img.src = "./assets/imgs/sun-line.svg";
    } else if (data.weather[0].id == 801) {
        img.src = "./assets/imgs/sun-cloudy-line.svg";
    } else if (data.weather[0].id == 802) {
        img.src = "./assets/imgs/cloudy-line.svg";
    } else if (data.weather[0].id == 803 || data.weather[0].id == 804) {
        img.src = "./assets/imgs/cloudy-2-line.svg";
    }

    img.style.display = "block";
    city_span.innerHTML = cityName + ", ";
    country_span.innerHTML = country;
    weather_span.innerHTML = weatherStatus + ", ";
    temperature_span.innerHTML = weatherTemp + "&#176;C";
};

search_btn.addEventListener("click", () => {
    getWeather(weather_input.value);
});

weather_input.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
        getWeather(weather_input.value);
    }
});
