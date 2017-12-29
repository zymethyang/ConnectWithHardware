const express = require('express');
const bodyParser = require('body-parser');
const bumpRouter = express.Router();
bumpRouter.use(bodyParser.json());
const admin = require('firebase-admin');
var db = admin.firestore();
const firebase = require("firebase");
var FieldValue = require("firebase-admin").firestore.FieldValue;
var moment = require('moment');
var io = require('socket.io');
var FieldValue = require("firebase-admin").firestore.FieldValue;

bumpRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res) => {
        var user = firebase.auth().currentUser;
        if (user) {
            console.log(user.uid + ' GET Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            data = new Array(0);
            db.collection("bump").where("uid", "==", user.uid).orderBy("updatedAt", "desc").limit(1).get()
                .then(bumpSnapshot => {
                    bumpSnapshot.forEach(doc => {
                        data.push(doc.data());
                    });
                    res.json(data);
                })
                .catch();
        } else {
            console.log(user.uid + ' Fail to GET Bump Status !');
            res.json('Error');
        }
    })
    .post((req, res, next) => {
        var user = firebase.auth().currentUser;
        if (user) {
            if ((req.body.bump_control === 1) && (req.body.bump_control_hand_state != null)) {
                db.collection("bump").add({
                    uid: user.uid,
                    bump_control: req.body.bump_control,
                    bump_control_hand_state: req.body.bump_control_hand_state,
                    startedAt: moment(FieldValue.serverTimestamp()).unix(),
                    updatedAt: moment(FieldValue.serverTimestamp()).unix()
                })
                    .then(function (docRef) {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json('Successful');
                        console.log(user.uid + ' POST Bump Status at  ' + moment(FieldValue.serverTimestamp()).format("DD-MM-YYYY h:mm:ss"));
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
            } else if ((req.body.bump_control === 11)) {
                db.collection("bump").add({
                    uid: user.uid,
                    bump_control: req.body.bump_control,
                    bump_control_date: req.body,
                    startedAt: moment(FieldValue.serverTimestamp()).unix(),
                    updatedAt: moment(FieldValue.serverTimestamp()).unix()
                }).then((result) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Successful');
                    console.log(user.uid + ' POST Bump Status at  ' + moment(FieldValue.serverTimestamp()).format("DD-MM-YYYY h:mm:ss"));
                });
            } else if ((req.body.bump_control === 111)) {
                db.collection("bump").add({
                    uid: user.uid,
                    bump_control: req.body.bump_control,
                    bump_control_data: req.body,
                    startedAt: moment(FieldValue.serverTimestamp()).unix(),
                    updatedAt: moment(FieldValue.serverTimestamp()).unix()
                }).then((result) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Successful');
                    console.log(user.uid + ' POST Bump Status at ' + moment(FieldValue.serverTimestamp()).format("DD-MM-YYYY h:mm:ss"));
                });
            }
        }
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /bumps');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /bumps');
    });

module.exports = bumpRouter;