"use strict";
const STATUS = require("../constant/status");
class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.name = this.constructor.name;
    this.errors = errors;
    this.status = STATUS.CLIENT_ERROR;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = ValidationError;
