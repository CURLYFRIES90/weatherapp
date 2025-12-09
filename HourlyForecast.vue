<template>
    <div class="hourly-container">
      <!-- Title -->
      <h2>Hourly Forecast</h2>
  
      <!-- Chart -->
      <canvas ref="hourlyChart" class="hourly-chart"></canvas>
  
      <!-- If no data -->
      <div v-if="hours.length === 0" class="empty">
        No hourly data yet
      </div>
  
      <!-- Hourly cards -->
      <div v-else class="hour-list">
        <div 
          v-for="(hour, index) in hours" 
          :key="index" 
          class="hour-card"
        >
          <p class="time">{{ hour.time }}</p>
          <p class="temp">{{ hour.temperature }}°</p>
          <p class="desc">{{ hour.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Chart } from "chart.js/auto";
  
  export default {
    name: "HourlyForecast",
  
  
    props: {
      hours: {
        type: Array,
        required: true
      }
    },
  
    watch: {
     
      hours() {
        this.drawChart();
      }
    },
  
    mounted() {
   
      this.drawChart();
    },
  
    methods: {
      drawChart() {
       
        if (!this.hours || this.hours.length === 0) return;
  
        
        const limitedHours = this.hours.slice(0, 15);
  
        
        const labels = limitedHours.map(h => h.time);
  
       
        const temps = limitedHours.map(h => h.temperature);
  
        
        new Chart(this.$refs.hourlyChart, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Hourly Temp (°F)",
                data: temps,
                borderWidth: 2
              }
            ]
          }
        });
      }
    }
  };
  </script>
  