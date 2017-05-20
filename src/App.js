import React, { Component } from 'react';

import './App.css';

// SHOW AVERAGE, LAST, AND PRICE TO BUY AT, IF LAST HITS BUY SEND NOTIFICATION?
// 1 Litecoin worth 0.01407 bitcoin , 26.45 usd
// 1 Ether wirth  0.06049 bitcon , 114.2 usd
// 1 Dash worth 0.050 bitcoin, 94.24 usd
// USDT_LTC , USDT_ETH, USDT_DASH on poloniex , I get a 405, too many requests?
// Maybe alter API to also show Bitcoin-Ether Bitcoin-DASH...

//https://www.compose.com/articles/graph-data-with-mongodb/


class App extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  setTheBar(current) {
    const bar = {
      height: `${current}%`,
    }
    return Object.assign({}, bar)
  }

  //Break sub-graphs into components
  render() {
    const percentage = this.props.children + '%';
    return (
      <div className="App">
        <div className="App-header">
          <h2>Ducktales</h2>
        </div>
        <div id="usd-graph" className="graph-container">
          <div className="graph">
            <h3>BtcE</h3>
            <div className="bar1" style={{height: 20 + "%"}}>
             <p>Litecoin</p>
            </div>
            <div className="bar1" style={{height: 30 + "%"}}>
              <p>Bitcoin</p>
            </div>
            <div className="bar2" style={{height: 50 + "%"}}>
              <p>Ether</p>
            </div>
          </div>
          <div className="graph">
            <h3>Poloniex</h3>
            <div className="bar1" style={{height: 20 + "%"}}>
             <p>Litecoin</p>
            </div>
            <div className="bar1" style={{height: 30 + "%"}}>
              <p>Bitcoin</p>
            </div>
            <div className="bar2" style={{height: 50 + "%"}}>
              <p>Ether</p>
            </div>
          </div>
          <div className="graph">
            <h3>CoinCap</h3>
            <div className="bar1" style={{height: 20 + "%"}}>
             <p>Litecoin</p>
            </div>
            <div className="bar1" style={{height: 30 + "%"}}>
              <p>Bitcoin</p>
            </div>
            <div className="bar2" style={{height: 50 + "%"}}>
              <p>Ether</p>
            </div>
          </div>
        </div>
        <div id="btc-graph" className="graph-container">

        </div>
      </div>
    );
  }
}

export default App;
