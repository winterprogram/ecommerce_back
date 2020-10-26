'use strict';
const Controller = require('./base.controller');
const HomePageManager = require('../biz/homePage.manager');


class HomePageController extends Controller {

    constructor() {
        super();
        this._homePageManager = new HomePageManager();
    };

    async saveHome(req, res) {
        try {
            const saveHomePage = await this._homePageManager.SaveOne(req.body);
            this.ok(res, saveHomePage)
        } catch (err) {
            this.error(res, err);
        }
    }
}


module.exports = HomePageController;