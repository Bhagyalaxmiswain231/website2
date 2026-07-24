/* ==========================================
   WEATHER APP - app.js
   Main Application
========================================== */

"use strict";

/* ==========================================
   DOM ELEMENTS
========================================== */

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const locationBtn = document.getElementById("locationBtn");

const loader = document.getElementById("loader");
const errorMessage = document.getElementById("errorMessage");

const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");

const forecastContainer =
document.getElementById("forecastContainer");

/* ==========================================
   LOADING FUNCTIONS
========================================== */

function showLoader(){

    loader.classList.remove("hidden");

}

function hideLoader(){

    loader.classList.add("hidden");

}

/* ==========================================
   ERROR HANDLING
========================================== */

function showError(message){

    errorMessage.textContent = message;

    errorMessage.classList.remove("hidden");

}

function hideError(){

    errorMessage.classList.add("hidden");

    errorMessage.textContent = "";

}

/* ==========================================
   DISPLAY CURRENT WEATHER
========================================== */

function displayCurrentWeather(data){

    weatherCard.classList.remove("hidden");

    cityName.textContent =

        `${data.name}, ${data.sys.country}`;

    temperature.textContent =

        `${Math.round(data.main.temp)}°C`;

    description.textContent =

        data.weather[0].description;

    humidity.textContent =

        data.main.humidity;

    windSpeed.textContent =

        data.wind.speed;

    weatherIcon.src =

        getWeatherIcon(data.weather[0].icon);

    weatherIcon.alt =

        data.weather[0].description;

}

function clearForecast(){

    forecastContainer.innerHTML = "";

}


searchForm.addEventListener(

"submit",

function(event){

    event.preventDefault();

});

locationBtn.addEventListener(

"click",

function(){

    console.log("Location Button Clicked");

});

console.log("Weather App Started");


function displayForecast(data){

    clearForecast();

    /* OpenWeatherMap returns data every 3 hours.
       We display one forecast per day (around 12:00 PM). */

    const dailyForecast = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    dailyForecast.forEach(day => {

        const forecastCard = document.createElement("div");

        forecastCard.className = "forecast-card";

        const date = new Date(day.dt_txt);

        forecastCard.innerHTML = `

            <h3>${date.toLocaleDateString("en-US",{
                weekday:"short"
            })}</h3>

            <img
                src="${getWeatherIcon(day.weather[0].icon)}"
                alt="${day.weather[0].description}">

            <p class="temp">

                ${Math.round(day.main.temp)}°C

            </p>

            <p>

                ${day.weather[0].description}

            </p>

            <p>

                💧 ${day.main.humidity}%

            </p>

        `;

        forecastContainer.appendChild(forecastCard);

    });

}

/* ==========================================
   SEARCH WEATHER
========================================== */

async function searchWeather(city){

    try{

        hideError();

        showLoader();

        weatherCard.classList.add("hidden");

        clearForecast();

        /* Fetch current weather */

        const currentWeather =

            await fetchCurrentWeather(city);

        displayCurrentWeather(currentWeather);

        /* Fetch forecast */

        const forecast =

            await fetchForecast(city);

        displayForecast(forecast);

        /* Save city */

        saveDefaultCity(city);

        saveRecentSearch(city);

    }

    catch(error){

        showError(error.message);

    }

    finally{

        hideLoader();

    }

}

/* ==========================================
   SEARCH FORM
========================================== */

searchForm.addEventListener(

"submit",

function(event){

    event.preventDefault();

    const city = cityInput.value.trim();

    if(city===""){

        showError("Please enter a city name.");

        return;

    }

    searchWeather(city);

});


async function getCurrentLocationWeather(latitude, longitude){

    try{

        hideError();

        showLoader();

        weatherCard.classList.add("hidden");

        clearForecast();

        const currentWeather =
            await fetchWeatherByLocation(latitude, longitude);

        displayCurrentWeather(currentWeather);

        const forecast =
            await fetchForecastByLocation(latitude, longitude);

        displayForecast(forecast);

        saveDefaultCity(currentWeather.name);

    }

    catch(error){

        showError(error.message);

    }

    finally{

        hideLoader();

    }

}


locationBtn.addEventListener("click", function(){

    if(!navigator.geolocation){

        showError("Geolocation is not supported by your browser.");

        return;

    }

    showLoader();

    navigator.geolocation.getCurrentPosition(

        function(position){

            const latitude = position.coords.latitude;

            const longitude = position.coords.longitude;

            getCurrentLocationWeather(latitude, longitude);

        },

        function(){

            hideLoader();

            showError("Unable to access your location.");

        }

    );

});


function loadRecentCities(){

    const recentCities = loadRecentSearches();

    console.log("Recent Searches:", recentCities);

}

/* ==========================================
   LOAD SAVED CITY
========================================== */

function loadSavedCity(){

    const city = loadDefaultCity();

    cityInput.value = city;

    searchWeather(city);

}


window.addEventListener("DOMContentLoaded", function(){

    loadSavedCity();

    loadRecentCities();

});


const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme){

    if(theme === "dark"){

        document.body.classList.add("dark-theme");

    }

    else{

        document.body.classList.remove("dark-theme");

    }

}

function toggleTheme(){

    const currentTheme = loadTheme();

    const newTheme = currentTheme === "dark"
        ? "light"
        : "dark";

    saveTheme(newTheme);

    applyTheme(newTheme);

}

if(themeToggle){

    themeToggle.addEventListener("click", toggleTheme);

}

applyTheme(loadTheme());

/* ==========================================
   ENTER KEY SEARCH
========================================== */

cityInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        event.preventDefault();

        searchForm.requestSubmit();

    }

});

/* ==========================================
   REFRESH WEATHER
========================================== */

function refreshWeather(){

    const city = loadDefaultCity();

    if(city){

        searchWeather(city);

    }

}

/* Refresh every 30 minutes */

setInterval(refreshWeather, 1800000);

/* ==========================================
   WINDOW ONLINE/OFFLINE STATUS
========================================== */

window.addEventListener("offline", function(){

    showError("You are offline. Please check your internet connection.");

});

window.addEventListener("online", function(){

    hideError();

    refreshWeather();

});

/* ==========================================
   FINAL INITIALIZATION
========================================== */

window.addEventListener("load", function(){

    console.log("Weather Forecast App Loaded Successfully!");

});

