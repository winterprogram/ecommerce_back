/* eslint-disable no-useless-catch */
const BaseManager = require("./base.manager");
const ValidationError = require("../exception/validation.error");
const DrawerRepository = require('../repository/drawer.repository');

const randomize = require("randomatic");
const SCHEMA = require("../constant/schema");
const MSG = require("../constant/msg");

class DrawerManager extends BaseManager {
  constructor(async_param) {
    super(async_param);
    this._drawerRepository = new DrawerRepository();
  }

  async SaveOne(bodyParams) {
    try {
      const validationResult = this.validate(SCHEMA.DRAWER_WIDGET, bodyParams);
      if (validationResult.valid) {

        bodyParams.drawer_id = randomize("Aa0", 10);
        const saveDrawerWidget = await this._drawerRepository.saveOne(
          bodyParams
        );
        return saveDrawerWidget;
      }
      throw new ValidationError(MSG.VALIDATION_ERROR, validationResult.errors);
    } catch (err) {
      throw err;
    }
  }

}

module.exports = DrawerManager;
