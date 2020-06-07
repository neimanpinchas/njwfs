const http = require("http");
const path = require('path');
const fs = require('fs');

const getdirdetails = require('./getdirdetails.js');


cl = console.log;

cfg = JSON.parse(fs.readFileSync("./config.json").toString())

httpserver = http.createServer(fsserver).listen(cfg.http_port);
cl("Server listening on port "+cfg.http_port)

function fsserver(req,res){
    if(req.url.startsWith("/dir/")){
        let local_path = cfg.root_path + req.url.split(/^\/dir/)[1];
        getdirdetails(local_path,(data)=>{
            res.writeHead(200)
            res.write(JSON.stringify(data))
            res.end()
        })
    }else{
        res.writeHead(404)
        res.end("404")
    }
}
