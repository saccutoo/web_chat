import Router from "koa-router";
import db from "../common/connection-db";
import { Sequelize } from "sequelize";
import { genGuidId } from "../uuid";
import { UserService } from "../services/user-service";
import { IDataResult } from "../core/handles/data-result";
import { HyperPaginated } from "../models/hyper-paginated";
import {
  RESULT_CODE,
  RESULT_MESSAGE,
} from "../core/constants/result-constants";
import { elasticSearchService } from "../core/utils/elastic-search/elastic-search-services";

const router = new Router({ prefix: "/api/user" });
const model = db.initModels;
// @ts-ignore
const Op = Sequelize.Op;
const userService = new UserService();
// Sync use ihcm
router.post("/", async (ctx: any, next: any) => {
  const req = ctx.request.body;
  const result: IDataResult = {};
  console.log("test_sync_user: ", req);
  try {
    await userService
      .add(req)
      .then((rs: any) => {
        if (rs?.status === RESULT_CODE.CREATED) {
          result.status = RESULT_CODE.CREATED;
          result.data = rs?.user;
          result.message = RESULT_MESSAGE.SUCCESS;
          return;
        }
        result.status = RESULT_CODE.SUCCESS;
        result.data = rs;
        result.message = RESULT_MESSAGE.SUCCESS;
      })
      .catch((error) => {
        console.log("test_sync_user_err1: ", error);
        result.status = RESULT_CODE.ERROR;
        result.data = error;
        result.message = RESULT_MESSAGE.ERROR;
      });
  } catch (error) {
    console.log("test_sync_user_err2: ", error);
    result.status = RESULT_CODE.ERROR;
    result.message = error;
  }

  ctx.body = result;
});

// get all user
router.get("/", async (ctx: any, next: any) => {
  try {
    const body = ctx.request.query;
    let hyperPage: HyperPaginated = new HyperPaginated(
      body.page,
      body.pageSize
    );
    const countAllUsers = await userService.countAllUsers();
    let pages = Math.ceil(countAllUsers / hyperPage.pageSize);
    let skip = hyperPage.pageSize * (hyperPage.page - 1);
    const result: IDataResult = {
      status: RESULT_CODE.SUCCESS,
      data: await userService.getUserByPage("", skip, hyperPage.pageSize),
      message: RESULT_MESSAGE.SUCCESS,
      totalPages: pages,
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


// search user
// hungdm - Chuyển post -> get
// chuyển request.body -> request.query
router.get("/search-user", async (ctx: any, next: any) => {
  try {
    const body = ctx.request.query;
    let hyperPage: HyperPaginated = new HyperPaginated(
      body.page,
      body.pageSize
    );

    const countAllUsers = await userService.countAllUsersByQuery(body.text);

    let pages = Math.ceil(countAllUsers / hyperPage.pageSize);
    let skip = hyperPage.pageSize * (hyperPage.page - 1);
    const result: IDataResult = {
      status: RESULT_CODE.SUCCESS,
      data: await userService.getUserByPage(body.text, skip, hyperPage.pageSize),
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

// search user and room chat

// router.post("/search-user-chat", async (ctx: any, next: any) => {
//   console.log("-----Receive request search user");
//   const body = ctx.request.query;
//   const result: IDataResult = {};
//   try {
//     var text = body.text;
//     var response: any = await userService.searchUser(text);
//     result.status = RESULT_CODE.SUCCESS;
//     result.data = { user: response.dataUsers, room: response.dataChats };
//     result.message = RESULT_MESSAGE.SUCCESS;
//   } catch (error) {
//     result.status = RESULT_CODE.ERROR;
//     result.message = "error: " + error;
//   }
//   ctx.body = result;
// });

//Vịnh thêm API get user by ID

router.post("/get-user-by-id", async (ctx: any, next: any) => {
  const body = ctx.request.body;
  const result: IDataResult = {};
  try {
    var text = body.text;
    if (body.userId) {
      text = body.userId
    }
    var response: any = await userService.getUserById(text);
    result.data = response.data;
    result.message = RESULT_MESSAGE.SUCCESS;
  } catch (error) {
    result.status = RESULT_CODE.ERROR;
    result.message = "error: " + error;
  }
  ctx.body = result;
});

// hungdm - Lấy thông tin những user chat riêng với userId

router.get("/user-other-conversation", async (ctx: any, next: any) => {
  try {
    const body = ctx.request.query;
    const data = await userService.GetUserInConversation(body.userId);
    const result: IDataResult = {
      status: RESULT_CODE.SUCCESS,
      data: data,
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


// quyennq: sync data to elasticsearch
router.get("/sync-to-elasticsearch", async (ctx: any, next: any) => {
  let result: IDataResult = {};
  try {
    const data = await userService.syncToElasticSearch();
    for (let i = 0; i < data.length; i++) {
      let insertEl = await elasticSearchService.insertElasticSearch(data[i]);
      console.log("🚀 ~ file: user.ts ~ line 185 ~ router.get ~ insertEl", insertEl)
    }
    result = {
      status: RESULT_CODE.SUCCESS,
      data: data,
      message: RESULT_MESSAGE.SUCCESS
    }
  } catch (error) {
    result = {
      status: RESULT_CODE.ERROR,
      data: error,
      message: RESULT_MESSAGE.ERROR
    };
  }
  ctx.body = result;
});


router.post("/update-online", async (ctx: any, next: any) => {
  try {
    const body = ctx.request.body;
    const data = await userService.updateOnline(body);
    const result: IDataResult = {
      status: RESULT_CODE.SUCCESS,
      data: data,
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
    console.log(error);
  }
});

export default router;
