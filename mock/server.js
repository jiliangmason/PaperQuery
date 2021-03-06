var app = require('koa')();
var router = require('koa-router')();

// router.get('/', function *(next) {
//     this.body = 'hello koa !'
// });

// router.get('/api', function *(next) {
//     this.body = 'test data'
// });

// 首页 —— 广告（超值特惠）
var homeAdData = require('./home/ad.js');
router.get('/api/homead', function *(next) {
    this.body = homeAdData
});

// 首页 —— 推荐列表（猜你喜欢）
var homeListData = require('./home/list.js');
router.get('/api/homelist/:city/:page', function *(next) {
    // 参数
    const params = this.params;
    const paramsCity = params.city;
    const paramsPage = params.page;

    console.log('当前城市：' + paramsCity);
    console.log('当前页数：' + paramsPage);

    this.body = homeListData
});

var chartData = require('./chart/chart.js');
router.get('/api/chart', function *(next) {

    this.body = chartData;
});

/*
 * 评论提交
 *
 * */
router.post('/api/submit/', function *(next) {
    console.log('提交评论');
    this.body = {
        errno: 0,
        msg: 'server recevied ok'
    }
});

// 开始服务并生成路由
app.use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);