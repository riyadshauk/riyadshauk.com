# Riyad Shauk - Computer Science Tutoring & Software Consulting

A modern, SEO-optimized full-stack Next.js website featuring computer science tutoring services, software consulting, and a real-time messaging system with PostgreSQL database, authentication, and photo uploads.

<img alt="demo screenshot of the website" src="website-demo-screenshot.png" />

## Features

- **Multi-Page Application**: Dedicated pages for tutoring, consulting, and messaging
- **Real-Time Messaging System**: Secure chat between students and tutors with authentication
- **User Authentication**: Secure login/register system with session management
- **Review System**: Submit and display reviews with optional photo uploads
- **SEO Optimized**: Structured data and local SEO for Los Angeles
- **Modern UI**: Built with ShadCN UI components and Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM for data persistence
- **Responsive**: Works seamlessly on desktop and mobile devices
- **Photo Uploads**: Reviewers can optionally upload photos with their reviews
- **Local SEO**: Optimized for Los Angeles area
- **Environment Management**: Support for multiple environments with special character handling
- **Testing**: Comprehensive test suite with Jest and React Testing Library

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN UI
- **Database**: PostgreSQL with Drizzle ORM
- **Package Manager**: pnpm
- **File Uploads**: Local disk storage with Next.js API routes
- **Environment**: Zod validation with Next.js environment conventions
- **Testing**: Jest + React Testing Library
- **Authentication**: Custom session-based auth system
- **Real-time Features**: Server-side messaging with real-time updates

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL (will be installed automatically by the setup script)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd riyadshauk.com
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup environment variables**
   ```bash
   # Create environment file from template
   pnpm run env:create:local
   
   # Or manually copy and edit
   cp .env.example .env.local
   ```

4. **Setup database**
   ```bash
   # Make the setup script executable
   chmod +x scripts/setup-database.sh
   
   # Run the database setup (works on macOS and Linux/Raspberry Pi)
   ./scripts/setup-database.sh
   ```

5. **Run database migrations**
   ```bash
   pnpm run db:generate && pnpm run db:migrate
   ```

6. **Start the development server**
   ```bash
   pnpm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages & Features

### Home Page (`/`)
- Landing page with overview of services
- Navigation to tutoring, consulting, and messaging
- SEO optimized with structured data

### Tutoring Page (`/tutoring`)
- Detailed tutoring services information
- Review submission and display system
- Contact form for booking sessions
- Local SEO for Los Angeles area

### Consulting Page (`/consulting`)
- Software development and consulting services
- MVP development, business websites, automation tools
- Project discussion contact form

### Messaging System (`/messaging`)
- Real-time chat between students and tutors
- User authentication required
- Conversation management
- Message history and read receipts

## Troubleshooting

### Build Errors

If you encounter build errors, especially related to Next.js components or cached build artifacts, try clearing the build cache:

```bash
# Clear Next.js build cache
rm -rf .next

# Clear node modules cache (optional, but recommended for persistent issues)
rm -rf node_modules/.cache

# Reinstall dependencies (if cache clearing doesn't work)
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Common Issues:**

1. **`<Html> should not be imported outside of pages/_document`**: This error typically occurs when there are conflicting cached build artifacts between App Router and Pages Router. Clear the build cache as shown above.

2. **Environment variable parsing errors**: Ensure your environment files follow the correct format and don't have extra spaces or quotes around values.

3. **Database connection issues**: Verify your database is running and credentials are correct in your environment files.

4. **Port conflicts**: If port 3000 is in use, Next.js will automatically try the next available port.

### Development Issues

- **Hot reload not working**: Try restarting the development server
- **TypeScript errors**: Run `pnpm run type-check` to identify specific issues
- **ESLint warnings**: The `.eslintignore` file is deprecated; consider migrating to the `ignores` property in `eslint.config.js`

## Environment Configuration

The application uses Next.js environment conventions with automatic special character handling:

### Environment Files (Next.js Conventions)

- `.env` - Base environment variables (loaded first)
- `.env.local` - Local development overrides (loaded in development only)
- `.env.production` - Production environment (loaded in production only)

### Environment Variables

The application uses individual database components for better special character support:

```bash
# Database configuration (recommended for special characters)
DB_USER=riyadshauk_user
DB_PASSWORD=my@complex#password$2025
DB_NAME=riyadshauk_tutoring
DB_HOST=localhost
DB_PORT=5432

# Environment
NODE_ENV=development

# Email configuration (optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# JWT Secret (for authentication)
JWT_SECRET=your-secret-key-here
```

### Special Character Support

The system automatically handles special characters in database credentials:

