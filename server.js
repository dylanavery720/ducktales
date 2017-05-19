const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const cors = require('cors')
require('es6-promise').polyfill();
require('isomorphic-fetch');

const app = express()

mongoose.connect('mongodb://localhost:27017/ducktales')

const Pricing = mongoose.model('Pricing', {
  polo_ltc: {},
  polo_eth: {},
  polo_dsh: {},
  poloniex: String,
  coincap: String,
})

const postPoloniex = (data) => {
  fetch('api/pricing', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*'
    },
    body: JSON.stringify({
      polo_ltc: data.USDT_LTC,
      polo_eth: data.USDT_ETH,
      polo_dsh: data.USDT_DASH }),
  })
}

const fetchBtc = (url) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*'
      }
    })
    .then(response => response.json())
    // .then(data => this.postBtc(data))
    .catch(error => console.log(error))
  }

const fetchPoloniex = () => {
  fetch('https://poloniex.com/public?command=returnTicker', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => postPoloniex(data))
    .catch(error => console.log(error))
}

app.use(express.static(__dirname + '/build'))
app.use(morgan('dev'))
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// });
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
  console.log(req.body)
  Pricing.create({
    polo_ltc: req.body.polo_ltc,
    polo_eth: req.body.polo_eth,
    polo_dsh: req.body.polo_dsh,
    poloniex: req.body.poloniex,
    coincap: req.body.coincap,
    done: false,
  }, (err, prices) => {
    // if (err) res.send(err);
    Pricing.find((err, prices) => {
      // if (err) res.send(err)
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
  fetchPoloniex()
  res.sendfile('./build/index.html')
})

app.listen(8080, () => {
  console.log('App listening on port 8080')
})
