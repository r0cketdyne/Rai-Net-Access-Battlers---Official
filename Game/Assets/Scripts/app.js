const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket.io event handlers
io.on('connection', (socket) => {
    console.log('A user connected');

    // Event handler for chat messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast the message to all connected clients
    });

    // Event handler for disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
