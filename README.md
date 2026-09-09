# 🚀 Web Service Starter

A production-ready web service template built with Node.js and Express.

## Features

✅ **Express.js** - Fast, minimalist web framework  
✅ **RESTful API** - Fully functional CRUD endpoints  
✅ **Error Handling** - Centralized error middleware  
✅ **Logging** - Structured JSON logging  
✅ **CORS** - Cross-origin resource sharing enabled  
✅ **Environment Config** - `.env` support via dotenv  
✅ **Health Checks** - Built-in health monitoring  
✅ **Tests** - Jest setup with example tests  
✅ **Docker** - Dockerfile and docker-compose included  

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/L0831-cyber/web-service-starter.git
cd web-service-starter

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### Running the Service

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The service will start on `http://localhost:3000`

## API Endpoints

### Health Check
```bash
GET /health
```

### Items API

**List all items**
```bash
GET /api/v1/items?limit=10&offset=0
```

**Create a new item**
```bash
POST /api/v1/items
Content-Type: application/json

{
  "name": "My Item",
  "description": "Item description"
}
```

**Get a specific item**
```bash
GET /api/v1/items/:id
```

**Update an item**
```bash
PUT /api/v1/items/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}
```

**Delete an item**
```bash
DELETE /api/v1/items/:id
```

## Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch
```

## Docker

```bash
# Build and run with Docker Compose
docker-compose up

# Or build manually
docker build -t web-service .
docker run -p 3000:3000 web-service
```

## Project Structure

```
├── src/
│   ├── index.js              # Entry point
│   ├── app.js                # Express app setup
│   ├── controllers/           # Request handlers
│   ├── routes/                # API routes
│   ├── middleware/            # Custom middleware
│   └── utils/                 # Helper utilities
├── tests/                     # Test files
├── .env.example              # Environment variables template
├── package.json              # Dependencies
├── Dockerfile                # Docker configuration
└── README.md                 # This file
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | development | Environment mode |
| `PORT` | 3000 | Server port |
| `API_VERSION` | v1 | API version prefix |
| `LOG_LEVEL` | info | Logging level (error, warn, info, debug) |

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure database connection
- [ ] Add authentication/authorization
- [ ] Implement rate limiting
- [ ] Add request validation (e.g., joi, zod)
- [ ] Configure logging aggregation
- [ ] Set up monitoring/alerting
- [ ] Add API versioning strategy
- [ ] Document API with OpenAPI/Swagger
- [ ] Configure CI/CD pipeline

## License

MIT
