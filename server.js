const http = require("http");
const path = require('path');
const fs = require('fs');


cl = console.log;

cfg = JSON.parse(fs.readFileSync("./config.json").toString())

httpserver = http.createServer(fsserver).listen(cfg.http_port);
cl("Server listening on port "+cfg.http_port)

function fsserver(req,res){
    if(req.url.startsWith("/dir/")){
        listdir(req,res)
    }else{
        res.writeHead(404)
        res.end("404")
    }
}

function listdir(req,res){
    let local_path = cfg.root_path + req.url.split(/^\/dir/)[1];
    fs.readdir(local_path,(err,data) => {
        let fstree = {}
        for(i of data){
            fs.stat(local_path + "/" + i,(err,data)=>{
                fstree[i] = data
            
                if(fstree[i].isFile()){
                    fstree[i].type = "file";
                }else if(fstree[i].isDirectory()){
                    fstree[i].type = "dir";
                }else{
                    fstree[i].type = "N/A";
                }
            })
        }
        res.end(JSON.stringify(fstree))
    })
}
