const Signup = require("../models/SignUp");
const MONGOPROXY = require("../proxy/base.proxy");
const OptionsClass = require("../proxy/options.proxy");
const MongoEndpoint = require("../constant/proxyCommand");
const DbName = require("../constant/dbName");

class AuthRepository {
  constructor() {
    this.proxy = new MONGOPROXY();
  }
  async findOne(mobile_number, email_id) {
    try {
      const q = {
        $and: [
          {
            $or: [{ mobile_number }, { email_id }],
          },
          {
            is_active: true,
          },
        ],
      };
      let body = {
        database: DbName.DB_NAME,
        body: q,
        collection: DbName.USER_INFO,
      };
      let uri = `${process.env.MONGO_PROXY_URL}/${MongoEndpoint.FIND}`;
      let options = new OptionsClass(uri, body);
      let p = await this.proxy.post(options);
      if (p.length) {
        return true;
      }

      return null;
    } catch (err) {
      throw err;
    }
  }
  async saveOne(bodyParams) {
    try {
      let newUser = new Signup(bodyParams);
      let body = {
        database: DbName.DB_NAME,
        body: newUser,
        collection: DbName.USER_INFO,
      };
      let uri = `${process.env.MONGO_PROXY_URL}/${MongoEndpoint.SAVE}`;
      let options = new OptionsClass(uri, body);
      let q = await this.proxy.post(options);
      return q;
    } catch (err) {
      throw err;
    }
  }
  async findData(mobile_number, email_id) {
    try {
      const q = { $or: [{ mobile_number }, { email_id }] };
      let body = {
        database: DbName.DB_NAME,
        body: q,
        collection: DbName.USER_INFO,
      };
      let uri = `${process.env.MONGO_PROXY_URL}/${MongoEndpoint.FIND}`;
      let options = new OptionsClass(uri, body);
      let p = await this.proxy.post(options);
      return p[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AuthRepository;
