import express from "express";
import uploads from "../config/messageImage.config.js";
import { authMiddle } from "../middlewares/authMiddle.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/messageControllers.js";
const msgRouter = express.Router();
msgRouter.get("/users", authMiddle, getUsersForSidebar );
msgRouter.get("/:id", authMiddle, getMessages);
msgRouter.post("/send/:id", authMiddle, uploads.single("image"),sendMessage);
export default msgRouter;