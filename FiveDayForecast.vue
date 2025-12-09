<template>
    <div class="forecast-container">
        <!--Title-->
       <h2>5-day Forecast</h2>
       
       <div v-if="forecast.length" === 0" class="empty">
    No forcecast data yet
    </div>
<div v-else class="forecast-list">
 <div 
 v-for="(day, index) in forecast"
 :key="index"
 class="forecast-card"
 >
<h3>{{ day.date }}</h3>
<p>{{ day.temperature }}</p>
<p>{{ day.description }}</p>
</div>   
</div>
</div>
</template>

<script>
export default {
name: "FiveDayForecast",
props: {
    forecast: {
     type: Array,
     required: true   
    }
}
};
</script>
