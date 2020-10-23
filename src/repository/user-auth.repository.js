const Signup = require('../model/SignUp');
const MONGOPROXY = require('../proxy/base.proxy');
const OptionsClass = require('../proxy/options.proxy');

const DbName = require('../constant/dbName');


class AuthRepository {
    constructor() {
        this.proxy = new MONGOPROXY();
        this.options = new OptionsClass();
    }
    async findOne(mobile_number, email_id) {
        try {
            const q = {
                $and: [
                    {
                        $or: [
                            { mobile_number },
                            { email_id }
                        ]
                    },
                    {
                        is_active: true
                    }
                ]
            };
            let body = {
                database: DbName.DB_NAME,
                body: q,
                collection: DbName.USER_INFO
            };
            let uri = `${process.env.MONGO_PROXY_URL}/find`;
            let options = this.options(uri, body);
            
            let p = await this.proxy.post(options);
            if (!p.length) {
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
            const q = await newUser.save();
            return q;
        } catch (err) {
            throw err;
        }
    }
    async findData(mobile_number) {
        try {
            const q = await Signup.find({ mobile_number }).lean().exec();
            return q[0];
        } catch (err) {
            throw err;
        }
    }
}

module.exports = AuthRepository;