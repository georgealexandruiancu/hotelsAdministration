var admin = require('firebase-admin');
var express = require("express");
var app = express();

app.listen(4040);

var serviceAccount = require('../keys/adminKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hotelsadministration.firebaseio.com"
});

app.get("/asd", function(req, res){
    console.log("Da");
})