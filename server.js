import dotenv from 'dotenv';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'path';
import { WebSocketServer } from 'ws';

dotenv.config();

const PORT = process.env.PORT ?? 8080;

const httpServer = http.createServer(async (req, res) => {
    const indexFile = await fs.readFile(path.resolve('./index.html'), 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    return res.end(indexFile);
});

const wsServer = new WebSocketServer({ server: httpServer });

wsServer.on('connection', (socket) => {
    console.log('New WebSocket connection established...');
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // that will send that message to current client that was sending that message 
        // socket.send(message.toString());

        // broadcasting the messages to all the clients connected...
        wsServer.clients.forEach((client) => {
            client.send(message.toString());
        })
    });
});

httpServer.listen(PORT, () => {
    console.log(`HTTP server is listening on port ${PORT}`);
});