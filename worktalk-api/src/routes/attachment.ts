import Router from "koa-router";
import { HyperPaginated } from '../models/hyper-paginated';
import { AttachmentService } from '../services/attachment-service';
import { Attachment } from '../models/attachment';
import http = require('http');
import IConfig from '../core/config-interface';
import multer from 'koa-multer';
const upload = multer({
  limits: {
    files: 10, // allow up to 5 files per request,
    fieldSize: 500 * 1024 * 1024 // 2 MB (max file size)
  }
});
const router = new Router({ prefix: '/api/attachment' })
const config: IConfig = require('../../appConfig.json');
import FormData from 'form-data';
import fs from 'fs';
import axios from "axios";
import { IDataResult } from "../core/handles/data-result";
import { RESULT_CODE, RESULT_MESSAGE } from "../core/constants/result-constants";
const attachmentService: AttachmentService = new AttachmentService();

//Get all
router.get("/", async (ctx: any, next: any) => {
  console.log('test_attachment...');
  let request: any = ctx.request.body;

  let hyperPaginated: HyperPaginated = new HyperPaginated(request.page, request.pageSize);
  var attachmentList = await attachmentService.getAll(hyperPaginated);
  ctx.body = ({ 'response': attachmentList });
  ctx.status = 200;
  next();
});

router.post("/", upload.array('fileContent'), async (ctx: any) => {
  let result: IDataResult = {}
  result.data = [];
  try {
    let reqBody = ctx.request.files;
    console.log("🚀 ~ file: attachment.ts ~ line 82 ~ router.post ~ reqBody", reqBody.fileContent.length)

    let formData = new FormData();
    if (reqBody.fileContent.length === undefined) {
      formData.append('FileContent', fs.createReadStream(reqBody.fileContent.path), {
        filename: reqBody.fileContent.name,
        contentType: reqBody.fileContent.type
      });
    } else {

      for (let i = 0; i < reqBody.fileContent.length; i++) {
        const fileContent = reqBody.fileContent[i];
        console.log("🚀 ~ file: attachment.ts ~ line 85 ~ router.post ~ fileContent", fileContent)

        formData.append('FileContent', fs.createReadStream(fileContent.path), {
          filename: fileContent.name,
          contentType: fileContent.type
        });
      }
    }
    formData.append('IsUseDefaultName', config.serverFile.isUseDefaultName);
    formData.append('SubFolderPath', config.serverFile.subFolderPath);
    await axios.post('/api/file/uploadfile', formData, {
      baseURL: config.serverFile.baseUrl,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        ...formData.getHeaders()
      }
    }).then((resFile) => {
      console.log("🚀 ~ file: attachment.ts ~ line 104 ~ router.post ~ resFile", resFile)

      result = {
        status: resFile.data.code,
        data: resFile.data.data,
        message: resFile.data.messages
      };

    }).catch((err) => {
      result = {
        status: RESULT_CODE.ERROR,
        data: err.message,
        message: RESULT_MESSAGE.ERROR,
      };
    })

  } catch (error) {
    result = {
      status: RESULT_CODE.ERROR,
      data: error.message,
      message: RESULT_MESSAGE.ERROR,
    };
  }
  ctx.body = result;
});


router.delete("/:id", async (ctx: any, next: any) => {
  // let updateValues = { status: '1'};
  // @ts-ignore
  // attachment.update(updateValues, { where: { id: ctx.params.id } }).then((result) => {


  let attachment = ctx.request.body;
  let attachmentResponse = await attachmentService.delete(attachment);
  ctx.body = ({ 'response': attachmentResponse });
  ctx.status = 200;
  next();
});
// hungdm - Lấy danh sách tệp tin trong nhóm theo RoomChatID
router.get("/list-attachment", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  try {

    const body = ctx.request.query;
    let hyperPage: HyperPaginated = new HyperPaginated(
      body.page,
      body.pageSize
    );
    const countAllMember = await attachmentService.countAttachmentInRoom(body.chatRoomId, body.typeAttachment);
    let pages = Math.ceil(countAllMember / hyperPage.pageSize);
    let skip = hyperPage.pageSize * (hyperPage.page - 1);

    const result: IDataResult = {
      status: RESULT_CODE.SUCCESS,
      data: await attachmentService.GetAttachmentInRoom(body.chatRoomId, body.typeAttachment, skip, hyperPage.pageSize),
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
// hungdm Get Page Current of attachment - Params ID: & Page Size
router.get("/attachment-infor", async (ctx: any, next: any) => {
  const result: IDataResult = {};
  try {
    const body = ctx.request.query;

    const countAllMember = await attachmentService.countAttachmentInRoom(body.chatRoomId, body.typeAttachment);
    let pages = Math.ceil(countAllMember / body.pageSize);

    // Tìm vị trí của attachment trong list
    let position = await attachmentService.GetAttachmentInRoomWithRownum(body.chatRoomId, body.typeAttachment, body.guidId);
    let checkPage = Math.ceil(position[0].position / body.pageSize);
    let skip = checkPage * body.pageSize;
    let hyperPage: HyperPaginated = new HyperPaginated(
      (checkPage - 1).toString(),
      skip.toString()
    );

    const data = await attachmentService.GetAttachmentInRoom(body.chatRoomId, body.typeAttachment, hyperPage.offset, hyperPage.pageSize);

    const result: IDataResult = {
      status: RESULT_CODE.SUCCESS,
      data: data,
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


export default router;
