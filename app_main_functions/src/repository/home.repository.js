const HomePage = require("../models/homePage.schema");
const MONGOPROXY = require("../proxy/base.proxy");
const OptionsClass = require("../proxy/options.proxy");
const MongoEndpoint = require("../constant/proxyCommand");
const DbName = require("../constant/dbName");

class HomePageRepository {
    constructor() {
        this.proxy = new MONGOPROXY();
    }

    async saveOne(bodyParams) {
        try {
            let newHomePage = new HomePage(bodyParams);
            let body = {
                database: DbName.DB_NAME,
                body: newHomePage,
                collection: DbName.HOME_PAGE,
            };
            let uri = `${process.env.MONGO_PROXY_URL}/${MongoEndpoint.SAVE}`;
            let options = new OptionsClass(uri, body);
            let q = await this.proxy.post(options);
            return q;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = HomePageRepository;
