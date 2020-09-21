const request = require('request')

const forecast = (longitude,latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=86f2d69a222e8848cfff5c58bee881eb&query=${latitude},${longitude}`
    request( {url, json: true}, (error, { body } = {})=> {
        if(error){
            callback('There is some network Error with weatherUrl!', undefined)
        } else if (body.error) {
            callback('There is some serious Error  with weatherURL!', undefined)
        } else {
            callback(undefined, {
            curTemp: body.current.temperature,
            curFeel: body.current.feelslike
            })
        }
    })
}



  module.exports = forecast