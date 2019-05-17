/**
 * 源码编译目录
 */
module.exports.compiledDir = "build";

/**
 * 服务端口
 */
module.exports.serverPort = 9696;

// 用户会话相关配置
module.exports.sessionConfig = {
  secret: 'set your application secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 60000 }
}

/**
 * 中间件列表
 * @type {string[]}
 */
module.exports.middlewares = [
  "CustomErrorHandlerMiddleware",
  "HttpResponseHandleMiddleware"
];