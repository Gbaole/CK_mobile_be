import BaseController from "./base.controller.js";
import ResponseHandler from "../utils/response.handler.js";
import OrderService from "../services/order.service.js";

class OrderController extends BaseController {
  constructor() {
    super(OrderService);
  }
  getOrdersByUser = async (req, res) => {
    try {
      const userId = req.user.id;

      const orders = await OrderService.getOrdersByUserId(userId);

      ResponseHandler.success(res, orders, "Lấy danh sách đơn hàng thành công");
    } catch (err) {
      ResponseHandler.error(res, err.message);
    }
  };

  checkOut = async (req, res) => {
    try {
      const data = await OrderService.checkOut(req.user.id, req.body.address);
      ResponseHandler.success(res, data, "Create order successfully");
    } catch (err) {
      ResponseHandler.error(res, err.message);
    }
  };
}

export default new OrderController();
