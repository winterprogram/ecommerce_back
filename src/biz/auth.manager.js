/* eslint-disable no-useless-catch */
const BaseManager = require('./base.manager');
const ValidationError = require('../exception/validation.error');
const AuthRepository = require('../repository/user-auth.repository');
const DuplicateError = require('../exception/duplicate-entity.error');
const NotFound = require('../exception/not-found.error');
const UnauthorizedError = require('../exception/unauthorize.error');


const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const randomize = require('randomatic');
const SCHEMA = require('../constant/schema');
const MSG = require('../constant/msg');

class AuthManager extends BaseManager {
  constructor(async_param) {
    super(async_param);
    this._authRepository = new AuthRepository();
  }

  async signUp(bodyParams) {
    try {
      const validationResult = this.validate(SCHEMA.MERCHANT_SIGNUP, bodyParams);
      if (validationResult.valid) {
        const {
          first_name,
          last_name,
          mobile_number,
          email_id,
          password,
          is_active,
          created_at,
          updated_at } = bodyParams;

        const checkDuplicate = await this._authRepository.findOne(mobile_number, email_id);

        if (checkDuplicate) {
          bodyParams.user_id = randomize('Aa0', 5);
          password = await bcrypt.hash(password, saltRounds);
          const saveMerchantData = await this._authRepository.saveOne(bodyParams);
          return saveMerchantData;
        }
        throw new DuplicateError(MSG.DUPLICATE_MERCHANT);
      }
      throw new ValidationError(MSG.VALIDATION_ERROR, validationResult.errors);
    } catch (err) {
      throw err;
    }
  }

  async login(bodyParams) {
    try {
      const validationResult = this.validate(SCHEMA.MERCHANT_LOGIN, bodyParams);

      if (validationResult.valid) {
        const {
          mobile_number,
          password
        } = bodyParams;
        const checkExist = await this._authRepository.findOne(mobile_number);
        if (checkExist) {
          throw new NotFound(MSG.RESOURCE_NOT_FOUND);
        }
        const userData = await this._authRepository.findData(mobile_number)
        const match = await bcrypt.compare(password, userData.password);
        if (match) {
          //change key and salt rounds
          const accessToken = jwt.sign(
            {
              user_id: userData.user_id,
              category: userData.category
            },
            process.env.accessTokenSecret);
          return {
            accessToken
          };
        }
        throw new UnauthorizedError(MSG.INVALID_CLIENT_CREDENTIALS);
      }
      throw new ValidationError(MSG.VALIDATION_ERROR, validationResult.errors);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AuthManager;
