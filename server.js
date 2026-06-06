import dotenv from 'dotenv';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'path';
import { WebSocketServer } from 'ws';
import { redisPublish, redisSubscribe } from './connection.js';

dotenv.config();

const PORT = process.env.PORT ?? 8080;
const REDIS_CHANNEL = 'web-messages';

const httpServer = http.createServer(async (req, res) => {
    const indexFile = await fs.readFile(path.resolve('./index.html'), 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    return res.end(indexFile);
});

const wsServer = new WebSocketServer({ server: httpServer });

redisSubscribe.subscribe(REDIS_CHANNEL);
redisSubscribe.on('message', (channel, message) => {
    if (channel === REDIS_CHANNEL) {
        // broadcast message to all your connected clients...
        wsServer.clients.forEach((client) => {
            client.send(message.toString());
        });
    }
});

wsServer.on('connection', (socket) => {
    console.log('New WebSocket connection established...');
    socket.on('message', async (message) => {
        console.log(`Received message: ${message}`);
        // that will send that message to current client that was sending that message 
        // socket.send(message.toString());

        // broadcasting the messages to all the clients connected...
        // wsServer.clients.forEach((client) => {
        //     client.send(message.toString());
        // })

        // Relay the message to a broaker...
        console.log('Relaying a mesaage to redis broaker...');

        await redisPublish.publish(REDIS_CHANNEL, message.toString());
    });
});

httpServer.listen(PORT, () => {
    console.log(`HTTP server is listening on port ${PORT}`);
});