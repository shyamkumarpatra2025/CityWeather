// Step 1: Select the HTML elements we need to interact with
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');

// Replace this with your actual Weather API key
const API_KEY = '8fad3236ae894836b5b62458262709'; 

// Step 2: Add an "event listener" to the button. 
// This tells the browser to run the function whenever the button is clicked.
searchBtn.addEventListener('click', function() {
    
    // Get the text the user typed into the input box
    const cityName = cityInput.value;

    // Check if the input is empty. If it is, alert the user and stop.
    if (cityName === '') {
        alert('Please enter a city name!');
        return; 
    }

    // Show a loading message while we fetch the data
    weatherResult.innerHTML = '<p>Loading...</p>';

    // Step 3: Create the API URL using the city name and your API key
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`;

    // Step 4: Use the Fetch API to get data from the internet
    fetch(apiUrl)
        .then(function(response) {
            // Check if the response was successful (status 200)
            if (!response.ok) {
                // If not okay (e.g., city not found), throw an error to jump to the .catch block below
                throw new Error('City not found or API error');
            }
            // Convert the response into JSON format so JavaScript can understand it
            return response.json();
        })
        .then(function(data) {
            // Step 5: Extract the data we want from the JSON object
            const locationName = data.location.name;
            const countryName = data.location.country;
            const temperatureC = data.current.temp_c;
            const conditionText = data.current.condition.text;
            const iconUrl = data.current.condition.icon; // Weather icon URL

            // Step 6: Update the HTML to display the weather
            weatherResult.innerHTML = `
                <h2>${locationName}, ${countryName}</h2>
                <img src="https:${iconUrl}" alt="Weather icon">
                <p class="temperature">${temperatureC}°C</p>
                <p>${conditionText}</p>
            `;
        })
        .catch(function(error) {
            // Step 7: Handle any errors (like spelling the city wrong)
            console.error(error); // Log it for debugging
            weatherResult.innerHTML = `<p style="color: red;">Oops! We couldn't find weather for that location.</p>`;
        });
});