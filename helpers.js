require('es6-promise').polyfill();
require('isomorphic-fetch');
const batchData = { polo: {}, btce: {} }

module.exports = {

  fetchBatch() {
    this.fetchBtc('https://btc-e.com/api/2/eth_usd/ticker')
    this.fetchBtc('https://btc-e.com/api/2/ltc_usd/ticker')
    this.fetchBtc('https://btc-e.com/api/2/dsh_usd/ticker')
    setTimeout(() => this.postToMongo(batchData), 1000)
  },

  postToMongo(data) {
    fetch('http://localhost:8080/api/pricing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify({
        btce_ltc: data.btce.ltc_usd.ticker,
        btce_eth: data.btce.eth_usd.ticker,
        btce_dsh: data.btce.dsh_usd.ticker,
        polo_ltc: data.polo.USDT_LTC,
        polo_eth: data.polo.USDT_ETH,
        polo_dsh: data.polo.USDT_DASH }),
    })
  },

  fetchBtc(url) {
    let newKey = url.substring(24, 31)
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
    .then(data => Object.assign(batchData.btce, { [newKey]: data }))
    .catch(error => console.log(error))
  },

  fetchPoloniex() {
    fetch('https://poloniex.com/public?command=returnTicker', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => Object.assign(batchData.polo, data))
    .then(data => this.fetchBatch())
    .catch(error => console.log(error))
  },

  serverOn() {
    console.log('App listening on port 8080')
  },
}