'use strict';
const Controller = require('./base.controller');
const AuthManager = require('../biz/auth.manager');


class Authuser extends Controller {

    constructor() {
        super();
        this._authManager = new AuthManager();
    };

    async userSignUp(req, res) {
        try {
            const userSignup = await this._authManager.signUp(req.body);
            this.ok(res, userSignup)
        } catch (err) {
            this.error(res, err);
        }
    }
    async userLogin(req, res) {
        try {
            const userLogin = await this._authManager.login(req.body);
            this.ok(res, userLogin)
        } catch (err) {
            this.error(res, err);
        }
    }
}


module.exports = Authuser;