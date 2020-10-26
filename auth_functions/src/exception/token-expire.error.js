"use strict";
const STATUS = require("../constant/status");
class TokenExpireError extends Error {
  constructor(message, errors) {
    super(message);
    this.status = STATUS.FORBIDDEN;
    this.errors = errors;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = TokenExpireError;
