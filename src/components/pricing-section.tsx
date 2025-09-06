import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, StarIcon } from "lucide-react";
import { codeReviewStats } from "@/data/code-review-stats";

export function PricingSection() {
  const pricingTiers = Object.values(codeReviewStats.pricing);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              Simple Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Growth Plan
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Transparent pricing that scales with your team. Start free,
              upgrade when you're ready. All plans include our core AI-powered
              code review features.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                  tier.popular
                    ? "border-blue-500 shadow-lg scale-105"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1 flex items-center">
                      <StarIcon className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                    {tier.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-slate-900">
                      ${tier.price}
                    </span>
                    <span className="text-slate-600 ml-2">/month</span>
                  </div>
                  <p className="text-slate-600">
                    {tier.name === "Starter" &&
                      "Perfect for small teams getting started"}
                    {tier.name === "Professional" &&
                      "Ideal for growing engineering teams"}
                    {tier.name === "Enterprise" &&
                      "Complete solution for large organizations"}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      tier.popular
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-slate-900 hover:bg-slate-800"
                    }`}
                    size="lg"
                  >
                    {tier.name === "Enterprise"
                      ? "Contact Sales"
                      : "Start Free Trial"}
                  </Button>

                  {tier.name !== "Enterprise" && (
                    <p className="text-xs text-slate-500 text-center mt-3">
                      14-day free trial • No credit card required
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ROI Calculator */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Calculate Your ROI
                </h3>
                <p className="text-slate-600">
                  See how much your team can save with automated code reviews
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    6.4 hrs
                  </div>
                  <div className="text-sm text-slate-600 mb-2">
                    Weekly time saved per developer
                  </div>
                  <div className="text-xs text-slate-500">
                    Industry average manual review time
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    $2M
                  </div>
                  <div className="text-sm text-slate-600 mb-2">
                    Annual productivity gains
                  </div>
                  <div className="text-xs text-slate-500">
                    For enterprise teams (100+ developers)
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    3-6x
                  </div>
                  <div className="text-sm text-slate-600 mb-2">
                    Return on investment
                  </div>
                  <div className="text-xs text-slate-500">
                    Typical ROI within first year
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" size="lg" className="bg-white">
                  Get Custom ROI Analysis
                </Button>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
              Frequently Asked Questions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-lg p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Can I switch plans anytime?
                </h4>
                <p className="text-slate-600 text-sm">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes take effect immediately with prorated billing.
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  What's included in the free trial?
                </h4>
                <p className="text-slate-600 text-sm">
                  Full access to Professional features for 14 days. No credit
                  card required, no setup fees.
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Do you offer custom enterprise solutions?
                </h4>
                <p className="text-slate-600 text-sm">
                  Yes, we provide custom integrations, dedicated support, and
                  tailored AI training for enterprise clients.
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  How does the AI accuracy compare to manual reviews?
                </h4>
                <p className="text-slate-600 text-sm">
                  Our AI achieves 95% accuracy with less than 5% false positives,
                  often outperforming manual reviews in consistency and speed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
