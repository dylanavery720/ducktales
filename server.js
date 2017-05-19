const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()

mongoose.connect('mongodb://localhost:27017/ducktales')

const Pricing = mongoose.model('Pricing', {
  btc: String,
  poloniex: String,
  coincap: String,
})

app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: 'true' }))
app.use(bodyParser.json())
app.use(methodOverride())

app.get('/api/pricing', (req, res) => {
  Pricing.find((err, prices) => {
    if (err) res.send(err)
    res.json(prices)
  })
})

app.post('/api/pricing', (req, res) => {
  Pricing.create({
    btc: req.body.btc,
    poloniex: req.body.poloniex,
    coincap: req.body.coincap,
    done: false,
  }, (err, price) => {
    if (err) res.send(err);
    Pricing.find((err, prices) => {
      if (err) res.send(err)
      res.json(prices)
    })
  })
})

app.delete('/api/pricing/:price_id', (req, res) => {
  Pricing.remove({
    _id: req.params.price_id,
  }, (err, todo) => {
    if (err) res.send(err)
    Pricing.find((err, prices) => {
      if (err) res.send(err)
      res.json(prices)
    })
  })
})

app.get('*', (req, res) => {
  res.sendfile('./public/index.html')
})

app.listen(8080, () => {
  console.log('App listening on port 8080')
})
