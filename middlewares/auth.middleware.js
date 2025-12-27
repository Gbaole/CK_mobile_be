import { verifyToken } from "../config/jwt.config.js"; // Thêm .js nếu cần

export function authenticationMiddleware(req, res, next) {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Bạn cần đăng nhập để thực hiện hành động này.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);

    req.user = payload;

    next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError"
        ? "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại."
        : "Xác thực không thành công.";

    return res.status(401).json({
      success: false,
      message,
    });
  }
}
export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy thông tin xác thực.",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Quyền truy cập bị từ chối.",
      });
    }

    next();
  };
}
