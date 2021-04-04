import Router from "koa-router";
import db from "../common/connection-db";
import { genGuidId } from "../uuid";
import { IDataResult } from "../core/handles/data-result";
import { notifications } from "../db-export-default/notifications";
import { HyperPaginated } from "../models/hyper-paginated";
import { NotificationService } from "../services/notification-service";
import {
  RESULT_CODE,
  RESULT_MESSAGE,
} from "../core/constants/result-constants";

const router = new Router({ prefix: "/api/notification" });
const model = db.initModels;
const notificationService = new NotificationService();
router.get("/get-notification", async (ctx: any, next: any) => {
  const body = ctx.request.query;
  const result: IDataResult = {};
  try {
    const countAllMessagesById = await notificationService.countAllNotificationsById(
      body.userId
    );
    let hyperPage: HyperPaginated = new HyperPaginated(
      body.page,
      body.pageSize
    );
    const pages = Math.ceil(countAllMessagesById / hyperPage.pageSize);
    await notificationService
      .getNotificationByPage(body.userId, hyperPage.offset, hyperPage.pageSize)
      .then((rs) => {
        result.status = RESULT_CODE.SUCCESS;
        result.data = rs;
        result.message = RESULT_MESSAGE.SUCCESS;
        result.totalPages = pages;
      })
    // .catch((err) => {
    //   result.status = RESULT_CODE.ERROR;
    //   (result.data = err), (result.message = RESULT_MESSAGE.ERROR);
    // });
  } catch (error) {
    result.status = RESULT_CODE.ERROR;
    result.message = error;
  }

  ctx.body = result;
});
router.post("/change-status-notification-by-user", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  try {
    const req = ctx.request.body;
    await notificationService
      .changeStatusAllNotificationByUser(req.userId, req.isRead)
      .then((rs) => {
        result.status = RESULT_CODE.SUCCESS;
        result.data = rs;
        result.message = RESULT_MESSAGE.SUCCESS;
      })
  } catch (error) {
    result.status = RESULT_CODE.ERROR;
    result.message = error;
  }

  ctx.body = result;
})

router.post("/change-status-notification-by-id", async (ctx: any, next: any) => {
  const body = ctx.request.query;
  const result: IDataResult = {};
  try {
    await notificationService
      .changeStatusNotification(body)
      .then((rs) => {
        result.status = RESULT_CODE.SUCCESS;
        result.data = rs;
        result.message = RESULT_MESSAGE.SUCCESS;
      })
  } catch (error) {
    result.status = RESULT_CODE.ERROR;
    result.message = error;
  }

  ctx.body = result;
});
router.get("/", async (ctx: any, next: any) => {
  const data = await model.notifications.findAll();

  ctx.body = {
    result: data,
  };
  ctx.status = 200;
  next();
});

router.post("/", async (ctx: any, next: any) => {
  const body = ctx.request.body;

  var id = genGuidId("notification");
  var userId = body.userId;
  var chatId = body.chatId;
  var chatRoomId = body.chatRoomId;
  var receiverId = body.receiverId;
  var content = body.content;
  var status = body.status;
  var type = body.type;
  var isRead = body.isRead;

  // await model.notification.create({
  //   id: id,
  //   user_id: userId,
  //   chat_id: chatId,
  //   chat_room_id: chatRoomId,
  //   receiver_id: receiverId,
  //   content: content,
  //   status: status,
  //   type: type,
  //   is_read: isRead,
  // }).then(()=>{
  //     ctx.body = {
  //         message: 'Success !!!'
  //     }
  // }).catch(()=>{
  //     ctx.body = {
  //         message: 'Failer !!!!'
  //     }
  // })
});
router.get("/count-notification", async (ctx: any, next: any) => {
  const body = ctx.request.query;
  const result: IDataResult = {};
  try {
    let resp = await notificationService.countNotificationsNotRead(body.userId);


    result.status = RESULT_CODE.SUCCESS;
    result.data = {
      notifi: resp
    };
    result.message = RESULT_MESSAGE.SUCCESS;

  } catch (error) {
    result.status = RESULT_CODE.ERROR;
    result.message = error;
  }

  ctx.body = result;
});

export default router;
