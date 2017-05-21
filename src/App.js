import React, { Component } from 'react';
import logo from './ducktalesgold.png';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      payload: {},
    }
  }

  fetchFromMongo() {
    fetch('/api/pricing')
    .then(response => response.json())
    .then(data => this.setState({ payload: data[data.length - 1] }))
  }

  render() {
    const { btce_dsh, btce_eth, btce_ltc, polo_dsh, polo_eth, polo_ltc,
      btc_dsh, btc_eth, btc_ltc, polo_dsh_btc, polo_eth_btc, polo_ltc_btc,
      coincap_ltc, coincap_dsh, coincap_eth,
    } = this.state.payload
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} />
          <h2>Ducktales</h2>
          <div className='graph-key'>
            Don't Buy<div className='red'></div>
           Buy<div className='green'></div>
          </div>
        </div>
        {!this.state.payload._id && <button onClick={this.fetchFromMongo.bind(this)}>NEW CHARTS</button>}
        {this.state.payload._id && <div><div id='usd-graph' className='graph-container'>
          <h1>USD</h1>
          <div className='graph'>
            <h3>BtcE</h3>
            <div className={btce_ltc.last >= btce_ltc.buy ? 'bar2' : 'bar1'} style={{ height: btce_ltc.last * 2 + '%' }}>
             <p>Litecoin</p>
            </div>
            <div className={btce_dsh.last >= btce_dsh.buy ? 'bar2' : 'bar1'} style={{ height: btce_dsh.last / 2 + '%' }}>
              <p>DASH</p>
            </div>
            <div className={btce_eth.last >= btce_eth.buy ? 'bar2' : 'bar1'} style={{ height: btce_eth.last / 2 + '%' }}>
              <p>Ether</p>
            </div>
          </div>
          <div className='graph'>
            <h3>Poloniex</h3>
            <div className={polo_ltc.percentChange > 0 ? 'bar2' : 'bar1'} style={{ height: polo_ltc.last * 2 + '%' }}>
             <p>Litecoin</p>
            </div>
            <div className={polo_dsh.percentChange > 0 ? 'bar2' : 'bar1'} style={{ height: polo_dsh.last / 2 + '%' }}>
              <p>DASH</p>
            </div>
            <div className={polo_eth.percentChange > 0 ? 'bar2' : 'bar1'} style={{ height: polo_eth.last / 2 + '%' }}>
              <p>Ether</p>
            </div>
          </div>
          <div className='graph'>
            <h3>CoinCap</h3>
            <div className={coincap_ltc.perc > 0 ? 'bar2' : 'bar1'} style={{ height: coincap_ltc.price * 2 + '%' }}>
             <p>Litecoin</p>
            </div>
            <div className={coincap_dsh.perc > 0 ? 'bar2' : 'bar1'} style={{ height: coincap_dsh.price / 2 + '%' }}>
              <p>DASH</p>
            </div>
            <div className={coincap_eth.perc > 0 ? 'bar2' : 'bar1'} style={{ height: coincap_eth.price / 2 + '%' }}>
              <p>Ether</p>
            </div>
          </div>
        </div>
        <div id='btc-graph' className='graph-container'>
          <h1>BTC</h1>
          <div className='graph'>
           <h3>BtcE</h3>
            <div className={btc_ltc.last >= btc_ltc.buy ? 'bar2' : 'bar1'} style={{ height: btc_ltc.last * 1000 + '%' }}>
             <p>Litecoin</p>
            </div>
            <div className={btc_dsh.last >= btc_dsh.buy ? 'bar2' : 'bar1'} style={{ height: btc_dsh.last * 1000 + '%' }}>
              <p>DASH</p>
            </div>
            <div className={btc_eth.last >= btc_eth.buy ? 'bar2' : 'bar1'} style={{ height: btc_eth.last * 1000 + '%' }}>
              <p>Ether</p>
            </div>
          </div>
          <div className='graph'>
            <h3>Poloniex</h3>
            <div className={polo_ltc_btc.percentChange > 0 ? 'bar2' : 'bar1'} style={{ height: polo_ltc_btc.last * 2000 + '%' }}>
             <p>Litecoin</p>
            </div>
            <div className={polo_dsh_btc.percentChange > 0 ? 'bar2' : 'bar1'} style={{ height: polo_dsh_btc.last * 1000 + '%' }}>
              <p>DASH</p>
            </div>
            <div className={polo_eth_btc.percentChange > 0 ? 'bar2' : 'bar1'} style={{ height: polo_eth_btc.last * 1000 + '%' }}>
              <p>Ether</p>
            </div>
          </div>
          <div className='graph'>
            <h3>CoinCap</h3>
            <div className='bar1' style={{ height: 20 + '%' }}>
             <p>Litecoin</p>
            </div>
            <div className='bar1' style={{ height: 30 + '%' }}>
              <p>DASH</p>
            </div>
            <div className='bar2' style={{ height: 50 + '%' }}>
              <p>Ether</p>
            </div>
          </div>
        </div></div>}
      </div>
    );
  }
}

export default App;
