import { WebSocketServer } from 'ws';
import { v4 as uuid } from 'uuid';
import { writeFile } from 'fs';

const host = 'localhost';
const port = 8000;

// clients objects
const clients = {};
const messages = [];

const wss = new WebSocketServer({ host: host, port: port });
console.log(`server start on ${host}:${port}`);
wss.on("connection", (ws) => {
  const id = uuid();
  clients[id] = ws;

  console.log(`new client: ${id}`);

  ws.send(JSON.stringify(messages));

  ws.on('message', (rawMessage) => {
    const { name, message } = JSON.parse(rawMessage);
    messages.push({ name, message });

    for (const id in clients) {
      clients[id].send(JSON.stringify([{ name, message }]));
    }

  });

  ws.on('close', () => {
    delete clients[id];
    console.log(`disconnect client: ${id}`);
  });

});

process.on('SIGINT', () => {
  wss.close();
  writeFile('dump.json', JSON.stringify(messages), err => {
    if(err) console.err(err);
    process.exit();
  });
  
})