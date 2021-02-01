const container = document.querySelector('.container')


async function getCityCode(city){
    const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Vb1TkVOlVB5OhYJE6kzYMXXYtBXjUeKj&q=${city}`)

    const data = await response.json()
    let code = data[0].Key
    let cityName = data[0].EnglishName
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

function showWeather(){
    
    let weather = JSON.parse(localStorage.getItem('weather'))
    console.log(weather)
    container.innerHTML = weather.DailyForecasts[0].Link

}

async function changeWeather(newCity){

    const a = await getCityCode(newCity)
    await getWeather(a)
    showWeather()
}