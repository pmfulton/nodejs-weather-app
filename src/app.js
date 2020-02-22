const express = require('express')
const path = require('path') //core node module
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Peter Fulton'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Peter Fulton'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help page',
        message: 'Please select an option below.',
        name: 'Peter Fulton'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address to get the weather!'
        })
    } 

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error}) 
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                    location,
                    address: req.query.address,
                    forecast: forecastData
            })
        })    
    })
})




app.get('/help/*', (req,res) => {
    res.render('error', {
        body: 'Help article not found.',
        name: 'Peter Fulton'
    })
})


app.get('*',(req,res) => {
    res.render('error', {
        body: 'Page not found.',
        name:'Peter Fulton'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})