import Router from "koa-router";
import db from "../common/connection-db";
import { RESULT_CODE, RESULT_MESSAGE } from "../core/constants/result-constants";
import { IDataResult } from "../core/handles/data-result";
import { $bean } from "../core/utils/hyd/hyd-bean-utils";
import { ChatRoomMember } from "../models/chat-room-member";
import { HyperPaginated } from "../models/hyper-paginated";
import { ChatRoomMemberService } from "../services/chat-room-member-service";

const router = new Router({ prefix: "/api/chat-room-member" });
const chatRoomMemberService: ChatRoomMemberService = new ChatRoomMemberService();

// get chat room member
router.get("/", async (ctx: any, next: any) => {
  const chatRoom: any = ctx.request.query;
  if ($bean.isNotNil(chatRoom.id)) {
    var chatRoomMemberList = await chatRoomMemberService.getAll(chatRoom.id);
    ctx.body = { result: chatRoomMemberList };
    ctx.status = 200;
  }
  next();
});

// thêm thành viên vào chat room
function validateRequestAddMember(ctx: any, result: any) {
  const chatRoom = ctx.request.body;
  result.status = RESULT_CODE.ERROR;
  result.data = chatRoom;

  if ($bean.isNil(chatRoom.id)) {
    result.message = "Mã phòng không được để trống!";
    return true;
  }

  if ($bean.isNil(chatRoom.chatRoomMemberList) || (chatRoom.chatRoomMemberList ? chatRoom.chatRoomMemberList.lengh == 0 : true)) {
    result.message = "Danh sách thành viên không được để trống !";
    return true;
  }
  return false;
}

router.post("/", async (ctx: any, next: any) => {
  var chatRoom = ctx.request.body;
  var result: IDataResult = {};
  if (await !validateRequestAddMember(ctx, result)) {
    var chatRoomMemberRes = await chatRoomMemberService.addMember(chatRoom);
    result = {
      status: RESULT_CODE.SUCCESS,
      data: chatRoomMemberRes,
      message: RESULT_MESSAGE.SUCCESS,
    };
  } else {
    result = {
      status: RESULT_CODE.ERROR,
      data: "error",
      message: RESULT_MESSAGE.ERROR,
    };
  }
  ctx.body = result;
  ctx.status = 200;
  next();
});
// hungdm - lấy danh sách thành viên trong roomchat
// hungdm - sửa 18/03/2021 -  thêm params userId - Lấy ra các thành viên trong nhóm trừ userId đăng nhập vào
router.get("/list-member", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  try {

    const body = ctx.request.query;
    let hyperPage: HyperPaginated = new HyperPaginated(
      body.page,
      body.pageSize
    );
    const countAllMember = await chatRoomMemberService.CountMemberInRoomChat(body.chatRoomId,body.userId);
    let pages = Math.ceil(countAllMember / hyperPage.pageSize);
    let skip = hyperPage.pageSize * (hyperPage.page - 1);

    const result: IDataResult = {
      status: RESULT_CODE.SUCCESS,
      data: await chatRoomMemberService.GetMemberInRoomChat(body.chatRoomId,body.userId,skip,hyperPage.pageSize),
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
// Lấy tât cả danh sách thành viên có cả userid đăng nhập 
router.get("/list-member-with-user-login", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  try {

    const body = ctx.request.query;
    let hyperPage: HyperPaginated = new HyperPaginated(
      body.page,
      body.pageSize
    );
    const countAllMember = await chatRoomMemberService.CountMemberInRoomChat(body.chatRoomId,"");
    let pages = Math.ceil(countAllMember / hyperPage.pageSize);
    let skip = hyperPage.pageSize * (hyperPage.page - 1);

    const result: IDataResult = {
      status: RESULT_CODE.SUCCESS,
      data: await chatRoomMemberService.GetMemberInRoomChat(body.chatRoomId,"",skip,hyperPage.pageSize),
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
// hungdm - Lấy thông tin user còn lại trong chat riêng
router.get("/user-infor", async (ctx: any, next: any) => {
  try {
    const body = ctx.request.query;
    const result: IDataResult = {
      status: RESULT_CODE.SUCCESS,
      data: await chatRoomMemberService.GetMemberInChat2(body.chatRoomId,body.userId),
      message: RESULT_MESSAGE.SUCCESS
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
//vinhtq-api xóa thành viên khỏi nhóm chat
router.post("/delete-user-in-chat-room", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  const data = ctx.request.body;
  try {
    const response=await chatRoomMemberService.DeleteUserInRoomChat(data.chatRoomId,data.userId,data.userIdSend)
    result.status = response.status
    result.message = response.message
  } catch (error) {
    result.status = RESULT_CODE.ERROR; //trạng thái thất bại
    result.message = "err:" + error; //tin nhắn lỗi trả về
  }
  ctx.body = result;
});


//vinhtq-api set quyền admin
router.post("/update-permission-admin-room-chat", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  const data = ctx.request.body;
  try {
    const response=await chatRoomMemberService.UpdatePermissionRoom(data.chatRoomId,data.userId,data.isAdmin,data.userIdSend)
    result.status = response.status
    result.message = response.message
  } catch (error) {
    result.status = RESULT_CODE.ERROR; //trạng thái thất bại
    result.message = "err:" + error; //tin nhắn lỗi trả về
  }
  ctx.body = result;
});

//08/03/2021 -vinhtq : viết api cập nhật thông báo cho user theo room
router.post("/update-notification", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  const data = ctx.request.body;
  try {
    const response=await chatRoomMemberService.UpdateNotificationRoomMember(data.chatRoomId,data.userId,data.onNotification)
    result.status = response.status
    result.message = response.message
  } catch (error) {
    result.status = RESULT_CODE.ERROR; //trạng thái thất bại
    result.message = "err:" + error; //tin nhắn lỗi trả về
  }
  ctx.body = result;
});

//08/03/2021 -vinhtq : viết api cập nhật thông báo cho user theo room
router.post("/get-chat-room-member-by-userid-and-roomchatid", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  const data = ctx.request.body;
  try {
    const response=await chatRoomMemberService.GetRoomMemberByUserIdAndRoomChatId(data.chatRoomId,data.userId)
    result.status = response.status
    result.message = response.message
    result.data = response.data
  } catch (error) {
    result.status = RESULT_CODE.ERROR; //trạng thái thất bại
    result.message = "err:" + error; //tin nhắn lỗi trả về
  }
  ctx.body = result; 
});

//10/03/2021 -vinhtq : viết api ngươi dùng thoát khỏi room chat
router.post("/user-out-room-chat", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  const data = ctx.request.body;
  try {
    const response=await chatRoomMemberService.UserOutChatRoom(data.chatRoomId,data.userId)
    result.status = response.status
    result.message = response.message
    result.data = response.data
  } catch (error) {
    result.status = RESULT_CODE.ERROR; //trạng thái thất bại
    result.message = "err:" + error; //tin nhắn lỗi trả về
  }
  ctx.body = result; 
});

export default router;
