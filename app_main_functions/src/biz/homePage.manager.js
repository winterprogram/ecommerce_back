/* eslint-disable no-useless-catch */
const BaseManager = require("./base.manager");
const ValidationError = require("../exception/validation.error");
const HomePageRepository = require('../repository/home.repository');

const randomize = require("randomatic");
const SCHEMA = require("../constant/schema");
const MSG = require("../constant/msg");

class HomePageManager extends BaseManager {
    constructor(async_param) {
        super(async_param);
        this._homePageRepository = new HomePageRepository();
    }

    async SaveOne(bodyParams) {
        try {
            const validationResult = this.validate(SCHEMA.HOME_PAGE, bodyParams);
            if (validationResult.valid) {
                bodyParams.homePage_id = randomize("Aa0", 10);
                const saveHomePage = await this._homePageRepository.saveOne(
                    bodyParams
                );
                return saveHomePage;
            }
            throw new ValidationError(MSG.VALIDATION_ERROR, validationResult.errors);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = HomePageManager;
