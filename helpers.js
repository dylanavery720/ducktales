require('es6-promise').polyfill();
require('isomorphic-fetch');
let bigData = []

//Dash goes fastest so first? lol

module.exports = {

  fetchBatch() {
    this.fetchBtc('https://btc-e.com/api/2/dsh_usd/ticker')
    this.fetchBtc('https://btc-e.com/api/2/eth_usd/ticker')
    this.fetchBtc('https://btc-e.com/api/2/ltc_usd/ticker')
    this.postPoloniex(bigData)
  },

  postPoloniex(data) {
    setInterval(() => console.log(data), 5000)
    fetch('http://localhost:8080/api/pricing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify({
        btce_ltc: data.ticker,
        btce_eth: data.ticker,
        btce_dsh: data.ticker,
        polo_ltc: data.USDT_LTC,
        polo_eth: data.USDT_ETH,
        polo_dsh: data.USDT_DASH }),
    })
  },

  postBtc(data) {
    fetch('http://localhost:8080/api/pricing', {
    // PATCH?
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify({
        btce_ltc: data.ticker,
        btce_eth: data.ticker,
        btce_dsh: data.ticker }),
    })
  },

  fetchBtc(url) {
    // let check = url.substring(24, 31)
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      },
    })
    .then(response => response.json())
    .then(data => bigData.push({ [url.substring(24, 31)]: data }))
    .catch(error => console.log(error))
  },

  fetchPoloniex() { 
    fetch('https://poloniex.com/public?command=returnTicker', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => bigData.push(data))
    .then(data =>  this.fetchBatch())
    .catch(error => console.log(error))
  },

  serverOn() {
    console.log('App listening on port 8080')
  }
}