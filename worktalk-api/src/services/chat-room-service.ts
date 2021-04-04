import db from "../common/connection-db";
import { RESULT_CODE } from "../core/constants/result-constants";
import { IDataResult } from "../core/handles/data-result";
import Conditions from "../core/utils/sql/Conditions";
import { ChatDao } from "../dao/chat-dao";
import { ChatRoomDao } from "../dao/chat-room-dao";
import { UserDao } from "../dao/user-dao";
import { ChatRoomMemberDao } from "../dao/chat-room-member-dao";
import { Chat } from "../models/chat";
import { ChatRoom } from "../models/chat-room";
import { User } from "../models/user";
import { ChatRoomMember } from "../models/chat-room-member";
import { genGuidId } from "../uuid";
import { user } from "../db-model-exported/user-base";
import { NotificationDao } from "../dao/notification-dao";
import { Notification } from "../models/notification";
import { ENUM_CONSTANTS, ENUM_CONSTANTS_PUSH_STREAM, ENUM_KIND_OF_MESSAGE_TYPE, ENUM_KIND_OF_TYPE_NOTIFICATION } from "../core/constants/enum-constants";
import { RedisService } from "./redis-service";
import { DeviceDao } from "../dao/devices-dao";
import chatRoom from "../routes/chat-room";
import { QueryTypes } from 'sequelize';

const model = db.initModels;
const redisService: RedisService = new RedisService();

export class ChatRoomService {
  chatDao: ChatDao = new ChatDao();
  userDao: UserDao = new UserDao();
  notificationDao: NotificationDao = new NotificationDao();
  chatRoomDao: ChatRoomDao = new ChatRoomDao();

  chatRoomMemberDao: ChatRoomMemberDao = new ChatRoomMemberDao();

  async countAllChatRoomByMember(userId: string) {
    return this.chatRoomDao.count({
      include: [
        {
          model: model.chat_room_members,
          as: ChatRoomMember.TABLE_NAME,
          where: {
            user_id: userId
          }
        }


      ],
    })
  }
  async findById(chatRoomId: string) {
    let condition = new Conditions;
    condition.eq(ChatRoom.FIELD_id, chatRoomId);
    try {
      var chatRoomRes = await this.chatRoomDao.findAll({
        where: condition.condition,
        include: [{
          model: model.chat_room_members,
          attributes: [ChatRoomMember.FIELD_id],
          as: "chat_room_members",
          include: [
            {
              model: model.users,
              required: true,
              as: "user"
              // attributes: ["userName", "status", "lastLogin", "avatar"],
            },
          ]
        },
        ],
      });
    } catch (error) {
      console.log("-----Error-----")
      console.log(error)
    }


    return chatRoomRes;
  }
  /**
   * hungdm - lấy danh sách room chat theo userId truyền vào
   * @param userId
   * @returns 
   */
  async GetListChatRoomByUserID(userId: string) {
    try {
      let condition = new Conditions;
      condition.eq(ChatRoomMember.FIELD_userId, userId);
      var chatRoomRes = await this.chatRoomDao.findAll({
        include: [{
          model: model.chat_room_members,
          attributes: [ChatRoomMember.FIELD_id, ChatRoomMember.FIELD_userId],
          as: ChatRoomMember.JOIN_TABLE_NAME,
          where: condition.condition
        },
        ],
        order: [[ChatRoom.FIELD_type, "DESC"]],
      });
    } catch (error) {
      console.log("-----Error-----")
      console.log(error)
    }
    return chatRoomRes;
  }
  /*
  * created by tuda
  * get single room chat of 2 userId
  */

  async getSingleRoom(userIdList: string[]) {
    const firstUserId = userIdList[0];
    const secondUserId = userIdList[1];

    const getSingleRoomQuery = `SELECT * FROM (SELECT chat_room_id AS chat_room_id 
                                  FROM chat_ihcm.chat_room_members 
                                  WHERE (user_id = '${firstUserId}' OR user_id = '${secondUserId}')
                                  GROUP BY chat_room_id having count(user_id) = 2) AS X 
                                  INNER JOIN chat_ihcm.chat_rooms AS Y ON X.chat_room_id = Y.id WHERE type = '${ChatRoom.TYPE_SINGLE}'`

    try {
      let singleRoom: any = await db.sequelize.query(getSingleRoomQuery, { type: QueryTypes.SELECT });
      if (singleRoom[0]) {
        let chatRoomRes: any = await this.chatRoomDao.findByPk(singleRoom[0].chat_room_id);
        if (chatRoomRes) {
          return chatRoomRes;
        }
      }
    } catch (error) {
      console.log(error)
    }

    return null;
  }

