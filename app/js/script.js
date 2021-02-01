
// Selectors 

const $time = document.querySelector("#time")
const $ampm = document.querySelector("#ampm")
const day = document.querySelector("#day")
const date = document.querySelector("#date")
const year = document.querySelector("#year")
const main = document.querySelector('.main')
const greeting = document.querySelector('#greeting')
const morning = document.querySelector('.circle-morning')
const afternoon = document.querySelector('.circle-afternoon')
const evening = document.querySelector('.circle-evening')
const weather = document.querySelector('#weather')
const city = document.querySelector('#city')
const temp = document.querySelector('#temp')
const hideBtns = document.querySelectorAll(".will-hide")
const overlay = document.querySelector('.main-overlay')



// !Event Listeners

window.addEventListener('load', showWeather)
// let getTime = setInterval(() => showCurrentTime(), 1000);
// let getDate = setInterval(() => showCurrentDate(), 1000);

window.addEventListener('load', changeBackground)



// !Fetching APIs

async function getCityCode(city){
    const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Vb1TkVOlVB5OhYJE6kzYMXXYtBXjUeKj&q=${city}`)

    const data = await response.json()

    let code = data[0].Key
    let cityName = data[0].EnglishName
    localStorage.setItem('cityData', JSON.stringify(data))
    localStorage.setItem('cityCode', code)
    localStorage.setItem('cityName', cityName)
    
    // console.log(localStorage)
    return code
  
}


async function getWeather(){
   

    let code = localStorage.getItem('cityCode')
    if (code){
        cityCode = code
    } else {
        cityCode = '264884' // valenzuela as default
    }
    
    const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityCode}?apikey=Vb1TkVOlVB5OhYJE6kzYMXXYtBXjUeKj`)
    const data = await response.json()

    localStorage.setItem('weather', JSON.stringify(data))
    return data
    
}



function converToCelcius(tempF){
    return tempC =  ((tempF - 32) * 5 / 9).toFixed(0)
}




function showWeather(){

    let response = JSON.parse(localStorage.getItem('weather'))

    let report = response.Headline.Text
    let minTemp = response.DailyForecasts[0].Temperature.Minimum.Value
    minTemp = converToCelcius(parseInt(minTemp))
    let maxTemp = response.DailyForecasts[0].Temperature.Maximum.Value
    maxTemp = converToCelcius(parseInt(maxTemp))
    
    let cityName = localStorage.getItem('cityName')
    city.innerHTML = cityName
    temp.innerHTML = `${minTemp} - ${maxTemp} C`
    weather.innerHTML = report
}


async function changeLocation(newCity){

    const a = await getCityCode(newCity)
    await getWeather(a)
    showWeather()
}





// !Display functions 

function changeBackground(){
    let current = new Date()
    let timeNow = current.getHours()
    
    
    if (timeNow > 5 && timeNow < 12){
        greeting.innerHTML = 'Good Morning!'
        morning.style.visibility = 'visible'
        main.classList.remove('afternoon', 'evening')
        main.classList.add('morning');
    } 
    else if (timeNow >= 12 && timeNow < 18){
        greeting.innerHTML = 'Good Afternoon'
        afternoon.style.visibility = 'visible'
        main.classList.remove('morning', 'evening')
        main.classList.add('afternoon');

    } else {
        greeting.innerHTML = 'Good Evening!'
        evening.style.visibility = 'visible'
        main.classList.remove('morning', 'afternoon')
        main.classList.add('evening');
    }
}


hideBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        if (overlay.classList.contains('hidden')){
            overlay.classList.remove('hidden')
            overlay.classList.add('visible')
        } else {
            overlay.classList.remove('visible')
            overlay.classList.add('hidden')
        }
    
    }
)})



// !Showing Current Date and Time

async function showTime(timezone){

    const response = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`)
    const data = await response.json()

    let current = data.datetime
    // let date = current.slice(0, 9);
    let hour = current.slice(11, 13);
    // let mins = current.slice(14, 16);

    let getampm = hour >= 12 ? 'PM' : 'AM'

    return getampm
}


function showCurrentDate(){
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    let current = new Date()

    let monthNow = current.getMonth()
    let dateNow = current.getDate()
    let dayNow = current.getDay()
    let yearNow = current.getFullYear()

    day.innerHTML = days[dayNow]
    date.innerHTML = `${months[monthNow]} ${dateNow}`
    year.innerHTML = yearNow
}
