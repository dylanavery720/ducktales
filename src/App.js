import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './ducktalesgold.png';
import './App.css';


const ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const reportContractABI = [{"constant":false,"inputs":[{"name":"_usdreport","type":"bytes32"},{"name":"_btcreport","type":"bytes32"},{"name":"_date","type":"uint256"}],"name":"saveReport","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getReports","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"reports","outputs":[{"name":"usdreport","type":"bytes32"},{"name":"btcreport","type":"bytes32"},{"name":"date","type":"uint256"}],"payable":false,"type":"function"}]
const reportContractAddress = '0xa1e9704a85a96c98db28e0adb7f9664e409b36ed'

// Huey : '1EABigBsmaGhT9z7GRSxqT9gUit6Gysuii'
// Duey : '13QPiJc4XXowfJBHGo8rQxfqGifLfsWZmj'
// Luey : '1JsgqZ2ne7D2KYmXTwXvbApQNxXarfm9Lx'

class App extends Component {
  constructor() {
    super()
    this.state = {
      payload: {},
      coinReport: ETHEREUM_CLIENT.eth.contract(reportContractABI).at(reportContractAddress),
      loadedReports: false,
    }
  }

  componentDidMount() {
    ETHEREUM_CLIENT.eth.defaultAccount = ETHEREUM_CLIENT.eth.accounts[0]
  }

  fetchFromMongo() {
    fetch('/api/pricing')
    .then(response => response.json())
    .then(data => this.setState({ payload: data[data.length - 1], loadedReports: false }))
  }

  addReport() {
    const usdbuys = Array.from(document.querySelectorAll('div #usd-graph .bar2'))
    const btcbuys = Array.from(document.querySelectorAll('div #btc-graph .bar2'))
    const usdsells = Array.from(document.querySelectorAll('div #usd-graph .bar1'))
    const btcsells = Array.from(document.querySelectorAll('div #btc-graph .bar1'))
    this.state.coinReport.saveReport(`UsdBuys: ${this.makeReports(usdbuys)}`, `BtcBuys: ${this.makeReports(btcbuys)}`, Date.now(), {from: ETHEREUM_CLIENT.eth.accounts[0], gas: 1000000})
  }

  makeReports(arr) {
    const s = new Set(arr.map(inner => inner.innerText))
	  const t = s.values()
	  return Array.from(t)
  }

  loadReports() {
    const data = this.state.coinReport.getReports()
    this.setState({ usdtext: String(data[0]).split(','), btctext: String(data[1]).split(','), date: String(data[2]).split(','), loadedReports: true })
  }
  
  showReports() {
    return this.state.usdtext.map((report, i) => {
      return <div className="report-eth">
              <p>{ETHEREUM_CLIENT.toAscii(this.state.usdtext[i])}</p>
              <p>{ETHEREUM_CLIENT.toAscii(this.state.btctext[i])}</p>
              <p>{this.state.date[i]}</p>
            </div>
    })
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
          <h4 onClick={this.addReport.bind(this)}>SAVE REPORT</h4>
          <h4 onClick={this.loadReports.bind(this)}>LOAD REPORTS</h4>
          <div className='graph-key'>
            Don't Buy<div className='red'></div>
           Buy<div className='green'></div>
          </div>
        </div>
        {!this.state.payload._id && <button onClick={this.fetchFromMongo.bind(this)}>NEW CHARTS</button>}
        {this.state.loadedReports && this.showReports()}
        {this.state.payload._id && !this.state.loadedReports && <div><div id='usd-graph' className='graph-container'>
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