  /*
  ** created by tuda
  ** create chat room and add member to room
  */
  async createChatRoom(chatRoom: ChatRoom) {
    console.log("-----Service create chat room receive request-----");
    console.log("Chat room request", chatRoom);
    let userIdList = [chatRoom.chatRoomMemberList[0].userId, chatRoom.chatRoomMemberList[1].userId];
    chatRoom.type = chatRoom?.chatRoomMemberList.length == 2 && chatRoom.type == ChatRoom.TYPE_SINGLE ? "0" : "1";
    if (chatRoom.type == ChatRoom.TYPE_SINGLE) {
      if (this.getSingleRoom(userIdList) != null){
        return;
      }
    }
    chatRoom.id = genGuidId(ChatRoom.TABLE_NAME);
    chatRoom.status = ChatRoom.STATUS_ACTIVE;
    console.log(chatRoom);
    let chatRoomRes;
    try {
      chatRoomRes = await this.chatRoomDao.create(chatRoom);
    } catch (error) {
      console.log("Error");
      console.log(error);
    }

    var chatRoomMemberListRes: ChatRoomMember[] = [];
    for (var chatRoomMember of chatRoom?.chatRoomMemberList) {
      chatRoomMember.id = genGuidId(ChatRoomMember.TABLE_NAME);
      chatRoomMember.chatRoomId = chatRoom.id;
      chatRoomMember.status = ChatRoomMember.STATUS_ACTIVE;
      chatRoomMember.isAdmin =
        chatRoomMember.userId == chatRoom.createdBy
          ? ChatRoomMember.IS_ADMIN
          : ChatRoomMember.IS_NOT_ADMIN;
      chatRoomMember.createdBy = chatRoom.createdBy;
      chatRoomMember.updatedBy = chatRoom.createdBy;
      chatRoomMember.chatRoomId = chatRoomRes.id;

      try {
        chatRoomMemberListRes.push(
          await this.chatRoomMemberDao.create(chatRoomMember)
        );
      } catch (error) {
        console.log("Error");
        console.log(error);
      }
    }

    chatRoomRes.chatRoomMemberList = chatRoomMemberListRes;
    return chatRoomRes;
  }

  async checkExistRoomSingle(firstUserId: string, secondUserId: string) {
    var orCondition = new Conditions();
    orCondition.eq(ChatRoomMember.FIELD_userId, firstUserId);
    orCondition.eq(ChatRoomMember.FIELD_userId, secondUserId);

    var condition = new Conditions();
    condition.or(orCondition.buildOrCondition());

    var listChatRoomMember = await this.chatRoomMemberDao.findAll(condition.buildCondition());

    let mapRoomMember = new Map();
    for (var chatRoomMember of listChatRoomMember) {
      if (!mapRoomMember.get(chatRoomMember.chatRoomId)) {
        var array: string[] = [];
        mapRoomMember.set(chatRoomMember.chatRoomId, array);
      }
      array = mapRoomMember.get(chatRoomMember.chatRoomId);
      array.push(chatRoomMember.userId);
      mapRoomMember.set(chatRoomMember.chatRoomId, array);
    }

    for (let value of mapRoomMember.values()) {
      if (
        value.toString() == [firstUserId, secondUserId].toString() ||
        value == [secondUserId, firstUserId].toString()
      ) {
        return true;
      }
    }
    return false;
  }

