'use strict'
const STATUS = require('../constant/status');
class DuplicateEntityError extends Error {

    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.status = STATUS.DUPLICATE;
    }

    statusCode() {
        return this.status;
    }
}

module.exports = DuplicateEntityError;