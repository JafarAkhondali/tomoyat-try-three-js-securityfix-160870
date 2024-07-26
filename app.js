var http = require("http");
var url  = require("url");
var path = require("path");
var fs   = require("fs");

var port = process.argv[2] || 3333;

http.createServer(function(req, res) {
  var Response = {
    "200":function(file, filename) {
      var extname = path.extname(filename);
      var header = {
	"Access-Control-Allow-Origin": "*",
	"Pragma": "no-cache",
	"Cache-Control": "no-cache"
      }
      res.writeHead(200, header);
      res.write(file, "binary");
      res.end();
    },
    "404":function() {
      res.writeHead(404, {"Content-Type": "test/plain"});
      res.write("404 Not Found¥n");
      res.end();
    },
    "500":function(err) {
      res.writeHead(500, {"Content-Type": "test/plain"});
      res.write(err + "¥n");
      res.end();
    }
  }
  var uri = url.parse(req.url).pathname;
    if (path.normalize(decodeURI(uri)) !== decodeURI(uri)) {
        res.statusCode = 403;
        res.end();
        return;
    }
  var filename = path.join(process.cwd(), "public/", uri);

  fs.exists(filename, function(exists) {
    console.log(filename + " " + exists);
    if (!exists) { Response["404"](); return ; }
    if (fs.statSync(filename).isDirectory()) {
      filename += "/index.html";
    }
    fs.readFile(filename, "binary", function(err, file) {
      if (err) { Response["500"](err); return; }
      Response["200"](file, filename);
    });
  });
}).listen(parseInt(port, 10));

console.log("Server running at http://localhost:" + port);
