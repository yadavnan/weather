import './style.css';

const form = document.getElementById('weather-form');
const locationInput = document.getElementById('location');
const weatherInfo = document.getElementById('weather-info');
const loading = document.getElementById('loading');
const cityName = document.getElementById('city-name');
const tempElement = document.getElementById('temp');
const conditionElement = document.getElementById('condition');
const humidityElement = document.getElementById('humidity');
const weatherGif = document.getElementById('weather-gif');

// API keys from .env file
const weatherApiKey = import.meta.env.VITE_API_KEY; // OpenWeatherMap API Key
const giphyApiKey = import.meta.env.VITE_GIPHY_API_KEY; // Giphy API Key

// Base URL for OpenWeatherMap
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Fetch weather data
async function getWeather(location) {
  try {
    const response = await fetch(
      `${weatherBaseUrl}?q=${location}&units=metric&appid=${weatherApiKey}`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      alert('Location not found!');
      return;
    }

    // Extract relevant data
    const temperature = data.main.temp;
    const condition = data.weather[0].description;
    const humidity = data.main.humidity;
    const city = data.name;

    // Update UI with weather data
    cityName.textContent = city;
    tempElement.textContent = `${temperature}°C`;
    conditionElement.textContent = condition;
    humidityElement.textContent = `${humidity}%`;

    // Hide loading spinner and show weather info
    loading.classList.add('hidden');
    weatherInfo.classList.remove('hidden');

    // Fetch and display a weather-related GIF
    displayWeatherGif(condition);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('An error occurred while fetching the weather data');
  }
}

// Fetch and display a GIF related to the weather condition
async function displayWeatherGif(condition) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${condition}&limit=1`
    );
    const data = await response.json();

    if (data.data.length > 0) {
      const gifUrl = data.data[0].images.fixed_height.url;
      weatherGif.innerHTML = `<img src="${gifUrl}" alt="${condition} gif" />`;
    } else {
      weatherGif.innerHTML = `<p>No GIF available for "${condition}"</p>`;
    }
  } catch (error) {
    console.error('Error fetching GIF:', error);
    weatherGif.innerHTML = `<p>Error loading GIF</p>`;
  }
}

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = locationInput.value.trim();

  if (location) {
    loading.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
    getWeather(location);
  }
});
