const AWS = require("aws-sdk");

AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.AWSACCESS,
    secretAccessKey: process.env.AWSSEC
});

module.exports = {
    AWS: AWS,
    S3: new AWS.S3()
}