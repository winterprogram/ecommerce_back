/* eslint-disable no-useless-catch */
const BaseManager = require("./base.manager");
const ValidationError = require("../exception/validation.error");
const HomePageRepository = require('../repository/home.repository');

const SCHEMA = require("../constant/schema");
const MSG = require("../constant/msg");

class SearchManager extends BaseManager {
    constructor(async_param) {
        super(async_param);
       
    }

    async findProducts(queryParams) {
        try {
            const validationResult = this.validate(SCHEMA.SEARCH_PRODUCTS, queryParams);
            if (validationResult.valid) {
               
            }
            throw new ValidationError(MSG.VALIDATION_ERROR, validationResult.errors);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = SearchManager;
