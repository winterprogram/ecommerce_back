/* eslint-disable no-useless-catch */
const BaseManager = require("./base.manager");
const ValidationError = require("../exception/validation.error");
const S3 = require('../service/s3.service');
const SCHEMA = require("../constant/schema");
const MSG = require("../constant/msg");

class ProductManager extends BaseManager {
    constructor(async_param) {
        super(async_param);
        this.s3 = new S3()
    }

    async save(bodyParams) {
        try {
            // const validationResult = this.validate(SCHEMA.HOME_PAGE, bodyParams);
            // if (validationResult.valid) {
               this.s3.createObj();
            // }
            // throw new ValidationError(MSG.VALIDATION_ERROR, validationResult.errors);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ProductManager;
