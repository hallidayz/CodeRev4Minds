const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ['admin', 'developer', 'viewer'],
    default: 'developer'
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'inactive'],
    default: 'active'
  },
  lastLoginAt: {
    type: Date,
    default: Date.now
  },
  preferences: {
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      slack: {
        type: Boolean,
        default: false
      },
      webhook: {
        type: Boolean,
        default: true
      }
    },
    dashboard: {
      defaultView: {
        type: String,
        enum: ['overview', 'repositories', 'analytics'],
        default: 'overview'
      },
      itemsPerPage: {
        type: Number,
        default: 10,
        min: 5,
        max: 100
      }
    }
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ organizationId: 1 });
userSchema.index({ role: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return this.name;
});

// Static method to find by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to get organization users
userSchema.statics.getOrganizationUsers = function(organizationId, options = {}) {
  const query = { organizationId };
  
  if (options.role) {
    query.role = options.role;
  }
  
  if (options.status) {
    query.status = options.status;
  }
  
  return this.find(query).populate('organizationId');
};

module.exports = mongoose.model('User', userSchema);
