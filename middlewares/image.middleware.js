import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinaryConfig from "../config/cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryConfig,
  params: {
    folder: "mobile",
    allowed_formats: ["jpg", "png", "jpeg"],
    resource_type: "auto",
    public_id: (req, file) => {
      const userId = req.user?.id || "anonymous";
      return `avatar_${userId}_${Date.now()}`;
    },
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

export const uploadCloud = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
});

export const deleteImageCloudinary = async (url, folder = "mobile") => {
  if (!url) return null;

  try {
    const fileNameWithExtension = url.split("/").pop();
    const publicIdWithoutExtension = fileNameWithExtension.split(".")[0];

    const fullPublicId = `${folder}/${publicIdWithoutExtension}`;

    const result = await cloudinaryConfig.uploader.destroy(fullPublicId);

    // console.log(`[Cloudinary] Delete ${fullPublicId}:`, result.result);
    return result;
  } catch (error) {
    // console.error("[Cloudinary] Delete Error:", error.message);
    return null;
  }
};
