const { S3 } = require('./aws.service');


class awsS3 {
    async createObj() {

        const params = {
            Bucket: "test-merchant-ugjgjvjhvhj-131415431"
        };
       let a = await S3.createBucket(params).promise();
       return a;
    }

}

module.exports = awsS3