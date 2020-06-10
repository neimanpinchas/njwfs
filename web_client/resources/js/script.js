const app_path = window.location.pathname.split("/")[1]
var cl = console.log;
var hello


$.ajax({
    url:"/api/v1/dir/",
    type: "GET",
    success: function(data){
        hello =JSON.parse(data)
    },
    error: function error(response) {
        alert("Network error");
    }
})