const fs = require("fs");
const path = require("path");
const four04 = require('../functions/404.js');
const cl = console.log;

content_types = {
    css: "text/css",
    html: "text/html",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    json: "application/json",
    png: "image/png",
    js: "text/javascript"
};


module.exports = function(cfg,req,res){
    let url = decodeURI(req.url.substring(cfg.html_base_url.length));

    if(url.startsWith("/resources")){
        fs.readFile("./web_client/"+url,(err,data)=>{
            if(err){
                four04(cfg,req,res);
            }else{
                let content_type = url.split(".").pop();
                if(Object.keys(content_types).includes(content_type)){
                    res.setHeader('content-type', content_types[content_type]);
                    res.writeHead(200);
                    res.write(data);
                    res.end()
                }else{
                    cl(`couldn't find content type ${content_type} for ${cfg.web_client_files+url}`)
                    res.writeHead(200);
                    res.write(data);
                    res.end()
                };
            };
        });
    }else{
        if(url == "/" || url.length == 0){
            fs.readFile("./web_client/index.html",(err,data)=>{
                sethtmlvar(data.toString(),cfg,(html)=>{
                    res.setHeader('content-type', "text/html");
                    res.writeHead(200);
                    res.write(html);
                    res.end()
                })
            })
        }else{
            four04(cfg,req,res)
        }
    };

};

function sethtmlvar(data,cfg,cb){
    html = eval("`"+data+"`")
    cb(html)
}