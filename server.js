const http = require("http");
const path = require('path');
const fs = require('fs');
const uuid = require('uuid').v4;

const api_handler = require('./functions/apiv1.js');


cl = console.log;

delete_conf = {};

cfg = JSON.parse(fs.readFileSync("./config.json").toString())

httpserver = http.createServer(fsserver).listen(cfg.http_port);
cl("Server listening on port "+cfg.http_port)

function fsserver(req,res){
    if(req.method == "GET"){
        if(req.url.startsWith("/api/v1")){
            api_handler(req,res)
        }else{
            four04(req,res)
        }
    }else if(req.method == "POST"){
        res.end("post")
    }else{
        res.ens("somthing worng")
    }
}

