const hbs = require('hbs')
const express = require('express')
const path = require('path')
const exp = require('constants')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Quang Vinh'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must add address!'
        })
    }
   forecast(req.query.address, (error, data) => {
    if(error){
        res.send({error})
    }
    res.send({
        temperature: data.temperature,
        cityName: data.cityName,
        description: data.description
    })
   })

})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Quang Vinh'
    })
})

app.listen(port, () => {
    console.log('Server is on port: ' + port)
})
