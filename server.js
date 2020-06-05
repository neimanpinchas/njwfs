const http = require("http");
const WS = require('ws');
const path = require('path');
const fs = require('fs');


cl = console.log;

httpserver = http.createServer(fsserver).listen(8080);

function fsserver(req,res){
    res.end("hello")
}
