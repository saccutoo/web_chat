import { Sequelize } from "sequelize";
import Koa from "koa";
import Router from "koa-router";
// Routes
import attachmentRoute from "./routes/attachment";
import chatRoute from "./routes/chat";
import chatRoomRoute from "./routes/chat-room";
import deviceRoute from "./routes/device";
import userRoute from "./routes/user";
import videoCallRoute from "./routes/video-call";
import chatRoomMemberRoute from "./routes/chat-room-member";
import notificationRoute from './routes/notification';
import messageRoute from './routes/message-router';
import ConsulConfig from './core/utils/consul/consul'
import logger = require("koa-logger");
import ihcmChatRoute from "./routes/ihcm-chat";
var jsonwebtoken = require('jsonwebtoken');
// import Eureka from 'eureka-js-client';

// Or, if you're not using a transpiler:
const Eureka = require('eureka-js-client').Eureka;

// const DB: Sequelize = require("./common/connection-db");
// https://stackoverflow.com/questions/13179109/singleton-pattern-in-nodejs-is-it-needed

// Koa
const app = new Koa();
import koaBody = require("koa-body");

const router = new Router();
const cors = require("@koa/cors");
// ================
const path = require("path");
const fs = require("fs");
const serve = require('koa-static');
const jwt = require("koa-jwt");
import process = require('process');

// =============== DB

//Test connection DB

// DB.authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err: any) => {
//     console.error("Unable to connect to the database:", err);
//   });

// Query DB

// End DB ===============


// Consul
// const consul = new ConsulConfig();
router.get('/health', (ctx: any) => {
    ctx.body = "ok";
    ctx.status = 200;
})



//init
app.use(logger());
// app.use(bodyParser());
app.use(koaBody({
    // formidable: { uploadDir: './uploads' },
    multipart: true,
    urlencoded: true,
    json: true
}));

app.use(cors());
// app.use(koaBody({ multipart: true }));

app.use(serve('E:/Nodejs/worktalk-api/uploads'));

/**
 * Verification token
 * */
var publicKey = fs.readFileSync('src/jwt/public_key.pub');

// app.use(function(ctx, next){
//     return next().catch((err) => {
//       if (401 == err.status) {
//         ctx.status = 401;
//         var result={
//             messgae:'Access denided token error',
//             status:401
//         }
//         ctx.body=result;
//       } else {
//         throw err;
//       }
//     });
// });


// //vinhtq:11/03/2021 :thêm hàm verify token
// app.use(function(ctx, next){
//      try{
//         const token=ctx.request.header.authorization?.replace("Bearer","").trim();
//         var user = jsonwebtoken.verify(token, publicKey);
//         ctx.request.body.userId=user.jti;
//         ctx.request.body.user=user;
//         return next()
//     }
//     catch(error){
//         var result={
//             messgae:'Access denided token error',
//             status:401
//         }
//         ctx.body=result;
//     }
// });

// // // Add check token when call api
//  app.use(jwt({ secret: publicKey}));


// app.use(serve('E:/Nodejs/worktalk-api/uploads'));

/**
 * Routes
 * */

app.use(router.routes());
app.use(attachmentRoute.routes());
app.use(chatRoute.routes());
app.use(chatRoomRoute.routes());
app.use(deviceRoute.routes());
app.use(userRoute.routes());
app.use(chatRoomMemberRoute.routes());
app.use(notificationRoute.routes())
app.use(messageRoute.routes())
app.use(videoCallRoute.routes())
app.use(ihcmChatRoute.routes())

// app.use(function(ctx, next) {
//   var today = new Date();
//   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//   var info = {
//    "source": {
//       "time": time,
//       "method": ctx.request.method,
//       "agent": ctx.request.header['user-agent'],
//       "body" : ctx.request.body,
//       "url": ctx.request.url,
//       "resultcode": ctx.response.status,

//    }
//   };
//   var dictstring = JSON.stringify(info);
//   var folderName = date;
//   var fildeName = date + '.txt';
//   if (!fs.existsSync(path.join("./recordedReq", folderName))) {
//       fs.mkdirSync(path.join("./recordedReq", folderName));
//       fs.writeFile("./recordedReq/" + folderName + "/" + fildeName , dictstring + "\n", (err:any, rs:any) =>{
//           if (err){
//               console.log(err);
//           }
//       });
//       }
//   else {
//       fs.readFile("./recordedReq/" + folderName + "/" + fildeName,  function (err:any, data:any) {
//           if (err){
//                   console.log(err);
//           }
//           else{
//               fs.appendFile("./recordedReq/" + folderName + "/" + fildeName, dictstring + "\n", function (err:any, data:any) {
//                 if (err) {
//                     throw err;
//                 }
//             });

//           }

//       })
//   }
//   next();
// });

app.listen(process.env.NODE_PORT);

const client = new Eureka({
    // application instance information
    instance: {
        instanceId: "172.20.50.96:chat-service:3001",
        app: 'chat-service',
        hostName: '172.20.50.96',
        ipAddr: '172.20.50.96',
        port: {
            '$': 3001,
            '@enabled': true,
        },
        vipAddress: 'chat-service',
        status: 'UP',
        secureVipAddress: 'chat-service',
        healthCheckUrl: 'http://172.20.50.96:3001/api/h',
        statusPageUrl: 'http://172.20.50.96:3001/api/s',
        homePageUrl: 'http://172.20.50.96:3001/api/',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        metadata: {
            "management.port": "3001"
        }
    },
    eureka: {
        // eureka server host / port
        host: "172.16.40.150",
        port: 8761,
        servicePath: "/eureka/apps/"
    },
});
try {
    client.start((error: any) => {
        console.log(error || "user service registered")
    });
} catch (error) {
    console.log(error)
}


console.log("My Koa server is up and listening on port ", process.env.NODE_PORT);
process.on('beforeExit', (code) => {
    console.log('Process beforeExit event with code: ', code);
    try {
        client.stop();
    } catch (error) {
        console.log(error)
    }

});
process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});


//./node_modules/.bin/sequelize-auto -o "./src/db-export-default-tu" -d chat_ihcm -h 172.16.20.236 -u chat -p 3306 -x ihcm@chat -e mysql -l ts
