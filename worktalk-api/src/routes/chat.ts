import Router from "koa-router";
import db from "../common/connection-db";
import {
  RESULT_CODE,
  RESULT_MESSAGE,
} from "../core/constants/result-constants";
import { IDataResult } from "../core/handles/data-result";
import { chats } from "../db-export-default/chats";
import { HyperPaginated } from "../models/hyper-paginated";
import { ChatService } from "../services/chat-service";
import { genGuidId } from "../uuid";
import { Sequelize } from 'sequelize';
import { $bean } from "../core/utils/hyd/hyd-bean-utils";
import { elasticSearchService } from "../core/utils/elastic-search/elastic-search-services";

// -----------------------------
const promisePipe = require("promisepipe");
const fs = require("fs");
const path = require("path");
const router = new Router({ prefix: "/api/chat" });

// chat of room chat
const model = db.initModels;
const multer = require("koa-multer");
const upload = multer({ dest: "uploads/" });
const chatService = new ChatService();

router.get("/get-messages", async (ctx: any, next: any) => {
  const body = ctx.request.query;
  let result: IDataResult = {};
  const countAllMessagesById = await chatService.countAllChatsById(
    body.roomId
  );
  console.log("🚀 ~ file: chat.ts ~ line 32 ~ router.get ~ countAllMessagesById", countAllMessagesById)
  let hyperPage: HyperPaginated = new HyperPaginated(
    body.page,
    body.pageSize
  );
  const pages = Math.ceil(countAllMessagesById / hyperPage.pageSize);
  await chatService
    .getMessageByPage(body.roomId, hyperPage.offset, hyperPage.pageSize)
    .then((rs) => {
      result.status = RESULT_CODE.SUCCESS;
      result.data = rs;
      result.message = RESULT_MESSAGE.SUCCESS;
      result.totalPages = pages;
    })
    .catch((err) => {
      console.log("🚀 ~ file: chat.ts ~ line 46 ~ router.get ~ err", err)
      result.status = RESULT_CODE.ERROR;
      result.data = err;
      result.message = RESULT_MESSAGE.ERROR;
    });
  ctx.body = result;
});

