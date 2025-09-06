import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUpIcon,
  DollarSignIcon,
  UsersIcon,
  TargetIcon,
} from "lucide-react";
import { codeReviewStats } from "@/data/code-review-stats";

export function StatsSection() {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(0)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const stats = [
    {
      icon: TrendingUpIcon,
      label: "Global Market Size",
      value: formatCurrency(codeReviewStats.problemStats.marketSize),
      subtitle: `Growing at ${codeReviewStats.problemStats.marketGrowthRate}% CAGR`,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: DollarSignIcon,
      label: "Revenue Opportunity",
      value: `${formatCurrency(codeReviewStats.revenueForecasts.minRevenue)} - ${formatCurrency(codeReviewStats.revenueForecasts.maxRevenue)}`,
      subtitle: "Serviceable Obtainable Market",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: UsersIcon,
      label: "Code Review Segment",
      value: formatCurrency(codeReviewStats.marketData.codeReviewSegment),
      subtitle: "Addressable market size",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: TargetIcon,
      label: "Target ARR",
      value: formatCurrency(codeReviewStats.revenueForecasts.targetARR),
      subtitle: `By year ${codeReviewStats.revenueForecasts.targetYear}`,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              Market Opportunity
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Massive Market, Proven Demand
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The code review automation market represents a significant
              opportunity in the rapidly expanding software development
              ecosystem.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center mb-4`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-sm font-medium text-slate-700 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-xs text-slate-500">
                      {stat.subtitle}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Key Insights */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Why Now? The Perfect Storm
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>
                      Developers lose{" "}
                      <strong>6.4 hours weekly</strong> on
                      manual code reviews
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>
                      Enterprises face{" "}
                      <strong>$2M annual productivity drains</strong>{" "}
                      from inefficient processes
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>
                      AI accuracy has reached{" "}
                      <strong>95%+ reliability</strong> for
                      code analysis
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>
                      DevOps adoption creates demand for{" "}
                      <strong>integrated automation</strong>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {codeReviewStats.marketData.ltvCacMin}:1 -{" "}
                    {codeReviewStats.marketData.ltvCacMax}:1
                  </div>
                  <div className="text-sm text-slate-600">LTV/CAC Ratio</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {codeReviewStats.marketData.targetMarketFit}
                  </div>
                  <div className="text-sm text-slate-600">Months to PMF</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    &lt;{codeReviewStats.keyMetrics.falsePositiveRate}%
                  </div>
                  <div className="text-sm text-slate-600">False Positives</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {codeReviewStats.keyMetrics.accuracyRate}%
                  </div>
                  <div className="text-sm text-slate-600">AI Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
