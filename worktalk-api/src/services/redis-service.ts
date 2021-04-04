import db from '../common/connection-db';
// var $bean = require('../common/utils/hyd-bean-utils');
// import  $bean from '../common/utils/hyd-bean-utils';
// const redisConfig = require('../common/redis.config');
import { redisApp, redisPushStream  } from '../common/redis-config';
import { SocketService } from './socket-service';
// import { redisConfig } from '../common/redis.config';
// const redisPushStream = redisPushStream;
// const socket = require('./socket.service');
import { $bean } from "../core/utils/hyd/hyd-bean-utils";

const socketService: SocketService = new SocketService();
const model = db.initModels;

// const kue = require('kue')
// const queue = kue.createQueue(
//     {
//         redis: {
//             port: Number(process.env.REDIS_APP_PORT),
//             host: process.env.REDIS_APP_HOST,
//           }
//     }
// );
export class RedisService {

    pubStreamObj(value: any) {
        if ($bean.isEmpty(value)) {
            // throw new HyperError("EMPTY_OBJECT", 400, "Dữ liệu không hợp lệ !");
            console.log("EMPTY OBJECT")
            return;
        }
        let $this = this;
        let key = $bean.genRandomID(16);
        redisPushStream.set(key, $bean.getJson(value), function (err: any, reply: any) {
            if (!err) {
                $this.pubObjToChat(value).then((res: any) => {
                    console.log('Pub to chat ');
                    console.log(res);
                    $this.deleteRedis(key, redisPushStream);
                    $this.getRedis(key, redisPushStream);
                })
            } else {
                console.log("-----Lỗi redis set cache")
                console.log(err);
            }
        });
    }

    async pubObjToChat(object: any) {
        let result = await socketService.pubToChat(object);
        // let result = this.queueToChat(object);
        return result;
    }

    // queueToChat(object: any) {
    //     var job = queue.create('startSendChat').save(function(error: any) {
	// 		if (!error) console.log(job.id);
	// 		else console.log(error);
	// 	});

    //     queue.process('startSendChat', 300, function (job: any, done: any) {
    //         socketService.pubToChat(object).then(() => {
    //             done();
    //         })
    //     });
    // }

    getRedis(key: any, redisType: any) {
        redisType.get(key, function (err: any, reply: any) {
            if (!err) {
                console.log('Result : ' + reply);
            } else {
                console.log('Error get ' + key + ' from redis !');
                throw err;
            }
        });
    }

    isExistRedis (key: any, redisType: any) {
        redisType.exists('language', function (err: any, reply: any) {
            if (!err) {
                if (reply === 1) {
                    console.log(key + " exists in redis !");
                } else {
                    console.log(key + " does't exists in redis !");
                }
            } else {
                throw err;
            }
        });
    }

    deleteRedis(key: any, redisType: any) {
        redisType.del(key, function (err: any, reply: any) {
            if (!err) {
                if (reply === 1) {
                    console.log(key + " is deleted from redis !");
                } else {
                    console.log(key + " does't exists in redis !");
                }
            } else {
                throw err;
            }
        });
    }

    expireRedis(key: any, time: any, redisType: any) {
        redisType.expire(key, time); // Expirty time for 30 seconds.
    }

}