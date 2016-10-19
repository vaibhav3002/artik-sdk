const artik = require('../lib/artik-sdk');

var http = artik.http();

var headers = [
	"user-agent", "Artik browser",
	"Accept-Language", "en-US,en;q=0.8"
];

http.get("https://httpbin.org/get", headers, function(response, status) {
	console.log("GET - status " + status + " - response: " + response);
});

var body = "name=samsung&project=artik";

http.post("https://httpbin.org/post", headers, body, function(response, status) {
	console.log("POST - status " + status + " - response: " + response);
});

http.put("https://httpbin.org/put", headers, body, function(response, status) {
	console.log("PUT - status " + status + " - response: " + response);
});

http.del("https://httpbin.org/delete", headers, function(response, status) {
	console.log("DELETE - status " + status + " - response: " + response);
});
