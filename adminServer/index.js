
var express = require("express");
var app = express();
var admin = require('firebase-admin');

var serviceAccount = require('./keys/adminKey.json');

admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://hotelsadministration.firebaseio.com"
});

app.get('/', function(req, res, next){
        res.sendFile(__dirname + "/index.html");
})
app.get('/createManager', function(req, res){
        res.sendFile(__dirname + "/components/createManager.html");
})
app.get('/deleteManager', function(req, res){
        res.sendFile(__dirname + "/components/deleteManager.html");
})
app.get('/updateManager', function(req, res){
        res.sendFile(__dirname + "/components/updateManager.html");
})
app.get('/create/:email/:pass/:name', function(req, res){
        var thisEmail = req.params.email;
        var thisPass = req.params.pass;
        var thisName = req.params.name;
        admin.auth().createUser({
            email: thisEmail,
            password: thisPass,
            displayName: thisName
        }).then(function (userRecord) {
            admin.database().ref("/managers").push({
                email: thisEmail,
                uid: userRecord.uid
            })
            console.log("Successfully created new user:", userRecord.uid);
            res.redirect('/');
        })
        .catch(function (error) {
            console.log("Error creating new user:", error);
        });
});
app.get('/delete/:uid', function(req, res){
        var thisUID = req.params.uid;
        admin.auth().deleteUser(thisUID)
        .then(function () {
            console.log("Successfully deleted user");
            res.redirect('/');
        })
        .catch(function (error) {
            console.log("Error deleting user:", error);
        });
});
app.get('/update/:uid/:email/:pass/:name', function(req, res){

        var thisUID = req.params.uid;
        var thisEmail = req.params.email;
        var thisPass = req.params.pass;
        var thisName = req.params.name;

        admin.auth().updateUser(thisUID, {
            email: thisEmail,
            password: thisPass,
            displayName: thisName,
        })
        .then(function (userRecord) {
            admin.database().ref('/managers/').orderByChild("uid").equalTo(thisUID).on('value', function (snapshot) {
                keys = Object.keys(snapshot.val())[0];
                admin.database().ref('/managers/' + keys).update({
                    email: thisEmail
                });
                console.log("Successfully updated user", userRecord.toJSON());
            });
        })
        .then(() => {
            res.redirect('/');
        })
        .catch(function (error) {
            console.log("Error updating user:", error);
        });
})
app.listen(4040);