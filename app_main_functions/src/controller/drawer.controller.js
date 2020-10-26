'use strict';
const Controller = require('./base.controller');
const DrawerManager = require('../biz/drawer.manager');


class DrawerController extends Controller {

    constructor() {
        super();
        this._drawerManager = new DrawerManager();
    };

    async saveDrawerInfo(req, res) {
        try {
            const saveDrawer = await this._drawerManager.SaveOne(req.body);
            this.ok(res, saveDrawer)
        } catch (err) {
            this.error(res, err);
        }
    }
}


module.exports = DrawerController;