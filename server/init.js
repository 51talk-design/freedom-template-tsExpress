require("reflect-metadata");
const Express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const conf = require("config");
const ContainerManager = require("typedi");
const UseServer = require("freedom-routing-controllers");

//端口设置
process.env.PORT = process.env.PORT || conf.serverPort;

//中间件配置
const middlewaresConfig = conf.middlewares;
//源码编译目录
const buildDir = conf.compiledDir;
//依赖注入的文件配置
const dependencyInjectConf = conf.dependencyInjectConf;
//获取文件加载器单例对象
const fileLoader = require(`../${buildDir}/utils/FileLoader.js`).FileLoader.getInstance();
//加载文件
fileLoader.load(buildDir, dependencyInjectConf);
//express instance
const expressInstance = new Express();

const middlewaresBasePath = `${process.cwd()}/${buildDir}/middlewares`;
let middlewares = [];
middlewaresConfig.map(function (item) {
  middlewares.push(`${middlewaresBasePath}/${item}.js`);
});
//IOC
UseServer.useContainer(ContainerManager.Container);

// creates express app, registers all controller routes and returns you express app instance
const app = UseServer.useExpressServer(expressInstance, {
  defaults: {
    //with this option, null will return 200 by default
    nullResultCode: 200,
    //with this option, void or Promise<void> will return 204 by default 
    undefinedResultCode: 200
  },
  controllers: [process.cwd() + `/${buildDir}/controllers/**/*.js`], // we specify controllers we want to use
  middlewares: middlewares,
  classTransformer: true,
  defaultErrorHandler: false // 关闭默认的error处理，自定义处理error
});

// 设置views文件夹为存放视图文件的目录，即存放模板文件的地方
// dirname为全局变量，存储当前正在执行的脚本所在的目录
app.set('views', path.resolve(__dirname, "../web/views"));
// 使用ejs引擎解析html
app.engine('html', require('ejs').__express);
// 设置模板引擎为ejs
app.set('view engine', 'ejs');

//指定静态资源的访问目录
//app.use(require('serve-static')(path.resolve(__dirname, "../web/public/static")));

app.use(Express.static(path.resolve(__dirname, "../web/public/static")));

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));

// session 配置
const sessionConfig = conf.sessionConfig;
app.keys = sessionConfig.keys;
app.use(session(sessionConfig, app));


module.exports = app;


