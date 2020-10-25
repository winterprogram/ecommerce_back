const Controller = require("../controller/base.controller");
const AuthManager = require("../biz/auth.manager");
const MSG = require("../constant/msg");
const jwt = require("jsonwebtoken");
const TokenExpiredError = require("../exception/token-expire.error");

class AuthenticateJwt extends Controller {
  constructor() {
    super();
    this._authManager = new AuthManager();
  }
  static authenticateJWT(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      next();
    } catch (err) {
      this.error(res, TokenExpiredError(MSG.TOKEN_EXPIRED, err));
    }
  }
}

module.exports = AuthenticateJwt;
