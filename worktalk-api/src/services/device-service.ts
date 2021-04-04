
import db from "../common/connection-db";
import BaseSequelize from "../core/utils/base-sequelize/BaseSequelize";
import { genGuidId } from "../uuid";
import Conditions from "../core/utils/sql/Conditions";
import { Device } from "../models/device";

const model = db.initModels;
export class DeviceService extends BaseSequelize<Device> {
  constructor() {
    super();
    this.model = db.initModels.devices;
  }

  async add(device: Device): Promise<Device> {
    var condition = new Conditions();
    condition.eq(Device.FIELD_userId, device.userId);
    console.log("test_exitedUser_1");
    let exitedUser = await this.findOne({
      attributes: [Device.FIELD_userId],
      where: condition.condition,
    });
    console.log("test_exitedUser: ", exitedUser);

    let deviceRes: any = null;
    if (exitedUser) {
      deviceRes = await this.update(device);
    } else {
      device.id = genGuidId(Device.TABLE_NAME);
      deviceRes = await this.create(device);
    }
    return deviceRes;
  }
}
