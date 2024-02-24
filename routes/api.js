
async function get_stock_data(stock_ticker){

  // Stock GET api 
  const apiUrl = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock_ticker}/quote`; 
  const response = await fetch(apiUrl);
  const data = await response.json();

  return data; 
}


module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res){
      // Request query received from testform. 
      const {stock, like} = req.query; 

      // Likes logic. 
      const likes = like === "false" ? 0 : 1; 
  
      // Use array to GET 2 stocks.
      // First scenario when we GET one stock. (testForm2 script.js) without array. 
      if (!Array.isArray(stock)) {

        // Receive the data from that specific stock
        const data =  await get_stock_data(stock); 
        
        // If Stock Ticker name is incorrect let user know
        if(data.symbol === undefined){
          console.log("Error incorrect Stock Ticker"); 
          return res.json(`Incorrect Stock Ticker:${stock}. Input correct Stock Ticker`); 
        }
        // The result output to user
        res.json({stockData: {stock: data.symbol, price: data.latestPrice, likes: likes }}); 
      } 
      // Else its an array 
      // GET both stocks. (testForm script.js) 
      else
       {
        const [stock1, stock2] = stock; 

        // Receive data from both stock. 
        const data1 = await get_stock_data(stock1);
        const data2 = await get_stock_data(stock2);
  
        // If one of the Stock Ticker name is incorrect let user know
        if(data1.symbol === undefined || data2.symbol === undefined){
          console.log("Error incorrect Stock Ticker"); 
          return res.json(`Incorrect Stock Ticker:${stock}. Input correct Stock Ticker`); 
          } 

        // The result output to user
        res.json({stockData: [{stock: data1.symbol, price: data1.latestPrice, rel_likes: likes },{stock: data2.symbol, price: data2.latestPrice, rel_likes: likes}]});  
      }
    

      
    });
 
};


