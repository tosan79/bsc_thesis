const express = require('express');
const app = express();
const WebSocket = require('ws');
const { spawn } = require('child_process');

const wss = new WebSocket.Server({ server: app });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        if (message === 'changeMoves') {
            // Run the C++ program
            const childProcess = spawn(./gomoku);

            childProcess.stdout.on('data', (data) => {
                // Process the output of the C++ program
                const newData = JSON.parse(data.toString());
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(newData));
                    }
                });
            });
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
