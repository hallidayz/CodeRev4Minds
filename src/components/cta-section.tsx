import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  ShieldIcon,
  ZapIcon,
} from "lucide-react";

export function CtaSection() {
  const benefits = [
    {
      icon: ClockIcon,
      text: "14-day free trial",
    },
    {
      icon: ShieldIcon,
      text: "No credit card required",
    },
    {
      icon: ZapIcon,
      text: "5-minute setup",
    },
    {
      icon: CheckCircleIcon,
      text: "Cancel anytime",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA */}
          <div className="text-center text-white mb-16">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 mb-6 px-4 py-2"
            >
              Ready to Transform Your Code Reviews?
            </Badge>

            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Stop Wasting 6.4 Hours Weekly on Manual Reviews
            </h2>

            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join 500+ engineering teams who've eliminated review bottlenecks
              and boosted productivity by 40% with AI-powered code analysis.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center text-white/90"
                  >
                    <IconComponent className="w-5 h-5 mr-2" />
                    <span className="font-medium">{benefit.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 px-8 py-4 text-lg font-semibold"
              >
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 dark:border-slate-300 dark:text-slate-300 dark:hover:bg-slate-300/10 px-8 py-4 text-lg font-semibold"
              >
                Schedule Demo
              </Button>
            </div>

            <p className="text-sm opacity-75">
              Trusted by engineering teams at TechFlow, DataSync, CloudNative,
              and 500+ more companies
            </p>
          </div>

          {/* Secondary CTAs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Email Signup */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Get ROI Calculator & Case Studies
                </h3>
                <p className="text-white/80 mb-6 text-sm">
                  Calculate your potential savings and see detailed success
                  stories from similar teams.
                </p>

                <div className="flex gap-3">
                  <Input
                    placeholder="Enter your work email"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                  <Button className="bg-white text-blue-600 hover:bg-slate-100 flex-shrink-0">
                    Send
                  </Button>
                </div>

                <p className="text-xs text-white/60 mt-3">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </CardContent>
            </Card>

            {/* Contact Sales */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Enterprise Solution Needed?
                </h3>
                <p className="text-white/80 mb-6 text-sm">
                  Custom integrations, dedicated support, and tailored AI
                  training for large teams.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-white/90 text-sm">
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    <span>Custom AI model training</span>
                  </div>
                  <div className="flex items-center text-white/90 text-sm">
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    <span>Dedicated customer success manager</span>
                  </div>
                  <div className="flex items-center text-white/90 text-sm">
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    <span>SLA guarantees & priority support</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white/10"
                >
                  Contact Sales Team
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Urgency/Scarcity */}
          <div className="mt-16 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center space-x-4 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-80">Teams onboarded</div>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">$2M</div>
                  <div className="text-sm opacity-80">Avg. annual savings</div>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm opacity-80">Customer satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  );
}
