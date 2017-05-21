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
  polo_ltc_btc: {},
  polo_eth_btc: {},
  polo_dsh_btc: {},
  btce_ltc: {},
  btce_eth: {},
  btce_dsh: {},
  btc_ltc: {},
  btc_eth: {},
  btc_dsh: {},
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

app.post('/api/pricing', (req, res) => {
  Pricing.remove({}, (err) => {
    console.log('collection removed', err)
  });
  Pricing.create({
    polo_ltc: req.body.polo_ltc,
    polo_eth: req.body.polo_eth,
    polo_dsh: req.body.polo_dsh,
    polo_ltc_btc: req.body.polo_ltc_btc,
    polo_eth_btc: req.body.polo_eth_btc,
    polo_dsh_btc: req.body.polo_dsh_btc,
    btce_ltc: req.body.btce_ltc,
    btce_eth: req.body.btce_eth,
    btce_dsh: req.body.btce_dsh,
    btc_ltc: req.body.btc_ltc,
    btc_eth: req.body.btc_eth,
    btc_dsh: req.body.btc_dsh,
    coincap: req.body.coincap,
    done: false,
  }, (err, prices) => {
    Pricing.find((err, prices) => {
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
