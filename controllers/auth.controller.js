import BaseController from "./base.controller.js";
import AuthService from "../services/auth.service.js";
import ResponseHandler from "../utils/response.handler.js";

class AuthController extends BaseController {
  constructor() {
    super(AuthService);
  }

  // Hiển thị tất cả danh mục
  createNewAccount = async (req, res) => {
    try {
      const data = await AuthService.createNewAccount(req.body);
      ResponseHandler.success(res, data, "User created successfully");
    } catch (err) {
      ResponseHandler.error(res, err.message);
      console.error(err);
    }
  };
  login = async (req, res) => {
    try {
      const data = await AuthService.login(req.body);
      ResponseHandler.success(res, data, "Login successfully");
    } catch (err) {
      ResponseHandler.error(res, err.message);
      console.error(err);
    }
  };
}

export default new AuthController();