  //vinhtq:09/03/2021: lấy thêm lastCreatedAt,lastUpdateAt
  /**
   * quyennq : Hàm lấy list chat rooms theo user id
   * @param  {number} skip số bản ghi bỏ qua
   * @param  {number} pageSize số bản ghi cần lấy
   * @param  {string} userId user id
   */
  async getChatRoomByPage(skip: number, pageSize: number, userId: string) {
    console.log('----------=========-------====--=-=-=-=-=-=-')
    return this.chatRoomDao.findAll({
      attributes: {
        include: [

          [
            db.Sequelize.literal(
              `( select c.created_at from chats c where c.chat_room_id = chat_rooms.id order by created_at desc LIMIT 1)`
            ),
            "lastCreatedAt",
          ]

        ],

      },
      include: [


        {
          model: model.chat_room_members,
          as: ChatRoomMember.TABLE_NAME,
          where: {
            user_id: userId
          },
          // include: [
          //   {
          //     model: model.users,
          //     as: User.JOIN_CHAT_NAME,
          //   }
          // ]
        },
        {
          model: model.chats,
          attributes: [Chat.FIELD_message, Chat.FIELD_createdAt, Chat.FIELD_userId],
          as: Chat.TABLE_NAME,
          order: [["created_at", "DESC"]],
          limit: 1
        }


      ],
      where: {
        status: ENUM_CONSTANTS.CHATROOM_STATUS.ACTIVE
      },

      order: [[db.Sequelize.literal("lastCreatedAt"), "DESC"]],
      offset: skip,
      limit: pageSize,
    })
  }
  async getListUserByChatRoomId(chatRoomId: string) {
    return this.chatRoomMemberDao.findAll({
      where: {
        chat_room_id: chatRoomId
      },
      include: [
        {
          model: model.users,
          as: User.JOIN_CHAT_NAME,
        }
      ]
    })
  }



