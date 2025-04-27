# Comprehensive System Analysis - CodeX Collaborative Coding Platform

## System Overview

CodeX is a real-time collaborative code editing platform that enables multiple users to join coding sessions, write and execute code together, communicate through text chat, and connect via video calls. The system uses a client-server architecture with WebSockets for real-time communication and integrates with the Judge0 API for code execution.

## Key Components

### Frontend Components

1. **Editor Page** - Main interface containing code editor, output box, and communication tools
2. **Code Editor** - Monaco-based editor with language selection and real-time collaboration
3. **TopNav** - Navigation bar with language selection and execution controls
4. **RoomInfo** - Displays session details including room ID, host, and participants
5. **OutputBox** - Shows execution results from code runs
6. **VideoCallComponent** - Handles WebRTC video calls between participants
7. **ChatComponent** - Text-based communication between participants

### Backend Components

1. **Express Server** - HTTP server handling REST API requests
2. **Socket.IO Server** - WebSocket server for real-time communication
3. **Room Management** - Tracks active coding sessions and their participants
4. **Code Execution Service** - Interfaces with Judge0 API for running code

## API Endpoints

### Room Management

- `POST /api/rooms/create-room` - Creates a new coding session
- `POST /api/rooms/join-room` - Validates and joins an existing room

### Code Execution

- `POST /api/execution/run` - Submits code to Judge0 API for execution

## Socket Events

### Connection Events

- `join_room` - User joins a coding session
- `disconnect` - User leaves a coding session

### Room Management Events

- `room_info` - Provides details about the current room
- `room_users_updated` - Updates when users join the room
- `user_left` - Notification when a user leaves
- `user_joined` - Notification when a user joins
- `existing_users` - List of users already in the room

### Code Collaboration Events

- `send_code` - Sends updated code to the server
- `receive_code` - Receives code updates from other users
- `change_language` - Changes the programming language
- `language_changed` - Notification of language change
- `execution_result` - Results from code execution

### Video Call Events

- `offer` - WebRTC SDP offer for video connection
- `answer` - WebRTC SDP answer for video connection
- `ice-candidate` - WebRTC ICE candidate for connection establishment

### Chat Events

- `send_message` - Sends a chat message
- `receive_message` - Receives a chat message

## Data Structures

### Room Object (Backend)

```typescript
interface Room {
  id: string; // Unique room identifier
  name: string; // Display name for the room
  users: User[]; // List of participants
  code: string; // Current shared code
  language: string; // Selected programming language
}
```

### User Object (Backend)

```typescript
interface User {
  id: string; // Socket ID
  name: string; // Display name
}
```

### Message Object (Frontend)

```typescript
interface Message {
  userName: string; // Sender's name
  userId: string; // Sender's socket ID
  message: string; // Message content
  timestamp: string; // Time message was sent
}
```

### Room Data Object (Frontend)

```typescript
interface RoomData {
  id: string; // Room identifier
  name: string; // Room name
  host: string; // Host's name
  participants: string[]; // List of participant names
}
```

### UserInfo Object (Frontend)

```typescript
interface UserInfo {
  socketId: string; // User's socket ID
  userName: string; // User's display name
}
```

## Data Flow Descriptions

### Room Creation & Joining Flow

1. User creates a room via `/api/rooms/create-room` endpoint
2. Server generates a unique UUID for the room and returns it
3. User joins the room via `/api/rooms/join-room` endpoint with the room ID
4. User establishes WebSocket connection with `join_room` event
5. Server adds user to room and broadcasts user joined notification
6. Server sends room info, existing users, current code, and language

### Code Collaboration Flow

1. User edits code in Monaco editor
2. Client emits `send_code` event with updated code
3. Server updates room code and broadcasts to all users via `receive_code`
4. Other clients update their editors with new code
5. When language changes, `change_language` event is triggered
6. Server updates room language and notifies all users

### Code Execution Flow

1. User clicks "Run" button in TopNav
2. Client checks execution cooldown period
3. Client sends code to `/api/execution/run` endpoint
4. Server submits code to Judge0 API with appropriate language ID
5. Server processes execution results and returns to client
6. Client emits `execution_result` to broadcast to all users
7. OutputBox displays execution results

### Video Call Flow

1. VideoCallComponent initializes WebRTC connection with STUN servers
2. Component requests camera/microphone access and creates local stream
3. When a new user joins, `user_joined` event triggers
4. Peer connection creates and sends an offer via `offer` event
5. Receiving peer sets remote description and sends answer via `answer` event
6. Both peers exchange ICE candidates via `ice-candidate` events
7. Video streams are established between participants

### Chat Flow

1. User types message in ChatComponent
2. Client emits `send_message` event with message data
3. Server broadcasts message to all users via `receive_message`
4. ChatComponent displays messages, differentiating own messages

### User Disconnection Flow

1. User closes browser tab or navigates away
2. Socket `disconnect` event is triggered
3. Server removes user from room and notifies others
4. Client updates UI to remove disconnected user
5. If room becomes empty, server cleans up room resources

## External Integrations

### Judge0 API

- Used for executing code in various programming languages
- Supports Java, C++, C, Python with language-specific IDs
- Communicates via REST API with RapidAPI authentication

### WebRTC

- Used for peer-to-peer video/audio communication
- Uses STUN servers for NAT traversal
- Signaling handled through Socket.IO events

## Technical Architecture

### Client-Side Technologies

- React for UI components
- Socket.IO client for WebSocket communication
- Monaco Editor for code editing
- WebRTC API for video calls
- Axios for HTTP requests

### Server-Side Technologies

- Node.js runtime
- Express framework for HTTP server
- Socket.IO for WebSocket communication
- HTTP module for server creation

## Physical Data Structure

- In-memory storage on the server (no database)
- Room data stored in JavaScript objects indexed by room ID
- User data stored as arrays within room objects
- Transient data that is lost when server restarts

## Detailed Component Relationships

### Frontend-Backend Communication

- HTTP for initial setup and code execution
- WebSockets for real-time updates and signaling
- REST API for room management and code execution

### Component Dependencies

- Editor depends on Socket.IO for syncing code
- VideoCallComponent depends on WebRTC and Socket.IO for signaling
- TopNav depends on Axios for code execution
- OutputBox depends on Socket.IO for receiving results
- RoomInfo depends on Socket.IO for room state

## System Workflow Steps

1. **Room Creation & User Registration**

   - User creates/joins a room with username
   - System validates room existence and adds user
   - UI displays room info and user details

2. **Code Editing & Collaboration**

   - Users edit code in real-time
   - Changes are broadcast to all participants
   - Language selection affects editor mode

3. **Code Execution**

   - User initiates code execution
   - System sends code to external Judge0 API
   - Results are broadcast to all participants

4. **Communication Channels**

   - Users exchange text messages via chat
   - Video calls establish peer connections
   - UI indicates connection status and user presence

5. **Session Termination**
   - Users disconnect from rooms
   - System cleans up resources
   - Empty rooms are removed from memory
