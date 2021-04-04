import { IMessageSearch } from './../core/utils/elastic-search/elastic-search-interface';
import db from "../common/connection-db";
import BaseSequelize from "../core/utils/base-sequelize/BaseSequelize";
import { Chat } from "../models/chat";
import { $bean } from "../core/utils/hyd/hyd-bean-utils";
import { genGuidId } from "../uuid";
import { RedisService } from "./redis-service";
import Conditions from "../core/utils/sql/Conditions";
import { ChatRoomMember } from "../models/chat-room-member";
import { AttachmentService } from "./attachment-service";
import { Attachment } from "../models/attachment";
import {
  ENUM_CONSTANTS,
  ENUM_CONSTANTS_PUSH_STREAM,
  ENUM_KIND_OF_TYPE_NOTIFICATION,
} from "../core/constants/enum-constants";
import { User } from "../models/user";
import { QueryTypes } from 'sequelize';
import { ChatRoom } from "../models/chat-room";
import { ChatRoomDao } from "../dao/chat-room-dao";
import { ChatRoomMemberDao } from "../dao/chat-room-member-dao";
import { UserDao } from "../dao/user-dao";
import { NotificationDao } from "../dao/notification-dao";
import { Notification } from "../models/notification";
import { elasticSearchService } from '../core/utils/elastic-search/elastic-search-services';
import { IDataResult } from '../core/handles/data-result';
import { NotificationService } from './notification-service';
import { RESULT_CODE, RESULT_MESSAGE } from '../core/constants/result-constants';

const model = db.initModels;
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
const redisService: RedisService = new RedisService();
export class ChatService extends BaseSequelize<Chat> {
  constructor() {
    super();
    this.model = model.chats;
  }
  userDao = new UserDao();

  chatRoomDao = new ChatRoomDao();

  chatRoomMemberDao = new ChatRoomMemberDao();

  notificationDao: NotificationDao = new NotificationDao();
  /**
   * quyennq Đếm tất cả tin nhắn theo roomId
   * @param  {string} roomId id phòng chat
   */
  async countAllChatsById(roomId: string) {
    var condition = new Conditions();
    condition.eq(Chat.FIELD_chatRoomId, roomId);
    condition.eq(Chat.FIELD_status, ENUM_CONSTANTS.CHAT_STATUS.ACTIVE);
    return await this.count({
      where: condition.condition,
    });
  }

  // hungdm - Get Count With Contact with tin nhắn mới nhất
  async GetCountListContactWithMessage(user_id: string) {
    return await this.count({
      where: {
        chatRoomId: {
          [Op.in]: [
            Sequelize.literal(
              `SELECT b.chat_room_id FROM chat_ihcm.chat_room_members b WHERE b.user_id = '${user_id}' `
            ),
          ],
        },
        createdAt: {
          [Op.in]: [
            Sequelize.literal(
              `SELECT MAX(a.created_at) FROM chat_ihcm.chats a GROUP BY a.chat_room_id`
            ),
          ],
        },
      },
    });
  }

