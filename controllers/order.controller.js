import BaseController from "./base.controller.js";
import ResponseHandler from "../utils/response.handler.js";
import OrderService from "../services/order.service.js";

class OrderController extends BaseController {
    constructor() {
        super(OrderService);
    }

    checkOut = async (req, res) => {
        try {
            const data = await OrderService.checkOut(req.user.id, req.body.address );
            ResponseHandler.success(res, data, "Cart is success");
        } catch (err) {
            ResponseHandler.error(res, err.message);
        }
    };

    
}

export default new OrderController();
