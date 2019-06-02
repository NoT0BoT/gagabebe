const WS = require("ws");

let WSS = new WS.Server({
  port: 8080
});

let t;
let o;

WSS.on('connection', async function connection(ws, req) {
  t = req.query.ws;
  o = req.query.origin;
  let webs = new WS(t, {
    origin: o
  });
  webs.onclose = () => {ws.close()};
  webs.onmessage = msg => {console.log(`BACK: ` + msg);ws.send(msg)};
  
  ws.on('message', function(message) {
    console.log(`GO: ` + message.data);
    webs.send(message.data);
  })
});