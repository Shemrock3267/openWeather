class Weather {
  constructor(city) {
    this.apiKey = "9bbdbbcd3c48399a02fb44681fa850f1";
    this.city = city;
  }

  // Fetch weather from API
  async fetchWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${
        this.apiKey
      }&units=metric`
    );

    const responseData = await response.json();

    return responseData;
  }

  // Change weather location
  changeLocation(city) {
    this.city = city;
  }
}
