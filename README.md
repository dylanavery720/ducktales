
# ducktales

Built with React, Express, and MongoDB. 

## Overview

This application returns a graph from API calls made to BtcE, Coincap.io, and Poloniex, which displays the Bitcoin and US Dollar 
exchange rates for Litecoin, DASH, and Ether. The graph is intended to help decide when to buy or not buy a particular alt coin using US Dollar or Bitcoin. Basic reports can be saved and loaded via Ethereum, by downloading and deploying the [ducktales smart contract ecosytem](https://github.com/dylanavery720/ducktales-ecosystem) using `testrpc` and `truffle`. Contract address is currently hardcoded so user needs to substitute the new address once they compile and migrate the contract locally.

## Setup

`git clone` this repository.

`npm install`

Make sure you have MongoDB installed and then `mongod`

`node server.js` to start the application.

Go to http://localhost:8080/


![ducktales](http://i.imgur.com/kY6kavr.png)
