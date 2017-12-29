const admin = require('firebase-admin');
var firebase = require("firebase");
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

module.exports = admin;

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
  apiKey: "AIzaSyCIIHryAuKXee04I8YuXTffFZd262msz_g",
  authDomain: "admin-e8a7b.firebaseapp.com",
  databaseURL: "https://admin-e8a7b.firebaseio.com",
  storageBucket: "admin-e8a7b.appspot.com"
};
firebase.initializeApp(config);
module.exports = firebase;

console.log('Firebase Admin Initialized');


