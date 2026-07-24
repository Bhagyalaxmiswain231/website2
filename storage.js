
"use strict";

/* ==========================================
   STORAGE KEYS
========================================== */

const STORAGE_KEYS = {

    DEFAULT_CITY: "defaultCity",

    THEME: "theme",

    RECENT_SEARCHES: "recentSearches"

};

/* ==========================================
   DEFAULT SETTINGS
========================================== */

const DEFAULT_SETTINGS = {

    city: "London",

    theme: "light",

    recentSearches: []

};

/* ==========================================
   SAVE DEFAULT CITY
========================================== */

function saveDefaultCity(city){

    localStorage.setItem(STORAGE_KEYS.DEFAULT_CITY, city);

}

/* ==========================================
   LOAD DEFAULT CITY
========================================== */

function loadDefaultCity(){

    return localStorage.getItem(STORAGE_KEYS.DEFAULT_CITY)
        || DEFAULT_SETTINGS.city;

}

/* ==========================================
   SAVE THEME
========================================== */

function saveTheme(theme){

    localStorage.setItem(STORAGE_KEYS.THEME, theme);

}

/* ==========================================
   LOAD THEME
========================================== */

function loadTheme(){

    return localStorage.getItem(STORAGE_KEYS.THEME)
        || DEFAULT_SETTINGS.theme;

}

/* ==========================================
   SAVE RECENT SEARCHES
========================================== */

function saveRecentSearch(city){

    let searches = loadRecentSearches();

    /* Remove duplicate city */

    searches = searches.filter(

        item => item.toLowerCase() !== city.toLowerCase()

    );

    /* Add latest search */

    searches.unshift(city);

    /* Keep only latest 5 */

    searches = searches.slice(0,5);

    localStorage.setItem(

        STORAGE_KEYS.RECENT_SEARCHES,

        JSON.stringify(searches)

    );

}

/* ==========================================
   LOAD RECENT SEARCHES
========================================== */

function loadRecentSearches(){

    const data = localStorage.getItem(

        STORAGE_KEYS.RECENT_SEARCHES

    );

    return data ? JSON.parse(data) : [];

}

/* ==========================================
   CLEAR ALL STORAGE
========================================== */

function clearPreferences(){

    localStorage.removeItem(STORAGE_KEYS.DEFAULT_CITY);

    localStorage.removeItem(STORAGE_KEYS.THEME);

    localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);

}

/* ==========================================
   LOAD ALL SETTINGS
========================================== */

function loadSettings(){

    return{

        city: loadDefaultCity(),

        theme: loadTheme(),

        recentSearches: loadRecentSearches()

    };

}

/* ==========================================
   SAVE SETTINGS
========================================== */

function saveSettings(settings){

    if(settings.city){

        saveDefaultCity(settings.city);

    }

    if(settings.theme){

        saveTheme(settings.theme);

    }

}

/* ==========================================
   DEBUG
========================================== */

console.log("Local Storage Ready");
