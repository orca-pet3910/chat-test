const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');

const server = https.createServer({
  key: fs.readFileSync('cert.key'),
  cert: fs.readFileSync('cert.crt'),
}, (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Welcome to my WebSocket server!
');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
    wss.clients.forEach((client) => {
      if (client!== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});
