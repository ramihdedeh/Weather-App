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


// Create a random number of raindrops
const rainContainer = document.getElementById("rain");

function createRaindrops() {
    const numberOfRaindrops = 100; // Number of raindrops to generate

    for (let i = 0; i < numberOfRaindrops; i++) {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');

        // Randomize the starting position and speed of the raindrop
        const startPositionX = Math.random() * window.innerWidth; // Random X position
        const animationDuration = Math.random() * 2 + 3; // Duration between 3-5 seconds

        raindrop.style.left = `${startPositionX}px`;
        raindrop.style.animationDuration = `${animationDuration}s`;
        raindrop.style.animationDelay = `${Math.random() * 2}s`; // Random delay before start

        // Add the raindrop to the rain container
        rainContainer.appendChild(raindrop);
    }
}

// Call the function to create raindrops when the page loads
window.onload = createRaindrops;
