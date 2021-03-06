'use strict'
const STATUS = require('../constant/status');
class BadRequestError extends Error {

    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.status = STATUS.CLIENT_ERROR;
    }

    statusCode() {
        return this.status;
    }
}

module.exports = BadRequestError;