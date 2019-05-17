import { BusinessError } from "../businessError/businessError";
const logger = require("../utils/logger.js").getLogger("CustomErrorHandlerMiddleware.ts");
import { Middleware, ExpressErrorMiddlewareInterface } from "freedom-routing-controllers";
const format = require("string-format");

/**
 * 异常处理中间件
 * @class
 * @implements {ExpressErrorMiddlewareInterface}
 */
@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

  error(error: any, request: any, response: any, next: (err?: any) => any) {
    logger.error(`client request happen error:\r\nthe happen error request url is:\r\n${request.url}\r\nand the error stack message is \r\n${error.stack}`);
    if (error instanceof BusinessError) {
      response.send({
        errorCode: error.errorCode,
        message: error.message
      });
      return false;
    } else if (error.name === "BadRequestError") {
      let errorMsgObject = error.errors[0];
      let errorMsg = "";
      for (let key in errorMsgObject.constraints) {
        if (!errorMsg) {
          errorMsg = format(errorMsgObject.constraints[key], errorMsgObject.property);
        }
      }
      response.send({
        errorCode: 400,
        message: errorMsg
      });
      return false;
    } else {
      response.send({
        errorCode: 500,
        message: "服务器繁忙"
      });
      return false;
    }
  }
}