/**
 * 全站错误统一拦截中间件
 * @return {Function}
 */
import { Middleware, ExpressMiddlewareInterface } from "freedom-routing-controllers";
const format = require("string-format");

/**
 * 异常处理中间件
 * @class
 * @implements {ExpressMiddlewareInterface}
 */
@Middleware({ type: "after" })
export class ExceptionMiddleware implements ExpressMiddlewareInterface {

	use(request: any, response: any, next: (error?: any) => any): void {
		console.log("do something...");
		next();
	}
}
