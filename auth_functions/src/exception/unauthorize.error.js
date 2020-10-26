"use strict";
const STATUS = require("../constant/status");
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.status = STATUS.UNAUTHORIZED;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = UnauthorizedError;
