const API_KEY = "4ead98d2b0453d9b8b1a58c32bdcbc63";

export default {
  async getCoords(city) {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    return response.json();
  },

  async getWeather(lat, lon) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
    );
    return response.json();
  },

  async getForecast(lat, lon) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
    );
    return response.json();
  }
};
