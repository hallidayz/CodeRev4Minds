import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon, ArrowRightIcon, StarIcon, ClockIcon, UsersIcon, ZapIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function Comparison() {
  const [selectedTab, setSelectedTab] = useState<'sonarqube' | 'github'>('sonarqube');

  const features = [
    {
      category: "Setup & Configuration",
      items: [
        {
          feature: "Setup Time",
          codeRev: "2 minutes",
          sonarQube: "2-4 hours",
          github: "30 minutes",
          codeRevAdvantage: true
        },
        {
          feature: "Configuration Required",
          codeRev: "Zero - AI learns from your codebase",
          sonarQube: "Extensive rules configuration",
          github: "Manual workflow setup",
          codeRevAdvantage: true
        },
        {
          feature: "Maintenance Overhead",
          codeRev: "None - fully automated",
          sonarQube: "High - constant rule updates",
          github: "Medium - workflow maintenance",
          codeRevAdvantage: true
        }
      ]
    },
    {
      category: "Code Analysis",
      items: [
        {
          feature: "False Positive Rate",
          codeRev: "< 5%",
          sonarQube: "15-25%",
          github: "20-30%",
          codeRevAdvantage: true
        },
        {
          feature: "Context Understanding",
          codeRev: "Full codebase context",
          sonarQube: "Rule-based only",
          github: "Pattern matching only",
          codeRevAdvantage: true
        },
        {
          feature: "Learning Capability",
          codeRev: "Continuously improves",
          sonarQube: "Static rules only",
          github: "No learning",
          codeRevAdvantage: true
        },
        {
          feature: "Custom Language Support",
          codeRev: "Any language via AI",
          sonarQube: "Limited to supported languages",
          github: "Basic language support",
          codeRevAdvantage: true
        }
      ]
    },
    {
      category: "Integration & Workflow",
      items: [
        {
          feature: "GitHub Integration",
          codeRev: "Native, seamless",
          sonarQube: "Requires webhooks & CI",
          github: "Native",
          codeRevAdvantage: false
        },
        {
          feature: "GitLab Integration",
          codeRev: "Native, seamless",
          sonarQube: "Requires webhooks & CI",
          github: "Not available",
          codeRevAdvantage: true
        },
        {
          feature: "Bitbucket Integration",
          codeRev: "Native, seamless",
          sonarQube: "Requires webhooks & CI",
          github: "Not available",
          codeRevAdvantage: true
        },
        {
          feature: "Real-time Analysis",
          codeRev: "Instant on every commit",
          sonarQube: "Batch processing only",
          github: "On PR creation only",
          codeRevAdvantage: true
        }
      ]
    },
    {
      category: "Cost & Value",
      items: [
        {
          feature: "Pricing Model",
          codeRev: "Per developer, transparent",
          sonarQube: "Per lines of code",
          github: "Per repository",
          codeRevAdvantage: true
        },
        {
          feature: "Hidden Costs",
          codeRev: "None",
          sonarQube: "Infrastructure, maintenance",
          github: "CI minutes, storage",
          codeRevAdvantage: true
        },
        {
          feature: "ROI Timeline",
          codeRev: "Immediate - saves 6.4 hours/week",
          sonarQube: "6-12 months",
          github: "3-6 months",
          codeRevAdvantage: true
        }
      ]
    }
  ];

  const getComparisonData = () => {
    if (selectedTab === 'sonarqube') {
      return {
        title: "CodeRev vs SonarQube",
        subtitle: "AI-Powered Intelligence vs Rule-Based Analysis",
        competitor: "SonarQube",
        competitorDescription: "Traditional static code analysis tool with extensive rule configuration",
        codeRevAdvantages: [
          "Zero configuration required",
          "95%+ accuracy with <5% false positives",
          "Learns from your specific codebase patterns",
          "Works with any programming language",
          "Real-time analysis on every commit",
          "No infrastructure maintenance required"
        ],
        competitorLimitations: [
          "Requires extensive rule configuration",
          "High false positive rate (15-25%)",
          "Limited to supported languages only",
          "Batch processing delays",
          "Constant maintenance overhead",
          "Complex infrastructure requirements"
        ]
      };
    } else {
      return {
        title: "CodeRev vs GitHub Code Scanning",
        subtitle: "AI-Powered Analysis vs Basic Pattern Matching",
        competitor: "GitHub Code Scanning",
        competitorDescription: "GitHub's built-in security and code quality scanning",
        codeRevAdvantages: [
          "Full codebase context understanding",
          "Custom language support via AI",
          "Continuous learning and improvement",
          "Works across all Git platforms",
          "Advanced code quality insights",
          "Dedicated support and training"
        ],
        competitorLimitations: [
          "Limited to GitHub repositories only",
          "Basic pattern matching only",
          "No learning capabilities",
          "Limited language support",
          "Basic code quality features",
          "No cross-platform support"
        ]
      };
    }
  };

  const comparisonData = getComparisonData();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-achievement-gold rounded-lg flex items-center justify-center">
              <ZapIcon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">{comparisonData.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {comparisonData.subtitle}
          </p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-muted rounded-lg p-1">
              <button
                onClick={() => setSelectedTab('sonarqube')}
                className={`px-6 py-2 rounded-md transition-all ${
                  selectedTab === 'sonarqube'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                vs SonarQube
              </button>
              <button
                onClick={() => setSelectedTab('github')}
                className={`px-6 py-2 rounded-md transition-all ${
                  selectedTab === 'github'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                vs GitHub
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-achievement-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">2 Minutes</h3>
              <p className="text-muted-foreground">Setup time vs hours for competitors</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-achievement-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">95%+</h3>
              <p className="text-muted-foreground">Accuracy vs 70-80% for competitors</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-achievement-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">6.4 Hours</h3>
              <p className="text-muted-foreground">Saved per developer weekly</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Comparison Table */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Detailed Feature Comparison
          </h2>
          
          {features.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {category.category}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-border rounded-lg">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                      <th className="text-center p-4 font-semibold text-achievement-gold">CodeRev</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground">
                        {comparisonData.competitor}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.items.map((item, itemIndex) => (
                      <tr key={itemIndex} className="border-t border-border">
                        <td className="p-4 font-medium text-foreground">
                          {item.feature}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-foreground">{item.codeRev}</span>
                            {item.codeRevAdvantage && (
                              <CheckIcon className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-center text-muted-foreground">
                          {selectedTab === 'sonarqube' ? item.sonarQube : item.github}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Advantages Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-achievement-gold flex items-center gap-2">
                <CheckIcon className="w-5 h-5" />
                Why Choose CodeRev
              </CardTitle>
              <CardDescription>
                {comparisonData.competitorDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {comparisonData.codeRevAdvantages.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{advantage}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <XIcon className="w-5 h-5" />
                {comparisonData.competitor} Limitations
              </CardTitle>
              <CardDescription>
                Common challenges with traditional tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {comparisonData.competitorLimitations.map((limitation, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XIcon className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{limitation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 500+ engineering teams who've made the switch to AI-powered code reviews
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-authority-navy hover:bg-achievement-gold text-white hover:text-authority-navy px-8 py-4 text-lg font-semibold transition-all duration-300" asChild>
              <Link to="/signup">
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-authority-navy text-authority-navy hover:bg-authority-navy hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300" asChild>
              <Link to="/docs">
                View Integration Guide
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
