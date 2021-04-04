import Router from "koa-router";
import { MessageServie } from "../services/message-service";

const messengerService: MessageServie = new MessageServie();
const router = new Router({ prefix: "/api/message" });

router.post("/", async (ctx: any, next: any) => {
  console.log("-----Received Message from Client-----");
  const req = ctx.request.body;
  console.log(req.chatId);
  messengerService.insertMessage(req.chatId, req);
  ctx.status = 200;
  next();
});

export default router;
