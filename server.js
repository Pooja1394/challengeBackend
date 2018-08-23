require('dotenv').config();
var express = require("express");
var moment = require("moment");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
global.autoIncrement = require('mongoose-auto-increment');
const config = require("./config");


global.logger = require("./utils/logger");


var app = express();
var port = process.env.DB_PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ msg: "Welcome to Challenge EOS World!" });
});


connection = async () => {
  try {
    if (app.get("env") === "local" || app.get("env") === "development") {
      logger.infoBg("Challenge running on" + app.get("env"));
      var dbConnection = await mongoose.connect(config.db.uri, { useNewUrlParser: true });
      autoIncrement.initialize(dbConnection);
      /**
      * call main router file 
      */
      const rootRouter = require('./src/routes.js')(app);
      logger.info("time : " + moment().format("LLLL"))
      app.listen(port);
    }
    else if (app.get("env") === "production") {
      logger.infoBg("Challenge running on " + app.get("env"));
      var dbConnection = await mongoose.connect(config.prodDb.uri, { useNewUrlParser: true });
      autoIncrement.initialize(dbConnection);
      /**
      * call main router file 
      */
      const rootRouter = require('./src/routes.js')(app);
      logger.info("time : " + moment().format("LLLL"))
      app.listen(port);
    }
  } catch (err) {
    console.log('err => ', err);
    logger.error("===========Please firstly start your mongod===========")
  }
};
connection();

// const rootRouter = require('./src/routes.js')(app);
// logger.info("time : "+ moment().format("LLLL"))
// app.listen(port);


// call demux
// demux1.watch();
