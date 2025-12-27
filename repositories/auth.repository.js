import BaseRepository from "./base.repository.js";
import User from "../models/user.model.js";

class AuthRepository extends BaseRepository {
  constructor() {
    super(User);
  }
  async IdentifyAccount(identifier) {
    const normalized = identifier.trim().toLowerCase();
    return User.findOne({
      $or: [{ email: normalized }, { phoneNumber: normalized }],
    }).select("+password");
  }
}

export default new AuthRepository();
