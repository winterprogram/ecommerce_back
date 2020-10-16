"use strict";
const AuthController = require("./auth.controller");

function proxy(obj) {
    let handler = {
        get(target, propKey, receiver) {
            const origMethod = target[propKey];
            return function (...args) {
                return origMethod.apply(obj, args);
            };
        }
    }
    return new Proxy(obj, handler);
}

module.exports.authController = proxy(new AuthController());
module.exports.defaultHandler = (req, res) => {
    res.status(200).send("Under Construction");
};

