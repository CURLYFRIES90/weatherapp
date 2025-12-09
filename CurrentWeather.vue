<template>
    <div class="current-weather-card">
      <h2>Current Weather</h2>
  
      <!-- If no data yet, don't show anything -->
      <div v-if="weather">
        <h3>{{ weather.name }}</h3>
  
        <div class="weather-main">
          <img
            :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
            :alt="weather.weather[0].description"
          />
          <p class="temp">{{ Math.round(weather.main.temp) }}°F</p>
        </div>
  
        <p class="description">{{ weather.weather[0].description }}</p>
  
        <div class="details">
          <p>Humidity: {{ weather.main.humidity }}%</p>
          <p>Wind: {{ Math.round(weather.wind.speed) }} mph</p>
        </div>
  
        <!-- Save Button Sends City Name Back to App.vue -->
        <button class="save-btn" @click="saveLocation">
          Save Location
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CurrentWeather",
  
    props: {
      weather: {
        type: Object,
        required: true
      }
    },
  
    methods: {
      saveLocation() {
        // Emit city name back to App.vue to save
        this.$emit("save", this.weather.name);
      }
    }
  };
  </script>
  
  
   