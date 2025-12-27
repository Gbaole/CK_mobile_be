import AuthRepository from "../repositories/auth.repository.js";
import { generateToken } from "../config/jwt.config.js";
import AccountMapper from "../mappers/user.mapper.js";
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
}

export default new AuthService();