  async GetListContact(user_id: string, offset: number, take: number) {
    return await this.findAll({
      where: {
        chatRoomId: {
          [Op.in]: [
            Sequelize.literal(
              `SELECT b.chat_room_id FROM chat_ihcm.chat_room_members b WHERE b.user_id = '${user_id}' `
            ),
          ],
        },
        createdAt: {
          [Op.in]: [
            Sequelize.literal(
              `SELECT MAX(a.created_at) FROM chat_ihcm.chats a GROUP BY a.chat_room_id`
            ),
          ],
        },
      },
      order: [["created_at", "DESC"]],
      offset: offset,
      limit: take,
    });
  }
  /**
   * quyennq - Lấy chi tiết chat theo id
   * @param  {string} id
   */
  async getChatById(id: string) {
    return await this.findByPk(id);
  }
  /**
   * quyennq - Lấy danh sách tin nhắn phân trang
   * @param  {string} roomId Id phòng chat
   * @param  {number} offset số bản ghi bỏ qua
   * @param  {number} take số bản ghi cần lầy
   */
  async getMessageByPage(roomId: string, offset: number, take: number) {
    console.log("------Get message by page-----");
    let condition = new Conditions();
    condition.eq(Chat.FIELD_chatRoomId, roomId);
    condition.eq(Chat.FIELD_status, ENUM_CONSTANTS.CHAT_STATUS.ACTIVE);
    return await this.findAll({
      where: condition.condition,
      attributes: [
        Chat.FIELD_id,
        Chat.FIELD_message,
        Chat.FIELD_messageType,
        Chat.FIELD_messageStatus,
        Chat.FIELD_status,
        Chat.FIELD_reaction,
        Chat.FIELD_createdAt
      ],

      include: [
        {
          model: model.attachments,
          as: Attachment.TABLE_NAME,
          // attributes: [
          //   Attachment.FIELD_contentType,
          //   Attachment.FIELD_name,
          //   Attachment.FIELD_type,
          //   Attachment.FIELD_status
          // ],

        },
        {
          model: model.chats,
          as: Chat.PARENT,
          attributes: [
            Chat.FIELD_id,
            Chat.FIELD_message,
            Chat.FIELD_messageType,
            Chat.FIELD_messageStatus,
            Chat.FIELD_status,
            Chat.FIELD_parentId,
            Chat.FIELD_createdAt,
          ],
          include: [
            {
              model: model.attachments,
              as: Attachment.TABLE_NAME,
              // attributes: [
              //   Attachment.FIELD_contentType,
              //   Attachment.FIELD_name,
              //   Attachment.FIELD_type,
              //   Attachment.FIELD_status
              // ],

            },
            {
              model: model.users,
              as: User.JOIN_CHAT_NAME,
              required: true,
              attributes: [
                User.FIELD_id,
                User.FIELD_avatar,
                User.FIELD_lastLogin,
                User.FIELD_firstName,
                User.FIELD_lastName,
                User.FIELD_userName,
                User.FIELD_status
              ],
            },


          ]
        },
        {
          model: model.users,
          as: User.JOIN_CHAT_NAME,
          required: true,
          attributes: [
            User.FIELD_id,
            User.FIELD_avatar,
            User.FIELD_lastLogin,
            User.FIELD_firstName,
            User.FIELD_lastName,
            User.FIELD_userName,
            User.FIELD_status
          ],
        },


      ],

      order: [["created_at", "DESC"]],
      offset: offset,
      limit: take,
    }).then((listMessage) => {
      for (let message of listMessage) {
        if (message.reaction) {
          message.reaction = JSON.parse(message.reaction);
        }
      }
      return listMessage;
    });
  }
  // hungdm - Count All Link In Room Chat - Params: ChatRoomId
  async CountAllLinkInRoomChat(roomId: string) {
    var condition = new Conditions();
    condition.eq(Chat.FIELD_chatRoomId, roomId);
    // Lấy link MessageType = 2
    condition.eq(Chat.FIELD_messageType, ENUM_CONSTANTS.MESSAGE_TYPE.LINK);
    return await this.count({
      where: condition.condition,
    });
  }
  // hungdm - Get Link In Room Chat - Params: ChatRoomId
  async GetAllLinkInRoom(roomId: string, skip: number, take: number) {
    var condition = new Conditions();
    condition.eq(Chat.FIELD_chatRoomId, roomId);
    // Lấy link MessageType = 2
    condition.eq(Chat.FIELD_messageType, ENUM_CONSTANTS.MESSAGE_TYPE.LINK);
    return await this.findAll({
      where: condition.condition,
      order: [["created_at", "DESC"]],
      offset: skip,
      limit: take,
    });
  }

