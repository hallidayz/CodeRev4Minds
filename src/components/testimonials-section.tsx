import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon, QuoteIcon } from "lucide-react";
import { codeReviewStats } from "@/data/code-review-stats";

export function TestimonialsSection() {
  const testimonials = codeReviewStats.testimonials;

  const successMetrics = [
    {
      metric: "75%",
      description: "Average reduction in review time",
      company: "TechFlow Inc",
    },
    {
      metric: "40%",
      description: "More issues caught automatically",
      company: "DataSync Solutions",
    },
    {
      metric: "<3%",
      description: "False positive rate achieved",
      company: "CloudNative Corp",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              Customer Success
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Trusted by Engineering Leaders
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how leading engineering teams are transforming their code
              review process and achieving measurable productivity gains.
            </p>
          </div>

          {/* Success Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {successMetrics.map((item, index) => (
              <div
                key={index}
                className="text-center bg-slate-50 rounded-xl p-6"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {item.metric}
                </div>
                <div className="text-slate-700 font-medium mb-1">
                  {item.description}
                </div>
                <div className="text-sm text-slate-500">{item.company}</div>
              </div>
            ))}
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <QuoteIcon className="w-8 h-8 text-blue-500 opacity-50" />
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-slate-700 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-600">
                        {testimonial.role}
                      </div>
                      <div className="text-sm text-slate-500">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Case Study Highlight */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="bg-blue-100 text-blue-700 mb-4">
                  Case Study
                </Badge>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  TechFlow Inc: 75% Faster Reviews
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  A 200-developer team reduced their code review bottleneck from
                  2 days to 6 hours while catching 40% more critical issues. The
                  result? Faster deployments and higher code quality across all
                  projects.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700">
                      Reduced review time from 48 hours to 6 hours
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700">
                      Increased deployment frequency by 3x
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700">
                      Improved code quality scores by 25%
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    Before vs After Implementation
                  </h4>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Review Time</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500 line-through">48h</span>
                      <span className="text-green-600 font-semibold">6h</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Issues Caught</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500 line-through">60%</span>
                      <span className="text-green-600 font-semibold">84%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">False Positives</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500 line-through">15%</span>
                      <span className="text-green-600 font-semibold">2.8%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Developer Satisfaction</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500 line-through">6/10</span>
                      <span className="text-green-600 font-semibold">9/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-8">
              Trusted by Engineering Teams Worldwide
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
              <div className="text-slate-400 font-semibold">SOC 2 Certified</div>
              <div className="text-slate-400 font-semibold">GDPR Compliant</div>
              <div className="text-slate-400 font-semibold">99.9% Uptime SLA</div>
              <div className="text-slate-400 font-semibold">24/7 Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
