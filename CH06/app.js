var http = require('http');
var connect = require('./connect');
process.chdir(__dirname);
var app = connect();

require('./middle')(app);
require('./render')(app);
require('./route')(app);


http.createServer(app).listen(8080, function () {
  console.log('Server is running on %d port.', 8080);
});