  // 
  /**
   * tuda= Thêm tin nhắn mới lần đầu, cần tạo nhóm chat trước khi send Message
   * @param  {any} message đối tượng tin nhắn
   */
  async insertFirstMessage(message: any) {
    // let condition = new Conditions();
    // condition.eq(ChatRoom.FIELD_id, message.chatRoomId);

    // const chatRoom = this.chatRoomDao.findByPk(message.chatRoomId);
    // if ($bean.isNil(chatRoom)) {
    // Create new chat room
    let newChatRoom = {
      id: genGuidId(ChatRoom.TABLE_NAME),
      type: ChatRoom.TYPE_SINGLE,
      title: message.chatRoomId,
      status: ChatRoom.STATUS_ACTIVE,
      createdBy: message.userId,
    };
    let chatRoomRes;
    try {
      chatRoomRes = await this.chatRoomDao.create(newChatRoom);
    } catch (error) {
      console.log("Error");
      console.log(error);
    }

    // Add login user to room chat
    let chatRoomMember = {
      id: genGuidId(ChatRoomMember.TABLE_NAME),
      chatRoomId: chatRoomRes.id,
      userId: message.userId,
      status: ChatRoomMember.STATUS_ACTIVE,
      isAdmin: ChatRoomMember.IS_ADMIN,
      createdBy: message.userId,
      updatedBy: message.userId,
    };
    try {
      await this.chatRoomMemberDao.create(chatRoomMember)
    } catch (error) {
      console.log("Error");
      console.log(error);
    }

    // Add user who receive message
    let chatRoomMemberReceive = {
      id: genGuidId(ChatRoomMember.TABLE_NAME),
      chatRoomId: chatRoomRes.id,
      userId: message.chatRoomId,
      status: ChatRoomMember.STATUS_ACTIVE,
      isAdmin: ChatRoomMember.IS_ADMIN,
      createdBy: message.userId,
      updatedBy: message.userId,
    };
    try {
      await this.chatRoomMemberDao.create(chatRoomMemberReceive)
    } catch (error) {
      console.log("Error");
      console.log(error);
    }

    // send message to recent created room chat
    message.chatRoomId = chatRoomRes.id;
    let condition = new Conditions();
    condition.eq(ChatRoomMember.FIELD_chatRoomId, chatRoomRes.id);
    let chatRoomMemberRes = await this.chatRoomMemberDao.findAll({
      where: condition.condition,
      include: [
        {
          model: model.users,
          as: User.JOIN_CHAT_NAME,
          required: true,
        }
      ]
    })
    if (chatRoomMemberRes) {
      message.chat_room_members = chatRoomMemberRes;
    }
    message.isFristMessage = true;
    await this.insertMessage(message);

    return chatRoomRes;
    // }

  }

