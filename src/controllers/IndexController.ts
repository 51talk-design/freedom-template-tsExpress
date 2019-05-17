import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Ctx,
  Render
} from "freedom-routing-controllers";
import { BusinessError } from "../businessError/businessError";
import { HttpResponseCodeEnum } from "../common/enum/httpResponseCodeEnum";

/**
 * 主页控制器
 * @class
 */
@Controller()
export class IndexController {

  /**
   * 主页
   * @return {string} 返回主页模板html
   */
  @Get("/")
  @Render("index.html")
  async getIndexAction(@Ctx() ctx): Promise<any> {
    //throw new BusinessError(HttpResponseCodeEnum.Forbidden, "未授权，不能访问");
    return {
      title: "51talk大前端倾心打造"
    };
  }
}