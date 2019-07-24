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
  webs.onmessage = msg => {
    if(webs.readyState === 1) {
    console.log(`BACK: ` + msg.data);
    ws.send(msg.data)
    } else {
    console.log(`BACK: ` + msg.data);
    setTimeout(ws.send(msg.data), 1500);
    }

  };
  
  ws.on('message', function(message) {
    console.log(webs.readyState);
    if(webs.readyState === 1) {
      console.log(`GO: ` + message);
      webs.send(message);
    } else {
      console.log(`GO: ` + message.data);
    setTimeout(() => {webs.send(message.data)}, 2500);
    }
  })
ws.on('close', () => {
  webs.close();
})
});
