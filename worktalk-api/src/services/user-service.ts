import db from "../common/connection-db";
import BaseSequelize from "../core/utils/base-sequelize/BaseSequelize";
import { users } from "../db-export-default/users";
import { user } from "../db-model-exported/user-base";
import { User } from "../models/user";
import { genGuidId } from "../uuid";
import Conditions from "../core/utils/sql/Conditions";
import { RESULT_CODE, RESULT_MESSAGE } from "../core/constants/result-constants";
import { ChatRoom } from "../models/chat-room";
import { UserDao } from "../dao/user-dao";
import { IDataResult } from "../core/handles/data-result";
import { QueryTypes } from 'sequelize';
import { ChatRoomDao } from "../dao/chat-room-dao";
import { ChatRoomMember } from "../models/chat-room-member";
import { RedisService } from "./redis-service";
import { ENUM_CONSTANTS_PUSH_STREAM } from "../core/constants/enum-constants";

var Sequelize = require('sequelize');
var Op = Sequelize.Op;
const redisService: RedisService = new RedisService();
export class UserService {
  userDao = new UserDao();

  chatRoomDao = new ChatRoomDao();

  async add(user: User): Promise<Object> {
    let resUser: any = null;
    if (user) {
      var condition = new Conditions();
      condition.eq(User.FIELD_id, user.id);
      let exitedUser = await this.userDao.findOne({
        // attributes: [User.FIELD_id],
        where: condition.condition,
      });

      if (exitedUser) return { status: RESULT_CODE.CREATED, user: exitedUser };
      try {
        resUser = await this.userDao.create(user);
      } catch (error) {
        console.log(error)
      }

    }
    return resUser;
  }

  async insertUsers(userList: users[]) {
    for (var user of userList) {
      // user.id = genGuidId(User.TABLE_NAME);
      try {
        await this.userDao.create(user);
      } catch (error) {
        console.log("Error");
        console.log(error);
      }
    }
    return userList;
  }
  async countAllUsers() {
    return await this.userDao.count();
  }
  // Count All Where
  async countAllUsersByQuery(text: string) {
    return await this.userDao.count({
      where: {
        [Op.or]: [
          //Tìm kiếm theo điều kiện or
          {
            userName: {
              [Op.like]: `%${text}%`,
            },
          },
          {
            firstName: {
              [Op.like]: `%${text}%`,
            },
          },
          {
            lastName: {
              [Op.like]: `%${text}%`,
            },
          },
        ],
      }
    });
  }
  // hungdm - thêm order by theo trạng thái online
  async getUserByPage(text: string, skip: number, take: number) {
    //hungdm - cmt bỏ hết dấu cách
    //text = text.replace(/\s/g, '');
    text = text.trim();

    var orUserCondition = new Conditions();
    orUserCondition.like(User.FIELD_userName, text, "%", "%");
    orUserCondition.like(User.FIELD_firstName, text, "%", "%");
    orUserCondition.like(User.FIELD_lastName, text, "%  ", "%");

    var userCondition = new Conditions();
    userCondition.or(orUserCondition.buildOrCondition());

    var listUsers;
    try {
      listUsers = await this.userDao.findAll({
        where: userCondition.condition,
        order: [
          [User.FIELD_status, 'DESC'],
          [User.FIELD_userName, 'ASC']
        ],
        offset: skip,
        limit: take,
      });
    } catch (error) {
      console.log(error)
    }
    return listUsers;
  }

  // search-user-tuda updated from vinh
  // async searchUser(text: string) {
  //   //Tìm kiếm user theo tên tài khoản hoặc tên cá nhân
  //   text = text.replace(/\s/g, '');

  //   var orUserCondition = new Conditions();
  //   orUserCondition.like(User.FIELD_userName, text, "%", "%");
  //   orUserCondition.like(User.FIELD_firstName, text, "%", "%");
  //   orUserCondition.like(User.FIELD_lastName, text, "%", "%");

  //   var userCondition = new Conditions();
  //   userCondition.or(orUserCondition.buildOrCondition());

  //   console.log(orUserCondition.arrayCondition);
  //   console.log(userCondition.condition);

  //   var dataUsers;
  //   try {
  //     dataUsers = await this.userDao.findAll(userCondition.buildCondition());
  //   } catch (error) {
  //     console.log(error)
  //   }

    // dataUsers = await this.findAll({
    //   where: {
    //     "$or": [
    //       //Tìm kiếm theo điều kiện or
    //       {
    //         userName: {
    //           $like: `%${text}%`,
    //         },
    //       },
    //       {
    //         firstName: {
    //           $like: `%${text}%`,
    //         },
    //       },
    //       {
    //         lastName: {
    //           $like: `%${text}%`,
    //         },
    //       },
    //     ],
    //   },
    // });

