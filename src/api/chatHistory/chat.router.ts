import { Router } from "express";
import { getAllChats, getChatMessages } from "./chat.controller";

const chatRouter = Router();

chatRouter.get("/", getAllChats);
chatRouter.get("/:chatId", getChatMessages);

export default chatRouter;
