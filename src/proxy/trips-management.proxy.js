'use strict';
const BaseProxy = require("./base.proxy");

class TripManagementProxy extends BaseProxy {

    constructor() {
        super(process.env.MONGO_PROXY_URL);
    }

}

module.exports = TripManagementProxy;