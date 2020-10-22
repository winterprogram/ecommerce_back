'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const bodyParser = require("body-parser");
const app = require("express")();
const mongoose = require("mongoose");

require("dotenv").config();
//body parser 
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

async function mongoDBConnection() {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`, {
            useNewUrlParser: true
        });
    } catch (err) {
        throw err;
    }
};

let db = mongoose.connection;
db.once('open', async function () {
    console.log('Mongo is connected');
});
db.on('error', console.error.bind(console, `error on `));

const {
    authController,
    defaultHandler
} = require("../src/controller");

app.get("/", defaultHandler);

app.post("/signup", authController.userSignUp);

app.post("/login", authController.userLogin);

// # For local testing
if (process.env.APP_ENV == 'local') {
    app.listen(5000, async () => {
        console.log("Server listening at port: 5000");
        await mongoDBConnection();
    });
}

const server = awsServerlessExpress.createServer(app)
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)