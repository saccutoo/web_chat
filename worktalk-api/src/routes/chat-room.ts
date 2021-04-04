import { Sequelize } from "sequelize";

import Router from "koa-router";
import db from "../common/connection-db";
import { genGuidId } from "../uuid";
import { ChatRoomService } from "../services/chat-room-service";
import { IDataResult } from "../core/handles/data-result";
import { HyperPaginated } from "../models/hyper-paginated";
import {
  RESULT_CODE,
  RESULT_MESSAGE,
} from "../core/constants/result-constants";
import { $bean } from "../core/utils/hyd/hyd-bean-utils";
import { any } from "sequelize/types/lib/operators";
import { elasticSearchService } from "../core/utils/elastic-search/elastic-search-services";


const promisePipe = require("promisepipe");
const fs = require("fs");
const path = require("path");
// @ts-ignore
const Op = Sequelize.Op;
const router = new Router({ prefix: "/api/chat-rooms" });
const model = db.initModels;
const chatRoomService: ChatRoomService = new ChatRoomService();

// Get all
// quyennq 13/3 edit lisst chatroom theem user 
router.get("/", async (ctx: any, next) => {
  let result: IDataResult = {};

  const body = ctx.request.query;

  const hyperPage: HyperPaginated = new HyperPaginated(
    body.page,
    body.pageSize
  );
  const countAllUsers = await chatRoomService.countAllChatRoomByMember(body.userId);
  const pages = Math.ceil(countAllUsers / hyperPage.pageSize);
  let data = await chatRoomService.getChatRoomByPage(
    hyperPage.offset,
    hyperPage.pageSize,
    body.userId
  )
  // Lặp list data để gán dữ liệu chatroom members vào
  for (let i = 0; i < data.length; i++) {
    let listUser = await chatRoomService.getListUserByChatRoomId(data[i].id);
    console.log('------------------------------------------')
    data[i].dataValues.chat_room_members = listUser
  }
  result = {
    status: RESULT_CODE.SUCCESS,
    data: data,
    message: RESULT_MESSAGE.SUCCESS,
    totalPages: pages
  };

  ctx.body = result;
});

// ---------------------------------------------
function validateRequestAddChatRoom(ctx: any, result: any) {
  const chatRoom = ctx.request.body;
  result.status = RESULT_CODE.ERROR;
  result.data = chatRoom;

  if ($bean.isNil(chatRoom.type)) {
    result.message = "Kiểu phòng chat không được để trống!";
    return true;
  }
  // if ($bean.isNil(chatRoom.avatar)) {
  //   result.message = "Avatar không đươc để trống!";
  //   return true;
  // }
  // if ($bean.isNil(chatRoom.slogan)) {
  //   result.message = "Slogan không được để trống!";
  //   return true;
  // }
  if ($bean.isNil(chatRoom.title)) {
    result.message = "Tên nhóm không được để trống!";
    return true;
  }
  if ($bean.isNil(chatRoom.chatRoomMemberList) || (chatRoom.chatRoomMemberList ? chatRoom.chatRoomMemberList.lengh == 0 : true)) {
    result.message = "Danh sách thành viên không được để trống !";
    return true;
  }
  return false;
}


router.post("/", async (ctx: any, next: any) => {
  console.log("------Request success------");
  const chatRoom = ctx.request.body;
  console.log("test_chat_room:", chatRoom);
  console.log(chatRoom);
  var result: IDataResult = {};
  if (await !validateRequestAddChatRoom(ctx, result)) {
    chatRoom.chatRoomMemberList = JSON.parse(chatRoom.chatRoomMemberList);
    const response = await chatRoomService.createChatRoom(chatRoom);
    result = {
      status: RESULT_CODE.SUCCESS,
      data: response,
      message: RESULT_MESSAGE.SUCCESS,
    };
  }
  ctx.body = result;
  next();
});

// get chat room and member of room by tuda
router.get("/findById", async (ctx: any, next: any) => {
  const chatRoom: any = ctx.request.query;
  if ($bean.isNotNil(chatRoom.id)) {
    var chatRoomMemberRes = await chatRoomService.findById(chatRoom.id);
    ctx.body = { result: chatRoomMemberRes };
    ctx.status = 200;
  }
  next();
});

