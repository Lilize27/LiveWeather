const cityInput=document.querySelector('.city-input')
const searchBtn=document.querySelector('.search-btn')

const weatherInfoSection=document.querySelector('.weather-info')
const notFoundSection=document.querySelector('.not-found')
const searchCitySection=document.querySelector('.search-city')

const countryTxt=document.querySelector('.country-txt')
const tempTxt=document.querySelector('.temp-txt')
const conditionTxt=document.querySelector('.condition-txt')
const humidityTxt=document.querySelector('.humidity-value-txt')
const windValueTxt=document.querySelector('.wind-value-txt')
const weatherSummaryImg=document.querySelector('.weather-summary-image')
const currentDateTxt=document.querySelector('.current-date-txt')

const forecastItem=document.querySelector('.forecast-item-container')

const APIKey='7ea8e93a82795eb3f01171225bef07c1'

function getWeatherIcon(id){
   if (id<=232) return 'thunderstorm.svg'
   if (id<=321) return 'drizzle.svg'
   if (id<=531) return 'rain.svg'
   if (id<=622) return 'snow.svg'
   if (id<=781) return 'atmosphere.svg'
   if (id<=800) return 'clear.svg'
   else return 'clouds.svg'
   
}

searchBtn.addEventListener('click', () => {
    if(cityInput.value.trim()!=''){
        console.log(cityInput.value)
        cityInput.value=''
        cityInput.blur()
    }
    
    })

cityInput.addEventListener('keydown',(event)=>{
    if(event.key=='Enter'&& cityInput.value.trim() != ''){
        updateWeatherInfo(cityInput.value)
            cityInput.value=''
            cityInput.blur()
        
    }
})

async function getFetchData(endPoint, city){
    const APIURL = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${APIKey}&units=metric`;

const response=await fetch(APIURL)

return response.json()
}

function getCurrentDate(){
    const currDate=new Date()
    const options={
        weekday:'short',
        day:'2-digit',
        month:'short'
    }
    return currDate.toLocaleDateString('en-GB', options)
}

async function updateWeatherInfo(city){
    const weatherData=await getFetchData('weather',city)

    if(weatherData.cod != 200){
        showDisplaySection(notFoundSection)
        return
    }
    const{
        name:country,
        main:{temp,humidity},
        weather:[{id,main}],
        wind:{speed}
    }=weatherData

    countryTxt.textContent=country
    tempTxt.textContent=Math.round(temp)+'°C'
    conditionTxt.textContent=main
    humidityTxt.textContent=humidity+'%'
    windValueTxt.textContent=speed+'M/s'

    currentDateTxt.textContent=getCurrentDate()
    weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`

    await updateForecastInfo(city)
    showDisplaySection(weatherInfoSection)
}

async function updateForecastInfo(city){
    const forecastData=await getFetchData('forecast', city)

     const timeTaken='12:00:00'
    const todayDate=new Date().toISOString().split('T')[0]

     forecastItem.innerHTML=''
    forecastData.list.forEach(forecastWeather=>{
        if(forecastWeather.dt_txt.includes(timeTaken)&& !forecastWeather.dt_txt.includes(todayDate)){
            updateForecastItems(forecastWeather)
        }
    })

}

function updateForecastItems(weatherData){
 const{
    dt_txt:date,
    weather:[{id}],
    main:{temp}
 }=weatherData

const dateTaken=new Date(date)
const dateOptions={
    day:'2-digit',
    month:'short'
}
const dateResult=dateTaken.toLocaleDateString('en-US',dateOptions)

 const forecastItemDIV=`<div class="forecast-item">
                        <h5 class="forecast-item-date regular-txt">${dateResult}</h5>
                        <img src="assets/weather/${getWeatherIcon(id)}" alt="" class="forecast-item-img">
                        <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
                    </div>`
        forecastItem.insertAdjacentHTML('beforeend',forecastItemDIV)
}

function showDisplaySection(section){
[weatherInfoSection,searchCitySection,notFoundSection]
.forEach(section=>section.style.display='none')

section.style.display='flex'
}