  /**
   * quyennq= Thêm mới tin nhắn
   * @param  {any} message đối tượng tin nhắn
   * vinhtq : 09/03/2021 : thêm insert thông báo khi là tin nhắn rep
   * vinhtq:09/03/2021: trả thêm parent và parentId
   */
  async insertMessage(message: any) {
    // let resultInsert: any = {};
    console.log("doInsertMessenger_msg_0: ", message);
    const tmpCreatedAt = new Date();
    // Lưu messenger vào database
    message.id = genGuidId(Chat.TABLE_NAME);
    message.status = Chat.STATUS_ACTIVE;
    message.updatedAt = tmpCreatedAt;
    message.createdAt = tmpCreatedAt;
    console.log("----Message----");
    console.log(message);
    let tmpMessageType = ENUM_CONSTANTS_PUSH_STREAM.NEW_MESSENGER;

    // Gửi messenger realtime lên chat
    let realTimeMess: any = {};
    realTimeMess[Chat.FIELD_id] = message.id;
    realTimeMess[Chat.FIELD_userId] = message.userId;
    realTimeMess[Chat.FIELD_chatRoomId] = message.chatRoomId;
    realTimeMess[Chat.FIELD_messageStatus] = message.messageStatus;
    // added by tuda
    let chatRoom = await this.chatRoomDao.findByPk(message.chatRoomId, {
      raw: true
    });
    chatRoom["chats"] = [];
    chatRoom["chats"].push(message);
    if (chatRoom) {
      if (message.chat_room_members) {
        chatRoom["chat_room_members"] = message.chat_room_members;
      }
      realTimeMess["chatRoom"] = chatRoom;
    }
    if (message.isNewChatRoom) {
      tmpMessageType = ENUM_CONSTANTS_PUSH_STREAM.CREATE_CHAT_ROOM
    }
    if (message.isFristMessage) {
      tmpMessageType = ENUM_CONSTANTS_PUSH_STREAM.FIRST_MESSAGE
    }
    // end added by tuda
    realTimeMess[Chat.FIELD_message] = message?.message || "";
    realTimeMess[Chat.FIELD_createdAt] = tmpCreatedAt;
    realTimeMess[Chat.FIELD_attachments] = message.attachments;
    realTimeMess[Chat.FIELD_messageType] = message.messageType;
    realTimeMess[Chat.FIELD_parentId] = message?.parentId;
    realTimeMess[Chat.PARENT] = message?.parent;
    //Quyennq: Thêm lấy user để trả về push stream 
    let userObj = await this.userDao.findByPk(message.userId, {
      attributes: [
        User.FIELD_id,
        User.FIELD_avatar,
        User.FIELD_lastLogin,
        User.FIELD_firstName,
        User.FIELD_lastName,
        User.FIELD_userName,
        User.FIELD_status
      ]
    });
    console.log("🚀 ~ file: chat-service.ts ~ line 335 ~ ChatService ~ insertMessage ~ userObj", userObj)
    realTimeMess["user"] = userObj
    console.log("realTimeMess ");
    console.log(realTimeMess);
    this.pubStream(
      realTimeMess[Chat.FIELD_chatRoomId],
      tmpMessageType,
      realTimeMess
    );

    let resultInsert = await this.create(message)
      .then((result) => {
        console.log("🚀 ~ file: chat-service.ts ~ line 345 ~ ChatService ~ .then ~ result", result)
        const attachmentService = new AttachmentService();
        if ($bean.isNotNil(message.attachments)) {
          for (let i = 0; i < message.attachments.length; i++) {
            const att = message.attachments[i];
            // console.log("🚀 ~ file: chat-service.ts ~ line 328 ~ ChatService ~ .then ~ att", att)
            let attachment: any = {
              chatId: message.id,
              contentType: att.contentType,
              name: att.name,
              type: att.type,
              fileSize: att.fileSize,
              guiId: att.guiId,
              // createdAt: message.createdAt,
              // updatedAt: message.createdAt,
              createdAt: tmpCreatedAt,
              updatedAt: tmpCreatedAt,
              createdBy: message.userId,
              updatedBy: message.userId,
            };

            // console.log("🚀 ~ file: chat-service.ts ~ line 114 ~ ChatService ~ insertMessage ~ attachment", attachment)
            (async () => {
              await attachmentService.save(attachment).then((res) => {
                console.log(
                  "🚀 ~ file: chat-service.ts ~ line 151 ~ ChatService ~ awaitattachmentService.save ~ res",
                  res
                );
              });
            })();
          }
        }

        //vinhtq thêm khi tin nhắn rep
        if (message.parentId) {
          (async () => {
            let conditionMessageParent = new Conditions();
            conditionMessageParent.eq(Chat.FIELD_id, message.parentId);
            var messageParent = await this.findOne({
              where: conditionMessageParent.condition
            })

            let conditionUserSendMessage = new Conditions();
            conditionUserSendMessage.eq(User.FIELD_id, message.userId);
            var responseUser = await this.userDao.findOne({
              where: conditionUserSendMessage.condition
            })

            let conditionChatRoomMember = new Conditions();
            conditionChatRoomMember.eq(ChatRoomMember.FIELD_userId, messageParent.dataValues.userId);
            var responseChatRoomMember = await this.chatRoomMemberDao.findOne({
              where: conditionChatRoomMember.condition
            })
            const dataNoti: any = {};
            const tmpCreatedAt = new Date();
            dataNoti.id = genGuidId(Notification.TABLE_NAME);
            dataNoti.status = Notification.STATUS_ACTIVE;
            dataNoti.updatedAt = tmpCreatedAt;
            dataNoti.createdAt = tmpCreatedAt;
            dataNoti.userId = message.userId;
            dataNoti.chatRoomId = message.chatRoomId;
            dataNoti.type = ENUM_KIND_OF_TYPE_NOTIFICATION.REPLY;
            dataNoti.content = responseUser.dataValues.lastName + ' ' + responseUser.dataValues.firstName + ' ' + "đã trả lời tin nhắn của bạn" + ' "' + messageParent.dataValues.message + '"'
            dataNoti.isRead = Notification.IS_READ_NOT_ACTIVE;
            dataNoti.receiverId = messageParent.dataValues.userId;
            await this.notificationDao.create(dataNoti);
            //Nếu mở nhận thông báo

            if (responseChatRoomMember.dataValues.onNotification === ChatRoomMember.NOTIFICATION_ACTIVE) {
              redisService.pubStreamObj({
                type: ENUM_CONSTANTS_PUSH_STREAM.NOTIFICATION,
                value: dataNoti,
                chatId: messageParent.dataValues.userId
              });
            }
          })();
        }
        //end vinhtq thêm khi tin nhắn rep

        // quyennq : thêm data vào elastic-search
        // const dataSearch: IMessageSearch = {
        //   id: message.id,
        //   message: message.message,
        //   userId: message.userId,
        //   chats_user: {
        //     name: Chat.TABLE_NAME,
        //     parent: message.userId
        //   }
        // }
        // insertElasticSearch(dataSearch).then(resp => {
        //   console.log("🚀 ~ file: chat-service.ts ~ line 425 ~ ChatService ~ insertElasticSearch ~ resp", resp)

        // }).catch(err => {
        //   console.log("🚀 ~ file: chat-service.ts ~ line 509 ~ ChatService ~ insertElasticSearch ~ err", err.body)

        // })
        // end quyennq
        return result;
      })
      .catch((error) => {
        console.log("error--------------------------", error);
        return error;
      });
    return resultInsert;
  }

