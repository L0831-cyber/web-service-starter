const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const healthRoutes = require('./routes/health');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }));

// Routes
app.use('/health', healthRoutes);
app.use(`/api/${process.env.API_VERSION || 'v1'}`, apiRoutes);

// Documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    name: 'Web Service API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      items: {
        list: 'GET /api/v1/items',
        create: 'POST /api/v1/items',
        get: 'GET /api/v1/items/:id',
        update: 'PUT /api/v1/items/:id',
        delete: 'DELETE /api/v1/items/:id'
      }
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Web Service is running',
    status: 'operational',
    documentation: '/api/docs',
    health: '/health'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    documentation: '/api/docs'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
