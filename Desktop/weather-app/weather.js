const apiKey = '62437d3e581c40aab99775e353f9c4f0';
const searchCity = document.querySelector('.city');

localisationCity();

function checkweather(apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const description = data.list[0].weather[0].description;
      updateWeatherImage(description);
      // Current day weather
      document.getElementById('localisation').innerHTML = data.city.name;
      document.getElementById('temperature').innerHTML = data.list[0].main.temp + '°C';
      document.getElementById('etat').innerHTML = description;
      document.getElementById('Humiditi').innerHTML = data.list[0].main.humidity + '%';
      document.getElementById('sped').innerHTML = data.list[0].wind.speed + ' km/s';
      document.getElementById('date').innerHTML = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      // Next days weather
      const dayElements = [
        { temp: 'temp', day: 'day' },
        { temp: 'temp-2', day: 'day-2' },
        { temp: 'temp-3', day: 'day-3' },
        { temp: 'temp-4', day: 'day-4' },
      ];

      for (let i = 0; i < dayElements.length; i++) {
        // Each day corresponds to roughly 8 intervals (24 hours / 3 hours per interval)
        const index = (i + 1) * 8; // 8 intervals per day
        const weatherData = data.list[index];

        if (weatherData) {
          const date = new Date(weatherData.dt * 1000); // Convert Unix timestamp to milliseconds
          document.getElementById(dayElements[i].temp).innerHTML = weatherData.main.temp + '°C';
          document.getElementById(dayElements[i].day).innerHTML = date.toLocaleDateString('en-GB', {
            weekday: 'long', 
            day: 'numeric',
            month: 'long',
          });
        }
      }
    });
}
function updateWeatherImage(description) {
    const weatherImage = document.getElementsByClassName('weatherImage');
    if (description.includes('clear')) {
        weatherImage.src = '/images/animated/day.svg';
    } else if (description.includes('clouds')) {
        weatherImage.src = '/images/animated/cloudy-day-1.svg';
    } else if (description.includes('rain')) {
        weatherImage.src = '/images/animated/rainy-1.svg';
    } else if (description.includes('snow')) {
        weatherImage.src = '/images/animated/snowy-2.svg';
    } else {
        weatherImage.src = 'images/default.png';
    }
}

function resarchCity() {
  const city = document.getElementById('city').value;
  console.log(city);

  const apiUrl =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    city +
    '&appid=' +
    apiKey +
    '&units=metric';
  console.log(apiUrl);
  checkweather(apiUrl);
}

function localisationCity() {
  let lon, lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      checkweather(
        'https://api.openweathermap.org/data/2.5/forecast?lat=' +
          lat +
          '&lon=' +
          lon +
          '&appid=' +
          apiKey +
          '&units=metric'
      );
    });
  }
}

document.getElementById('search-Btn').addEventListener('click', () => {
  resarchCity();
});
