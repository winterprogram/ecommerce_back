const DrawerWidget = require("../models/drawer.schema");
const MONGOPROXY = require("../proxy/base.proxy");
const OptionsClass = require("../proxy/options.proxy");
const MongoEndpoint = require("../constant/proxyCommand");
const DbName = require("../constant/dbName");

class DrawerRepository {
  constructor() {
    this.proxy = new MONGOPROXY();
  }

  async saveOne(bodyParams) {
    try {
      let newDrawer = new DrawerWidget(bodyParams);
      let body = {
        database: DbName.DB_NAME,
        body: newDrawer,
        collection: DbName.DRAWER_WIDGET,
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

module.exports = DrawerRepository;
