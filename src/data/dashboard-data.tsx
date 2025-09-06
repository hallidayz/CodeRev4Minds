export const dashboardData = {
  stats: {
    totalReviews: 2847,
    accuracyRate: 95.2,
    timeSaved: 6.4,
    issuesFound: 1247,
  },
  weeklyTrend: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    reviews: [45, 52, 38, 67, 89, 23, 34],
    issues: [12, 15, 8, 18, 24, 6, 9],
  },
  recentActivity: [
    {
      id: 1,
      type: "review",
      message: "Code review completed for frontend-app",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      type: "issue",
      message: "12 new issues found in api-service",
      time: "15 minutes ago",
      status: "warning",
    },
    {
      id: 3,
      type: "scan",
      message: "Automated scan started for mobile-client",
      time: "1 hour ago",
      status: "info",
    },
    {
      id: 4,
      type: "resolved",
      message: "8 critical issues resolved in data-pipeline",
      time: "2 hours ago",
      status: "success",
    },
  ],
};

export const repositories = [
  {
    id: 1,
    name: "frontend-app",
    language: "TypeScript",
    status: "active",
    issues: 12,
    coverage: 87,
    pullRequests: 3,
    lastScan: "2 minutes ago",
  },
  {
    id: 2,
    name: "api-service",
    language: "Python",
    status: "scanning",
    issues: 8,
    coverage: 92,
    pullRequests: 1,
    lastScan: "15 minutes ago",
  },
  {
    id: 3,
    name: "mobile-client",
    language: "React Native",
    status: "active",
    issues: 5,
    coverage: 78,
    pullRequests: 2,
    lastScan: "1 hour ago",
  },
  {
    id: 4,
    name: "data-pipeline",
    language: "Go",
    status: "active",
    issues: 3,
    coverage: 95,
    pullRequests: 0,
    lastScan: "2 hours ago",
  },
  {
    id: 5,
    name: "admin-dashboard",
    language: "Vue.js",
    status: "inactive",
    issues: 15,
    coverage: 82,
    pullRequests: 4,
    lastScan: "1 day ago",
  },
  {
    id: 6,
    name: "microservice-auth",
    language: "Node.js",
    status: "active",
    issues: 7,
    coverage: 89,
    pullRequests: 1,
    lastScan: "3 hours ago",
  },
];

export const analyticsData = {
  codeQuality: {
    score: 87,
    change: 5.2,
  },
  reviewMetrics: {
    averageTime: 12,
    falsePositives: 3.8,
    resolved: 94,
  },
  teamPerformance: [
    {
      name: "Sarah Chen",
      avatar: "https://github.com/yahyabedirhan.png",
      reviews: 45,
      accuracy: 96,
    },
    {
      name: "Marcus Rodriguez",
      avatar: "https://github.com/yusufhilmi.png",
      reviews: 38,
      accuracy: 94,
    },
    {
      name: "Emily Watson",
      avatar: "https://github.com/kdrnp.png",
      reviews: 52,
      accuracy: 97,
    },
    {
      name: "David Kim",
      avatar: "https://github.com/vercel.png",
      reviews: 41,
      accuracy: 93,
    },
  ],
};
