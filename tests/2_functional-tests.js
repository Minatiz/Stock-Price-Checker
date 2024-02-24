const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

// // // Viewing one stock: GET request to /api/stock-prices/
// // // Viewing one stock and liking it: GET request to /api/stock-prices/
// // // Viewing the same stock and liking it again: GET request to /api/stock-prices/
// // // Viewing two stocks: GET request to /api/stock-prices/
// // // Viewing two stocks and liking them: GET request to /api/stock-prices/

suite('Functional Tests', function() {
  suite('GET /api/stock-prices', function() {
    test('Viewing one stock', function(done) {
      chai.request(server)
        .get('/api/stock-prices')
        .set("content-type", "application/json")
        .query({ stock: 'GOOG' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, "GOOG");
          assert.property(res.body.stockData, 'stock');
          assert.property(res.body.stockData, 'price');
          done();
        });
    });

    test('Viewing one stock and liking it', function(done) {
      chai.request(server)
        .get('/api/stock-prices')
        .set("content-type", "application/json")
        .query({ stock: 'GOOG', like: true })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, "GOOG");
          assert.property(res.body.stockData, 'stock');
          assert.property(res.body.stockData, 'price');
          assert.equal(res.body.stockData.likes, 1);
          done();
        });
    });
    // This test like doesn't increase. 
    test('Viewing the same stock and liking it again', function(done) {
      chai.request(server)
        .get('/api/stock-prices')
        .set("content-type", "application/json")
        .query({ stock: 'GOOG', like: true })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, "GOOG");
          assert.property(res.body.stockData, 'stock');
          assert.property(res.body.stockData, 'price');
          assert.equal(res.body.stockData.likes, 1); 
          done();
        });
    });

    test('Viewing two stocks', function(done) {
      chai.request(server)
        .get('/api/stock-prices')
        .set("content-type", "application/json")
        .query({ stock: ['NVDA', 'GOOG'] })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, "NVDA");
          assert.equal(res.body.stockData[1].stock, "GOOG");
          assert.isArray(res.body.stockData);
          assert.lengthOf(res.body.stockData, 2);
          done();
        });
    });

    test('Viewing two stocks and liking them', function(done) {
      chai.request(server)
        .get('/api/stock-prices')
        .set("content-type", "application/json")
        .query({ stock: ['NVDA', 'GOOG'], like: true })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, "NVDA");
          assert.equal(res.body.stockData[1].stock, "GOOG");
          assert.isArray(res.body.stockData);
          assert.lengthOf(res.body.stockData, 2);
          assert.equal(res.body.stockData[0].rel_likes, 1); 
          assert.equal(res.body.stockData[1].rel_likes, 1); 


          done();
        });
    });
  });
});

