const request = require('request')

const forecast = (address, callback) =>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + address +'&appid=e5c7479401cb69a734a2aef711b95c36&&units=metric'

    request({url, json: true}, (error, {body}) => {
       
        if(error){
            callback('Unable connect to weather server!', undefined)
        } else if(body.message){
            callback('Unable to find location!', undefined)
        } else{
            callback(undefined, {
                temperature: body.main.temp,
                cityName: body.name,
                description: body.weather[0].description
            })
        }
    })
} 
module.exports = forecast