/*
* created by tuda
* get single room chat of 2 userId
*/
router.post("/getSingleRoom", async (ctx: any, next: any) => {
  const userIdList: any[] = ctx.request.body.userIdList;
  const singleRoomMember = 2;
  let result: IDataResult = {};
  if ($bean.isNotNil(userIdList) && userIdList.length == singleRoomMember) {
    try {
      const chatRoomRes = await chatRoomService.getSingleRoom(userIdList);
      result = {
        status: RESULT_CODE.SUCCESS,
        data: chatRoomRes,
        message: RESULT_MESSAGE.SUCCESS,
      };
      ctx.body = result;
    } catch (error) {
      result = {
        status: RESULT_CODE.ERROR,
        data: error,
        message: RESULT_MESSAGE.ERROR
      };
      ctx.body = result;
    }
  } else {
    result = {
      status: RESULT_CODE.ERROR,
      data: RESULT_MESSAGE.REQUEST_VALIDATE,
      message: RESULT_MESSAGE.ERROR
    };
    ctx.body = result;
  }
  next();
})

router.delete("/", async (ctx: any, next: any) => {
  console.log("------Request success------");
  const chatRoom = {
    id: ctx.request.query.id,
    userId: ctx.request.query.userId,
  };
  if ($bean.isNotNil(chatRoom.id)) {
    const response = await chatRoomService.deleteChatRoom(chatRoom);
    const result: IDataResult = {
      status: response.status,
      message: response.message,
    };
    ctx.body = result;
  }
  next();
});

// Get chat room - id
router.get("/chat-room/:id", async (ctx: any, next: any) => {
  console.log("test chat room id ...");

  var chatroom = await model.chat_rooms.findAll({
    where: { id: ctx.params.id },
    attributes: ["id", "title", "status", "avatar", "type"],
    include: [
      {
        // model: model.chat,
        attributes: [
          "message",
          "messageType",
          "messageStatus",
          "userId",
          "createdAt",
        ],
        include: [
          {
            // model: model.user,
            required: true,
            attributes: ["userName", "status", "lastLogin", "avatar"],
          },
          {
            // model: model.attachment,
            // required:true,
            attributes: ["contentType", "name", "type", "status", "path"],
          },
        ],

        order: [["createdAt", "DESC"]],
        // limit: limit,
        // offset:offset
      },
    ],
  });
  ctx.body = { result: chatroom };
  ctx.status = 200;
  next();
});

/// --------------------------------------------
router.get("/chat-room/:id/:page/:limit", async (ctx: any, next: any) => {
  console.log("test chat room id ...");

  const dataCount = model.chats.findAndCountAll({
    // where: { chat_room_id: ctx.params.id },
  });

  var id = ctx.params.id;
  var page = ctx.params.page;
  var limit = ctx.params.limit;

  var offset = 0;
  let pages = Math.ceil((await dataCount).count / limit);
  offset = limit * (page - 1);

  var chatroom = await model.chat_rooms.findAll({
    where: { id: ctx.params.id },
    attributes: ["id", "title", "status", "avatar", "type"],
    include: [
      {
        // model: model.chat,
        attributes: [
          "message",
          "message_type",
          "message_status",
          "user_id",
          "created_at",
        ],
        include: [
          {
            // model: model.user,
            required: true,
            attributes: ["user_name", "status", "last_login", "avatar"],
          },
          {
            // model: model.attachment,
            // required:true,
            attributes: ["content_type", "name", "type", "status"],
          },
        ],

        order: [["created_at", "DESC"]],
        limit: limit,
        // offset:offset
      },
    ],
  });
  ctx.body = { result: chatroom };
  ctx.status = 200;
  next();
});

