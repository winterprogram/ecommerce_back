const Controller = require("../controller/base.controller");
const MSG = require("../constant/msg");
const jwt = require("jsonwebtoken");
const TokenExpiredError = require("../exception/token-expire.error");

class AuthenticateJwt extends Controller {
  constructor() {
    super();
  }
  authenticateJWT(req, res, next) {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      next();
    } catch (err) {
      res.send(new TokenExpiredError(MSG.TOKEN_EXPIRED, err));
    }
  }
}

module.exports = AuthenticateJwt;
