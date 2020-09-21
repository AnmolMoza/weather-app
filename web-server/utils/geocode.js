const { builtinModules } = require("module")
const request = require('request')
const chalk = require('chalk')

const encodeUrl = (address) => {
    return address.toString()
}

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeUrl(address)+ '.json?access_token=pk.eyJ1IjoiYW5tb2xtb3phIiwiYSI6ImNrZjlsYzBmeDBuNmsycm1haDMwdmxmMzIifQ.JbuiQPRMYvaKcEk3O-12BQ&key=%221%22'
    request({url, json: true}, (error,{ body } = {})=> {
        if(error) {
            callback("Unable to connect to location services!", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location, try some other location", undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode