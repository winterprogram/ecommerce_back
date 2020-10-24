"use strict";
const STATUS = require("../constant/status");
class TokenExpireError extends Error {
  constructor(message) {
    super(message);
    this.status = STATUS.FORBIDDEN;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = TokenExpireError;
