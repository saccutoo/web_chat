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
            messageAddMember.message = user.lastName + " " + user.firstName + " ???? ???????c th??m v??o nh??m";
            messageAddMember.userId = user.id;
            chatService.insertMessage(messageAddMember);
          }
        }
      }
    }
    return chatRoom;
  }
  // hungdm - Count Member In RoomChat
  // hungdm - Th??m params userId
  async CountMemberInRoomChat(chatRoomId: string, userId: string) {
    let condition = new Conditions();
    condition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
    condition.ne(ChatRoomMember.FIELD_userId, userId);
    return await this.chatRoomMemberDao.count({
      where: condition.condition
    })
  }
  // hungdm - L???y danh s??ch user trong nh??m chat - params: roomChatID - c?? ph??n trang
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
  * L???y user c??n l???i trong chat ri??ng kh??c user_id ????ng nh???p v??o - 08/03/2021
  * @param UserID user ????ng nh???p
  * @param ChatRoomId id room chat 
  * @returns 
  */
  // hungdm - L???y user c??n l???i trong chat ri??ng kh??c user_id ????ng nh???p v??o 
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
  //vinhtq: x??a th??nh vi??n kh???i nh??m chat

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
        result.status = RESULT_CODE.ERROR; //tr???ng th??i th???t b???i
        result.message = "B???n kh??ng c?? quy???n th???c hi???n ch???c n??ng n??y"; //tin nh???n l???i tr??? v???
        return result
      }


      //l???y th??ng tin ng?????i d??ng th???c hi???n ch???c n??ng
      let conditionUser = new Conditions();
      conditionUser.eq(User.FIELD_id, userIdSend);
      var responseUser = await this.userDao.findOne({
        attributes: [User.FIELD_firstName, User.FIELD_lastName],
        where: conditionUser.condition
      })

      //l???y th??ng tin nh??m
      let conditionRoom = new Conditions();
      conditionRoom.eq(ChatRoom.FIELD_id, chatRoomId);
      var responseChatRoom = await this.chatRoomDao.findOne({
        attributes: [ChatRoom.FIELD_title],
        where: conditionRoom.condition
      })

      //code x??a b???n ghi
      let condition = new Conditions();
      condition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
      condition.eq(ChatRoomMember.FIELD_userId, userId);
      var response = await this.chatRoomMemberDao.destroy({
        where: condition.condition
      })

      //th??m v??o b???ng notification cho t???ng user trong nh??m
      const dataNoti: any = {};
      const tmpCreatedAt = new Date();
      dataNoti.id = genGuidId(Notification.TABLE_NAME);
      dataNoti.status = Notification.STATUS_ACTIVE;
      dataNoti.updatedAt = tmpCreatedAt;
      dataNoti.createdAt = tmpCreatedAt;
      dataNoti.userId = userIdSend;
      dataNoti.chatRoomId = chatRoomId;
      dataNoti.type = ENUM_KIND_OF_TYPE_NOTIFICATION.KICKED;
      dataNoti.content = responseUser.dataValues.lastName + " " + responseUser.dataValues.firstName + " ???? x??a b???n kh???i nh??m chat " + responseChatRoom.dataValues.title;
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

      result.status = RESULT_CODE.SUCCESS; //tr???ng th??i th??nh c??ng
      result.message = RESULT_MESSAGE.SUCCESS; //tin nh???n th??nh c??ng tr??? v???
    }
    catch (error) {
      result.status = RESULT_CODE.ERROR; //tr???ng th??i th???t b???i
      result.message = "err:" + error; //tin nh???n l???i tr??? v???
    }
    return result
  }


  //vinhtq: ch???nh s???a quy???n admin

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
          result.message = "Nh??m chat ch??? c??n 1 admin kh??ng th??? h???y vai tr??.";
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

      //l???y th??ng tin ng?????i d??ng th???c hi???n ch???c n??ng
      let conditionUser = new Conditions();
      conditionUser.eq(User.FIELD_id, userIdSend);
      var responseUser = await this.userDao.findOne({
        attributes: [User.FIELD_firstName, User.FIELD_lastName],
        where: conditionUser.condition
      })

      //l???y th??ng tin nh??m
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
        content = responseUser.dataValues.lastName + " " + responseUser.dataValues.firstName + " ???? ???????c ch??? ??inh l??m admin trong nh??m " + responseChatRoom.dataValues.title;
      }
      else {
        typePermission = ENUM_KIND_OF_TYPE_NOTIFICATION.CANCEL_PERMISSION_ADMIN;
        content = responseUser.dataValues.lastName + " " + responseUser.dataValues.firstName + " ???? b??? h???y quy???n admin trong nh??m " + responseChatRoom.dataValues.title;
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
      // quyennq s???a d??ng khung push notifi
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

      result.status = RESULT_CODE.SUCCESS; //tr???ng th??i th??nh c??ng
      result.message = RESULT_MESSAGE.SUCCESS; //tin nh???n th??nh c??ng tr??? v???
    }
    catch (error) {
      result.status = RESULT_CODE.ERROR; //tr???ng th??i th???t b???i
      result.message = "err:" + error; //tin nh???n l???i tr??? v???
    }
    return result
  }

  //08/03/2021 -vinhtq : C???p nh???t th??ng b??o cho user theo room

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
      result.status = RESULT_CODE.ERROR; //tr???ng th??i th???t b???i
      result.message = "err:" + error; //tin nh???n l???i tr??? v???
    }
    return result
  }

  //08/03/2021 -vinhtq : l???y b???n ghi room member theo userid v?? id room
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
      result.status = RESULT_CODE.ERROR; //tr???ng th??i th???t b???i
      result.message = "err:" + error; //tin nh???n l???i tr??? v???
    }
    return result
  }

  //vinhtq: 12/03/2021 : th??nh vi??n t??? r???i kh???i nh??m

  async UserOutChatRoom(chatRoomId: string, userId: string) {
    const result: IDataResult = {};
    try {

      //code x??a user kh???i nh??m chat
      let conditionDeleteUserInRoomChat = new Conditions();
      conditionDeleteUserInRoomChat.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
      conditionDeleteUserInRoomChat.eq(ChatRoomMember.FIELD_userId, userId);
      var response = await this.chatRoomMemberDao.destroy({
        where: conditionDeleteUserInRoomChat.condition
      })



      //Get th??ng tin ng?????i d??ng
      let conditionUser = new Conditions();
      conditionUser.eq(User.FIELD_id, userId);
      var responseUser = await this.userDao.findOne({
        where: conditionUser.condition
      })

      //Get th??ng tin nh??m chat
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
      dataNoti.content = responseUser.dataValues.lastName + " " + responseUser.dataValues.firstName + " ???? r???i kh???i nh??m chat" + responseChatRoom.dataValues.title;
      dataNoti.isRead = Notification.IS_READ_NOT_ACTIVE;
      // dataNoti.receiverId = userId;


      //Danh s??ch user trong nh??m chat
      let condition = new Conditions();
      condition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
      condition.eq(ChatRoomMember.FIELD_status, ChatRoomMember.STATUS_ACTIVE);
      // var responseUsers = await this.chatRoomMemberDao.findAll({
      //   where: condition.condition
      // })
      // quyennq : S???a g???i push th??ng b??o qua h??m chung
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
      result.status = RESULT_CODE.ERROR; //tr???ng th??i th???t b???i
      result.message = "err:" + error; //tin nh???n l???i tr??? v???
    }
    return result
  }
}