const app_path = window.location.pathname.split("/")[1]
var cl = console.log;

var fm = new Vue({
    el: "#fm-rows",
    data: {
        directory: [

        ]
    }
})

$.ajax({
    url:"/api/v1/dir/",
    type: "GET",
    success: function(data){
        fm.directory = JSON.parse(data)
    },
    error: function error(response) {
        alert("Network error");
    }
})