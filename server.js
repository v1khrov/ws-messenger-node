import { WebSocketServer } from 'ws';
import {v4 as uuid} from 'uuid';

const host = 'localhost';
const port = 8000;

// clients objects
const clients = {};
const messages = [];

const wss = new WebSocketServer({host: host, port: port});
console.log(`server start on ${host}:${port}`);
wss.on("connection", (ws) => {
  const id = uuid();
  clients[id] = ws;

  console.log(`new client: ${id}`); 

  ws.on('message', (rawMessage) => {    
    const message  = JSON.parse(rawMessage);
    messages.push(message);

    for (const id in clients) { 
      clients[id].send(messages);
    }

  });

  ws.on('close', () => {
    delete clients[id];
    console.log(`disconnect client: ${id}`);
  });

});

