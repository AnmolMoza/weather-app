const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()

//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//Creating routes
app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Vansh Moza'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vansh moza'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Vansh Moza'
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address) {
        return res.send ({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address, (error, {long, lat, location} = {} ) => {
        if(error) {
            return res.send({error})
        }

        forecast(long,lat,(error,forecastData) => {
            if(error) {
                return res.send({error})
            }

        res.send( {
            forecast: forecastData,
            location,
            address: req.query.address
        })
        })
    })

    // res.send({
    //     location: 'Jammu', forcast: 'cloudy', address: req.query.address})
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Vansh Moza',
        errorMessage: 'Help article not found'
        })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Vansh Moza',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})