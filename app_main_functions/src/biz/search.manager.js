/* eslint-disable no-useless-catch */
const BaseManager = require("./base.manager");
const ValidationError = require("../exception/validation.error");
const SearchRepository = require('../repository/search.repository');

const SCHEMA = require("../constant/schema");
const MSG = require("../constant/msg");

class SearchManager extends BaseManager {
    constructor(async_param) {
        super(async_param);
        this._serachRepository = new SearchRepository()
    }

    async findProducts(queryParams) {
        try {
            let searchResult;
            const validationResult = this.validate(SCHEMA.SEARCH_PRODUCTS, queryParams);
            if (validationResult.valid) {
                const { merchantId, characters } = queryParams
                searchResult = await this._serachRepository.searchProducts(merchantId, characters);
                return searchResult;
            }
            throw new ValidationError(MSG.VALIDATION_ERROR, validationResult.errors);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = SearchManager;
