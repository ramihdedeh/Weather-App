const form = document.getElementById('location-form');
const loadingDiv = document.getElementById('loading');
const weatherInfoDiv = document.getElementById('weather-info');
const weatherDataPara = document.getElementById('weather-data');

const API_KEY = 'KLA46HUD48VNLB5FSCEJ9GFEX';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

async function fetchWeather(location) {
    try {
        const response = await fetch(`${BASE_URL}${location}?key=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
function processWeatherData(data) {
    if (!data) {
        return 'Unable to fetch weather data. Please try again later.';
    }
    //The curly braces {} in this line are a destructuring syntax.
    //The goal is to extract specific properties from the data object and assign them to variables
    //with the same names as the property names.
    
    const { resolvedAddress, currentConditions } = data;
    const { temp, conditions, humidity, windspeed } = currentConditions;

    return `
        Location: ${resolvedAddress}
        Temperature: ${temp}°C
        Conditions: ${conditions}
        Humidity: ${humidity}%
        Windspeed: ${windspeed} km/h
    `;
}
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const location = document.getElementById('location').value.trim();
    if (!location) return;

    // Show loading spinner
    loadingDiv.classList.remove('hidden');
    weatherInfoDiv.classList.add('hidden');

    const weatherData = await fetchWeather(location);
    const processedData = processWeatherData(weatherData);

    // Hide loading spinner and display weather info
    loadingDiv.classList.add('hidden');
    weatherDataPara.textContent = processedData;
    weatherInfoDiv.classList.remove('hidden');
});
