import React, { Component } from 'react';

import './App.css';

// SHOW AVERAGE, LAST, AND PRICE TO BUY AT, IF LAST HITS BUY SEND NOTIFICATION?
// 1 Litecoin worth 0.01407 bitcoin , 26.45 usd
// 1 Ether wirth  0.06049 bitcon , 114.2 usd
// 1 Dash worth 0.050 bitcoin, 94.24 usd
// USDT_LTC , USDT_ETH, USDT_DASH on poloniex , I get a 405, too many requests? 
//

class App extends Component {
  constructor() {
    super()
    this.state = {
      btce: {
        ltc: 0,
        eth: 0,
        dsh: 0,
      },
      poloniex: {
        ltc: 0,
        eth: 0,
        dsh: 0,
      },
    }
  }

  componentDidMount() {
    // this.fetchBtc('https://btc-e.com/api/2/ltc_usd/ticker')
    // this.fetchBtc('https://btc-e.com/api/2/eth_usd/ticker')
    // this.fetchBtc('https://btc-e.com/api/2/dsh_usd/ticker')
    this.fetchPoloniex()
  }

  fetchBtc(url) {
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

  postPoloniex(data) {
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

  fetchPoloniex() {
    fetch('https://poloniex.com/public?command=returnTicker', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => this.postPoloniex(data))
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
