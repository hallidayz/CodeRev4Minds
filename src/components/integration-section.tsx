import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircleIcon,
  ArrowRightIcon,
  GitBranchIcon,
  SettingsIcon,
  ZapIcon,
} from "lucide-react";
import { codeReviewStats } from "@/data/code-review-stats";

export function IntegrationSection() {
  const integrationCategories = [
    {
      title: "Version Control",
      integrations: codeReviewStats.integrations.filter(
        (i) => i.category === "Version Control"
      ),
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "CI/CD",
      integrations: codeReviewStats.integrations.filter(
        (i) => i.category === "CI/CD"
      ),
      color: "bg-green-50 text-green-700",
    },
    {
      title: "DevOps Tools",
      integrations: codeReviewStats.integrations.filter(
        (i) =>
          i.category === "Containerization" || i.category === "Orchestration"
      ),
      color: "bg-purple-50 text-purple-700",
    },
  ];

  const workflowSteps = [
    {
      step: "1",
      title: "Code Commit",
      description: "Developer pushes code to repository",
      icon: GitBranchIcon,
    },
    {
      step: "2",
      title: "AI Analysis",
      description: "Automated review triggers instantly",
      icon: ZapIcon,
    },
    {
      step: "3",
      title: "Smart Feedback",
      description: "Contextual suggestions appear in PR",
      icon: SettingsIcon,
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              Seamless Integration
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Fits Into Your Existing Workflow
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              No disruption to your development process. Our AI integrates
              seamlessly with your favorite tools and adapts to your team's
              unique workflow patterns.
            </p>
          </div>

          {/* Integration Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {integrationCategories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Badge className={`${category.color} mb-3`}>
                      {category.title}
                    </Badge>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Native {category.title} Support
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {category.integrations.map((integration, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg"
                      >
                        <img
                          src={integration.logo}
                          alt={integration.name}
                          className="w-8 h-8 rounded"
                        />
                        <span className="font-medium text-slate-900">
                          {integration.name}
                        </span>
                        <CheckCircleIcon className="w-5 h-5 text-green-500 ml-auto" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Integrations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Workflow Visualization */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                How It Works in Your Workflow
              </h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Our AI seamlessly integrates into your existing development
                process, providing instant feedback without changing how your
                team works.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {workflowSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="text-center relative">
                    {index < workflowSteps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-slate-200 z-0" />
                    )}

                    <div className="relative z-10 bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                      <IconComponent className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    </div>

                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                      {step.title}
                    </h4>
                    <p className="text-slate-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Setup Process */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Quick Setup
              </Badge>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                5-Minute Setup, Lifetime Value
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Get started in minutes, not days. Our intelligent onboarding
                process automatically configures optimal settings for your
                codebase and team preferences.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Connect Repository
                    </h4>
                    <p className="text-sm text-slate-600">
                      One-click OAuth integration with your Git provider
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      AI Configuration
                    </h4>
                    <p className="text-sm text-slate-600">
                      Automatic analysis of your codebase patterns
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Team Onboarding
                    </h4>
                    <p className="text-sm text-slate-600">
                      Invite team members and set permissions
                    </p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Integration
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl p-8 text-white">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400">$ npm install @coderev4minds/cli</div>
                  <div className="text-slate-400 mt-2">
                    ✓ Installing dependencies...
                  </div>
                  <div className="text-slate-400">✓ Configuring AI models...</div>
                  <div className="text-slate-400">✓ Setting up webhooks...</div>
                  <div className="text-green-400 mt-2">
                    🚀 Ready to review code!
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold mb-2">3 minutes</div>
                <div className="text-sm opacity-80">Average setup time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
