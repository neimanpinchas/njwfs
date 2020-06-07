const http = require("http");
const path = require('path');
const fs = require('fs');
const uuid = require('uuid').v4;

const getdirdetails = require('./getdirdetails.js');


cl = console.log;

delete_conf = {}

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
    }else if(req.url.startsWith("/del/")){
        let local_path = cfg.root_path + req.url.split(/^\/del/)[1];
        conf_uuid = uuid();
        delete_conf[conf_uuid] = local_path;
        res.setHeader('content-type', 'text/html');
        res.writeHead(200);
        res.write("please conferm you want to delete "+local_path+"<br>")    
        res.write("confermation code is "+conf_uuid+"<br>")    
        res.write("<a href='/delconf/"+conf_uuid+"'>click to conferm</a>")  
        res.end()  
}else if(req.url.startsWith("/delconf/")){
        if(delete_conf[req.url.split("delconf/")[1]]){
            file = delete_conf[req.url.split("delconf/")[1]];
            fs.unlink(file,(err)=>{
                res.writeHead(200);
                res.end("deleted "+file)    
            })
        }else{
            res.writeHead(404);
            res.write(JSON.stringify(delete_conf))
            res.end(req.url)    
    }
    }else{
        res.writeHead(404)
        res.end("404")
    }
}
