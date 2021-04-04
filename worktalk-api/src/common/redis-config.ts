var redis = require('redis');

var redisApp = redis.createClient(Number(process.env.REDIS_APP_PORT), process.env.REDIS_APP_HOST);
var redisPushStream = redis.createClient(Number(process.env.REDIS_PUSHSTREAM_PORT), process.env.REDIS_PUSHSTREAM_HOST);

redisApp.on('connect', function () {
    // console.log('RedisApp client connected');
});

redisApp.on('error', function (err: any) {
    // console.log('RedisApp have something went wrong ' + err);
});

redisPushStream.on('connect', function () {
    // console.log('RedisPushStream client connected');
});

redisPushStream.on('error', function (err: any) {
    // console.log('RedisPushStream have something went wrong ' + err);
});

export { redisApp, redisPushStream };

