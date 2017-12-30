const express = require('express');
const bodyParser = require('body-parser');
const bumpRouter = express.Router();
bumpRouter.use(bodyParser.json());

const mongoose = require('mongoose');
const Bumps = require('./models/bumps');
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
            Bumps.findOne({ uid: user.uid }).sort({ updatedAt: -1 })
            .then(data =>{
                res.json(data);
            }).catch();
        } else {
            console.log(user.uid + ' Fail to GET Bump Status !');
            res.json('Error');
        }
    })
    .post((req, res, next) => {
        var user = firebase.auth().currentUser;
        if (user) {
            console.log(user.uid + ' POST Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            Bumps.create({
                uid: user.uid,
                status: req.body,
                startedAt: moment(FieldValue.serverTimestamp()).unix(),
                updatedAt: moment(FieldValue.serverTimestamp()).unix()
            }).then(function (docRef) {
                res.json({"status":"Successful"});
            }).catch(function (error) {
                console.error("Error adding document: ", error);
            });
        } else {
            console.log(user.uid + ' Fail to POST Bump Status !');
            res.json('Error');
        }
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /bumps');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /bumps');
    });


    bumpRouter.route('/doingTask')
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
                Bumps.find({ $and: [{ uid: user.uid }, { 'status.finishedTime': { $gte: moment(FieldValue.serverTimestamp()).unix() } }, { 'status.controlCalender': { $eq: true } }] })
                .then(bump =>{
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(bump);
                }).catch();
            } else {
                console.log(user.uid + ' Fail to GET Bump Status !');
                res.json('Error');
            }
        })
        .post((req, res, next) => {
          res.statusCode = 403;
          res.end('POST operation not supported on /bumps');
        })
        .put((req, res, next) => {
            res.statusCode = 403;
            res.end('PUT operation not supported on /bumps');
        })
        .delete((req, res, next) => {
            res.statusCode = 403;
            res.end('DELETE operation not supported on /bumps');
        });

module.exports = bumpRouter;
