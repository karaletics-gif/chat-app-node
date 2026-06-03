require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Chat API is running'
    });
});

// Socket.IO
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Store connected users
const users = {};

io.on('connection', (socket) => {

    console.log(`Socket Connected: ${socket.id}`);

    // User joins
    socket.on('join', (userId) => {
        users[userId] = socket.id;
        console.log(`User Joined: ${userId}`);
    });

    // Private message
    socket.on('privateMessage', (data) => {

        const {
            senderId,
            receiverId,
            message
        } = data;

        const receiverSocketId = users[receiverId];

        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', {
                senderId,
                receiverId,
                message,
                createdAt: new Date()
            });
        }
    });

    // Disconnect
    socket.on('disconnect', () => {

        console.log(`Socket Disconnected: ${socket.id}`);

        Object.keys(users).forEach((userId) => {
            if (users[userId] === socket.id) {
                delete users[userId];
            }
        });
    });

});

// Start Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
