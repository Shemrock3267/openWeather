class UI {
  constructor() {
    this.location = document.getElementById("w-location");
    this.desc = document.getElementById("w-desc");
    this.string = document.getElementById("w-string");
    this.icon = document.getElementById("w-icon");
    this.humidity = document.getElementById("w-humidity");
    this.maxTemp = document.getElementById("w-maxtemp");
    this.pressure = document.getElementById("w-pressure");
    this.wind = document.getElementById("w-wind");
    this.preloader = document.getElementsByClassName("preloader");
    this.error = document.getElementsByClassName("connectionError");

    document.body.addEventListener("click", e => {
      const target = e.target;

      switch (target.id) {
        case "reload": {
          localStorage.clear();
          window.location.reload();
        }
      }
    });
  }

  paint(weather) {
    this.location.textContent = weather.name;
    this.desc.textContent = weather.weather[0].main;
    this.string.textContent = weather.main.temp + "℃";

    this.icon.setAttribute(
      "src",
      `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    );
    this.humidity.textContent = `Relative Humidity: ${weather.main.humidity} %`;
    this.maxTemp.textContent = `Maximum Temperature: ${
      weather.main.temp_max
    } ℃`;
    this.pressure.textContent = `Pressure Level: ${weather.main.pressure}`;
    this.wind.textContent = `Wind Speed: ${weather.wind.speed} m/s`;
  }

  getLoader() {
    const loaderId = "loader";
    let preloader = document.getElementById(loaderId);

    if (!preloader) {
      preloader = document.createElement("div");

      preloader.id = loaderId;
      preloader.innerHTML = `
      <div id="preloader">
        <img src="./img/weather-p.gif" />
      </div>
      `;
      document.body.appendChild(preloader);
    }

    return preloader;
  }

  showPreloader() {
    const preloader = this.getLoader();

    preloader.style.display = "block";
  }

  hidePreloader() {
    const preloader = this.getLoader();

    preloader.style.display = "none";
  }

  showError() {
    let errMarkUp = `
    <div class="utils__container">
      <div id="connectionError">
        <div>
          <img src="./img/error.png" />
        </div>
        <h2>An error occured</h2>
        <hr/>
        <ul>
          <li>You may have typed the city name wrong!</li>
          <li>Please check your Internet connection!</li>
        </ul>
        <div>
          <button id="reload">Back</button>
        </div> 
      </div>
    </div>
    `;
    document.getElementById("preloader").style.display = "none";
    document.body.innerHTML = errMarkUp;
    document.getElementById("connectionError").style.display = "block";
    document.getElementById("connectionError").style.textAlign = "center";
  }
}
