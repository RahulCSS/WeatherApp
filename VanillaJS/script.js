let searchBtn=document.querySelector("form");
let input = document.querySelector("input");
let locationData = document.querySelector("#location");
let icon = document.querySelector(".conditionIcon img");
let condition = document.querySelector("#condition");
let temp = document.querySelector("#temp");
let wind = document.querySelector("#wind");
let humidity = document.querySelector("#humidity");
let uvIndex = document.querySelector("#uvIndex");
let sunrise = document.querySelector("#sunrise");
let sunset = document.querySelector("#sunset");
let moonrise = document.querySelector("#moonrise");
let moonset = document.querySelector("#moonset");
let moonphase = document.querySelector("#moonphase");



searchBtn.addEventListener("submit",function(e){
    e.preventDefault();                         //To prevent default function of submit
    //console.log(e);
    let val = input.value;
    //console.log(val);
    getWeatherData(val);
})

function getWeatherData(val){
    let date;
    let apiKey="437767625d164962aee65008240905";
    let apiUrl1=`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${val}&aqi=no`;
    let apiUrl2=`http://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${val}&dt=${date}`;
    
    
    fetch(apiUrl1)                               // Fetch data from the first API endpoint
      .then(response => {
        if (!response.ok) {throw new Error('Network response was not ok');}
        return response.json();
      })
      .then(data1 => {
        console.log('Data from API 1:', data1);   // Process data from the first API
        date=data1.location.localtime.slice(0,10);
        //console.log(date);                        //Get date from api data
        locationData.innerText=data1.location.name;
        let imgSrc = data1.current.condition.icon;
        icon.src = "https:"+imgSrc;
        condition.innerText=data1.current.condition.text;
        temp.innerText=data1.current.temp_c+"°C";
        wind.innerText=data1.current.wind_kph+"kmph";
        humidity.innerText=data1.current.humidity+"%";
        uvIndex.innerText=data1.current.uv;
        return fetch(apiUrl2);                    // Fetch data from the second API endpoint
      })
      .then(response => {
        if (!response.ok) {throw new Error('Network response was not ok');}
        return response.json();
      })
      .then(data2 => {
        console.log('Data from API 2:', data2);   // Process data from the second API
        sunrise.innerText=data2.astronomy.astro.sunrise;
        sunset.innerText=data2.astronomy.astro.sunset;
        moonrise.innerText=data2.astronomy.astro.moonrise;
        moonset.innerText=data2.astronomy.astro.moonset;
        moonphase.innerText=data2.astronomy.astro.moon_phase;
    })
      .catch(error => {
        alert("Sorry for the Inconvenience, please try again with correct spelling");
        console.error('Error:', error);
      });
}
