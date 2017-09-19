var http = require('http');
var connect = require('./connect');
process.chdir(__dirname);
var app = connect();

// 这个顺序不能变!
require('./middle')(app);
require('./static')(app);
require('./render')(app);
require('./route')(app);

http.createServer(app).listen(8080, function () {
  console.log('Server is running on %d port.', 8080);
});
