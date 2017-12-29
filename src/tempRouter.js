const express = require('express');
const bodyParser = require('body-parser');
const tempRouter = express.Router();
tempRouter.use(bodyParser.json());

const admin = require('firebase-admin');
var db = admin.firestore();
const firebase = require("firebase");
var database = firebase.database();
var FieldValue = require("firebase-admin").firestore.FieldValue;
var moment = require('moment');
var getIP = require('ipware')().get_ip;

tempRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /temp');
    })
    .post((req, res, next) => {
        var user = firebase.auth().currentUser;
        if (user) {
            console.log(user.uid + ' POST Temperature at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            database.ref("/temp").push({
                uid: user.uid,
                temp: req.body,
                startedAt: moment(FieldValue.serverTimestamp()).unix(),
                updatedAt: moment(FieldValue.serverTimestamp()).unix()
            }).then(docRef => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json('Successful');
            })
            .catch( error => {
                res.statusCode = 403;
                res.setHeader('Content-Type', 'application/json');
                res.json('Error');
                console.error(user.uid + ' POST Temperature error at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"), error);
            });
        } else {
            console.log(user.uid + 'Fail to POST TEMPORATURE AT ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json('Error');
        }
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /temp');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not supported on /temp');
    });


module.exports = tempRouter;
