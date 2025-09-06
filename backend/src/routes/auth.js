const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Organization = require('../models/Organization');
const { logger } = require('../utils/logger');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
];

const validateSignup = [
  body('name').trim().isLength({ min: 2, max: 50 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('organizationName').trim().isLength({ min: 2, max: 100 }),
  body('teamSize').isIn(['1-5', '6-20', '21-50', '50+'])
];

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', validateLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).populate('organizationId');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    logger.info(`User logged in: ${email}`);

    res.json({
      success: true,
      data: {
        user: userResponse,
        organization: user.organizationId,
        token
      }
    });

  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   POST /api/auth/signup
// @desc    Register new user and organization
// @access  Public
router.post('/signup', validateSignup, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, password, organizationName, teamSize } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create organization
    const organization = new Organization({
      name: organizationName,
      plan: 'free',
      maxUsers: teamSize === '1-5' ? 5 : teamSize === '6-20' ? 20 : teamSize === '21-50' ? 50 : 100,
      maxRepositories: teamSize === '1-5' ? 3 : teamSize === '6-20' ? 10 : teamSize === '21-50' ? 25 : 100
    });

    await organization.save();

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      organizationId: organization._id,
      role: 'admin' // First user is admin
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    logger.info(`New user registered: ${email}, Organization: ${organizationName}`);

    res.status(201).json({
      success: true,
      data: {
        user: userResponse,
        organization,
        token
      }
    });

  } catch (error) {
    logger.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   GET /api/auth/verify
// @desc    Verify JWT token
// @access  Private
router.get('/verify', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('organizationId');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      data: {
        user: userResponse,
        organization: user.organizationId
      }
    });

  } catch (error) {
    logger.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during token verification'
    });
  }
});

// @route   POST /api/auth/refresh
// @desc    Refresh JWT token
// @access  Private
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate new token
    const token = generateToken(user._id);

    res.json({
      success: true,
      data: { token }
    });

  } catch (error) {
    logger.error('Token refresh error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during token refresh'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // In a more sophisticated setup, you might want to blacklist the token
    // For now, we'll just log the logout
    logger.info(`User logged out: ${req.user.userId}`);

    res.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
});

module.exports = router;
