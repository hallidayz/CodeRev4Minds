export const codeReviewStats = {
  problemStats: {
    weeklyHoursLost: 6.4,
    annualProductivityDrain: 2000000,
    marketSize: 524000000000,
    marketGrowthRate: 10.1,
  },

  revenueForecasts: {
    minRevenue: 59000000,
    maxRevenue: 265000000,
    targetARR: 72500000,
    targetYear: 5,
  },

  pricing: {
    starter: {
      name: "Starter",
      price: 29,
      features: [
        "Up to 5 repositories",
        "Basic AI code analysis",
        "Standard integrations",
        "Email support",
        "Weekly reports",
      ],
      popular: false,
    },
    professional: {
      name: "Professional",
      price: 99,
      features: [
        "Up to 50 repositories",
        "Advanced AI analysis",
        "Custom rule sets",
        "Priority support",
        "Real-time notifications",
        "Advanced analytics",
      ],
      popular: true,
    },
    enterprise: {
      name: "Enterprise",
      price: 299,
      features: [
        "Unlimited repositories",
        "Custom AI training",
        "White-label solution",
        "Dedicated support",
        "Custom integrations",
        "Advanced security",
        "SLA guarantees",
      ],
      popular: false,
    },
  },

  marketData: {
    codeReviewSegment: 5300000000,
    ltvCacMin: 5.8,
    ltvCacMax: 8.3,
    targetMarketFit: 24, // months
  },

  keyMetrics: {
    falsePositiveRate: 5,
    accuracyRate: 95,
    timeReduction: 85,
    productivityIncrease: 40,
  },

  integrations: [
    {
      name: "GitHub",
      logo: "https://github.com/github.png",
      category: "Version Control",
    },
    {
      name: "GitLab",
      logo: "https://github.com/gitlab.png",
      category: "Version Control",
    },
    {
      name: "Bitbucket",
      logo: "https://github.com/atlassian.png",
      category: "Version Control",
    },
    {
      name: "Jenkins",
      logo: "https://github.com/jenkinsci.png",
      category: "CI/CD",
    },
    {
      name: "Docker",
      logo: "https://github.com/docker.png",
      category: "Containerization",
    },
    {
      name: "Kubernetes",
      logo: "https://github.com/kubernetes.png",
      category: "Orchestration",
    },
  ],

  testimonials: [
    {
      name: "Sarah Chen",
      role: "VP of Engineering",
      company: "TechFlow Inc",
      avatar: "https://github.com/yahyabedirhan.png",
      quote:
        "Our code review time dropped by 75% while catching 40% more issues. The ROI was immediate and substantial.",
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      company: "DataSync Solutions",
      avatar: "https://github.com/yusufhilmi.png",
      quote:
        "The AI suggestions are incredibly accurate. We've reduced our false positive rate to under 3% while maintaining thorough reviews.",
    },
    {
      name: "Emily Watson",
      role: "CTO",
      company: "CloudNative Corp",
      avatar: "https://github.com/kdrnp.png",
      quote:
        "Integration was seamless across our entire DevOps pipeline. The customization options are exactly what we needed.",
    },
  ],
};

export type CodeReviewStats = typeof codeReviewStats;
