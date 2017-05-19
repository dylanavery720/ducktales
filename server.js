const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const helpers = require('./helpers.js')
const cors = require('cors')

// const port = set up some production stuffs... garage bin or milkman...

const app = express()

mongoose.connect('mongodb://localhost:27017/ducktales')

const Pricing = mongoose.model('Pricing', {
  polo_ltc: {},
  polo_eth: {},
  polo_dsh: {},
  poloniex: String,
  coincap: String,
})


app.use(express.static(__dirname + '/build'))
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: 'true' }))
app.use(bodyParser.json())
app.use(methodOverride())

app.get('/api/pricing', (req, res) => {
  Pricing.find((err, prices) => {
    if (err) res.send(err)
    res.json(prices)
  })
})

//EITHER BATCH API CALLS TOGETHER BEFORE MAKING ONE POST CREATE ONE GIANT TABLE OR..
//TRY TO USE UPDATE INSTEAD OF CREATE ON THE PRICING TABLE...

app.post('/api/pricing', (req, res) => {
  Pricing.create({
    polo_ltc: req.body.polo_ltc,
    polo_eth: req.body.polo_eth,
    polo_dsh: req.body.polo_dsh,
    btce_ltc: req.body.btce_ltc,
    btce_eth: req.body.btce_eth,
    btce_dsh: req.body.btce_dsh,
    poloniex: req.body.poloniex,
    coincap: req.body.coincap,
    done: false,
  }, (err, prices) => {
    Pricing.find((err, prices) => {
      res.json(prices)
    })
  })
})


app.patch('/api/pricing/:id', (req, res) => {
  Pricing.findById(req.params.id, (err, pricing) => {
    if (err) console.log(err)
    else {
      pricing.polo_ltc = req.body.polo_ltc || pricing.polo_ltc
      pricing.polo_eth = req.body.polo_eth || pricing.polo_eth
      pricing.polo_dsh = req.body.polo_dsh || pricing.polo_dsh
      pricing.btce_ltc = req.body.btce_ltc || pricing.btce_ltc
      pricing.btce_eth = req.body.btce_eth || pricing.btce_eth
      pricing.btce_dsh = req.body.btce_dsh || pricing.btce_dsh

      pricing.save((err, prices) => {
        if (err) console.log(err)
        res.json(prices)
      })
    //   prices.poloniex = req.body.poloniex || 
    //  prices.coincap = req.body.coincap || 
    }
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
  helpers.fetchPoloniex()
  res.sendfile('./build/index.html')
})

app.listen(8080, () => {
  helpers.serverOn()
})
