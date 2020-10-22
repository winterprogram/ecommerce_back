'use strict'
const request = require('request');
const httpContext = require("express-http-context");
const MSG = require('../constant/msg');
const HEADER = require("../constant/header");
// const { createApolloFetch } = require('apollo-fetch');

String.prototype.format = function () {
    var a = this, b;
    for (b in arguments) {
        a = a.replace(/%[a-z]/, arguments[b]);
    }
    return a; // Make chainable
};

class BaseProxy {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.cache = {};
    }

    async get(options) {
        options.method = 'GET';
        return this._exec(options);
    }

    async delete(options) {
        options.method = 'DELETE';
        return this._exec(options);
    }

    async post(options) {
        options.method = 'POST';
        return this._exec(options);
    }

    async put(options) {
        options.method = 'PUT';
        return this._exec(options);
    }

    async _exec(options) {
        return new Promise((resolve, reject) => {
            console.info(options);
            request({
                uri: options.uri,
                method: options.method,
                form: options.body
            }, function (error, response) {
                if (error) return reject(error);
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    try {
                        resolve(JSON.parse(response.body));
                    } catch (error) {
                        resolve(response.body);
                    }
                } else if (response.statusCode >= 400 && response.statusCode <= 500) {
                    // TODO: Parse response body if its json and return the actual error
                    // let msg = BaseProxy.getMessage(response.body, MSG.RESOURCE_NOT_FOUND);
                    reject(JSON.parse(response.body));
                } else {
                    let msg = BaseProxy.getMessage(response.body, MSG.HTTP_PROXY_ERROR);
                    resolve({
                        message: msg,
                        status: response.statusCode
                    });
                }
            });
        });
    }

    static getMessage(val, defaultVal) {
        try {
            val = JSON.parse(val);
            // Don't change the order of below variables
            return val.message || val.error_description || val.error || val.errorMessage || defaultVal;
        } catch (error) {
            return val;
        }
    }
}

module.exports = BaseProxy;