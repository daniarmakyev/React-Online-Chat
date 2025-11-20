# Real-Time Chat Application

A real-time chat application built with React, TypeScript, Redux Toolkit, Socket.IO.

## Features

### Authentication

- User registration with email and password
- Secure login system with JWT tokens
- Protected routes and API endpoints

### Channel Management

- Create public channels
- Join/leave channels
- Delete channels (owner only)
- View channel members
- Remove members (owner only)

### Real-Time Messaging

- Instant message delivery via WebSocket
- Message history persistence
- Online/offline status indicators
- Auto-scroll to latest messages

### User Management

- Search users by username or email
- View user profiles
- Real-time user presence

---

## Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router v6** - Routing
- **Socket.IO Client** - WebSocket client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **Socket.IO** - WebSocket server
- **MongoDB** - Database
- **JWT** - Authentication

---

## Environment Variables

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3012
```

### Backend (.env)

```env
PORT=3000
SOCKET_PORT=3012
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_jwt_secret_key
```

---

## API Endpoints

### Authentication

```
POST /auth/register
Body: { username, email, password }
Response: { user: IUser }

POST /auth/login
Body: { email, password }
Response: { token, user: IUser }
```

### Channels

```
GET /channel/list
Response: { channels: IChannel[] }

POST /channel/create
Body: { name: string }
Response: IChannel

POST /channel/:id/join
Response: IChannel

POST /channel/:id/leave
Response: { message: string }

DELETE /channel/:id
Response: { message: string }

GET /channel/:id/messages
Response: { messages: IMessage[] }

GET /channel/:id/participants
Response: { participants: IUser[], owner: IUser }

DELETE /channel/:id/participants/:participantId
Response: { message: string }
```

### Users

```
GET /users/search?q=query
Response: { users: IUser[] }
```

---
