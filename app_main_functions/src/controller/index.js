"use strict";
const DrawerController = require("./drawer.controller");
const HomePageController = require('./home.controller');


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

module.exports.drawerController = proxy(new DrawerController());
module.exports.homePageController = proxy(new HomePageController());
module.exports.defaultHandler = (req, res) => {
    res.status(200).send("Under Construction");
};

