// capturar elementos del dom

const container = document.querySelector('#container')
const searchForm = document.querySelector('#search_submit')
const searchInput = document.querySelector('#search_input')
const temperaturaDegrees = document.querySelector('#degreenumber')
const temperaturaDescription = document.querySelector('#description')
const timeZone = document.querySelector('#timezone')
const date = document.querySelector('#date')
const min = document.querySelector('#min')
const max = document.querySelector('#max')

function displayBackgroundImage(data){
    // extraer hora y definir el background image
    let horaDelDia =  new Date(data.list[0].dt*1000).getHours()
    
    if (horaDelDia >= 21 && horaDelDia < 6){
        container.classList.remove("day")
        container.classList.add("night")
    } else{
        container.classList.remove("night")
        container.classList.add("day")
    }
}

function displayData(data){
    //temperatura maxima
    let tempeMaxima = data.list[0].main.temp_max
    tempeMaxima = parseInt(tempeMaxima)
    max.textContent = `${tempeMaxima} ºC`
    // temperatura minima
    let tempeMininma = data.list[0].main.temp_min
    tempeMininma = parseInt(tempeMininma)
    min.textContent = `${tempeMininma} ºC`
    // temperatura actuales
    let tempeActual = data.list[0].main.temp
    tempeActual = parseInt(tempeActual)
    temperaturaDegrees.textContent = tempeActual
    // Descripcion del clima
    let tempDescrip = data.list[0].weather[0].description
    tempDescrip = tempDescrip.charAt(0).toUpperCase() + tempDescrip.slice(1)
    temperaturaDescription.textContent = tempDescrip
    // Ciudad buscada
    let ciudadBuscada = data.list[0].name
    timeZone.textContent = ciudadBuscada
    // Extraer fecha y ponerla en el dom
    let fechaDelDia = new Date(data.list[0].dt*1000).toLocaleString("es-ES",{
        timeStyle: "short",
        dateStyle: "long"
    })
    date.textContent = fechaDelDia

}


const getWeatherData = async(city) => {
    // fetch
    const response = await fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${city}&units=metric&lang=sp`, {
        "headers": {
            "x-rapidapi-key": "3a0ec9442amsh8e7d46575725c04p128530jsn1214d3bbf683",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
        }
    })
    const data = await response.json()
    console.log(data)
    // cambiar el fondo
    displayBackgroundImage(data)
    // mostrar resultados
    displayData(data)
}


searchForm.addEventListener("submit", e =>{
    e.preventDefault()
    getWeatherData(searchInput.value)
})

// Al cargar la pagina, que se cargue una ciudad

window.addEventListener('DOMContentLoaded', getWeatherData('Rio Cuarto'))