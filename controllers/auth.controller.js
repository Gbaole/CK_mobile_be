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
  async updateProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const updateData = req.body;

      const result = await AuthService.updateAccountByUserId(
        userId,
        updateData,
      );

      return res.status(200).json({
        success: true,
        message: "Cập nhật thông tin thành công",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateAvatar(req, res, next) {
    try {
      const userId = req.user.id;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng chọn ảnh đại diện để tải lên (key: 'avatar')",
        });
      }

      const result = await AuthService.updateUserAvatar(userId, file);

      return res.status(200).json({
        success: true,
        message: "Cập nhật ảnh đại diện thành công",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
