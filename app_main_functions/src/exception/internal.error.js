'use strict'
const STATUS = require('../constant/status');
class InternalError extends Error {

    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.status = STATUS.Error;
    }

    statusCode() {
        return this.status;
    }
}

module.exports = InternalError;