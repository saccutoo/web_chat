import Router from "koa-router";
import db from "../common/connection-db";
import {
  RESULT_CODE,
  RESULT_MESSAGE
} from "../core/constants/result-constants";
import { IDataResult } from "../core/handles/data-result";
import { chats } from "../db-export-default/chats";
import { Chat } from '../models/chat';
import { ChatService } from "../services/chat-service";
import { VideoCallService } from "../services/video-call-service";
import { genGuidId } from "../uuid";

// -----------------------------
const promisePipe = require("promisepipe");
const fs = require("fs");
const path = require("path");
const router = new Router({ prefix: "/api/videocall" });

// chat of room chat
const model = db.initModels;
const multer = require("koa-multer");
const videoCallService = new VideoCallService();
const chatService = new ChatService();

// push stream video call
router.post("/push-stream-video-call", async (ctx: any, next: any) => {
    const req = ctx.request.body;
    let result: IDataResult = {};
    console.log("test_send_message_1 : ", req);
    await videoCallService
      .pubStreamVideoCall(req)
      .then((rs) => {
        result.status = RESULT_CODE.SUCCESS;
        result.data = rs;
        result.message = RESULT_MESSAGE.SUCCESS;
      })
      .catch((err) => {
        result.status = RESULT_CODE.ERROR;
        result.data = err;
        result.message = RESULT_MESSAGE.ERROR;
      });
    ctx.body = result;
  });

// thêm mới trạng thái tin nhắn khi call video
router.post("/status-video-call", async (ctx: any, next: any) => {
    const result: IDataResult = {};
    try {
      var message=ctx.request.body;
      await videoCallService
      .insertMessage(message)
      .then((rs) => {
        result.status = RESULT_CODE.SUCCESS;
        result.data = rs;
        result.message = RESULT_MESSAGE.SUCCESS;
      })
      .catch((err) => {
        result.status = RESULT_CODE.ERROR;
        result.data = err;
        result.message = RESULT_MESSAGE.ERROR;
      });
    } catch (error) {
      result.status = RESULT_CODE.ERROR; //trạng thái thất bại
      result.message = "err:" + error; //tin nhắn lỗi trả về
    }
    ctx.body = result;
});
  
  
export default router;