- **Passwords**: Supports `@`, `#`, `$`, `%`, `&`, `+`, `=`, etc.
- **Usernames**: Supports email addresses and special characters
- **Hosts**: Supports domain names with special characters
- **Automatic Encoding**: Special characters are URL-encoded when constructing the DATABASE_URL

### Environment Management Commands

```bash
# Validate environment files
pnpm run env:validate

# Show environment information
pnpm run env:info

# Create environment files from templates
pnpm run env:create:local
pnpm run env:create:production

# Test database connection
pnpm run env:test
```

### Manual Environment Setup

If you prefer to set up environment files manually:

1. **Development** (`.env.local`):
   ```bash
   # Copy template
   cp .env.example .env.local
   
   # Edit with your settings
   nano .env.local
   ```

2. **Production** (`.env.production`):
   ```bash
   # Copy production template
   cp .env.production.example .env.production
   
   # Edit with production settings
   nano .env.production
   ```

## Database Management

### Useful Commands

```bash
# Generate new migrations
pnpm run db:generate

# Run migrations
pnpm run db:migrate

# View database in browser
pnpm run db:studio

# Reset database (development only)
pnpm run db:reset
```

### Database Schema

The application uses multiple tables for comprehensive functionality:

#### Reviews Table
- `id`: Unique identifier
- `name`: Reviewer's name
- `email`: Reviewer's email
- `role`: Reviewer's role (optional)
- `subject`: Subject being reviewed (optional)
- `rating`: Rating (1-5 stars)
- `review`: Review text
- `verified`: Whether the review has been verified (default: false)
- `photoUrl`: Optional path to uploaded photo
- `createdAt`: Timestamp of review creation
- `updatedAt`: Timestamp of last update

#### Users Table
- `id`: Unique identifier
- `email`: User's email (unique)
- `name`: User's name
- `passwordHash`: Hashed password
- `role`: User role ('admin' for tutor, 'client' for student)
- `isVerified`: Whether email is verified
- `avatarUrl`: Optional avatar image URL
- `lastLogin`: Last login timestamp
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

#### Sessions Table
- `id`: Session identifier
- `userId`: Reference to user
- `token`: Session token
- `expiresAt`: Session expiration
- `createdAt`: Session creation timestamp
- `updatedAt`: Last update timestamp

#### Conversations Table
- `id`: Conversation identifier
- `name`: Conversation name (for group chats)
- `type`: Conversation type ('private' or 'group')
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

#### Messages Table
- `id`: Message identifier
- `conversationId`: Reference to conversation
- `senderId`: Reference to user who sent the message
- `content`: Message content
- `messageType`: Type of message ('text', 'image', 'file')
- `metadata`: Additional message data (JSON)
- `createdAt`: Message creation timestamp
- `updatedAt`: Last update timestamp

#### Supporting Tables
- `conversationParticipants`: Links users to conversations
- `messageReads`: Tracks message read status

### Database Setup Script

The `scripts/setup-database.sh` script automatically:

- Detects your operating system (macOS or Linux)
- Installs PostgreSQL if needed
- Creates database user and database
- Sets up environment variables with special character support
- Runs initial migrations

## Project Structure

