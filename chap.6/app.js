var http = require('http');
var connect = require('./connect');

var app = connect();

require('./middle')(app);
require('./route')(app);

http.createServer(app).listen(8080, function () {
  console.log('Server is running on %d port.', 8080);
});
