module.exports = function (app) {
    ///////测试数据/////////
    var articles = [
        {
          id: 1,
          title: '第一篇文章',
          detail: '第一篇文章内容在此'
        },
        {
          id: 2,
          title: '第二篇文章',
          detail: '第二篇文章内容在此'
        },
        {
          id: 3,
          title: '第三篇文章',
          detail: '第三篇文章内容在此'
        }
      ];
    ///////////////////////

    // route 有bug
    // app.use('/', function (req, res) {
    //     res.send('<ul><li><a href="/article?id=1">第一篇</a></li><li><a href="/article?id=2">第二篇</a></li><li><a href="/article?id=3">第三篇</a></li></ul>');
    // })

    // app.use('/list', function (req, res) {
    //     res.send('<ul><li><a href="/article?id=1">第一篇</a></li><li><a href="/article?id=2">第二篇</a></li><li><a href="/article?id=3">第三篇</a></li></ul>');
    // })

    app.use('/list', function (req, res) {
        res.render('./index.szy', { articles: articles })
    })

    app.use('/article', function (req, res) {
        res.send(articles[req.query.id - 1].detail);
    })

    app.use(function (req, res) {
        res.end('404');
    })
}