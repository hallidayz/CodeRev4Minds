import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  TrendingUpIcon,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
            <TrendingUpIcon className="w-4 h-4 mr-2" />
            Trusted by 500+ Engineering Teams
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Stop Losing{" "}
            <span className="text-blue-600">6.4 Hours Weekly</span>{" "}
            on Manual Code Reviews
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered code review automation that catches more issues, reduces
            false positives to under 5%, and saves enterprises up to{" "}
            <strong className="text-slate-900">$2M annually</strong>{" "}
            in productivity gains.
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center text-slate-700">
              <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
              <span className="font-medium">95% Accuracy Rate</span>
            </div>
            <div className="flex items-center text-slate-700">
              <ClockIcon className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-medium">85% Time Reduction</span>
            </div>
            <div className="flex items-center text-slate-700">
              <TrendingUpIcon className="w-5 h-5 text-purple-500 mr-2" />
              <span className="font-medium">40% Productivity Boost</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="px-8 py-4 text-lg font-semibold">
              Start Free Trial
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <p className="text-sm text-slate-500 mb-8">
            Join engineering teams at leading companies who've eliminated manual
            review bottlenecks
          </p>

          {/* Company Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["TechFlow", "DataSync", "CloudNative", "DevOps Pro", "CodeFirst"].map((company) => (
              <div key={company} className="text-slate-400 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
