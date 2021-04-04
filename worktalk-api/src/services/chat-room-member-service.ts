import { ChatRoom } from './../models/chat-room';
import Conditions from '../core/utils/sql/Conditions';
import { ChatRoomMember } from '../models/chat-room-member'
import db from '../common/connection-db';
import BaseSequelize from '../core/utils/base-sequelize/BaseSequelize';
import { genGuidId } from '../uuid';
import { $bean } from '../core/utils/hyd/hyd-bean-utils';
import { ChatRoomMemberDao } from '../dao/chat-room-member-dao';
import { UserDao } from '../dao/user-dao';
import { ChatRoomDao } from '../dao/chat-room-dao';
import { User } from '../models/user';
import { IDataResult } from '../core/handles/data-result';
import { RESULT_CODE, RESULT_MESSAGE } from '../core/constants/result-constants';
import { Chat } from '../models/chat';
import { RedisService } from "./redis-service";
import { ENUM_CONSTANTS_PUSH_STREAM, ENUM_KIND_OF_TYPE_NOTIFICATION } from "../core/constants/enum-constants";
import { NotificationDao } from '../dao/notification-dao';
import { Notification } from '../models/notification';
import { NotificationService } from './notification-service';
import { ChatService } from './chat-service';

const model = db.initModels;
const redisService: RedisService = new RedisService();

const chatService = new ChatService();
export class ChatRoomMemberService {
  chatRoomMemberDao: ChatRoomMemberDao = new ChatRoomMemberDao();
  notificationDao: NotificationDao = new NotificationDao();
  chatRoomDao: ChatRoomDao = new ChatRoomDao();
  userDao: UserDao = new UserDao();
  
  async getAll(chatRoomId: string) {
    let condition = new Conditions();
    condition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);

    const memberList = await this.chatRoomMemberDao.findAll({
      attributes: [ChatRoomMember.FIELD_id],
      where: condition.condition,
      include: [{
        model: model.users,
        attributes: [User.FIELD_userName, User.FIELD_avatar, User.FIELD_status, User.FIELD_isAdmin, User.FIELD_lastLogin],
        as: 'user'
      }],
    });

