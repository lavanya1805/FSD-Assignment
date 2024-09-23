const WebSocket = require('ws');

// Set up WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

let activeUsers = [];

// On new connection
wss.on('connection', (ws) => {
  // Assign a random user ID to new connections
  const userId = `User-${Math.floor(Math.random() * 1000)}`;
  activeUsers.push(userId);

  // Notify all clients about the active users
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ activeUsers }));
    }
  });

  // Broadcast drawing data to other users
  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(parsedMessage));
        }
      });
    } catch (e) {
      console.error("Error parsing message:", e);
    }
  });

  // Handle user disconnect
  ws.on('close', () => {
    activeUsers = activeUsers.filter((user) => user !== userId);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ activeUsers }));
      }
    });
  });
});

console.log('WebSocket server running on ws://localhost:8080');
