const time = document.querySelector("#time")
const ampm = document.querySelector("#ampm")

async function getWeather(){
    const response = await fetch("http://dataservice.accuweather.com/forecasts/v1/daily/1day/264884?apikey=Vb1TkVOlVB5OhYJE6kzYMXXYtBXjUeKj")
    response.json().then(function(response){
        console.log(response)
    })
}

function getCurrentTime(){
    let current = new Date()
    

    let hour = current.getHours() 
    let getampm = hour >= 12 ? 'PM' : 'AM'
    hour = hour >= 12 ? hour % 12 : hour

    let mins = current.getMinutes() 
    mins = mins < 10 ? "0" + mins : mins

    
    time.innerHTML = `${hour} : ${mins}`
    ampm.innerHTML = getampm
}

let getTime = setInterval(() => getCurrentTime(), 1000);

