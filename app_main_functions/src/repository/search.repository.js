const MONGOPROXY = require("../proxy/base.proxy");
const OptionsClass = require("../proxy/options.proxy");
const MongoEndpoint = require("../constant/proxyCommand");
const DbName = require("../constant/dbName");

class SearchRepository {
    constructor() {
        this.proxy = new MONGOPROXY();
    }

    async searchProducts(merchantId, characters) {
        try {

            const searchq = {
                merchantId,
                name: {
                    $regex: characters,
                    $options: 'i'
                }
            };
            let body = {
                database: DbName.DB_NAME,
                body: searchq,
                collection: DbName.PRODUCT,
            };
            let uri = `${process.env.MONGO_PROXY_URL}/${MongoEndpoint.SEARCH}`;
            let options = new OptionsClass(uri, body);
            let q = await this.proxy.post(options);
            return q;
        } catch (err) {
            throw err;
        }
    }
    async findAllProducts(merchantId, skip, limit) {
        try {
            const searchq = {
                merchantId,
                skip,
                limit
            };
            let body = {
                database: DbName.DB_NAME,
                body: searchq,
                collection: DbName.PRODUCT,
            };
            let uri = `${process.env.MONGO_PROXY_URL}/${MongoEndpoint.PAGEQUERY}`;
            let options = new OptionsClass(uri, body);
            let q = await this.proxy.post(options);
            return q;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = SearchRepository;