    // var orChatCondition = new Conditions();
    // orChatCondition.like(ChatRoom.FIELD_title, text, "%", "%");
    // orChatCondition.like(ChatRoom.FIELD_slogan, text, "%", "%");
    // orChatCondition.like(ChatRoom.FIELD_description, text, "%", "%");

    // var chatCondition = new Conditions();
    // chatCondition.or(orUserCondition.buildOrCondition());

    // var dataChats = [];
    // try {
    //   dataChats = await this.userDao.findAll(chatCondition.buildCondition());
    // } catch (error) {
    //   console.log(error)
    // }

    //Tìm kiếm room chat theo tiêu đề,slogan hoặc mô tả room chat
    // const dataChats = await model.users.findAll({
    //   where: {
    //     [Op.or]: [
    //       //Tìm kiếm theo điều kiện or
    //       {
    //         title: {
    //           [Op.like]: `%${text}%`,
    //         },
    //       },
    //       {
    //         slogan: {
    //           [Op.like]: `%${text}%`,
    //         },
    //       },
    //       {
    //         description: {
    //           [Op.like]: `%${text}%`,
    //         },
    //       },
    //     ],
    //   },
    // });

  //   var response: any = {
  //     dataUsers: dataUsers,
  //     dataChats: dataChats
  //   }

  //   return response;
  // }

  // vinhtq - thêmh hàm get user by ID
  async getUserById(userId: string) {
    const result: IDataResult = {};
    try {

      //TODO: Condition
      var condition = new Conditions();
      condition.eq(User.FIELD_id, userId);

      let user = await this.userDao.findOne({
        attributes: [
          User.FIELD_id,
          User.FIELD_userName,
          User.FIELD_firstName,
          User.FIELD_lastName,
          User.FIELD_status,
          User.FIELD_avatar,
          User.FIELD_email
        ],
        where: condition.condition,
      });
      result.status = RESULT_CODE.SUCCESS; //trạng thái thành công
      result.message = RESULT_MESSAGE.SUCCESS; //tin nhắn thành công trả về
      result.data = user
    }
    catch (err) {
      result.status = RESULT_CODE.ERROR; //trạng thái thất bại
      result.message = "err:" + err; //tin nhắn lỗi trả về
    }
    return result
  }
  /**
   * hungdm - Lấy thông tin những user chat riêng với userId
   * @param userId 
   * @returns 
   */
  async GetUserInConversation(userId: string) {
    return await db.sequelize.query(`select b.*,a.chat_room_id as 'chat_room_id' from chat_ihcm.chat_room_members a 
    inner join chat_ihcm.users b on a.user_id = b.id
    inner join chat_ihcm.chat_rooms d on a.chat_room_id = d.id
    where a.chat_room_id in (select c.chat_room_id from chat_ihcm.chat_room_members c where c.user_id = '${userId}')
    and a.user_id <> '${userId}' and d.type = '0'`, { type: QueryTypes.SELECT })
      .then(res => {
        return res;
      }).catch(err => {
        return err
      })
  }

  async syncToElasticSearch() {
    return this.userDao.findAll({
      attributes: [
        User.FIELD_id,
        User.FIELD_userName,
        User.FIELD_status,
        User.FIELD_avatar,
      ]
    })
  }
  /**
   * tuda - gửi realtime online/offline đến những người đã từng chat
   * @param userId 
   * @returns 
   */


  async updateOnline(user: any) {
    try {
      let conditionUser = new Conditions();
      conditionUser.eq(User.FIELD_id, user.id);
      await this.userDao.update({ isOnline: user.isOnline }, conditionUser.buildCondition());
    } catch (error) {
      console.log(error)
    }

    const memberRelationQuery = `SELECT DISTINCT user_id FROM chat_ihcm.chat_room_members AS CRM 
                                INNER JOIN chat_ihcm.users AS U ON U.id = CRM.user_id 
                                WHERE chat_room_id in 
                                (SELECT chat_room_id FROM chat_ihcm.chat_room_members 
                                  WHERE chat_ihcm.chat_room_members.user_id = '${user.id}')
                                  AND is_online = '${User.online}'`

    try {
      let memberRelation = await db.sequelize.query(memberRelationQuery, { type: QueryTypes.SELECT })
        .then(res => {
          return res;
        }).catch(err => {
          return err
        })

      let data = {
        userId: user.id,
        isOnline: user.isOnline
      }
      let i = 0;
      for (let member of memberRelation) {
        redisService.pubStreamObj({
          type: ENUM_CONSTANTS_PUSH_STREAM.UPDATE_ONLINE_OFFLINE,
          value: data,
          chatId: member.user_id
        });
      }
    } catch (error) {
      console.log(error);
    }

    return user;
  }
}

