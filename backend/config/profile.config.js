import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
folder: "profile_upload" , // folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],  },
});
const upload = multer({ storage });
export default upload;