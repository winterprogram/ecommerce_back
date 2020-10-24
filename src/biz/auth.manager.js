/* eslint-disable no-useless-catch */
const BaseManager = require("./base.manager");
const ValidationError = require("../exception/validation.error");
const AuthRepository = require("../repository/user-auth.repository");
const DuplicateError = require("../exception/duplicate-entity.error");
const NotFound = require("../exception/not-found.error");
const UnauthorizedError = require("../exception/unauthorize.error");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const randomize = require("randomatic");
const SCHEMA = require("../constant/schema");
const MSG = require("../constant/msg");

class AuthManager extends BaseManager {
  constructor(async_param) {
    super(async_param);
    this._authRepository = new AuthRepository();
  }

  async signUp(bodyParams) {
    try {
      const validationResult = this.validate(SCHEMA.USER_SIGNUP, bodyParams);
      if (validationResult.valid) {
        let { mobile_number, email_id, password } = bodyParams;

        const checkExist = await this._authRepository.findOne(
          mobile_number,
          email_id
        );

        if (!checkExist) {
          bodyParams.user_id = randomize("Aa0", 5);
          bodyParams.password = await bcrypt.hash(password, saltRounds);
          const saveMerchantData = await this._authRepository.saveOne(
            bodyParams
          );
          return saveMerchantData;
        }
        throw new DuplicateError(MSG.DUPLICATE_USER);
      }
      throw new ValidationError(MSG.VALIDATION_ERROR, validationResult.errors);
    } catch (err) {
      throw err;
    }
  }

  async login(bodyParams) {
    try {
      const validationResult = this.validate(SCHEMA.USER_LOGIN, bodyParams);

      if (validationResult.valid) {
        const { mobile_number, email_id, password: pwd } = bodyParams;
        const checkExist = await this._authRepository.findOne(
          mobile_number,
          email_id
        );
        if (checkExist) {
          const userData = await this._authRepository.findData(
            mobile_number,
            email_id
          );
          const { userId, password, isActive } = userData;
          const match = await bcrypt.compare(pwd, password);
          if (match) {
            //change key and salt rounds
            const accessToken = jwt.sign(
              {
                user_id: userId,
                is_active: isActive,
              },
              process.env.accessTokenSecret,
              { expiresIn: 1209600 }
            );
            return accessToken;
          }
          throw new UnauthorizedError(MSG.INVALID_CLIENT_CREDENTIALS);
        }
        throw new NotFound(MSG.RESOURCE_NOT_FOUND);
      }
      throw new ValidationError(MSG.VALIDATION_ERROR, validationResult.errors);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AuthManager;
