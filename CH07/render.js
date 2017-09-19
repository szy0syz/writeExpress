var fs = require('fs');

module.exports = function redner(app) {
  app.use(function(req, res, next) {
    res.render = function(filename, obj) {
      fs.readFile(filename, 'utf8', function(err, str) {
        res.send(compile(str, obj));
      });
    }
    next(); // 继续下一个中间件
  });
}

function compile(template, obj) {
  var evalExpr = /<%=(.+?)%>/g;
  var expr = /<%([\s\S]+?)%>/g;

  template = template // 这里预置替换内容中$表示正则匹配的到索引为1的字符串,其实也就是表达式
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  var script =
    `(function parse(data){
    var output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return eval(script)(obj);
}