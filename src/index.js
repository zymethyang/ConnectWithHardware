require('dotenv').config()
const admin = require('./firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: '*'}));

const port = process.env.APP_PORT || 8080;
const host = process.env.APP_HOST || '127.0.0.1';

const router = require('./routes');
const userRouter = require('./userRouter');
const tempRouter = require('./tempRouter');
const humidityRouter = require('./humidityRouter');
const bumpRouter = require('./bumpRouter');

app.use('/', router);
app.use('/user',userRouter);
app.use('/temp',tempRouter);
app.use('/humidity',humidityRouter);
app.use('/bump',bumpRouter);

app.listen(port, host);

console.log(`Server listening at ${host}:${port}`);