// create a message
router.post("/send-message", async (ctx: any, next: any) => {
  console.log("test_send_message_0: ", ctx.request);
  const req = ctx.request.body;
  let result: IDataResult = {};
  console.log("test_send_message_1 : ", req);
  await chatService
    .insertMessage(req)
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

router.post("/send-first-message", async (ctx: any, next: any) => {
  console.log("test_send_message_0: ", ctx.request);
  const req = ctx.request.body;
  let result: IDataResult = {};
  console.log("test_send_message_1 : ", req);
  if ($bean.isNotNil(req.chatRoomId)) {
    await chatService
      .insertFirstMessage(req)
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
  }
});

// chỉnh sửa tin nhắn
router.put("/update-message", async (ctx: any) => {
  let result: IDataResult = {}

  let chatBody: any = { ...ctx.request.body };
  console.log("🚀 ~ file: chat.ts ~ line 104 ~ router.put ~ chatBody", chatBody)
  await chatService.updateMessage(chatBody).then(res => {
    result.status = RESULT_CODE.SUCCESS;
    result.data = res;
    result.message = RESULT_MESSAGE.SUCCESS;
  }).catch(err => {
    result.status = RESULT_CODE.ERROR;
    result.data = err
    result.message = RESULT_MESSAGE.ERROR;
  });


  ctx.body = result;
});


// xóa tin nhắn
router.put("/remove-message", async (ctx: any) => {
  let result: IDataResult = {}
  let chatBody: any = ctx.request.body;
  console.log("🚀 ~ file: chat.ts ~ line 99 ~ router.put ~ chatBody", chatBody)
  await chatService.removeMessage(chatBody).then(res => {
    result.status = RESULT_CODE.SUCCESS;
    result.data = res;
    result.message = RESULT_MESSAGE.SUCCESS;
  }).catch(err => {
    console.log("er", err);
    result.status = RESULT_CODE.ERROR;
    result.data = err
    result.message = RESULT_MESSAGE.ERROR;
  });


  ctx.body = result;
});



// hungdm - Get Chat info by ID - Params: id - string
router.get("getChatById", async (ctx: any, next: any) => {
  let result: IDataResult = {}
  await chatService.getChatById(ctx.request.query.id)
    .then(res => {
      result = {
        message: RESULT_MESSAGE.SUCCESS,
        data: res,
        status: RESULT_CODE.SUCCESS,
      }
    }).catch(err => {
      result = {
        message: RESULT_MESSAGE.ERROR,
        data: err,
        status: RESULT_CODE.ERROR
      }
    });



});

// hungdm - Lấy danh sách list danh bạ - Cập nhật: 22/02  Thêm phân trang
router.post("/list-contact", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  try {
    const body = ctx.request.body;
    let hyperPage: HyperPaginated = new HyperPaginated(
      body.page,
      body.pageSize
    );

    const countAllUsers = await chatService.GetCountListContactWithMessage(body.userId);

    let pages = Math.ceil(countAllUsers / hyperPage.pageSize);
    let skip = hyperPage.pageSize * (hyperPage.page - 1);
    const result: IDataResult = {
      status: RESULT_CODE.SUCCESS,
      data: await chatService.GetListContact(body.userId, skip, hyperPage.pageSize),
      message: RESULT_MESSAGE.SUCCESS,
      totalPages: pages
    };
    ctx.body = result;
  } catch (error) {
    const result: IDataResult = {
      status: RESULT_CODE.ERROR,
      data: error,
      message: RESULT_MESSAGE.ERROR,
    };
    ctx.body = result;
  }
});

// hungdm - Lấy danh sách Link trong nhóm chát - Có phân trang - sắp xếp theo thời gian tạo
router.get("/list-link", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  try {
    const body = ctx.request.query;
    let hyperPage: HyperPaginated = new HyperPaginated(
      body.page,
      body.pageSize
    );
    const countAll = await chatService.CountAllLinkInRoomChat(body.chatRoomId);
    let pages = Math.ceil(countAll / hyperPage.pageSize);
    let skip = hyperPage.pageSize * (hyperPage.page - 1);
    const result: IDataResult = {
      status: RESULT_CODE.SUCCESS,
      data: await chatService.GetAllLinkInRoom(body.chatRoomId, skip, hyperPage.pageSize),
      message: RESULT_MESSAGE.SUCCESS,
      totalPages: pages
    };
    ctx.body = result;
  } catch (error) {
    const result: IDataResult = {
      status: RESULT_CODE.ERROR,
      data: error,
      message: RESULT_MESSAGE.ERROR
    };
    ctx.body = result;
  }
});


router.get("/ListChat", async (ctx: any, next: any) => {
  try {
    const ListChat = await chatService.findAll();
    ctx.body = { result: ListChat, message: "success" };
    ctx.status = 200;
  } catch (error) {
    ctx.body = { message: "error" };
    ctx.status = 500;
  }
});


// thêm mới trạng thái tin nhắn khi call video
router.post("/status-video-call", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  try {
    let chatBody: chats = { ...ctx.request.body }; //gán dữ liệu truyền vào với đối tượng chat
    chatBody.id = genGuidId("chat"); //sinh id bản ghi
    chatBody.createdAt = new Date(); //thời gian tạo
    chatBody.updatedAt = chatBody.createdAt; //thời gian update
    chatBody.timeVideoCall = chatBody.createdAt; //thời gian cuộc gọi
    await chatService
      .create(chatBody)
      .then(() => {

        result.status = RESULT_CODE.SUCCESS; //trạng thái thành công
        result.data = chatBody; //dữ liệu bản ghi trả về
        result.message = RESULT_MESSAGE.SUCCESS; //tin nhắn thành công trả về
      })
      .catch((err) => {
        result.status = RESULT_CODE.ERROR; //trạng thái thất bại
        result.message = "err:" + err; //tin nhắn lỗi trả về
      });
  } catch (error) {
    result.status = RESULT_CODE.ERROR; //trạng thái thất bại
    result.message = "err:" + error; //tin nhắn lỗi trả về
  }
  ctx.body = result;
});


