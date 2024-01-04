// script.js

const apiKey = '1bb551b4ccb612906a00963e2acfa03c'; // Replace with your OpenWeatherMap API key
const weatherContainer = document.getElementById('weatherContainer');
const iconContainer = document.getElementById('iconContainer');

async function getWeather() {
    const cityInput = document.getElementById('cityInput').value;
    if (!cityInput) {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
            displayWeatherIcon(data.weather[0].main);
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching weather data.');
    }
}

function displayWeather(data) {
    const weatherInfo = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${new Date(data.dt * 1000).toDateString()}</p>
        <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;

    weatherContainer.innerHTML = weatherInfo;
}
function displayWeatherIcon(weatherCondition) {
    // Clear existing icons
    iconContainer.innerHTML = '';

    // Create a new div element for the weather icon
    const iconDiv = document.createElement('div');
    iconDiv.setAttribute('icon', getIconName(weatherCondition));
    iconDiv.setAttribute('data-label', weatherCondition);

    // Create the specific HTML structure for each weather condition
    switch (getIconName(weatherCondition)) {
        case 'sunny':
            iconDiv.innerHTML = '<span class="sun"></span>';
            break;
        case 'cloudy':
            iconDiv.innerHTML = '<span class="cloud"></span><span class="cloud"></span>';
            break;
        case 'snowy':
            iconDiv.innerHTML = '<span class="snowman"></span><ul>' +
                Array.from({ length: 13 }, () => '<li></li>').join('') +
                '</ul>';
            break;
        case 'stormy':
            iconDiv.innerHTML = '<span class="cloud"></span><ul>' +
                Array.from({ length: 5 }, () => '<li></li>').join('') +
                '</ul>';
            break;
        case 'supermoon':
            iconDiv.innerHTML = '<span class="moon"></span><span class="meteor"></span>';
            break;
        default:
            break;
    }

    // Append the created icon to the iconContainer
    iconContainer.appendChild(iconDiv);
}


function getIconName(weatherCondition) {
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            return 'sunny';
        case 'clouds':
            return 'cloudy';
        case 'snow':
            return 'snowy';
        case 'rain':
        case 'thunderstorm':
            return 'stormy';
        default:
            return 'supermoon';
    }
}

// Call the getWeather function when the page loads or when needed
// For example, you can add an event listener to a button or a form
// document.getElementById('yourButtonId').addEventListener('click', getWeather);

// You can uncomment the above line and replace 'yourButtonId' with the actual ID of your button
// if you want to trigger the weather fetching when a button is clicked.
