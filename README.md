# Real-Time Chat Application Backend

A real-time one-to-one chat application backend built using Node.js, Express.js, MongoDB, JWT Authentication, and Socket.IO.

## Features

* User Registration
* User Login
* JWT Authentication
* MongoDB Database Integration
* Real-Time Messaging with Socket.IO
* Message Persistence
* Chat History API
* User Listing API
* Online User Tracking
* REST APIs + WebSockets

---

# Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* Socket.IO
* BcryptJS
* Dotenv
* CORS

---

# Project Structure

```text
chat-app-node/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── chatController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── Message.js
│
├── routes/
│   ├── authRoutes.js
│   └── chatRoutes.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>

cd chat-app-node
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp

JWT_SECRET=mySuperSecretJWTKey
```

---

# Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Expected output:

```text
MongoDB Connected
Server running on port 5000
```

---

# API Base URL

```text
http://localhost:5000/api
```

---

# Authentication APIs

## Register User

### Endpoint

```http
POST /api/register
```

### Request Body

```json
{
  "name": "Ajeet",
  "email": "ajeet@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "User Registered"
}
```

---

## Login User

### Endpoint

```http
POST /api/login
```

### Request Body

```json
{
  "email": "ajeet@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "token": "jwt_token",
  "user": {
    "_id": "685xxxxx",
    "name": "Ajeet",
    "email": "ajeet@gmail.com"
  }
}
```

---

# User APIs

## Get All Users

Returns all users except the currently logged-in user.

### Endpoint

```http
GET /api/users
```

### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# Chat APIs

## Send Message

### Endpoint

```http
POST /api/chat/send
```

### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "receiverId": "685xxxxx",
  "message": "Hello"
}
```

---

## Get Chat History

### Endpoint

```http
GET /api/chat/messages/:userId
```

### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

Returns all messages exchanged between the logged-in user and the selected user.

---

# Socket.IO Events

## Join Chat

### Client

```javascript
socket.emit(
    'join',
    userId
);
```

---

## Send Real-Time Message

### Client

```javascript
socket.emit(
    'privateMessage',
    {
        senderId,
        receiverId,
        message
    }
);
```

---

## Receive Message

### Client

```javascript
socket.on(
    'newMessage',
    (data) => {
        console.log(data);
    }
);
```

---

# Database Collections

## Users Collection

```json
{
  "_id": "685xxxxx",
  "name": "Ajeet",
  "email": "ajeet@gmail.com",
  "password": "$2a$10$hashedpassword"
}
```

---

## Messages Collection

```json
{
  "_id": "686xxxxx",
  "senderId": "685xxxxx",
  "receiverId": "687xxxxx",
  "message": "Hello",
  "createdAt": "2025-01-01T10:00:00Z"
}
```

---

# Security

* Passwords are hashed using BcryptJS.
* JWT Authentication protects private APIs.
* User passwords are never returned in API responses.

---

# Future Enhancements

* Online / Offline Status
* Typing Indicators
* Read Receipts
* Message Reactions
* Group Chats
* Image/File Sharing
* Voice Messages
* Push Notifications
* Redis Scaling
* Docker Support

---

# Author

Ajeet Kumar

Senior PHP Developer | Node.js Learner

---

# License

MIT License
