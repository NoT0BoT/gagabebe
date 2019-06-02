const WS = require("ws");
const https = require('https');
const fs = require('fs');

const server = https.createServer({
  cert: fs.readFileSync('./cert.cert'),
  key: fs.readFileSync('./key.pem')
});

let WSS = new WS.Server({
  port: 8080,
  server: server
});

let t;
let o;

WSS.on('connection', async function connection(ws, req) {
  let query = req.url.split("=")[1];
  t = query;
  let webs = new WS(t);
  webs.onclose = () => {ws.close()};
  webs.onmessage = msg => {console.log(`BACK: ` + msg.data);ws.send(msg.data)};
  
  ws.on('message', function(message) {
    console.log(`GO: ` + message);
    webs.send(message);
  })
});