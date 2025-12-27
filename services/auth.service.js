import AuthRepository from "../repositories/auth.repository.js";
import { generateToken } from "../config/jwt.config.js";
import AccountMapper from "../mappers/user.mapper.js";
import { deleteImageCloudinary } from "../middlewares/image.middleware.js";
class AuthService {
  async createNewAccount(data) {
    return await AuthRepository.create(data);
  }
  async login(data) {
    const { identifier, password } = data;
    //tim username co ton tai trong db k
    const user = await AuthRepository.IdentifyAccount(identifier);
    if (!user) throw new Error("Thông tin đăng nhập sai!");

    // ss mk
    const passwordCompare = await user.comparePassword(password);
    if (!passwordCompare) throw new Error("Thông tin đăng nhập sai");
    // tra ve login info + token
    const token = generateToken(user);

    return AccountMapper.mapToLoginResponse(user, token);
  }

  async updateAccountByUserId(id, data) {
    delete data.role;
    delete data.password;
    delete data.email;
    delete data.avatarURL;

    const user = await AuthRepository.updateById(id, data);

    if (!user) throw new Error("Không tìm thấy người dùng!");

    return AccountMapper.mapToUpdatedDetail(user);
  }

  async updateUserAvatar(userId, file) {
    const user = await AuthRepository.findById(userId);
    if (!user) throw new Error("Không tìm thấy người dùng!");

    if (user.avatarURL) {
      await deleteImageCloudinary(user.avatarURL, "mobile");
    }

    const updatedUser = await AuthRepository.updateById(userId, {
      avatarURL: file.path,
    });

    if (!updatedUser) throw new Error("Cập nhật ảnh đại diện thất bại!");

    const result = AccountMapper.mapToUpdatedDetail(updatedUser);

    if (result.avatarURL) {
      result.avatarURL = `${result.avatarURL}?t=${Date.now()}`;
    }

    return result;
  }
}

export default new AuthService();
