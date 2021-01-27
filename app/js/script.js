console.log("Hello world")

async function getWeather(){
    const response = await fetch("http://dataservice.accuweather.com/forecasts/v1/daily/1day/264884?apikey=Vb1TkVOlVB5OhYJE6kzYMXXYtBXjUeKj")
    response.json().then(function(response){
        console.log(response)
    })
}