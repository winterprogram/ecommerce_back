"use strict";
const awsServerlessExpress = require("aws-serverless-express");
const bodyParser = require("body-parser");
const app = require("express")();
const jwtAuthenticator = require("./middleware/jwt.middleware");
require("dotenv").config();
//body parser
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const {
  drawerController,
  homePageController,
  defaultHandler,
} = require("../src/controller");

const jwt = new jwtAuthenticator().authenticateJWT;
app.get("/", defaultHandler);

app.post(
  "/drawer",
  jwt,
  drawerController.saveDrawerInfo
);

app.post(
  "/home-page",
  jwt,
  homePageController.saveHome
);

// # For local testing
if (process.env.APP_ENV.trim() == "local") {
  app.listen(5000, async () => {
    console.log("Server listening at port: 5000");
  });
}

const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) =>
  awsServerlessExpress.proxy(server, event, context);
