import db from '../common/connection-db';
import BaseSequelize from "../core/utils/base-sequelize/BaseSequelize";
import { Notification } from "../models/notification";
import Conditions from "../core/utils/sql/Conditions";
import { $bean } from "../core/utils/hyd/hyd-bean-utils";
import {
  ENUM_CONSTANTS,
  ENUM_CONSTANTS_PUSH_STREAM,
} from "../core/constants/enum-constants";
import { IDataResult } from '../core/handles/data-result';
import { NotificationDao } from '../dao/notification-dao';
import { RESULT_CODE } from '../core/constants/result-constants';
import { genGuidId } from '../uuid';
import { RedisService } from './redis-service';
import { ChatRoomMember } from '../models/chat-room-member';
const model = db.initModels;

export class NotificationService extends BaseSequelize<Notification>{
  constructor() {
    super();
    this.model = model.notifications;
  }
  notificationDao: NotificationDao = new NotificationDao();
  async countAllNotificationsById(userId: string) {
    return await this.count({
      where: { user_id: userId },
    });
  }
  async countNotificationsNotRead(userId: string) {
    return await this.count({
      where: {
        user_id: userId,
        is_read: Notification.IS_READ_ACTIVE
      },
    });
  }
  async getNotificationByPage(userId: string, page: number, pageSize: number) {
    console.log("------Get notification by page-----");
    return await this.findAll({
      where: { user_id: userId },
      // quyennq sửa lại attributes
      attributes: [
        Notification.FIELD_id,
        Notification.FIELD_type,
        Notification.FIELD_content,
        Notification.FIELD_isRead,
        Notification.FIELD_status,
        Notification.FIELD_chatRoomId,
        Notification.FIELD_createdAt,
      ],
      include: [
        {
          model: model.users,
          as: "user",
          required: true,
          attributes: ["avatar", "userName", "status", "lastLogin", "id"],
        },
      ],

      order: [["created_at", "DESC"]],
      offset: page,
      limit: pageSize,
    });
  }
  // cập nhật tất cả trạng thái hoặc đã đọc theo userId dựa vào isRead
  async changeStatusAllNotificationByUser(userId: string, isRead: boolean) {
    let result: IDataResult = {};
    try {
      var notiCondition = new Conditions();
      notiCondition.eq(Notification.FIELD_isRead, 0);
      notiCondition.eq(Notification.FIELD_userId, userId);
      notiCondition.eq(Notification.FIELD_status, 1);
      var lstNotificaionUnread = await this.findAll(notiCondition)
      if (lstNotificaionUnread.length > 0) {
        for (var i in lstNotificaionUnread) {
          var notification = lstNotificaionUnread[i];
          if (isRead) {
            notification.is_read = 1;
          } else {
            notification.status = 0;
          }
          result = await this.changeStatusNotification(notification);
        }
      }
    } catch (error) {
      result.status = RESULT_CODE.ERROR; //trạng thái thất bại
      result.message = "err:" + error; //tin nhắn lỗi trả về
    }
    return result
  }
  // cập nhật trạng thái hoặc đã đọc theo id dựa vào isRead
  async changeStatusAllNotificationById(id: string, isRead: boolean) {
    let result: IDataResult = {};
    try {
      var notiCondition = new Conditions();
      notiCondition.eq(Notification.FIELD_isRead, 0);
      notiCondition.eq(Notification.FIELD_id, id);
      notiCondition.eq(Notification.FIELD_status, 1);
      var notificaionUnread = await this.findOne(notiCondition)
      if (isRead) {
        notificaionUnread.is_read = 1;
      } else {
        notificaionUnread.status = 0;
      }
      result = await this.changeStatusNotification(notificaionUnread);
    } catch (error) {
      result.status = RESULT_CODE.ERROR; //trạng thái thất bại
      result.message = "err:" + error; //tin nhắn lỗi trả về
    }
    return result
  }
  async changeStatusNotification(notification: any) {
    let condition = new Conditions();
    const result: IDataResult = {};
    try {
      condition.eq(Notification.FIELD_id, notification.id);
      await this.notificationDao.update({
        title: notification.status,
      }, condition.buildCondition());

      result.status = RESULT_CODE.SUCCESS; //trạng thái thành công
    } catch (error) {
      result.status = RESULT_CODE.ERROR; //trạng thái thất bại
      result.message = "err:" + error; //tin nhắn lỗi trả về
    }
    return result
  }



  /**
   *  Quyennq Đẩy thông báo realtime
   * @param  {any} value Dữ liệu cần đẩy
   * @param  {string} type kiểu thông báo
   * @param  {any} condition? điều kiện lấy list user để đẩy thông báo
   */
  async pushNotification(value: any, type: string, condition?: any) {

    await this.create(value).then(result => {
      console.log("🚀 ~ file: notification-service.ts ~ line 130 ~ NotificationService ~ awaitthis.create ~ result", result)

    }).catch(error => {
      console.log("🚀 ~ file: notification-service.ts ~ line 145 ~ NotificationService ~ awaitthis.create ~ error", error)

    })
    const redisService: RedisService = new RedisService();
    let roomMemberList: ChatRoomMember[] = await model.chat_room_members.findAll(
      {
        attributes: [ChatRoomMember.FIELD_userId],
        where: condition,
      }
    );

    if (roomMemberList) {
      for (const member of roomMemberList) {
        //thêm vào bảng notification cho từng user trong nhóm
        redisService.pubStreamObj({
          type: type,
          value: value,
          chatId: member.userId
        });
      }
    }


  }
}