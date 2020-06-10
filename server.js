const http = require("http");
const path = require('path');
const fs = require('fs');
const uuid = require('uuid').v4;

const api_handler = require('./functions/apiv1.js');
const four04 = require('./functions/404.js');
const web_client = require('./web_client');


cl = console.log;
cl10 = console.log//debug

delete_conf = {};

cfg = JSON.parse(fs.readFileSync("./config.json").toString())

httpserver = http.createServer(fsserver).listen(cfg.http_port);
cl("Server listening on port "+cfg.http_port)

function fsserver(req,res){
    cl10(req.url)
    if(req.method == "GET"){
        if(req.url.startsWith(cfg.api_base_url)){
            api_handler(cfg,req,res)
        }else if(req.url.startsWith(cfg.html_base_url)){
            web_client(cfg,req,res)
        }else{
            four04(cfg,req,res)
        }
    }else if(req.method == "POST"){
        res.end("post")
    }else{
        res.end("somthing worng")
    }
}