```
riyadshauk.com/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   │   ├── login/     # Login endpoint
│   │   │   │   ├── logout/    # Logout endpoint
│   │   │   │   ├── register/  # Registration endpoint
│   │   │   │   └── me/        # Current user info
│   │   │   ├── conversations/ # Conversation management
│   │   │   ├── messages/      # Message handling
│   │   │   ├── reviews/       # GET reviews endpoint
│   │   │   ├── submit-review/ # POST review submission
│   │   │   ├── users/         # User management
│   │   │   └── setup-admin/   # Admin user setup
│   │   ├── tutoring/          # Tutoring page
│   │   ├── consulting/        # Consulting page
│   │   ├── messaging/         # Messaging system page
│   │   ├── favicon.ico        # Favicon
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout with metadata
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/               # ShadCN UI components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   └── textarea.tsx
│   │   ├── AuthContext.tsx    # Authentication context
│   │   ├── AuthForm.tsx       # Login/register form
│   │   ├── Chat.tsx           # Chat interface
│   │   ├── ConversationList.tsx # Conversation list
│   │   ├── LoginForm.tsx      # Login form component
│   │   ├── MessagingApp.tsx   # Main messaging app
│   │   ├── MessagingContext.tsx # Messaging context
│   │   ├── NavBar.tsx         # Navigation bar
│   │   ├── ReviewForm.tsx     # Review submission form
│   │   ├── ReviewsDisplay.tsx # Reviews display component
│   │   ├── Footer.tsx         # Footer component
│   │   └── __tests__/         # Component tests
│   ├── db/                   # Database configuration
│   │   ├── index.ts          # Database client setup
│   │   ├── schema.ts         # Database schema definition
│   │   └── auth-schema.ts    # Authentication schema
│   └── lib/                  # Utility functions
│       ├── auth.ts           # Authentication utilities
│       ├── env.ts            # Environment configuration
│       └── utils.ts          # Helper functions
├── public/                   # Static assets
│   ├── uploads/             # User uploaded photos
│   ├── favicon.ico          # Favicon
│   ├── favicon.svg          # SVG favicon
│   └── profile-placeholder.png # Profile image placeholder
├── drizzle/                 # Database migrations
│   ├── 0000_right_the_phantom.sql
│   ├── 0001_messy_rick_jones.sql
│   ├── 0002_messaging_system.sql
│   ├── 0003_add_authentication.sql
│   └── meta/               # Migration metadata
├── scripts/                 # Setup and utility scripts
│   ├── setup-database.sh   # Cross-platform database setup
│   ├── env-helper.sh       # Environment management utilities
│   ├── deploy.sh           # Deployment script
│   ├── start-production.sh # Production startup script
│   └── run-migrations.sh   # Migration runner
├── components.json         # ShadCN UI configuration
├── drizzle.config.ts       # Drizzle ORM configuration
├── .env.example            # Environment variables template
├── .env.production.example # Production environment template
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── jest.setup.js           # Jest test setup
└── eslint.config.mjs       # ESLint configuration
```

## API Endpoints

### Authentication
- **POST /api/auth/register** - User registration
- **POST /api/auth/login** - User login
- **POST /api/auth/logout** - User logout
- **GET /api/auth/me** - Get current user info

### Messaging System
- **GET /api/conversations** - Get user's conversations
- **POST /api/conversations** - Create new conversation
- **GET /api/messages** - Get messages for a conversation
- **POST /api/messages** - Send a new message
- **POST /api/conversations/start-with-admin** - Start conversation with admin

### Reviews System
- **GET /api/reviews** - Get all reviews
- **POST /api/submit-review** - Submit new review with photo upload

### User Management
- **GET /api/users** - Get users (admin only)
- **POST /api/setup-admin** - Setup admin user

### Example API Responses

#### GET /api/reviews
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Student",
    "subject": "Python Programming",
    "rating": 5,
    "review": "Great tutor!",
    "verified": true,
    "photoUrl": "/uploads/review-1.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST /api/submit-review
**Request:** `multipart/form-data`
- `name`: Reviewer's name (required)
- `email`: Reviewer's email (required)
- `role`: Reviewer's role (optional)
- `subject`: Subject being reviewed (optional)
- `rating`: Rating 1-5 (required)
- `review`: Review text (required)
- `photo`: Image file (optional)

**Response:**
```json
{
  "success": true,
  "message": "Review submitted successfully"
}
```

## Testing

The project includes comprehensive testing with Jest and React Testing Library:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests in CI mode
pnpm test:ci
```

### Test Coverage
- Component tests in `src/components/__tests__/`
- Utility tests in `src/lib/__tests__/`
- Coverage threshold: 70% for branches, functions, lines, and statements

## Deployment

### Local Raspberry Pi Deployment

1. **Setup Raspberry Pi**
   ```bash
   # On your Raspberry Pi
   ./scripts/setup-database.sh
   ```

2. **Configure environment**
   ```bash
   # Update .env.local with production settings
   cp .env.example .env.local
   # Edit with secure passwords and correct host settings
   ```

3. **Build and start**
   ```bash
   pnpm run build
   pnpm start
   ```

### Cloud Deployment

For cloud deployment (Vercel, Railway, etc.):

1. Set the environment variables in your deployment platform's dashboard
2. Ensure the `DATABASE_URL` points to your production database
3. For photo uploads, consider using cloud storage (S3, Cloudinary) instead of local disk
4. Set up proper JWT secrets for authentication

### Production Scripts

```bash
# Deploy to production
./scripts/deploy.sh

# Start production server
./scripts/start-production.sh
```

## Development

### Adding New Features

1. **Database Changes**: Update `src/db/schema.ts` and run migrations
2. **UI Components**: Add to `src/components/` or `src/components/ui/`
3. **API Routes**: Create new files in `src/app/api/`
4. **Styling**: Use Tailwind CSS classes and ShadCN components
5. **Testing**: Add tests in corresponding `__tests__/` directories

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Conventional commit messages
- Comprehensive test coverage

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
