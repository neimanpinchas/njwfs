const fs = require("fs");
const uuid = require('uuid').v4;
const getdirdetails = require('./getdirdetails.js');
const four04 = require('./404.js');
const cl = console.log;


delete_confirm = {};

module.exports = function (cfg,req,res){
    let url = req.url.substring(cfg.api_base_url.length);
    if(url.startsWith("/dir/")){
        getdirdetails(cfg,url.split(/^\/dir/)[1],(data)=>{
            res.writeHead(200)
            res.write(JSON.stringify(data))
            res.end()
        })
    }else if(url.startsWith("/del/")){
        let local_path = cfg.root_path + url.split(/^\/del/)[1];
        conf_uuid = uuid();
        delete_confirm[conf_uuid] = local_path;
        res.setHeader('content-type', 'text/html');
        res.writeHead(200);
        res.write("please conferm you want to delete "+local_path+"<br>")    
        res.write("confermation code is "+conf_uuid+"<br>")    
        res.write("<a href='/delconf/"+conf_uuid+"'>click to conferm</a>")  
        res.end()  
    }else if(url.startsWith("/delconf/")){
        if(delete_confirm[url.split("delconf/")[1]]){
            file = delete_confirm[url.split("delconf/")[1]];
            fs.unlink(file,(err)=>{
                res.writeHead(200);
                res.end("deleted "+file)    
            })
        }else{
            res.writeHead(404);
            res.write(JSON.stringify(delete_confirm))
            res.end(req.url)    
        }
    }else{
        four04(req,res)
    }
}