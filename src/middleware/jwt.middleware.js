const Controller = require("../controller/base.controller");
const AuthManager = require("../biz/auth.manager");
const MSG = require("../constant/msg");
const { TokenExpiredError } = require("jsonwebtoken");

class AuthenticateJwt extends Controller {
  constructor() {
    super();
    this._authManager = new AuthManager();
  }
  authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
          return this.error(res, TokenExpiredError(MSG.TOKEN_EXPIRED));
        }

        req.user = user;
        next();
      });
    } else {
      this.error(res, TokenExpiredError(MSG.TOKEN_EXPIRED));
    }
  }
}

module.exports = AuthenticateJwt;
