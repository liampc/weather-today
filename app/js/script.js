const time = document.querySelector("#time")
const ampm = document.querySelector("#ampm")
const day = document.querySelector("#day")
const date = document.querySelector("#date")
const year = document.querySelector("#year")
const main = document.querySelector('.main')
const greeting = document.querySelector('#greeting')
const morning = document.querySelector('.circle-morning')
const afternoon = document.querySelector('.circle-afternoon')
const evening = document.querySelector('.circle-evening')
const weather = document.querySelector('#weather')
const temp = document.querySelector('#temp')


async function getWeather(){
  
    const response = await fetch("http://dataservice.accuweather.com/forecasts/v1/daily/1day/264884?apikey=Vb1TkVOlVB5OhYJE6kzYMXXYtBXjUeKj")
    response.json().then(function(response){
        console.log(response)

        let minTemp = response.DailyForecasts[0].Temperature.Minimum.Value
        let maxTemp = response.DailyForecasts[0].Temperature.Maximum.Value
        let report = response.Headline.Text

        temp.innerHTML = `${minTemp} - ${maxTemp} F`
        weather.innerHTML = report

       
    })

    
}


function showCurrentTime(){
    let current = new Date()
    
    let hour = current.getHours() 
    let getampm = hour >= 12 ? 'PM' : 'AM'
    hour = hour >= 12 ? hour % 12 : hour

    let mins = current.getMinutes() 
    mins = mins < 10 ? "0" + mins : mins

    
    time.innerHTML = `${hour} : ${mins}`
    ampm.innerHTML = getampm
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



let getTime = setInterval(() => showCurrentTime(), 1000);
let getDate = setInterval(() => showCurrentDate(), 1000);
let showWeather = setInterval(() => getWeather , 60000);
window.addEventListener('load', changeBackground)
window.addEventListener('load', getWeather)