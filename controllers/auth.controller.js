import BaseController from "./base.controller.js";
import AuthService from "../services/auth.service.js";
import ResponseHandler from "../utils/response.handler.js";

class AuthController extends BaseController {
  constructor() {
    super(AuthService);
  }

  createNewAccount = async (req, res) => {
    try {
      const data = await AuthService.createNewAccount(req.body);
      ResponseHandler.success(res, data, "User created successfully", 201);
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

  updateProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const updateData = req.body;

      const result = await AuthService.updateAccountByUserId(
        userId,
        updateData
      );

      ResponseHandler.success(res, result, "Cập nhật thông tin thành công");
    } catch (err) {
      ResponseHandler.error(res, err.message);
    }
  };

  updateAvatar = async (req, res) => {
    try {
      const userId = req.user.id;
      const file = req.file;

      if (!file) {
        return ResponseHandler.error(
          res,
          "Vui lòng chọn ảnh đại diện để tải lên (key: 'avatar')",
          400
        );
      }

      const result = await AuthService.updateUserAvatar(userId, file);

      ResponseHandler.success(res, result, "Cập nhật ảnh đại diện thành công");
    } catch (err) {
      ResponseHandler.error(res, err.message);
    }
  };
}

export default new AuthController();
