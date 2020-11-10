"use strict";
const DrawerController = require("./drawer.controller");
const HomePageController = require('./home.controller');
const SearchController = require('./search.controller');
const ProductController = require('./products.controller');


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
module.exports.searchController = proxy(new SearchController());
module.exports.productController = proxy(new ProductController());
module.exports.defaultHandler = (req, res) => {
    res.status(200).send("Under Construction");
};

