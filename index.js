const getDataForm = document.getElementById("getData");
const temp = document.getElementById("temp");
const isDayOrNight = document.getElementById("isDayOrNight");
const informationDiv = document.getElementById("information")
const latitudeInput = document.getElementById("lat")
const longitudeInput = document.getElementById("long")



//create elements
const latitude = document.createElement('p')
const longitude = document.createElement('p')
const apparentTemp = document.createElement('p')
const wind =document.createElement('p')
const rain = document.createElement('p')


//append Elements
informationDiv.appendChild(latitude)
informationDiv.appendChild(longitude)
informationDiv.appendChild(apparentTemp)
informationDiv.appendChild(wind)
informationDiv.appendChild(rain)


getDataForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log('submit')
    let lat = latitudeInput.value
    let long = longitudeInput.value
    const weatherData = await getWeatherData(lat, long);
    //upadate innerText
    let dayOrNight = (weatherData.current.is_day === 1) ? "Day" : "Night";
    temp.innerText = `Temp: ${weatherData.current.temperature_2m} °C`;
    apparentTemp.innerText = `Apparent_Temp: ${weatherData.current.apparent_temperature} °C`;
    isDayOrNight.innerText = `Is Day or Night: ${dayOrNight}`;
    wind.innerText = `Wind_Speed: ${weatherData.current.wind_speed_10m} km/h`;
    rain.innerText = `Rain: ${weatherData.current.rain} mm`;
    console.log(weatherData)
});



async function getWeatherData(lat,long) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,apparent_temperature,is_day,rain,wind_speed_10m`);
    const data = await response.json();
    console.log(response, data);
    
    // Return the data so it can be used in the event listener
    return data;
}