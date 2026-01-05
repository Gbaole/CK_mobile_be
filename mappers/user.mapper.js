import { UserSchema } from "../validators/output/user.output.validator.js";

class AccountMapper {
  /**
   * Chi tiết thông tin user
   */
  static mapToDetail(model) {
    if (!model) return null;

    const detailSchema = UserSchema.omit({
      createdAt: true,
      updatedAt: true,
      __v: true,
    });

    return detailSchema.parse({
      id: model._id.toString(),
      name: model.name,
      avatarURL: model.avatarURL,
      shippingAddress: model.shippingAddress,
      email: model.email,
      phoneNumber: model.phoneNumber,
      status: model.status,
      role: model.role,
    });
  }

  /**
   * Mapper cho kết quả Login
   */
  static mapToLoginResponse(model, token) {
    return {
      user: this.mapToDetail(model),
      token: token,
    };
  }

  static mapToUpdatedDetail(model) {
    if (!model) return null;

    const updatedSchema = UserSchema.omit({
      password: true,
      __v: true,
      createdAt: true,
      updatedAt: true,
    });

    return updatedSchema.parse({
      id: model._id.toString(),
      name: model.name,
      avatarURL: model.avatarURL,
      email: model.email,
      phoneNumber: model.phoneNumber,
      status: model.status,
      role: model.role,
      shippingAddress: model.shippingAddress,
    });
  }

  /**
   * Danh sách người dùng
   */
  static mapToListItem(model) {
    return {
      id: model._id.toString(),
      name: model.name,
      email: model.email,
      role: model.role,
      status: model.status,
      createdAt: model.createdAt.toISOString(),
    };
  }

  static mapToList(models) {
    return models.map((m) => this.mapToListItem(m));
  }
}

export default AccountMapper;
