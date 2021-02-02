
// Selectors 

const $time = document.querySelector("#time")
const $ampm = document.querySelector("#ampm")
const $day = document.querySelector("#day")
const $night = document.querySelector("#night")
const $year = document.querySelector("#year")
const $main = document.querySelector('.main')
const $greeting = document.querySelector('#greeting')
const $morning = document.querySelector('.circle-morning')
const $afternoon = document.querySelector('.circle-afternoon')
const $evening = document.querySelector('.circle-evening')
const $weather = document.querySelector('#weather')
const $city = document.querySelector('#city')
const $temp = document.querySelector('#temp')
const $hideBtns = document.querySelectorAll(".will-hide")
const $overlay = document.querySelector('.main-overlay')
const $changeBtn = document.querySelector('#change-btn')
const $inputCity = document.querySelector('#input-city')
const $today = document.querySelector('#today')


// !Fetching APIs

async function getCityCode(city){
    const response = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=Vb1TkVOlVB5OhYJE6kzYMXXYtBXjUeKj&q=${city}`)

    const data = await response.json()

    let code = data[0].Key
    let cityName = data[0].EnglishName
    let timezone = data[0].TimeZone.Name
    localStorage.setItem('cityData', JSON.stringify(data))
    localStorage.setItem('cityCode', code)
    localStorage.setItem('cityName', cityName)
    localStorage.setItem('timezone', timezone)
    
    // console.log(localStorage)
    return code
  
}


async function getWeather(){
   

    let code = localStorage.getItem('cityCode')
    if (!code){
        code = '264884' 
    }
    
    const response = await fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${code}?apikey=Vb1TkVOlVB5OhYJE6kzYMXXYtBXjUeKj`)
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
    let maxTemp = response.DailyForecasts[0].Temperature.Maximum.Value
    let cityName = localStorage.getItem('cityName')
    let day = response.DailyForecasts[0].Day.IconPhrase
    let night = response.DailyForecasts[0].Night.IconPhrase

    minTemp = converToCelcius(parseInt(minTemp))
    maxTemp = converToCelcius(parseInt(maxTemp))
    
    
    $city.innerHTML = cityName
    $temp.innerHTML = `${minTemp} C° - ${maxTemp} C°`
    $day.innerHTML = day
    $night.innerHTML = night
    $weather.innerHTML = report

}

// !Showing Current Date and Time

async function showTime(){
    let timezone = localStorage.getItem('timezone')

    const response = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)
    const data = await response.json()

    let current = data.datetime
    let date = current.slice(0, 10);
    let hour = parseInt(current.slice(11, 13));
    localStorage.setItem('currentHour', hour)
    localStorage.setItem('date', date)
   

    return hour
}


function showCurrentDate(){
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    let date = localStorage.getItem('date')
    let [year, month, day] = date.split('-')

    day = parseInt(day)
    month = parseInt(month) - 1
    
    $today.innerHTML = `${day} ${months[month]} `
    $year.innerHTML = year

}



// !Display functions 

function changeBackground(timeNow){
    // let timeNow = localStorage.getItem('currentHour')

    if (timeNow > 5 && timeNow < 12){
        $greeting.innerHTML = 'Good Morning!'
        $morning.style.visibility = 'visible'
        $main.classList.remove('afternoon', 'evening')
        $main.classList.add('morning');
    } 
    else if (timeNow >= 12 && timeNow < 18){
        $greeting.innerHTML = 'Good Afternoon'
        $afternoon.style.visibility = 'visible'
        $main.classList.remove('morning', 'evening')
        $main.classList.add('afternoon');

    } else {
        $greeting.innerHTML = 'Good Evening!'
        $evening.style.visibility = 'visible'
        $main.classList.remove('morning', 'afternoon')
        $main.classList.add('evening');
    }
}


$hideBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        if ($overlay.classList.contains('hidden')){
            $overlay.classList.remove('hidden')
            $overlay.classList.add('visible')
        } else {
            $overlay.classList.remove('visible')
            $overlay.classList.add('hidden')
        }
    
    }
)})


async function changeLocation(){
    let newCity = $inputCity.value
    if (!newCity){
        newCity = "Manila"
    }

    const city = await getCityCode(newCity)
    await getWeather(city)
    showWeather()
    const time = await showTime()
    showCurrentDate()
    changeBackground(time)
}


// !Event Listeners


window.addEventListener('load', async function(){

    let weather = localStorage.getItem('weather')
    if (weather){
        showWeather()
        const time = await showTime()
        showCurrentDate()
        changeBackground(time)
        
    } else {
        changeLocation()
    }
})


$changeBtn.addEventListener('click', changeLocation)