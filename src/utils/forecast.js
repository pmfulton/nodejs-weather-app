const request = require('request')

const forecast = (lat,long, callback) => {
    const url = 'https://api.darksky.net/forecast/88ecc1566872f96a50f3afac2cffe2f6/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long)
    request({ url, json: true }, (error,{body}) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, {
                temp: body.currently.temperature,
                humidity: body.currently.humidity,
                icon: body.currently.icon,
                summary: body.currently.summary
            })  
        } 
    })
}

module.exports = forecast