import Router from "koa-router";
import db from "../common/connection-db";
import {
  RESULT_CODE,
  RESULT_MESSAGE,
} from "../core/constants/result-constants";
import { IDataResult } from "../core/handles/data-result";
import { DeviceService } from "../services/device-service";

const router = new Router({ prefix: "/api/device" });
const deviceService: DeviceService = new DeviceService();

// --- update device ----
router.post("/", async (ctx: any, next: any) => {
  const body = ctx.request.body;
  console.log("Test update device : ", body);

  const result: IDataResult = {};
  try {
    // const msg = req?.params?.message
    await deviceService
      .add(body)
      .then((rs) => {
        result.status = RESULT_CODE.SUCCESS;
        result.data = rs;
        result.message = RESULT_MESSAGE.SUCCESS;
      })
      .catch((err) => {
        result.status = RESULT_CODE.ERROR;
        (result.data = err), (result.message = RESULT_MESSAGE.ERROR);
      });
  } catch (error) {
    result.status = RESULT_CODE.ERROR;
    result.message = error;
  }

  ctx.body = result;
});

export default router;
