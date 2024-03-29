const chatEl = document.getElementById("chat");
const address = document.getElementById("address").value;
let ws = new WebSocket(address);

ws.onmessage = (event) => {
  console.log(event.data);
  const messages = JSON.parse(event.data);
  messages.forEach(message => {
    const messageEl = document.createElement('div');
    messageEl.appendChild(document.createTextNode(`${message.name}: ${message.message}`));
    chat.appendChild(messageEl);
  });
  
}

const reconnect = (event) => {
  event.preventDefault();
  ws.close();
  const newAddress = document.getElementById("address").value;
  ws = new WebSocket(newAddress);
  return false;
}

const send = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;
  ws.send(JSON.stringify({ name, message }));
  return false;
}

const formEl = document.getElementById("messageForm");
formEl.addEventListener("submit", send);