  async pubStream(chatId: string, type: any, value: any) {
    console.log("test_pubsteam: ", chatId);
    console.log(value);

    // let roomMemberList = await model.chat_room_members.findAll({
    //   where: {chat_room_id: chatId },
    //   attributes: ["user_id"],
    // });

    //TODO: Condition
    var condition = new Conditions();
    condition.eq(ChatRoomMember.FIELD_chatRoomId, chatId);

    console.log("test_pubsteam_condition: ", condition);
    let roomMemberList: ChatRoomMember[] = [];
    try {
      roomMemberList = await model.chat_room_members.findAll(
        {
          attributes: [ChatRoomMember.FIELD_userId],
          where: condition.condition,
        }
      );
    } catch (error) {
      console.log(error)
    }


    console.log("test_userChatList: ", roomMemberList);
    // let i = 0;
    // for (let i = 0; i < 5000; i ++) {
    for (const member of roomMemberList) {
      // console.log("-----" + (i++) + "-----")
      redisService.pubStreamObj({
        type: type,
        value: value,
        chatId: member.userId,
      });
    }
    // }

  }

  /**
   * quyennq - Cập nhật tin nhắn
   * @param  {any} message đối tượng tin nhắn
   * vinhtq: 09/03/2021:thông báo tin nhắn khi có hành động reaction
   */
  async updateMessage(message: any) {
    console.log("🚀 ~ file: chat-service.ts ~ line 304 ~ ChatService ~ updateMessage ~ message", message)
    let condition = new Conditions();
    condition.eq(Chat.FIELD_id, message.id);

    var messageOld = await this.findOne({
      where: condition.condition
    })

    await this.update(message, {
      where: condition.condition,
    })
      .then((result) => {
        let realTimeMess: any = {};
        realTimeMess[Chat.FIELD_id] = message.id;
        realTimeMess[Chat.FIELD_userId] = message.userId;
        realTimeMess[Chat.FIELD_chatRoomId] = messageOld.chatRoomId;
        realTimeMess[Chat.FIELD_message] = message?.message || "";
        if (message.reaction) {
          realTimeMess[Chat.FIELD_reaction] = JSON.parse(message.reaction);
        }
        // realTimeMess["createdAt"] = message.createdAt;
        realTimeMess[Chat.FIELD_updatedAt] = message.updatedAt;
        // realTimeMess["attachment"] = message.attachments
        console.log("realTimeMess ");
        console.log(realTimeMess);
        this.pubStream(
          realTimeMess[Chat.FIELD_chatRoomId],
          ENUM_CONSTANTS_PUSH_STREAM.UPDATE_MESSENGER,
          realTimeMess
        );

        //vinhtq thêm phần tương tác với reaction
        if (message.reaction !== messageOld.dataValues.reaction) {
          (async () => {

            let conditionUserSendMessage = new Conditions();
            conditionUserSendMessage.eq(User.FIELD_id, messageOld.dataValues.userId);
            var responseUser = await this.userDao.findOne({
              where: conditionUserSendMessage.condition
            })

            let conditionChatRoomMember = new Conditions();
            conditionChatRoomMember.eq(ChatRoomMember.FIELD_userId, messageOld.dataValues.userId);
            var responseChatRoomMember = await this.chatRoomMemberDao.findOne({
              where: conditionChatRoomMember.condition
            })
            const dataNoti: any = {};
            const tmpCreatedAt = new Date();
            dataNoti.id = genGuidId(Notification.TABLE_NAME);
            dataNoti.status = Notification.STATUS_ACTIVE;
            dataNoti.updatedAt = tmpCreatedAt;
            dataNoti.createdAt = tmpCreatedAt;
            dataNoti.userId = messageOld.dataValues.userId;
            dataNoti.chatRoomId = message.chatRoomId;
            dataNoti.type = ENUM_KIND_OF_TYPE_NOTIFICATION.LIKE;
            dataNoti.content = responseUser.dataValues.lastName + ' ' + responseUser.dataValues.firstName + ' ' + "đã trả tương tác với bình luận bạn" + ' "';
            dataNoti.isRead = Notification.IS_READ_NOT_ACTIVE;
            dataNoti.receiverId = messageOld.dataValues.userId;
            await this.notificationDao.create(dataNoti);
            //Nếu mở nhận thông báo

            if (responseChatRoomMember.dataValues.onNotification === ChatRoomMember.NOTIFICATION_ACTIVE) {
              redisService.pubStreamObj({
                type: ENUM_CONSTANTS_PUSH_STREAM.NOTIFICATION,
                value: dataNoti,
                chatId: messageOld.dataValues.userId
              });
            }
          })();
        }
        //end vinhtq thêm phần tương tác với reaction
        return result;
      })
      .catch((error) => {
        return error;
      });
  }
  /**
   * quyennq- Xóa tin nhắn
   * @param  {any} message đối tượng tin nhắn
   */
  async removeMessage(message: any) {
    let condition = new Conditions();
    condition.eq(Chat.FIELD_id, message.id);
    await this.update(
      $bean.parseJson(
        `{"${Chat.FIELD_status}" : "${ENUM_CONSTANTS.CHAT_STATUS.IN_ACTIVE}"}`
      ),
      {
        where: condition.condition,
      }
    )
      .then((result) => {
        let realTimeMess: any = {};
        realTimeMess[Chat.FIELD_id] = message.id;
        realTimeMess[Chat.FIELD_userId] = message.userId;
        realTimeMess[Chat.FIELD_chatRoomId] = message.chatRoomId;
        console.log("realTimeMess ");
        console.log(realTimeMess);
        this.pubStream(
          realTimeMess[Chat.FIELD_chatRoomId],
          ENUM_CONSTANTS_PUSH_STREAM.NEW_MESSENGER,
          realTimeMess
        );
        return result;
      })
      .catch((error) => {
        return error;
      });
  }
  // async searchMessages(roomId: string, searchText: string, offset: number, limit: number) {


