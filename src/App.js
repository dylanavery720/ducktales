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
      litecoin: 0,
    }
  }

  componentDidMount() {
    // this.fetchLite('https://btc-e.com/api/2/ltc_usd/ticker')
    // this.fetchLite('https://btc-e.com/api/2/eth_usd/ticker')
    // this.fetchLite('https://poloniex.com/public?command=returnTicker')
    // this.fetchLite()
  }

  fetchLite() {
    fetch('https://btc-e.com/api/2/dsh_usd/ticker', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*'
      },
      strictSSL: false,
    })
    .then(response => response.json())
    .then(data => console.log(data))
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
