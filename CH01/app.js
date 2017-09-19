var http = require('http');
var url = require('url');
var path = require('path');
var querystring = require('querystring');
var connect = require('./connect');
var articles = {
  1: '第一篇文章的详情',
  2: '第二篇文章的详情',
  3: '第三篇文章的详情'
}

var app = connect();
app.use(function (req, res, next) {
  var urlObj = url.parse(req.url, true)
  // 为方便使用者在req中添加两个属性
  req.path = urlObj.pathname;
  req.query = urlObj.query;
  next();
});

app.use(function (req, res, next) {
  // 给res添加一个业务方法
  res.send = function (data) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end(data);
  }
  next();
});

app.use(function(req, res) {
  if (req.path === '/') {
    res.send('<ul><li><a href="/article?id=1">第一篇</a></li><li><a href="/article?id=2">第二篇</a></li><li><a href="/article?id=3">第三篇</a></li></ul>');
  } else if (req.path === '/article') {
    res.send(articles[req.query.id]);
  } else {
    res.end('404');
  }
})

var server = http.createServer(app);

server.listen(8080, function () {
  console.log('Server is running on %d port.', 8080);
});