  //vinhtq:viết api xóa nhóm
  //08/03/2021 : vinhtq:sửa phần pubStreamObj thêm chatId
  async deleteChatRoom(chatRoom: any) {
    const result: IDataResult = {};
    try {

      //Lấy danh sách người được gửi
      //TODO: Condition

      let conditionChatRoomMemember = new Conditions();
      conditionChatRoomMemember.eq(ChatRoomMember.FIELD_chatRoomId, chatRoom.id);
      conditionChatRoomMemember.eq(ChatRoomMember.FIELD_userId, chatRoom.userId);
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
      conditionUser.eq(User.FIELD_id, chatRoom.userId);
      var responseUser = await this.userDao.findOne({
        attributes: [User.FIELD_firstName, User.FIELD_lastName],
        where: conditionUser.condition
      })

      //lấy thông tin nhóm
      let conditionRoom = new Conditions();
      conditionRoom.eq(ChatRoom.FIELD_id, chatRoom.id);
      var responseChatRoom = await this.chatRoomDao.findOne({
        attributes: [ChatRoom.FIELD_title],
        where: conditionRoom.condition
      })

      //Lấy danh sách người dùng trong nhóm
      var conditionRoomChatMember = new Conditions();
      conditionRoomChatMember.eq(ChatRoomMember.FIELD_chatRoomId, chatRoom.id);
      conditionRoomChatMember.eq(ChatRoomMember.FIELD_status, ChatRoomMember.STATUS_ACTIVE);
      // conditionRoomChatMember.eq(ChatRoomMember.FIELD_onNotification, ChatRoomMember.NOTIFICATION_ACTIVE);
      let roomMemberList: ChatRoomMember[] = await model.chat_room_members.findAll(
        {
          attributes: [ChatRoomMember.FIELD_userId, ChatRoomMember.FIELD_onNotification],
          where: conditionRoomChatMember.condition,
        }
      );

      //Thay đổi trạng thái các bản ghi chat room member
      let deleteMemberCondition = new Conditions();
      deleteMemberCondition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoom.id);
      await this.chatRoomMemberDao.update({
        status: "0"
      }, deleteMemberCondition.buildCondition());

      //Thay đổi trạng thái các bản ghi chat
      let deleteMessageCondition = new Conditions();
      deleteMessageCondition.eq(Chat.FIELD_chatRoomId, chatRoom.id);
      await this.chatDao.update({
        status: "0"
      }, deleteMessageCondition.buildCondition());

      //Thay đổi trạng thái nhóm chat
      let deleteRoomCondition = new Conditions();
      deleteRoomCondition.eq(ChatRoom.FIELD_id, chatRoom.id);
      await this.chatRoomDao.update({
        status: "0"
      }, deleteRoomCondition.buildCondition());

      //insert thông báo cho từng người
      if (roomMemberList) {
        for (const member of roomMemberList) {
          //thêm vào bảng notification cho từng user trong nhóm
          var content = "";
          if (member.userId == chatRoom.userId) {
            content = "Bạn đã xóa nhóm chat " + responseChatRoom.dataValues.title;;
          }
          else {
            content = responseUser.dataValues.lastName + " " + responseUser.dataValues.firstName + " đã xóa nhóm chat " + responseChatRoom.dataValues.title;
          }
          const dataNoti: any = {};
          const tmpCreatedAt = new Date();
          dataNoti.id = genGuidId(Notification.TABLE_NAME);
          dataNoti.status = Notification.STATUS_ACTIVE;
          dataNoti.updatedAt = tmpCreatedAt;
          dataNoti.createdAt = tmpCreatedAt;
          dataNoti.userId = chatRoom.userId;
          dataNoti.chatRoomId = chatRoom.id;
          dataNoti.type = ENUM_KIND_OF_TYPE_NOTIFICATION.DELETE_ROOM;
          dataNoti.content = content;
          dataNoti.isRead = Notification.IS_READ_NOT_ACTIVE;
          dataNoti.receiverId = member.userId;
          var response = await this.notificationDao.create(dataNoti);

          if (member.onNotification === ChatRoomMember.NOTIFICATION_ACTIVE) {
            redisService.pubStreamObj({
              type: ENUM_CONSTANTS_PUSH_STREAM.NOTIFICATION,
              value: dataNoti,
              userIdSend: chatRoom.userId,
              chatId: member.userId
            });
          }
        }
      }
      result.status = RESULT_CODE.SUCCESS; //trạng thái thất bại
    }
    catch (error) {
      result.status = RESULT_CODE.ERROR; //trạng thái thất bại
      result.message = "error " + error; //tin nhắn lỗi trả về
    }
    return result;
  }
  // hungdm - Get Room Infor By ID - Params: ChatRoomId - FindAll -> FindOne
  async GetDetailByID(roomId: string) {
    var condition = new Conditions();
    condition.eq(ChatRoom.FIELD_id, roomId);
    return await this.chatRoomDao.findOne({
      where: condition.condition
    })
  }

  //vinhtq :cập nhật avatar nhóm chat
  async UpdateAvatarOrRoomName(chatRoom: any) {
    const result: IDataResult = {};
    try {

      let conditionUser = new Conditions();
      conditionUser.eq(ChatRoomMember.FIELD_userId, chatRoom.userId);
      conditionUser.eq(ChatRoomMember.FIELD_chatRoomId, chatRoom.id);
      var responseUser = await this.chatRoomMemberDao.findOne({
        where: conditionUser.condition
      })

      if (responseUser && responseUser.dataValues && (responseUser.dataValues.isAdmin == 0 || responseUser.dataValues.isAdmin == null || responseUser.dataValues.isAdmin == "")) {
        result.status = RESULT_CODE.ERROR; //trạng thái thất bại
        result.message = "Bạn không phải là quản trị viên không có quyền chỉnh sửa."; //tin nhắn lỗi trả về
        return result
      }
      else if (!responseUser) {
        result.status = RESULT_CODE.ERROR; //trạng thái thất bại
        result.message = "Người dùng này không tồn tại"; //tin nhắn lỗi trả về
        return result
      }

      //lấy thông tin nhóm
      let conditionRoom = new Conditions();
      conditionRoom.eq(ChatRoom.FIELD_id, chatRoom.id);
      var responseChatRoom = await this.chatRoomDao.findOne({
        attributes: [ChatRoom.FIELD_title, ChatRoom.FIELD_avatar],
        where: conditionRoom.condition
      })

      if (chatRoom.title !== responseChatRoom.dataValues.title || chatRoom.avatar !== responseChatRoom.dataValues.avatar) {
        var content = "";
        if (chatRoom.title !== responseChatRoom.dataValues.title && chatRoom.avatar !== responseChatRoom.dataValues.avatar) {
          content = responseUser.dataValues.lastName + " " + responseUser.dataValues.firstName + " đã chỉnh sửa ảnh và tên nhóm ";
        }
        else if (chatRoom.title !== responseChatRoom.dataValues.title) {
          content = responseUser.dataValues.lastName + " " + responseUser.dataValues.firstName + " đã chỉnh tên nhóm thành " + chatRoom.title;
        }
        else if (chatRoom.avatar !== responseChatRoom.dataValues.avatar) {
          content = responseUser.dataValues.lastName + " " + responseUser.dataValues.firstName + " đã chỉnh sửa hình ảnh ";
        }

        const message: any = {};
        const tmpCreatedAt = new Date();
        message.id = genGuidId(Chat.TABLE_NAME);
        message.status = Chat.STATUS_ACTIVE;
        message.updatedAt = tmpCreatedAt;
        message.createdAt = tmpCreatedAt;
        message.userId = chatRoom.userId;
        message.chatRoomId = chatRoom.id;
        message.message = content;
        message.messageType = ENUM_KIND_OF_MESSAGE_TYPE.TEXT;
        message.messageStatus = Chat.STATUS_ACTIVE;

        var responseChat = await this.chatDao.create(message);

        var conditionRoomChatMember = new Conditions();
        conditionRoomChatMember.eq(ChatRoomMember.FIELD_chatRoomId, chatRoom.id);
        conditionRoomChatMember.eq(ChatRoomMember.FIELD_status, ChatRoomMember.STATUS_ACTIVE);
        conditionRoomChatMember.eq(ChatRoomMember.FIELD_onNotification, ChatRoomMember.NOTIFICATION_ACTIVE);

        let roomMemberList: ChatRoomMember[] = await model.chat_room_members.findAll(
          {
            attributes: [ChatRoomMember.FIELD_userId],
            where: conditionRoomChatMember.condition,
          }
        );

        if (roomMemberList) {
          for (const member of roomMemberList) {
            //thêm vào bảng notification cho từng user trong nhóm
            redisService.pubStreamObj({
              type: ENUM_CONSTANTS_PUSH_STREAM.UPDATE_AVATAR_TITLE,
              value: message,
              chatRoomId: chatRoom.id,
              chatId: member.userId
            });
          }
        }


      }

      //cập nhật avatar và tên nhóm
      let updateAvatarCondition = new Conditions();
      updateAvatarCondition.eq(ChatRoom.FIELD_id, chatRoom.id);
      await this.chatRoomDao.update({
        title: chatRoom.title,
        avatar: chatRoom.avatar,
        updated_at: chatRoom.userId
      }, updateAvatarCondition.buildCondition());

      result.status = RESULT_CODE.SUCCESS; //trạng thái thất bại

    } catch (error) {
      result.status = RESULT_CODE.ERROR; //trạng thái thất bại
      result.message = "err:" + error; //tin nhắn lỗi trả về
    }
    return result
  }

  async syncToElasticSearch() {
    return this.chatRoomDao.findAll({
      attributes: [
        ChatRoom.FIELD_id,
        ChatRoom.FIELD_avatar,
        ChatRoom.FIELD_title,
        ChatRoom.FIELD_status,
      ],
    })
  }
  //hungdm - check xem ai trong group ngoài user_id truyền vào có online hay không ?
  async countMemberOnlineInGroup(chatRoomId: string, userId: number) {
    var condition = new Conditions();
    // Lọc theo chat room
    condition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomId);
    condition.ne(ChatRoomMember.FIELD_userId, userId);
    var condition2 = new Conditions();
    // Lọc theo user online
    condition2.eq(User.FIELD_isOnline, ENUM_CONSTANTS.ONLINE.ONLINE)
    return await this.chatRoomMemberDao.count({
      include: [
        {
          model: model.users,
          as: User.JOIN_CHAT_NAME,
          required: true,
          attributes: [User.FIELD_id, User.FIELD_isOnline],
          where: condition2.condition
        }
      ],
      where: condition.condition

    })
  }
}


