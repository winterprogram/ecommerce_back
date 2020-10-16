const Signup = require('../model/SignUp');

class AuthRepository {

    async findOne(mobile_number, email_id) {
        try {
            const q = await Signup.find({
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
            }).lean().exec();
            if (!q.length) {
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