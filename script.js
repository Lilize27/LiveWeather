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

const APIKey='7ea8e93a82795eb3f01171225bef07c1'

function getWeatherIcon(id){

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

    weatherSummaryImg.src='assets/weather/${getWeatherIcon(id)}'

    showDisplaySection(weatherInfoSection)
}

function showDisplaySection(section){
[weatherInfoSection,searchCitySection,notFoundSection]
.forEach(section=>section.style.display='none')

section.style.display='flex'
}