// add chat room
router.post("/add-chat-room", async (ctx: any, next: any) => {
  console.log("test create chat room:", ctx.request.body);
  var id = genGuidId("chat_room");
  const body = ctx.request.body;
  var title = body.title;
  var createBy = body.createBy;
  var type = body.type;
  var status = body.status;
  var slogan = body.slogan || "";
  var description = body.description || "";
  // var avatar = body.avatar || "";
  //@ts-ignore
  var file = ctx.request.files.avatar;
  var path_file_server;
  const fileName = file.name;
  const readStream = fs.createReadStream(file.path);
  const writeStream = fs.createWriteStream(path.join("uploads", fileName));
  var userId = body.userId;

  // save avatar to server

  await promisePipe(
    readStream.on("error", () => {
      //@ts-ignore
      throw new Error({
        errors: "File Read Error",
      });
    }),
    writeStream.on("error", () => {
      //@ts-ignore
      throw new Error({
        errors: "Write Error",
      });
    })
  ).then(() => {
    console.log("RESULT : ", writeStream.path);
    path_file_server = "https://172.20.50.98:3000/uploads/" + fileName;
  });

  // await model.chat_rooms.create({
  //   id: id,
  //   createdBy: createBy,
  //   title: title,
  //   type: type,
  //   status: status,
  //   slogan: slogan,
  //   avatar: path_file_server,
  //   description: description,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });

  for (var i = 0; i < userId.length; i++) {
    console.log("Insert user to chat room");

    //   await model.chat_room_member
    //     .create({
    //       id: genGuidId("chat-room-member"),
    //       chatRoomRd: id,
    //       userId: userId[i],
    //       // status: 1,
    //       isAdmin: userId[i] == createBy ? 1 : 0,
    //       createdBy: createBy,
    //       updatedBy: createBy,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     })
    //     .catch(() => {
    //       console.log("ERR : ", i);
    //     });
  }

  ctx.body = {
    message: "Thêm nhóm chat thành công",
    result: {
      id: id,
      title: title,
      createBy: createBy,
      type: type,
      status: status,
      userId: userId,
    },
  };

  ctx.status = 200;
  next();
});

// xóa chat room id

router.post("/delete-chat-room", async (ctx: any, next: any) => {
  const body = ctx.request.body;
  console.log("Test delete a room chat : ", body);

  await model.chat_rooms
    .destroy({
      where: { id: body.id },
    })
    .then((result) => {
      console.log("RESULT :", result);
      ctx.body = { message: "xóa thành công" };
    })
    .catch((err) => {
      ctx.body = { message: "không xóa được", error: err };
    });
  ctx.status = 200;
  next();
});

// tìm kiếm nhóm chat

router.post("/search-chat-room/:page", async (ctx: any, next: any) => {
  const body = ctx.request.body;
  console.log("Test search room : ", ctx.request.body);

  let limit = 3; // number of records per page
  let offset = 0;
  let page = ctx.params.page;
  offset = limit * (page - 1);

  const list_chat_room = await model.chat_rooms.findAll({
    attributes: ["id", "title", "status", "avatar", "type"],
    include: [
      {
        // model: model.chat,
        attributes: ["message", "messageType", "messageStatus", "createdAt"],

        limit: 1,
        order: [["created_at", "DESC"]],
      },
      {
        // model: model.user,
        attributes: ["avatar", "userName", "status", "createdAt"],
      },
    ],
    where: {
      title: {
        // $like:
        [Op.like]: `%${body.text}%`,
      },
    },
    order: [["created_at", "DESC"]],
    offset: offset,
    limit: limit,
  });

  // let pages = Math.ceil(list_chat_room.length / limit);

  ctx.body = {
    result: list_chat_room,
    page: page,
  };
  ctx.status = 200;
});

// sửa nhóm chat

router.post("/update-room-chat/:id", async (ctx: any, next: any) => {
  console.log("Test update room chat : ", ctx.request.body);

  const body = ctx.request.body;
  var id = ctx.params.id;
  var title = body.title;
  var slogan = body.slogan;
  var description = body.description;
  var avatar = body.avatar;
  await model.chat_rooms.update(
    {
      title: title,
      slogan: slogan,
      description: description,
      avatar: avatar,
      // updated_at: new Date(),
    },
    { where: { id: id } }
  );

  ctx.body = {
    result: {
      id: id,
      title: title,
      slogan: slogan,
      description: description,
      avatar: avatar,
      updated_at: new Date(),
    },
  };
  ctx.status = 200;
});