  //   let queryString = `SELECT 
  //   chats.id as id,
  //   chats.message as message,
  //   chats.created_at as createdAt,
  //   users.avatar as userAvatar,
  //   users.first_name as firstName,
  //   users.last_name as lastName
  //   FROM chats 
  //   left join users 
  //   on users.id = chats.user_id
  //   where match (chats.message) 
  //   against ('${searchText}*' IN BOOLEAN MODE) 
  //   and chats.chat_room_id = '${roomId}' 
  //   and chats.status = '1'    
  //   limit ${offset},${limit};`;
  //   return await db.sequelize.query(queryString, { type: QueryTypes.SELECT })

  // }
  /**
   * quyennq- Lấy vị trí tin nhắn theo id tin nhắn và room id
   * @param  {string} roomId id phòng chat
   * @param  {string} id id tin nhắn
   */
  async getPosMessById(roomId: string, messId: string) {
    return await db.sequelize.query(`SELECT c.position
    FROM
      (SELECT chats.id,
              (@rownum := @rownum + 1) AS position
       FROM chat_ihcm.chats AS chats,
         (SELECT @rownum := 0) AS r
       WHERE chat_room_id = '${roomId}'
       AND status = '1'
        ORDER BY created_at desc) AS c
    WHERE id = '${messId}';`, { type: QueryTypes.SELECT })
      .then(res => {
        return res;
      }).catch(err => {
        return err
      })
  }
  /**
   * quyennq dem so ban ghi search duoc
   * @param  {string} roomId
   * @param  {string} searchText
   */
  async countSearchChats(roomId: string, searchText: string) {
    let queryString = `SELECT COUNT(*) as count
    FROM chats 
    where match (chats.message) 
    against ('${searchText}*' IN BOOLEAN MODE) 
    and chats.chat_room_id = '${roomId}' 
    and chats.status = '1';`;
    return await db.sequelize.query(queryString, { type: QueryTypes.SELECT })
      .then((result) => result)
      .catch((error) => {
        console.log("🚀 ~ file: chat-service.ts ~ line 521 ~ ChatService ~ countSearchChats ~ error", error)

        return error;
      })

  }
  /**
   * quyennq : dong bo elastic
   */
  async syncToElasticSearch() {
    return this.findAll({
      attributes: [
        Chat.FIELD_id,
        Chat.FIELD_message,
        Chat.FIELD_chatRoomId,
        Chat.FIELD_status,
        Chat.FIELD_userId
      ],
      where: {
        messageType: '0'
      }
    })
  }
  /**
   * quyennq: search tin nhắn dùng elastic-search
   * @param  {string} roomId
   * @param  {string} searchText
   * @param  {number} offset
   * @param  {number} limit
   */
  async searchMessages(roomId: string, searchText: string, offset: number, limit: number) {


    let searchQuery = {
      query: {
        bool: {
          must: [
            {
              match: {
                message: searchText,
              }
            },
            {
              match: {
                chatRoomId: roomId
              }
            },
          ]
        }


      },
      from: offset,
      size: limit
    }

    return await elasticSearchService.searchElasticSearch(searchQuery);

  }
  /**
   * hungdm - Tạo thông báo khi người dùng được tag tên
   * @param chatRoomId 
   * @param userId 
   */
  async insertNotificationTagName(chatRoomId: string, userId: string, userIdSend: string) {
    const result: IDataResult = {};
    try {
      const dataNoti: any = {};
      const tmpCreatedAt = new Date();
      dataNoti.id = genGuidId(Notification.TABLE_NAME);
      dataNoti.status = Notification.STATUS_ACTIVE;
      dataNoti.updatedAt = tmpCreatedAt;
      dataNoti.createdAt = tmpCreatedAt;
      dataNoti.userId = userIdSend;
      dataNoti.chatRoomId = chatRoomId;
      dataNoti.type = 1;
      dataNoti.content = "Bạn đã được gắn thẻ trong một tin nhắn";
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
      result.status = RESULT_CODE.SUCCESS; //trạng thái thành công
      result.message = RESULT_MESSAGE.SUCCESS; //tin nhắn thành công trả về
      return result;
    }
    catch (error) {
      result.status = RESULT_CODE.ERROR; //trạng thái thất bại
      result.message = "err:" + error; //tin nhắn lỗi trả về
      return result;
    }
  }
}
