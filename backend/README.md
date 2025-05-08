# Abbaquar-san Dream Centre Backend

This is the backend service for the Abbaquar-san Dream Centre website. It provides APIs for managing activities, events, and user authentication.

## Features

- Magic link authentication system
- Role-based access control (Admin/User)
- Activity management with categories
- Event management with registration
- Contact form submission handling
- File uploads to AWS S3

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- AWS Account (for file uploads)
- SMTP Server (for sending emails)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment example file and update the values:
   ```bash
   cp .env.example .env
   ```

4. Set up the database:
   ```bash
   # Generate Prisma Client
   npm run prisma:generate

   # Run database migrations
   npm run prisma:migrate
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRATION`: JWT token expiration time
- `SMTP_HOST`: SMTP server host
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password
- `FRONTEND_URL`: Frontend application URL
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `AWS_REGION`: AWS region
- `AWS_BUCKET_NAME`: S3 bucket name
- `ADMIN_EMAIL`: Administrator email address

## API Documentation

The API endpoints will be documented using Swagger and will be available at `/api` when the server is running.

## Development

- `npm run start:dev`: Start development server
- `npm run build`: Build for production
- `npm run start:prod`: Start production server
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier
- `npm run test`: Run tests
- `npm run prisma:studio`: Open Prisma Studio

## Security

- Magic link authentication with 30-minute expiration
- JWT tokens for session management
- Role-based access control
- CORS configuration
- Request validation
- Secure password hashing
- Environment variable protection

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is private and confidential. All rights reserved. 