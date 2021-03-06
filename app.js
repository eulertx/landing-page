'use strict';
var express = require('express');
var timeout = require('connect-timeout');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var todos = require('./routes/todos');
var AV = require('leanengine');

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// 设置默认超时时间
app.use(timeout('15s'));

// 加载云函数定义
require('./cloud');
// 加载云引擎中间件
app.use(AV.express());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', function (req, res) {
    res.render('index', {currentTime: new Date()});
});

var unirest = require("unirest");
var cheerio = require("cheerio");

// 可以将一类的路由单独保存在一个文件中
app.use('/todos', todos);
app.get('/nlm', function (req, response, next) {
    // var req = unirest("GET", "https://ghr.nlm.nih.gov/gene/AAAS");
    var req = unirest("GET", req.query.url);

    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        var $ = cheerio.load(res.body);
        var result = {};
        result.name = $('h1.genes').text() || $('h1.health-conditions').text();
        result.full_name = $('h2.gene-full-name').text();
        $('div.hidden-print').remove();
        $('div.related-info').remove();
        $('div.expand-collapse-area').children('section').map(function (e, el) {
            // return $(this).find('div.row').text();
            // console.log($(this).attr('id'));
            var section_id = $(this).children().last().attr('id');
            result[section_id] = {};
            $(this).find('ul').each(function (i, el) {
                result[section_id].list = $(this).find('li').map(function (i, el) {
                    //     return $(this).text();
                    // }).get()
                    return $(this).text();
                }).get()
            })

            result[section_id].text = $(this).children().last().text().trim();
            return $(this).children().last().attr('id');
            // return $(this);
        });

        // result.normalfunction = $('div#normalfunction').text().trim();
        // result.conditions = $('div#conditions').text().trim();
        // result.location = $('div#location').text().trim();
        // result.synonyms = $('div#synonyms').find('li').map(function (i, el) {
        //     return $(this).text();
        // }).get();
        // result.sourcesforpage = $('div#sourcesforpage').find('li').map(function (i, el) {
        //     return $(this).html();
        // }).get();

        response.send(result);
    });
});

app.use(function (req, res, next) {
    // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
    if (!res.headersSent) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

// error handlers
app.use(function (err, req, res, next) { // jshint ignore:line
    var statusCode = err.status || 500;
    if (statusCode === 500) {
        console.error(err.stack || err);
    }
    if (req.timedout) {
        console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
    }
    res.status(statusCode);
    // 默认不输出异常详情
    var error = {}
    if (app.get('env') === 'development') {
        // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
        error = err;
    }
    res.render('error', {
        message: err.message,
        error: error
    });
});

module.exports = app;
