const fs = require("fs");
var cl = console.log;

module.exports = function(local_path,cb){
    fs.readdir(local_path,(err,data) => {
        var fstree = [];
        for(i in data){
            fstree[i] = {
                name:data[i]
            }
            getfilestatus(local_path+"/"+data[i],i,(data_detail,index)=>{
                fstree[index].stats = data_detail;
                if(index==(data.length-1)){
                    cb(fstree)
                }
            })
            
        }
    })
    
}

function getfilestatus(file,index,cb){
    fs.stat(file,(err,data_detail)=>{
        if (err) throw err;
        if(data_detail.isFile()){
            data_detail.type = "file";
        }else if(data_detail.isDirectory()){
            data_detail.type = "dir";
        }else{
            data_detail.type = "N/A";
        }
        cb(data_detail,index)
    })
}

