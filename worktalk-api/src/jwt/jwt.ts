const jwt = require("koa-jwt");
const SECRET = "S3cRET~!";
const jwtInstance = jwt({ secret: SECRET });
const jsonwebtoken = require("jsonwebtoken");
//@ts-ignore
function JWTErrorHandler(ctx, next) {
  return next().catch((err: any) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        error: "Not authorized",
      };
    } else {
      throw err;
    }
  });
}

// helper function
module.exports.issue = (payload: any) => {
  return jsonwebtoken.sign(payload, SECRET, { expiresIn: 60 });
};

module.exports.jwt = () => jwtInstance;
module.exports.errorHandler = () => JWTErrorHandler;
