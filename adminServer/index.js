// var http = require("http");
var express = require("express");
var app = express();

app.get('/', function(req, res, next){
    res.sendFile("/Users/alexiancu/Documents/work/hotelsAdministration/adminServer/index.html");
})
app.get('/createManager', function(req, res){
    res.send("<h1>Create manager</h1>");
})
app.get('/deleteManager', function(req, res){
    res.send("<h1>Delete manager</h1>");
})
app.get('/updateManager', function(req, res){
    res.send("<h1>Update manager</h1>");
})

app.listen(4040);