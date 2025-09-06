import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BrainIcon,
  ShieldCheckIcon,
  ZapIcon,
  GitBranchIcon,
  BarChart3Icon,
  SettingsIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "lucide-react";

export function FeaturesSection() {
  const mainFeatures = [
    {
      icon: BrainIcon,
      title: "Advanced AI Analysis",
      description:
        "Machine learning models trained on millions of code reviews detect patterns, vulnerabilities, and optimization opportunities with 95% accuracy.",
      benefits: [
        "Pattern recognition",
        "Vulnerability detection",
        "Performance optimization",
        "Code quality scoring",
      ],
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: ShieldCheckIcon,
      title: "Ultra-Low False Positives",
      description:
        "Proprietary algorithms reduce false positive rates to under 5%, ensuring your team focuses only on genuine issues that matter.",
      benefits: [
        "<5% false positives",
        "Contextual analysis",
        "Smart filtering",
        "Confidence scoring",
      ],
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: ZapIcon,
      title: "Lightning-Fast Reviews",
      description:
        "Automated analysis completes in seconds, not hours. Reduce review time by 85% while maintaining thorough code quality standards.",
      benefits: [
        "Instant feedback",
        "Parallel processing",
        "Real-time analysis",
        "Batch operations",
      ],
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const additionalFeatures = [
    {
      icon: GitBranchIcon,
      title: "Seamless Integration",
      description: "Works with your existing workflow",
      details: "GitHub, GitLab, Bitbucket, Jenkins",
    },
    {
      icon: BarChart3Icon,
      title: "Advanced Analytics",
      description: "Comprehensive insights and reporting",
      details: "Team performance, trend analysis",
    },
    {
      icon: SettingsIcon,
      title: "Custom Rules Engine",
      description: "Tailor analysis to your standards",
      details: "Custom rules, team preferences",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              AI-Powered Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Superior Technology, Proven Results
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our AI-powered platform delivers the accuracy and speed your
              engineering team needs to maintain high code quality without the
              manual overhead.
            </p>
          </div>

          {/* Main Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {mainFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader className="pb-4">
                    <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                      <IconComponent className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center text-sm text-slate-700">
                          <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-2">
                        {feature.description}
                      </p>
                      <p className="text-xs text-slate-500">
                        {feature.details}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Competitive Advantage */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Why Choose Us Over SonarQube & GitHub?
              </h3>
              <p className="text-xl opacity-90 mb-8">
                Superior integration, customization, and AI accuracy that adapts
                to your team's unique needs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">3x</div>
                  <div className="text-sm opacity-80">Faster Setup</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">50%</div>
                  <div className="text-sm opacity-80">Fewer False Positives</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-sm opacity-80">Custom Integration</div>
                </div>
              </div>

              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100"
              >
                See Detailed Comparison
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
