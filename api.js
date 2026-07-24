/* ==========================================
   WEATHER APP - api.js
   Handles all API requests
========================================== */

"use strict";

/* ==========================================
   CONFIGURATION
========================================== */

const API_KEY = "YOUR_API_KEY";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

/* ==========================================
   FETCH CURRENT WEATHER
========================================== */

async function fetchCurrentWeather(city){

    try{

        const response = await fetch(

            `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`

        );

        if(!response.ok){

            throw new Error("City not found.");

        }

        return await response.json();

    }

    catch(error){

        console.error("Current Weather Error:", error);

        throw error;

    }

}

/* ==========================================
   FETCH 5-DAY FORECAST
========================================== */

async function fetchForecast(city){

    try{

        const response = await fetch(

            `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`

        );

        if(!response.ok){

            throw new Error("Forecast not available.");

        }

        return await response.json();

    }

    catch(error){

        console.error("Forecast Error:", error);

        throw error;

    }

}

/* ==========================================
   FETCH BY COORDINATES
========================================== */

async function fetchWeatherByLocation(latitude, longitude){

    try{

        const response = await fetch(

            `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`

        );

        if(!response.ok){

            throw new Error("Unable to fetch location weather.");

        }

        return await response.json();

    }

    catch(error){

        console.error("Location Error:", error);

        throw error;

    }

}

/* ==========================================
   FETCH FORECAST BY COORDINATES
========================================== */

async function fetchForecastByLocation(latitude, longitude){

    try{

        const response = await fetch(

            `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`

        );

        if(!response.ok){

            throw new Error("Unable to fetch forecast.");

        }

        return await response.json();

    }

    catch(error){

        console.error("Forecast Location Error:", error);

        throw error;

    }

}

/* ==========================================
   WEATHER ICON URL
========================================== */

function getWeatherIcon(iconCode){

    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

}
