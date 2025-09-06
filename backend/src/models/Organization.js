const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  plan: {
    type: String,
    enum: ['free', 'professional', 'enterprise'],
    default: 'free'
  },
  maxUsers: {
    type: Number,
    default: 5,
    min: 1
  },
  maxRepositories: {
    type: Number,
    default: 3,
    min: 1
  },
  settings: {
    allowSelfRegistration: {
      type: Boolean,
      default: false
    },
    requireEmailVerification: {
      type: Boolean,
      default: true
    },
    defaultUserRole: {
      type: String,
      enum: ['admin', 'developer', 'viewer'],
      default: 'developer'
    },
    scanSettings: {
      autoScan: {
        type: Boolean,
        default: true
      },
      scanOnPush: {
        type: Boolean,
        default: true
      },
      scanOnPullRequest: {
        type: Boolean,
        default: true
      },
      maxConcurrentScans: {
        type: Number,
        default: 3,
        min: 1,
        max: 10
      }
    },
    notificationSettings: {
      email: {
        enabled: {
          type: Boolean,
          default: true
        },
        recipients: [{
          type: String,
          validate: {
            validator: function(email) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: 'Invalid email address'
          }
        }]
      },
      slack: {
        enabled: {
          type: Boolean,
          default: false
        },
        webhookUrl: {
          type: String,
          default: null
        },
        channel: {
          type: String,
          default: '#code-reviews'
        }
      }
    }
  },
  billing: {
    customerId: {
      type: String,
      default: null
    },
    subscriptionId: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ['active', 'past_due', 'canceled', 'unpaid'],
      default: 'active'
    },
    currentPeriodStart: {
      type: Date,
      default: Date.now
    },
    currentPeriodEnd: {
      type: Date,
      default: function() {
        const end = new Date();
        end.setMonth(end.getMonth() + 1);
        return end;
      }
    }
  },
  usage: {
    users: {
      type: Number,
      default: 0
    },
    repositories: {
      type: Number,
      default: 0
    },
    scansThisMonth: {
      type: Number,
      default: 0
    },
    lastResetDate: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

// Index for better query performance
organizationSchema.index({ slug: 1 });
organizationSchema.index({ plan: 1 });

// Generate slug before saving
organizationSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Virtual for plan limits
organizationSchema.virtual('limits').get(function() {
  const limits = {
    free: {
      maxUsers: 5,
      maxRepositories: 3,
      maxScansPerMonth: 100,
      maxConcurrentScans: 1
    },
    professional: {
      maxUsers: 20,
      maxRepositories: 25,
      maxScansPerMonth: 1000,
      maxConcurrentScans: 3
    },
    enterprise: {
      maxUsers: 100,
      maxRepositories: 100,
      maxScansPerMonth: 10000,
      maxConcurrentScans: 10
    }
  };
  
  return limits[this.plan] || limits.free;
});

// Method to check if organization can add more users
organizationSchema.methods.canAddUser = function() {
  return this.usage.users < this.maxUsers;
};

// Method to check if organization can add more repositories
organizationSchema.methods.canAddRepository = function() {
  return this.usage.repositories < this.maxRepositories;
};

// Method to check if organization can perform more scans
organizationSchema.methods.canPerformScan = function() {
  const limits = this.limits;
  return this.usage.scansThisMonth < limits.maxScansPerMonth;
};

// Method to increment usage
organizationSchema.methods.incrementUsage = function(type, amount = 1) {
  if (type === 'users') {
    this.usage.users += amount;
  } else if (type === 'repositories') {
    this.usage.repositories += amount;
  } else if (type === 'scans') {
    this.usage.scansThisMonth += amount;
  }
  
  return this.save();
};

// Method to decrement usage
organizationSchema.methods.decrementUsage = function(type, amount = 1) {
  if (type === 'users') {
    this.usage.users = Math.max(0, this.usage.users - amount);
  } else if (type === 'repositories') {
    this.usage.repositories = Math.max(0, this.usage.repositories - amount);
  } else if (type === 'scans') {
    this.usage.scansThisMonth = Math.max(0, this.usage.scansThisMonth - amount);
  }
  
  return this.save();
};

// Static method to reset monthly usage
organizationSchema.statics.resetMonthlyUsage = async function() {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  await this.updateMany(
    { 'usage.lastResetDate': { $lt: firstDayOfMonth } },
    {
      $set: {
        'usage.scansThisMonth': 0,
        'usage.lastResetDate': now
      }
    }
  );
};

module.exports = mongoose.model('Organization', organizationSchema);