    return memberList;
  }

  async addMember(chatRoom: ChatRoom) {
    let chatRoomDb: any = await this.chatRoomDao.findByPkByOrg(chatRoom.id);
    if ($bean.isNotNil(chatRoomDb)) {
      let condition = new Conditions();
      condition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomDb.id);
      let chatRoomMemberList = await this.chatRoomMemberDao.findAll(condition.buildCondition());
      const ADD_MEMBER_STATUS = 1;
      if (chatRoomDb.type != ChatRoom.TYPE_SINGLE && $bean.isNotNil(chatRoom.chatRoomMemberList)) {
        let messageAddMember: any = {
          messageType: "7",
          messageStatus: ADD_MEMBER_STATUS,
          chatRoomId: chatRoom.id,
          createdAt: new Date(),
          attachments: []
        }
        for (var chatRoomMember of chatRoom.chatRoomMemberList) {
          let existed = $bean.getObjFromCollection(chatRoomMemberList, { userId: chatRoomMember });
          if ($bean.isNil(existed)) {
            chatRoomMember.id = genGuidId(ChatRoomMember.TABLE_NAME);
            chatRoomMember.chatRoomId = chatRoomDb.id;
            chatRoomMember.status = ChatRoomMember.STATUS_ACTIVE;
            if (chatRoomMember.isAdmin == null) {
              chatRoomMember.isAdmin = ChatRoomMember.IS_NOT_ADMIN;
            }
            chatRoomMember.createdBy = chatRoomDb.createdBy;
            chatRoomMember.updatedBy = chatRoomDb.createdBy;
            await this.chatRoomMemberDao.create(chatRoomMember);
            let user: any = this.userDao.findByPk(chatRoomMember);
            messageAddMember.message = user.lastName + " " + user.firstName + " đã được thêm vào nhóm";
            messageAddMember.userId = user.id;
            chatService.insertMessage(messageAddMember);
          }
        }
      }
    }
    return chatRoom;
  }
  // hungdm - Count Member In RoomChat
  // hungdm - Thêm params userId
  async CountMemberInRoomChat(chatRoomId: string, userId: string) {
    let condition = new Conditions();
    condition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
    condition.ne(ChatRoomMember.FIELD_userId, userId);
    return await this.chatRoomMemberDao.count({
      where: condition.condition
    })
  }
  // hungdm - Lấy danh sách user trong nhóm chat - params: roomChatID - có phân trang
  async GetMemberInRoomChat(chatRoomId: string, userId: string, skip: number, take: number) {
    let condition = new Conditions();
    condition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
    condition.ne(ChatRoomMember.FIELD_userId, userId);
    return await this.chatRoomMemberDao.findAll({
      include: [
        {
          model: model.users,
          as: User.JOIN_CHAT_NAME,
          required: true,
          attributes: [User.FIELD_id, User.FIELD_lastName, User.FIELD_userName, User.FIELD_avatar, User.FIELD_status, User.FIELD_isAdmin, User.FIELD_lastLogin]
        },
        {
          model: model.chat_rooms,
          as: ChatRoom.TABLE_JOIN_NAME,
          required: true
        }
      ],
      where: condition.condition,
      order: [
        [ChatRoomMember.FIELD_isAdmin, 'DESC'],
        [User.JOIN_CHAT_NAME, User.FIELD_userName, 'ASC']
      ],
      offset: skip,
      limit: take
    });
  }
  /**
  * Lấy user còn lại trong chat riêng khác user_id đăng nhập vào - 08/03/2021
  * @param UserID user đăng nhập
  * @param ChatRoomId id room chat 
  * @returns 
  */
  // hungdm - Lấy user còn lại trong chat riêng khác user_id đăng nhập vào 
  async GetMemberInChat2(ChatRoomId: string, UserID: string) {
    let condition = new Conditions();
    condition.eq(ChatRoomMember.FIELD_chatRoomId, ChatRoomId);
    condition.ne(ChatRoomMember.FIELD_userId, UserID);
    return await this.chatRoomMemberDao.findAll({
      include: [
        {
          model: model.users,
          as: User.JOIN_CHAT_NAME,
          required: true,
          attributes: [User.FIELD_id, User.FIELD_userName, User.FIELD_avatar, User.FIELD_status, User.FIELD_isAdmin]
        }
      ],
      where: condition.condition,
      limit: 1

    });
  }
  //vinhtq: xóa thành viên khỏi nhóm chat

  async DeleteUserInRoomChat(chatRoomId: string, userId: string, userIdSend: string) {
    const result: IDataResult = {};
    try {

      let conditionChatRoomMemember = new Conditions();
      conditionChatRoomMemember.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
      conditionChatRoomMemember.eq(ChatRoomMember.FIELD_userId, userIdSend);
      var responseChatRoomMemember = await this.chatRoomMemberDao.findAll({
        attributes: [ChatRoomMember.FIELD_isAdmin],
        where: conditionChatRoomMemember.condition
      })
      if (responseChatRoomMemember && (responseChatRoomMemember[0].dataValues.isAdmin == 0 || responseChatRoomMemember[0].dataValues.isAdmin == null || responseChatRoomMemember[0].dataValues.isAdmin == "")) {
        result.status = RESULT_CODE.ERROR; //trạng thái thất bại
        result.message = "Bạn không có quyền thực hiện chức năng này"; //tin nhắn lỗi trả về
        return result
      }


      //lấy thông tin người dùng thực hiện chức năng
      let conditionUser = new Conditions();
      conditionUser.eq(User.FIELD_id, userIdSend);
      var responseUser = await this.userDao.findOne({
        attributes: [User.FIELD_firstName, User.FIELD_lastName],
        where: conditionUser.condition
      })

      //lấy thông tin nhóm
      let conditionRoom = new Conditions();
      conditionRoom.eq(ChatRoom.FIELD_id, chatRoomId);
      var responseChatRoom = await this.chatRoomDao.findOne({
        attributes: [ChatRoom.FIELD_title],
        where: conditionRoom.condition
      })

      //code xóa bản ghi
      let condition = new Conditions();
      condition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
      condition.eq(ChatRoomMember.FIELD_userId, userId);
      var response = await this.chatRoomMemberDao.destroy({
        where: condition.condition
      })

      //thêm vào bảng notification cho từng user trong nhóm
      const dataNoti: any = {};
      const tmpCreatedAt = new Date();
      dataNoti.id = genGuidId(Notification.TABLE_NAME);
      dataNoti.status = Notification.STATUS_ACTIVE;
      dataNoti.updatedAt = tmpCreatedAt;
      dataNoti.createdAt = tmpCreatedAt;
      dataNoti.userId = userIdSend;
      dataNoti.chatRoomId = chatRoomId;
      dataNoti.type = ENUM_KIND_OF_TYPE_NOTIFICATION.KICKED;
      dataNoti.content = responseUser.dataValues.lastName + " " + responseUser.dataValues.firstName + " đã xóa bạn khỏi nhóm chat " + responseChatRoom.dataValues.title;
      dataNoti.isRead = Notification.IS_READ_NOT_ACTIVE;
      dataNoti.receiverId = userId;
      await this.notificationDao.create(dataNoti);

      var conditionRoomChatMember = new Conditions();
      conditionRoomChatMember.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
      conditionRoomChatMember.eq(ChatRoomMember.FIELD_status, ChatRoomMember.STATUS_ACTIVE);
      conditionRoomChatMember.eq(ChatRoomMember.FIELD_userId, userId);

      const userMember = await this.chatRoomMemberDao.findOne({
        attributes: [ChatRoomMember.FIELD_userId, ChatRoomMember.FIELD_onNotification],
        where: conditionRoomChatMember.condition
      });
      if (userMember && userMember.dataValues.onNofitication === ChatRoomMember.NOTIFICATION_ACTIVE) {
        redisService.pubStreamObj({
          type: ENUM_CONSTANTS_PUSH_STREAM.NOTIFICATION,
          value: dataNoti,
          userIdSend: userIdSend,
          chatId: userId
        })
      };

      //code update status
      // let condition = new Conditions();
      // condition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
      // condition.eq(ChatRoomMember.FIELD_userId, userId);
      // var response=await this.chatRoomMemberDao.update( {
      //   status: "0",
      //   updated_at: new Date()
      // },
      // { where: condition.condition })

      result.status = RESULT_CODE.SUCCESS; //trạng thái thành công
      result.message = RESULT_MESSAGE.SUCCESS; //tin nhắn thành công trả về
    }
    catch (error) {
      result.status = RESULT_CODE.ERROR; //trạng thái thất bại
      result.message = "err:" + error; //tin nhắn lỗi trả về
    }
    return result
  }


  //vinhtq: chỉnh sửa quyền admin

  async UpdatePermissionRoom(chatRoomId: string, userId: string, isAdmin: string, userIdSend: string) {
    const result: IDataResult = {};
    try {

      var conditionRoomChatMember = new Conditions();
      conditionRoomChatMember.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
      conditionRoomChatMember.eq(ChatRoomMember.FIELD_status, ChatRoomMember.STATUS_ACTIVE);
      conditionRoomChatMember.eq(ChatRoomMember.FIELD_isAdmin, "1");
      let roomMemberList: ChatRoomMember[] = await model.chat_room_members.findAll(
        {
          attributes: [ChatRoomMember.FIELD_userId, ChatRoomMember.FIELD_onNotification],
          where: conditionRoomChatMember.condition,
        }
      );

      if (isAdmin == "0") {
        if (roomMemberList && roomMemberList.length == 1) {
          result.status = RESULT_CODE.ERROR;
          result.message = "Nhóm chat chỉ còn 1 admin không thể hủy vai trò.";
          return result
        }
      }

      let condition = new Conditions();
      condition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
      condition.eq(ChatRoomMember.FIELD_userId, userId);
      var response = await this.chatRoomMemberDao.update({
        isAdmin: isAdmin,
        updatedAt: new Date(),
        updatedBy: userIdSend
      },
        { where: condition.condition })

      //lấy thông tin người dùng thực hiện chức năng
      let conditionUser = new Conditions();
      conditionUser.eq(User.FIELD_id, userIdSend);
      var responseUser = await this.userDao.findOne({
        attributes: [User.FIELD_firstName, User.FIELD_lastName],
        where: conditionUser.condition
      })

      //lấy thông tin nhóm
      let conditionRoom = new Conditions();
      conditionRoom.eq(ChatRoom.FIELD_id, chatRoomId);
      var responseChatRoom = await this.chatRoomDao.findOne({
        attributes: [ChatRoom.FIELD_title],
        where: conditionRoom.condition
      })

      var typePermission = 0;
      var content = "";
      if (isAdmin == "1") {
        typePermission = ENUM_KIND_OF_TYPE_NOTIFICATION.ADD_PERMISSION;
        content = responseUser.dataValues.lastName + " " + responseUser.dataValues.firstName + " đã được chỉ đinh làm admin trong nhóm " + responseChatRoom.dataValues.title;
      }
      else {
        typePermission = ENUM_KIND_OF_TYPE_NOTIFICATION.CANCEL_PERMISSION_ADMIN;
        content = responseUser.dataValues.lastName + " " + responseUser.dataValues.firstName + " đã bị hủy quyền admin trong nhóm " + responseChatRoom.dataValues.title;
      }
      const dataNoti: any = {};
      const tmpCreatedAt = new Date();
      dataNoti.id = genGuidId(Notification.TABLE_NAME);
      dataNoti.status = Notification.STATUS_ACTIVE;
      dataNoti.updatedAt = tmpCreatedAt;
      dataNoti.createdAt = tmpCreatedAt;
      dataNoti.userId = userIdSend;
      dataNoti.chatRoomId = chatRoomId;
      dataNoti.type = typePermission;
      dataNoti.content = content;
      dataNoti.isRead = Notification.IS_READ_NOT_ACTIVE;
      dataNoti.receiverId = userId;
      await this.notificationDao.create(dataNoti);

      var conditionRoomChatMember = new Conditions();
      conditionRoomChatMember.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
      conditionRoomChatMember.eq(ChatRoomMember.FIELD_status, ChatRoomMember.STATUS_ACTIVE);
      conditionRoomChatMember.eq(ChatRoomMember.FIELD_userId, userId);
      // quyennq sửa dùng khung push notifi
      const notiService = new NotificationService();
      await notiService.pushNotification(dataNoti, ENUM_CONSTANTS_PUSH_STREAM.NOTIFICATION, conditionRoomChatMember.condition)
      // const userMember= await this.chatRoomMemberDao.findOne({
      //     attributes: [ChatRoomMember.FIELD_userId,ChatRoomMember.FIELD_onNotification],
      //     where: conditionRoomChatMember.condition
      // });

      // if(userMember && userMember.dataValues.onNofitication===ChatRoomMember.NOTIFICATION_ACTIVE){
      //   redisService.pubStreamObj({
      //     type: ENUM_CONSTANTS_PUSH_STREAM.NOTIFICATION,
      //     value: dataNoti,
      //     userIdSend: userIdSend,
      //     chatId:userId
      //   });
      // }

      result.status = RESULT_CODE.SUCCESS; //trạng thái thành công
      result.message = RESULT_MESSAGE.SUCCESS; //tin nhắn thành công trả về
    }
    catch (error) {
      result.status = RESULT_CODE.ERROR; //trạng thái thất bại
      result.message = "err:" + error; //tin nhắn lỗi trả về
    }
    return result
  }

  //08/03/2021 -vinhtq : Cập nhật thông báo cho user theo room

  async UpdateNotificationRoomMember(chatRoomId: string, userId: string, onNotification: string) {
    const result: IDataResult = {};
    try {
      let condition = new Conditions();
      condition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
      condition.eq(ChatRoomMember.FIELD_userId, userId);
      var response = await this.chatRoomMemberDao.update({
        onNotification: onNotification,
        updatedBy: userId,
        updatedAt: new Date
      },
        { where: condition.condition })
      result.status = RESULT_CODE.SUCCESS;
      result.message = RESULT_MESSAGE.SUCCESS;
    } catch (error) {
      result.status = RESULT_CODE.ERROR; //trạng thái thất bại
      result.message = "err:" + error; //tin nhắn lỗi trả về
    }
    return result
  }

  //08/03/2021 -vinhtq : lấy bản ghi room member theo userid và id room
  async GetRoomMemberByUserIdAndRoomChatId(chatRoomId: string, userId: string) {
    const result: IDataResult = {};
    try {
      let condition = new Conditions();
      condition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
      condition.eq(ChatRoomMember.FIELD_userId, userId);
      var response = await this.chatRoomMemberDao.findOne({
        where: condition.condition
      })
      result.status = RESULT_CODE.SUCCESS;
      result.message = RESULT_MESSAGE.SUCCESS;
      result.data = response.dataValues
    } catch (error) {
      result.status = RESULT_CODE.ERROR; //trạng thái thất bại
      result.message = "err:" + error; //tin nhắn lỗi trả về
    }
    return result
  }

  //vinhtq: 12/03/2021 : thành viên tự rời khỏi nhóm

  async UserOutChatRoom(chatRoomId: string, userId: string) {
    const result: IDataResult = {};
    try {

      //code xóa user khỏi nhóm chat
      let conditionDeleteUserInRoomChat = new Conditions();
      conditionDeleteUserInRoomChat.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
      conditionDeleteUserInRoomChat.eq(ChatRoomMember.FIELD_userId, userId);
      var response = await this.chatRoomMemberDao.destroy({
        where: conditionDeleteUserInRoomChat.condition
      })



      //Get thông tin người dùng
      let conditionUser = new Conditions();
      conditionUser.eq(User.FIELD_id, userId);
      var responseUser = await this.userDao.findOne({
        where: conditionUser.condition
      })

      //Get thông tin nhóm chat
      let conditionRoom = new Conditions();
      conditionRoom.eq(ChatRoom.FIELD_id, chatRoomId);
      var responseChatRoom = await this.chatRoomDao.findOne({
        where: conditionRoom.condition
      })


      const dataNoti: any = {};
      const tmpCreatedAt = new Date();
      dataNoti.id = genGuidId(Notification.TABLE_NAME);
      dataNoti.status = Notification.STATUS_ACTIVE;
      dataNoti.updatedAt = tmpCreatedAt;
      dataNoti.createdAt = tmpCreatedAt;
      dataNoti.userId = userId;
      dataNoti.chatRoomId = chatRoomId;
      dataNoti.type = ENUM_KIND_OF_TYPE_NOTIFICATION.USER_OUT_ROOM_CHAT;
      dataNoti.content = responseUser.dataValues.lastName + " " + responseUser.dataValues.firstName + " đã rời khỏi nhóm chat" + responseChatRoom.dataValues.title;
      dataNoti.isRead = Notification.IS_READ_NOT_ACTIVE;
      // dataNoti.receiverId = userId;


      //Danh sách user trong nhóm chat
      let condition = new Conditions();
      condition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
      condition.eq(ChatRoomMember.FIELD_status, ChatRoomMember.STATUS_ACTIVE);
      // var responseUsers = await this.chatRoomMemberDao.findAll({
      //   where: condition.condition
      // })
      // quyennq : Sửa gọi push thông báo qua hàm chung
      const notiService = new NotificationService();
      await notiService.pushNotification(dataNoti, ENUM_CONSTANTS_PUSH_STREAM.NOTIFICATION, condition.condition);
      // if (responseUsers) {
      //   for (const member of responseUsers) {
      //     dataNoti.receiverId = member.userId;

      //     await this.notificationDao.create(dataNoti);

      //     if (member.userId != userId && member.onNotification === ChatRoomMember.NOTIFICATION_ACTIVE) {
      //       redisService.pubStreamObj({
      //         type: ENUM_CONSTANTS_PUSH_STREAM.NOTIFICATION,
      //         value: dataNoti,
      //         chatId: member.userId
      //       });
      //     }
      //   }
      // }

      dataNoti.user = responseUser;
      dataNoti.chatRoom = responseChatRoom;
      result.status = RESULT_CODE.SUCCESS;
      result.message = RESULT_MESSAGE.SUCCESS;
      result.data = dataNoti
    } catch (error) {
      result.status = RESULT_CODE.ERROR; //trạng thái thất bại
      result.message = "err:" + error; //tin nhắn lỗi trả về
    }
    return result
  }
}