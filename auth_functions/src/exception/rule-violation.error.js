'use strict'
const STATUS = require('../constant/status');
class RuleViolationError extends Error {

    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.status = STATUS.RULE_VIOLATION;
    }

    statusCode() {
        return this.status;
    }
}

module.exports = RuleViolationError;