/**
 * CodeRev4Minds - AI-Powered Code Review Automation Tool
 * 
 * PROPRIETARY SOFTWARE - AC MiNDS, LLC
 * Copyright (c) 2024 AC MiNDS, LLC. All rights reserved.
 * 
 * This software is proprietary and confidential. Unauthorized copying, 
 * distribution, or modification is strictly prohibited.
 * 
 * For licensing inquiries: legal@acminds.com
 * 
 * @file server.js
 * @description Main backend server application
 * @author AC MiNDS, LLC
 * @version 1.0.0
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const repositoryRoutes = require('./routes/repositories');
const scanRoutes = require('./routes/scans');
const issueRoutes = require('./routes/issues');
const integrationRoutes = require('./routes/integrations');
const webhookRoutes = require('./routes/webhooks');
const analyticsRoutes = require('./routes/analytics');

const { connectDatabase } = require('./database/connection');
const { setupWebSocket } = require('./websocket/server');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { logger } = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Force HTTPS in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
    return;
  }
  next();
});

app.use(cors({
  origin: process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://localhost:5173' : 'http://localhost:5173'),
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/repositories', repositoryRoutes);
app.use('/api/scans', scanRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/integrations', integrationRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    // Connect to database
    await connectDatabase();
    logger.info('Database connected successfully');

    let server;
    const useHttps = process.env.NODE_ENV === 'production' || process.env.USE_HTTPS === 'true';

    if (useHttps) {
      // Try to load SSL certificates for HTTPS
      try {
        const privateKey = fs.readFileSync('ssl/private-key.pem', 'utf8');
        const certificate = fs.readFileSync('ssl/certificate.pem', 'utf8');
        
        const httpsOptions = {
          key: privateKey,
          cert: certificate
        };
        
        server = https.createServer(httpsOptions, app);
        server.listen(PORT, () => {
          logger.info(`🔒 HTTPS Server running securely on port ${PORT}`);
          logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
      } catch (error) {
        logger.warn('SSL certificates not found, falling back to HTTP');
        server = app.listen(PORT, () => {
          logger.info(`🚀 HTTP Server running on port ${PORT}`);
          logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
      }
    } else {
      // Start HTTP server for development
      server = app.listen(PORT, () => {
        logger.info(`🚀 HTTP Server running on port ${PORT}`);
        logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      });
    }

    // Setup WebSocket server
    setupWebSocket(server);
    logger.info('WebSocket server initialized');

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully');
      server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
