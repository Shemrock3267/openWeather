// Init storage
const storage = new Storage();

// Get stored location data
const weatherLocation = storage.getLocationData();

// Init weather object
const weather = new Weather(weatherLocation.city);

// Init UI
const ui = new UI();

// Get weather on DOM load
document.addEventListener("DOMContentLoaded", getWeather);

// Change location event
document.getElementById("w-change-btn").addEventListener("click", e => {
  showResult();
});

// Eventlistener for hitting 'Enter'
const enterKey = document.querySelector("#city");
enterKey.addEventListener("keydown", e => {
  if (e.keyCode === 13) {
    showResult();
  }
});

function showResult() {
  const city = document.getElementById("city").value;
  // Clear input field for a new search
  $("#locModal")
    .find("#city")
    .val("");

  // Change location
  weather.changeLocation(city);

  // Set location in LS
  storage.setLocationData(city);

  // Get and display weather
  getWeather();

  // Close Modal  - only with jquery because of bootstrap (dependat on jquery)
  $("#locModal").modal("hide");
}

function getWeather() {
  ui.showPreloader();
  weather
    .fetchWeather()
    .then(results => {
      ui.hidePreloader();
      ui.paint(results);
    })
    .catch(err => {
      ui.hidePreloader();
      ui.showError();
    });
}
