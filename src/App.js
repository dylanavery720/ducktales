import React, { Component } from 'react';

import './App.css';

//SHOW AVERAGE, LAST, AND PRICE TO BUY AT, IF LAST HITS BUY SEND NOTIFICATION?



class App extends Component {
  constructor() {
    super()
    this.state = {
      litecoin: 0,
    }
  }

  componentDidMount() {
    // this.fetchLite('https://btc-e.com/api/2/ltc_usd/ticker')
  }

  fetchLite() {
    fetch('https://btc-e.com/api/2/ltc_usd/ticker', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*'
      },
    })
    .then(response => response.json())
    .then(data => console.log(data))
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
