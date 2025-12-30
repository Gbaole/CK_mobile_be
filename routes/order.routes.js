import express from "express";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";
import { validateData } from "../middlewares/validate.middleware.js";
import { checkOutSchema } from "../validators/input/order.input.validator.js";
import OrderController from "../controllers/order.controller.js";
const orderRouter = express.Router();


orderRouter.post("/check-out",
    authenticationMiddleware,
    validateData({ body: checkOutSchema }),
    OrderController.checkOut
);



export default orderRouter;
