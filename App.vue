<!--Name: Tracey Sanders
Date: 12/3/2025
Project: Weather App
Professor:
Class:-->

<template>
  <div>
    <!--Name of app-->
    <div :class="weatherBackground">
    <h1>Weather App</h1>

    <!--Box for city name-->
    <input
      v-model="city"
      @keyup.enter="getWeather"
      placeholder="Enter city"
    />

    <!--Saved location button-->
    <button v-if="weather" @click="saveLocation">Save Location</button>


    <!--Button for weather search-->
    <button @click="getWeather">Search</button>

    <!--Display error messages-->
    <p v-if="error">{{ error }}</p>

    <!--Show weather information-->
    <div v-if="weather">
      <h2>{{ weather.name }}</h2>
      <p>Temperature: {{ weather.main.temp }}°F</p>
      <p>Condition: {{ weather.weather[0].description }}</p>
    </div>

    <!--5-day forecast-->
    <div v-if="forecast.length">
      <h3>5-Day Forecast</h3>
      <ul>
        <li v-for="(day, index) in forecast" :key="index">
          {{ day.dt_txt }} — {{ day.main.temp }}°F
        </li>
      </ul>

      <!-- Saved Location-->
<div v-if="savedLocations.length">
  <h3>Saved Locations</h3>
  <ul>
    <li v-for="(city, index) in savedLocations" :key="index">
      <span @click="loadLocation(city)" style="cursor:pointer; text-decoration:underline;">
        {{ city }}
      </span>
      <button @click="removeLocation(index)">Remove</button>
    </li>
  </ul>
</div>

      <!--Line Chart-->
      <canvas id="tempChart" width="400" height="200"></canvas>
    </div>
    </div>
  </div>
</template>

<script>
import { Chart } from "chart.js/auto";

export default {
  data() {
    return {
      city: "",
      API_KEY: "4ead98d2b0453d9b8b1a58c32bdcbc63",
      weather: null,
      forecast: [],
      error: "",
      chartInstance: null,
      savedLocations: JSON.parse(localStorage.getItem("savedLocations")) || []
    };
  },
  



  computed: {
    weatherBackground() {
      if (!this.weather) return "default-bg";

      const condition = this.weather.weather[0].main.toLowerCase();

      if (condition.includes("rain")) return "rain-bg";
      if (condition.includes("cloud")) return "cloud-bg";
      if (condition.includes("clear")) return "sunny-bg";

      return "default-bg";
    }
  },

  
  methods: {
    async getWeather() {
      this.error = "";

      try {
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.API_KEY}`
        );
        const geo = await geoRes.json();

        if (!geo.length) {
          this.error = "City not found";
          return;
        }

        const { lat, lon } = geo[0];

        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${this.API_KEY}`
        );
        this.weather = await weatherRes.json();

        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${this.API_KEY}`
        );
        const forecastData = await forecastRes.json();


        this.forecast = forecastData.list.filter((_, i) => i % 8 === 0);

       
        this.$nextTick(() => {
          this.drawChart();
        });

      } catch (err) {
        this.error = "Something went wrong";
      }
    },

    drawChart() {
      const ctx = document.getElementById("tempChart");

      if (!ctx) return;

      
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const labels = this.forecast.map(day => day.dt_txt.split(" ")[0]);
      const temps = this.forecast.map(day => day.main.temp);

      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Temperature (°F)",
              data: temps,
              borderWidth: 2
            }
          ]
        }
      });
    },
    saveLocation() {
      if (!this.weather || !this.weather.name) return;

      const name = this.weather.name;

      if (!this.savedLocations.includes(name)) {
        this.savedLocations.push(name);
        localStorage.setItem("savedLocations", JSON.stringify(this.savedLocations));
      }
    },

    loadLocation(city) {
      this.city = city;
      this.getWeather();
    },

    removeLocation(index) {
      this.savedLocations.splice(index, 1);
      localStorage.setItem("savedLocations", JSON.stringify(this.savedLocations));
    }
  }
};
</script>




<style>

/* Title */

body {
  margin: 0;
  background: black;
  padding: 20px;
}

h1 {
  text-align: center;
  font-family: 'Times New Roman', Times, serif;
  font-size: 50px;
  font-weight: bold;
  color: pink;
}

input {
width: 100%;
box-sizing: border-box;
border-radius: 30px;
padding: 5px;
}

/* Text Placeholder */
input::placeholder {
color: black;
}

button {
  width: 100%;
  color: black;
  background: pink;
  border: none;
  font-family: 'Times New Roman', Times, serif;
  font-size: 1rem;
  border-radius: 30px;
}

ul {
  list-style: none;
  padding: 15px;
}

.sunny-bg {
background-image: url('@/assets/sunny.jpg');
background-size: cover;
min-height: 100vh;
}

.rain-bg {
  background-image: url('@/assets/rain.jpg');
  background-size: cover;
min-height: 100vh;
}


</style>
