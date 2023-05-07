const http = require("http");
const url = require("url");
const back = require("./back");
const home = require("./home");

http.createServer(onRequest).listen(8888);
console.log("Server has started");
console.log("http://localhost:8888");

const contentMap = {
  "/": home.view,
  "/back": back.view,
};

async function onRequest(request, response) {
  var pathName = url.parse(request.url).pathname;
  if (contentMap[pathName]) {
    await contentMap[pathName](request, response);
    response.end();
  } else {
    // console.log("pathname", pathName);
    // response.writeHead(200);
    // response.write("Hello Noders");
  }
}
