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
import { IhcmChatService } from "../services/ihcm-chat-service";

// -----------------------------
const promisePipe = require("promisepipe");
const fs = require("fs");
const path = require("path");
const router = new Router({ prefix: "/api/ihcm-chat" });

// chat of room chat
const model = db.initModels;
const multer = require("koa-multer");
const videoCallService = new VideoCallService();
const chatService = new ChatService();
const ihcmChatService = new IhcmChatService();

//vinhtq:10/03/2021 : test push stream box chat
router.post("/send-notification", async (ctx: any, next: any) => {
    const req = ctx.request.body;
    let result: IDataResult = {};
    await ihcmChatService
      .SendMessage(req)
      .then((rs) => {
        result=rs;
      })
      .catch((err) => {
        result.status = RESULT_CODE.ERROR;
        result.data = err;
        result.message = RESULT_MESSAGE.ERROR;
      });
    ctx.body = result;
});

// created by tuda - 11/03/2021
router.post("/send-room-id-to-box-chat", async (ctx: any, next) => {
  const req = ctx.request.body;
    let result: IDataResult = {};
    await ihcmChatService
      .sendRoomIdToBoxChat(req)
      .then((rs) => {
        result=rs;
      })
      .catch((err) => {
        result.status = RESULT_CODE.ERROR;
        result.data = err;
        result.message = RESULT_MESSAGE.ERROR;
      });
    ctx.body = result;
})

export default router;
