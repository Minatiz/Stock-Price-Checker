'use strict';

// GET https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/[symbol]/quote


async function get_stock(stock_symbol){
  const apiUrl = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock_symbol}/quote`
  const response = await fetch(apiUrl); 
  console.log(response); 
  const {symbol, latestPrice} = await response.json(); 
  return {symbol, latestPrice}

}

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res){
      const {stock, like} = req.query; 
      const stockData =  await get_stock(stock); 

      res.json(stockData); 
      console.log(stockData);
      
       
      


      
    });
    
};


