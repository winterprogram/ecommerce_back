'use strict';
const Controller = require('./base.controller');
const SearchManager = require('../biz/search.manager');


class SearchController extends Controller {

    constructor() {
        super();
        this._searchManager = new SearchManager();
    };

    async searchProducts(req, res) {
        try {
            const searchProducts = await this._searchManager.findProducts(req.query);
            this.ok(res, searchProducts)
        } catch (err) {
            this.error(res, err);
        }
    }
}


module.exports = SearchController;