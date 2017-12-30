require('dotenv').config()
const admin = require('./firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')

var config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useMongoClient: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: '*'}));

const port = process.env.APP_PORT || 3000;

const router = require('./routes');
const userRouter = require('./userRouter');
const tempRouter = require('./tempRouter');
const humidityRouter = require('./humidityRouter');
const bumpRouter = require('./bumpRouter');

app.use('/', router);
app.use('/temp',tempRouter);
app.use('/humidity',humidityRouter);
app.use('/bump',bumpRouter);


app.listen(3000, host);


console.log(`Server listening at ${port}`);