router.get("/search-messages", async (ctx: any) => {
  const query = ctx.request.query;
  let result: IDataResult = {};
  try {
    if (query.searchText.trim()) {

      const countSearchMessages = await chatService.countSearchChats(
        query.roomId, query.searchText
      );
      const hyperPage: HyperPaginated = new HyperPaginated(
        query.page,
        query.pageSize);
      const pages = Math.ceil(countSearchMessages[0].count / hyperPage.pageSize);
      console.log("🚀 ~ file: chat.ts ~ line 404 ~ router.get ~ countSearchMessages", countSearchMessages)
      let res = await chatService.searchMessages(
        query.roomId,
        query.searchText,
        hyperPage.offset,
        hyperPage.pageSize
      )


      result.status = RESULT_CODE.SUCCESS;
      result.data = res.body.hits.hits;
      result.message = RESULT_MESSAGE.SUCCESS;
      result.totalPages = pages;

    }
  } catch (error) {
    console.log("🚀 ~ file: chat.ts ~ line 46 ~ router.get ~ error", error.body)
    result.status = RESULT_CODE.ERROR;
    result.data = error;
    result.message = RESULT_MESSAGE.ERROR;
  }


  ctx.body = result;
});


router.get("/get-page-by-message", async (ctx: any) => {
  const query = ctx.request.query;
  const positionMess = await chatService.getPosMessById(query.roomId, query.messId);
  console.log("🚀 ~ file: chat.ts ~ line 402 ~ router.get ~ positionMess", positionMess)
  const currentPage = Math.ceil(positionMess[0].position / query.pageSize);
  console.log("🚀 ~ file: chat.ts ~ line 404 ~ router.get ~ currentPage", currentPage.toString())
  let hyperPage: HyperPaginated = new HyperPaginated(
    currentPage.toString(),
    query.pageSize
  );
  console.log("🚀 ~ file: chat.ts ~ line 405 ~ router.get ~ hyperPage", hyperPage)

  let result: IDataResult = {};
  await chatService.
    getMessageByPage(query.roomId, hyperPage.offset, hyperPage.pageSize)
    .then((res) => {
      result.status = RESULT_CODE.SUCCESS;
      result.data = res;
      result.currentPage = currentPage;
      result.idxRecord = positionMess[0].position % query.pageSize;
      result.message = RESULT_MESSAGE.SUCCESS;
    })
    .catch((err) => {
      result.status = RESULT_CODE.ERROR;
      result.data = err;
      result.message = RESULT_MESSAGE.ERROR;
    });
  ctx.body = result;
})

router.get("/sync-to-elasticsearch", async (ctx: any) => {
  let result: IDataResult = {};

  try {
    const res = await chatService.syncToElasticSearch()
    for (let i = 0; i < res.length; i++) {
      let insertEl = await elasticSearchService.insertElasticSearch(res[i])
      console.log("🚀 ~ file: chat.ts ~ line 340 ~ router.get ~ insertEl", insertEl)
    }
    result.status = RESULT_CODE.SUCCESS;
    result.data = res;
    result.message = RESULT_MESSAGE.SUCCESS;
  }
  catch (err) {
    result.status = RESULT_CODE.ERROR;
    result.data = err;
    result.message = RESULT_MESSAGE.ERROR;
  };
  ctx.body = result;
})
//hungdm - bắn thông báo khi người dùng được tag tên
router.post("/push-notification", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  const data = ctx.request.body;
  try {
    const response = await chatService.insertNotificationTagName(data.chatRoomId, data.userId, data.userIdSend);
    result.status = response.status;
    result.message = response.message;
  } catch (error) {
    result.status = RESULT_CODE.ERROR; //trạng thái thất bại
    result.message = "err:" + error; //tin nhắn lỗi trả về
  }
  ctx.body = result;
});


export default router;
