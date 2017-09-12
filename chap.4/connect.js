var url = require('url');
var http = require('http');
var proto = {};

function createServer() {
  function app(req, res) {
    app.handle(req, res);
  }
  // 把proto对象的属性拷贝到app中一份
  Object.assign(app, proto);
  app.stack = [];
  return app;
}

proto.use = function (route, fn) {
  var handle = fn;
  var path = route;
  // 那就说明没传路由，视为中间件
  if (typeof route !== 'string') {
    // 那么就让第一个参数等于handle
    handle = route;
    // 默认为根目录
    path = '/';
  }
  this.stack.push({ handle: handle, path: path });
}

proto.handle = function (req, res) {
  var stack = this.stack;
  var index = 0;
  function next() {
    var layer = stack[index++];
    var route = layer.path;
    var handle = layer.handle;

    var path = url.parse(req.url).pathname;
    // 用startsWith有bug，后面二次改造
    if (path.startsWith(route)) {
      // 调用中间件
      handle(req, res, next);
    } else {
      next();
    }
  }
  next();
}

proto.listen = function (port, callback) {
  console.log(this);
  var server = http.createServer(this); 
  return server.listen(port,callback);  // app.listen(8080) -> this == app
}

module.exports = createServer;
