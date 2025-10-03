const API_Key = "1cd7c9f55df9068ade88ff0a453b8929"

const Searchbtn = document.getElementById("searchbtn");
const cityInput = document.getElementById("inputcity");
const weatherCard = document.getElementById("weather");
const Cityname = document.getElementById("city-name");
const Weather_icon = document.getElementById("weather-icon");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const errorMsg = document.getElementById("error");
Searchbtn.addEventListener("click" , () => {
    const city = cityInput.value.trim();
    if(city){
        getWeather(city);
    }
});
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`;
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("City not Found");
        }
        const data = await response.json();
        displayWeather(data);
    }catch(error){  
        showError(error.message);
    }
}

function displayWeather(data){
        errorMsg.classList.add("hidden");
        weatherCard.classList.remove("hidden");
        Cityname.textContent = `${data.name}, ${data.sys.country}`;
        description.textContent = data.weather[0].description;
        temperature.textContent = Math.round(data.main.temp);
        Weather_icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function  showError(message){
        weatherCard.classList.add("hidden");
        errorMsg.classList.remove("hidden");
        errorMsg.textContent = message;
}