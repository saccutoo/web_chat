import { Sequelize } from "sequelize";
import { initModels } from "../db-export-default/init-models";

//@ts-ignore
const Op = Sequelize.Op;
const database = process.env.MYSQL_DATABASE || "";
const username = process.env.MYSQL_USERNAME || "";
const password = process.env.MYSQL_PASSWORD || "";
const host = process.env.MYSQL_HOST || "";
const port = Number(process.env.MYSQL_PORT);
const poolMax = Number(process.env.MYSQL_POOL_MAX);
const poolMin = Number(process.env.MYSQL_POOL_MIN);
const poolAcquire = Number(process.env.MYSQL_POOL_ACQUIRE);
const poolIdle = Number(process.env.MYSQL_POOL_IDLE);
const sequelize = new Sequelize(database,username,password,
  {
    host: host, 
    dialect: 'mysql',
    port: port, 
    pool: {
      max: poolMax,
      min: poolMin,
      acquire: poolAcquire,
      idle: poolIdle,
    },
    operatorsAliases: {
      $eq: Op.eq,
      $ne: Op.ne,
      $gte: Op.gte,
      $gt: Op.gt,
      $lte: Op.lte,
      $lt: Op.lt,
      $not: Op.not,
      $in: Op.in,
      $notIn: Op.notIn,
      $is: Op.is,
      $like: Op.like,
      $notLike: Op.notLike,
      $iLike: Op.iLike,
      $notILike: Op.notILike,
      $regexp: Op.regexp,
      $notRegexp: Op.notRegexp,
      $iRegexp: Op.iRegexp,
      $notIRegexp: Op.notIRegexp,
      $between: Op.between,
      $notBetween: Op.notBetween,
      $overlap: Op.overlap,
      $contains: Op.contains,
      $contained: Op.contained,
      $adjacent: Op.adjacent,
      $strictLeft: Op.strictLeft,
      $strictRight: Op.strictRight,
      $noExtendRight: Op.noExtendRight,
      $noExtendLeft: Op.noExtendLeft,
      $and: Op.and,
      $or: Op.or,
      $any: Op.any,
      $all: Op.all,
      $values: Op.values,
      $col: Op.col
    }
  }
);

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  initModels: initModels(sequelize)
}
export default db;
