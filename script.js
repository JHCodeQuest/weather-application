$(document).ready(function() {
    // Sample weather states
    const weatherData = [
        {
            temp: 22,
            description: "clear sky",
            location: "Sample City",
            iconClass: "fa-sun",
            bgGradient: "linear-gradient(to bottom, #fceabb, #f8b500)"
        },
        {
            temp: 18,
            description: "few clouds",
            location: "Sample City",
            iconClass: "fa-cloud-sun",
            bgGradient: "linear-gradient(to bottom, #d7d2cc, #304352)"
        },
        {
            temp: 15,
            description: "cloudy",
            location: "Sample City",
            iconClass: "fa-cloud",
            bgGradient: "linear-gradient(to bottom, #a1c4fd, #c2e9fb)"
        },
        {
            temp: 12,
            description: "rainy",
            location: "Sample City",
            iconClass: "fa-cloud-showers-heavy",
            bgGradient: "linear-gradient(to bottom, #4e54c8, #8f94fb)"
        },
        {
            temp: 8,
            description: "snow",
            location: "Sample City",
            iconClass: "fa-snowflake",
            bgGradient: "linear-gradient(to bottom, #e0eafc, #cfdef3)"
        },
        {
            temp: 20,
            description: "foggy",
            location: "Sample City",
            iconClass: "fa-smog",
            bgGradient: "linear-gradient(to bottom, #3e5151, #decba4)"
        }
    ];

    // Check if geolocation is supported
    if (navigator.geolocation) {
        $("#getLocationBtn").click(function() {
            // Get the current position (we will use sample data here)
            navigator.geolocation.getCurrentPosition(getWeather, showError);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    function getWeather(position) {
        // Randomly pick a sample weather state
        const randomIndex = Math.floor(Math.random() * weatherData.length);
        const data = weatherData[randomIndex];

        // Use the selected sample data
        const temp = data.temp;
        const description = data.description;
        const location = data.location;
        const iconClass = data.iconClass;
        const bgGradient = data.bgGradient;

        // Change background based on weather
        $("body").css("background", bgGradient);

        // Update the weather info on the page
        $("#weatherInfo").html(`
            <div class="weather-icon"><i class="fas ${iconClass}"></i></div>
            <h2>Weather in ${location}</h2>
            <p class="temp">${temp}°C</p>
            <p>${description}</p>
        `);
    }

    function showError(error) {
        let errorMessage = "";

        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                errorMessage = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                errorMessage = "An unknown error occurred.";
                break;
        }

        $("#weatherInfo").html(`<p>Error: ${errorMessage}</p>`);
    }
});