// hungdm - Get Detail By ID
// hungdm - Them check xem trong nhóm có ai online ngoài user_id đăng nhập vào hay không
router.get("/detail", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  const body = ctx.request.query;
  try {
    let data = await chatRoomService.GetDetailByID(body.chatRoomId);
    // Check xem co ai online hay không ??
    let countOnline = await chatRoomService.countMemberOnlineInGroup(body.chatRoomId, body.userId);
    //thêm trường isOnline - để biết trạng thái online của nhóm
    data.dataValues.isOnline = 0;
    if (countOnline > 0) {
      data.dataValues.isOnline = 1;
    }
    const result: IDataResult = {
      status: RESULT_CODE.SUCCESS,
      data: data,
      message: RESULT_MESSAGE.SUCCESS,
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


//vinhtq : cập nhật avatar nhóm chat

router.post("/update-avatar-or-title-room-chat", async (ctx: any, next: any) => {
  const body = ctx.request.body;
  const result: IDataResult = {};
  try {
    var message = ctx.request.body;
    await chatRoomService
      .UpdateAvatarOrRoomName(message)
      .then((rs) => {
        if (rs.status == RESULT_CODE.ERROR) {
          result.status = rs.status;
          result.message = rs.message;
        }
        else {
          result.status = RESULT_CODE.SUCCESS;
          result.message = RESULT_MESSAGE.SUCCESS;
        }
      })
      .catch((err) => {
        result.status = RESULT_CODE.ERROR;
        result.message = RESULT_MESSAGE.ERROR;
      });
  } catch (error) {
    result.status = RESULT_CODE.ERROR; //trạng thái thất bại
    result.message = "err:" + error; //tin nhắn lỗi trả về
  }
  ctx.body = result;
});

// hungdm - Get Detail By ID
router.get("/list-chat-by-user", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  const body = ctx.request.query;
  try {
    const result: IDataResult = {
      status: RESULT_CODE.SUCCESS,
      data: await chatRoomService.GetListChatRoomByUserID(body.userId),
      message: RESULT_MESSAGE.SUCCESS
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

// quyennq: sync data to elasticsearch
router.get("/sync-to-elasticsearch", async (ctx: any, next: any) => {
  let result: IDataResult = {};
  try {
    const data = await chatRoomService.syncToElasticSearch();
    for (let i = 0; i < data.length; i++) {
      let insertEl = await elasticSearchService.insertElasticSearch(data[i]);
      console.log("🚀 ~ file: chat-room.ts ~ line 538 ~ router.get ~ data[i]", data[i])
    }
    result = {
      status: RESULT_CODE.SUCCESS,
      data: data,
      message: RESULT_MESSAGE.SUCCESS
    };

  } catch (error) {
    result = {
      status: RESULT_CODE.ERROR,
      data: error,
      message: RESULT_MESSAGE.ERROR
    };
  }
  ctx.body = result;
});
// quyennq : search chatroom elasticsearch
router.get("/search", async (ctx: any, next) => {
  let result: IDataResult = {};
  try {


    const body = ctx.request.query;

    const hyperPage: HyperPaginated = new HyperPaginated(
      body.page,
      body.pageSize
    );
    const countAllUsers = await chatRoomService.countAllChatRoomByMember(body.userId);
    const pages = Math.ceil(countAllUsers / hyperPage.pageSize);
    console.log("🚀 ~ file: chat-room.ts ~ line 578 ~ router.get ~ body.searchText", body.searchText)

    let searchQuery = {
      query: {
        bool: {
          should: [
            {
              match_phrase_prefix: {
                title: body.searchText,
              }
            },
            {
              match_phrase_prefix: {
                userName: body.searchText
              }
            },
          ]
        }
      },
      from: hyperPage.offset,
      size: hyperPage.pageSize
    }
    console.log("🚀 ~ file: chat-room.ts ~ line 592 ~ router.get ~ searchQuery", searchQuery)
    let data = await elasticSearchService.searchElasticSearch(searchQuery)
    result = {
      status: RESULT_CODE.SUCCESS,
      data: data.body.hits.hits,
      message: RESULT_MESSAGE.SUCCESS,
      totalPages: pages
    };
  } catch (error) {
    result.status = RESULT_CODE.ERROR;
    result.data = error;
    result.message = RESULT_MESSAGE.ERROR;
  }
  ctx.body = result;
});

export default router;
