'use strict';
const Controller = require('./base.controller');
const ProductManager = require('../biz/product.manager');


class ProductController extends Controller {

    constructor() {
        super();
        this._productManager = new ProductManager();
    };

    async saveProduct(req, res) {
        try {
            const saveHomePage = await this._productManager.save(req.body);
            this.ok(res, saveHomePage)
        } catch (err) {
            this.error(res, err);
        }
    }
}


module.exports = ProductController;