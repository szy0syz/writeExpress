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
  var isRoute = true;
  // 如果第一个参数不是字符串，那么可能是函数。
  // 那就说明没传路由，直接传业务操作函数，其实就是404操作之类的
  if (typeof route !== 'string') {
    // 那么就让第一个参数等于handle
    handle = route;
    // 默认为根目录
    path = '/';
    // 功能型中间件不是路由
    isRoute = false;
  }
  this.stack.push({ handle: handle, path: path, isRoute: isRoute });
}

proto.handle = function (req, res) {
  var stack = this.stack;
  var index = 0;
  function next() {
    var layer = stack[index++];
    var route = layer.path;
    var handle = layer.handle;
    var isRoute = layer.isRoute;
    // 如果handle不是函数就置空指针
    handle = typeof handle === 'function' ? handle : null;

    var path = url.parse(req.url).pathname;

    // 关于路由的匹配，不管req还是res都要走一遭
    if (path.startsWith(route)) {
      if (isRoute) {
        // 如果是路由型中间件值再比较一次且不再执行后续的路由中间件
        if(path === route) {
          handle(req, res, null);
        } else {
          next();
        }
      } else {
        handle(req, res, next);
      }
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
