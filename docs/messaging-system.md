# Messaging System

A self-contained messaging functionality for private and group conversations, integrated into your website.

## Features

### Core Functionality
- **User Authentication**: Simple email-based login system
- **Private Messaging**: One-on-one conversations between users
- **Group Messaging**: Multi-user conversations with custom names
- **Real-time Updates**: Messages appear immediately after sending
- **Message History**: Persistent message storage with timestamps
- **Read Receipts**: Track which messages have been read by participants

### User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface using Tailwind CSS
- **Conversation List**: Easy navigation between conversations
- **Message Input**: Simple text input with send button
- **User Management**: Create new conversations with any registered users

## Database Schema

The messaging system uses the following database tables:

### Users
- `id`: Unique identifier
- `email`: User's email address (unique)
- `name`: Display name
- `avatarUrl`: Optional profile picture URL
- `createdAt`, `updatedAt`: Timestamps

### Conversations
- `id`: Unique identifier
- `name`: Optional name for group conversations
- `type`: "private" or "group"
- `createdAt`, `updatedAt`: Timestamps

### Conversation Participants
- `conversationId`: Reference to conversation
- `userId`: Reference to user
- `role`: "admin" or "member"
- `joinedAt`: Timestamp

### Messages
- `id`: Unique identifier
- `conversationId`: Reference to conversation
- `senderId`: Reference to user who sent the message
- `content`: Message text
- `messageType`: "text", "image", or "file"
- `metadata`: Optional JSON data
- `createdAt`, `updatedAt`: Timestamps

### Message Reads
- `messageId`: Reference to message
- `userId`: Reference to user who read the message
- `readAt`: Timestamp

## API Endpoints

### Users
- `GET /api/users` - Get all users or search by email/id
- `POST /api/users` - Create a new user
- `PUT /api/users?id=<id>` - Update user information

### Conversations
- `GET /api/conversations` - Get conversations for a user or by ID
- `POST /api/conversations` - Create a new conversation
- `PUT /api/conversations?id=<id>` - Update conversation details

### Messages
- `GET /api/messages?conversationId=<id>&userId=<id>` - Get messages for a conversation
- `POST /api/messages` - Send a new message
- `PUT /api/messages` - Mark messages as read

## Usage

### For Users
1. Navigate to `/messaging` on your website
2. Enter your name and email to sign in
3. Create new conversations by clicking the "+" button
4. Select users for private conversations or create group chats
5. Start messaging!

### For Developers
The messaging system is built with:
- **Next.js 15** with App Router
- **Drizzle ORM** for database management
- **PostgreSQL** for data storage
- **Tailwind CSS** for styling
- **React Context** for state management

## Setup Instructions

1. **Database Migration**: Run the migration to create the messaging tables:
   ```bash
   npm run db:migrate
   ```

2. **Environment Variables**: Ensure your database connection is configured in your environment.

3. **Access**: Navigate to `/messaging` to use the messaging system.

## Security Considerations

- All API endpoints validate user permissions
- Users can only access conversations they're participants in
- Input validation using Zod schemas
- SQL injection protection through Drizzle ORM

## Future Enhancements

Potential improvements for the messaging system:
- Real-time messaging using WebSockets
- File and image upload support
- Message editing and deletion
- Typing indicators
- Push notifications
- Message search functionality
- User status indicators (online/offline)
- Message reactions and emojis

## Integration

The messaging system is designed to be self-contained and can be easily integrated into any part of your website. The main components are:

- `MessagingProvider`: Context provider for state management
- `MessagingApp`: Main application component
- `LoginForm`: User authentication
- `ConversationList`: Conversation navigation
- `Chat`: Message display and input

All components use your existing UI components and styling system for consistency. 