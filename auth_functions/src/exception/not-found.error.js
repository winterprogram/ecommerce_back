'use strict'
const STATUS = require('../constant/status');
class NotFound extends Error {

    constructor(message) {
        super(message);
        this.status = STATUS.NOT_FOUND;
    }

    statusCode() {
        return this.status;
    }
}

module.exports = NotFound;