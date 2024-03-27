console.log("Weather App in JS")

const getWeather = async ()=>{
    const location = document.getElementById("location").value
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Ctempmax%2Ctempmin%2Ctemp%2Cwindspeed%2Csunrise%2Csunset%2Cconditions%2Cicon&include=current&key=JZQLWZY3XZHH8ZN8QH7AZNX62&contentType=json`

    let response = await fetch(url)
    let res = await response.json()
    return res
}

const mainFunc = async ()=>{
    let weather = await getWeather()
    console.log(weather)
    let weatherElement = document.getElementsByClassName("weather")[0]
    weatherElement.style.display = "block"
    document.getElementsByClassName("description")[0].style.display = "none"
    document.getElementsByClassName("others")[0].style.display = "block"
    weatherElement.innerHTML = weather.currentConditions.temp+"  &deg;C,  " + weather.currentConditions.conditions
    document.getElementsByClassName("address")[0].innerHTML = weather.resolvedAddress
    console.log(weather.resolvedAddress)
    const icon = weather.currentConditions.icon
    document.body.style.backgroundImage = `url(images/${icon}.jpg)`
    document.getElementsByClassName("container")[0].style.backgroundImage = `url(images/${icon}1.jpg)`
    document.getElementsByClassName("temp-max-text")[0].innerHTML = weather.days[0].tempmax+ "  &deg;C"
    document.getElementsByClassName("temp-min-text")[0].innerHTML = weather.days[0].tempmin+ "  &deg;C"
    document.getElementsByClassName("windspeed-text")[0].innerHTML = weather.currentConditions.windspeed+ "  km/h"
    document.getElementsByClassName("sunrise-time-text")[0].innerHTML = Number.parseInt(weather.currentConditions.sunrise.slice(0,2))+":"+Number.parseInt(weather.currentConditions.sunrise.slice(3,5))+ "  AM"
    document.getElementsByClassName("sunset-time-text")[0].innerHTML =  Number.parseInt(weather.currentConditions.sunset.slice(0,2))-12+":"+Number.parseInt(weather.currentConditions.sunset.slice(3,5))+ "  PM"
}

document.getElementById("submit").addEventListener("click",mainFunc)

