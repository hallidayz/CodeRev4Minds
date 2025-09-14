/**
 * CodeRev4Minds - AI-Powered Code Review Automation Tool
 * 
 * PROPRIETARY SOFTWARE - AC MiNDS, LLC
 * Copyright (c) 2024 AC MiNDS, LLC. All rights reserved.
 * 
 * This software is proprietary and confidential. Unauthorized copying, 
 * distribution, or modification is strictly prohibited.
 * 
 * For licensing inquiries: legal@acminds.com
 * 
 * @file hero-section.tsx
 * @description Hero section component for landing page
 * @author AC MiNDS, LLC
 * @version 1.0.0
 */

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  TrendingUpIcon,
} from "lucide-react";
import { APP_CONFIG } from "@/config/app";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Stop Losing{" "}
            <span className="text-achievement-gold">6.4 Hours Weekly</span>{" "}
            on Manual Code Reviews
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered code review automation that catches more issues, reduces
            false positives to under 5%, and saves enterprises up to{" "}
            <strong className="text-slate-900 dark:text-white">$2M annually</strong>{" "}
            in productivity gains.
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center text-slate-700 dark:text-slate-300">
              <CheckCircleIcon className="w-5 h-5 text-strategic-forest mr-2" />
              <span className="font-medium">95% Accuracy Rate</span>
            </div>
            <div className="flex items-center text-slate-700 dark:text-slate-300">
              <ClockIcon className="w-5 h-5 text-achievement-gold mr-2" />
              <span className="font-medium">85% Time Reduction</span>
            </div>
            <div className="flex items-center text-slate-700 dark:text-slate-300">
              <TrendingUpIcon className="w-5 h-5 text-achievement-gold mr-2" />
              <span className="font-medium">40% Productivity Boost</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold bg-authority-navy hover:bg-achievement-gold text-white hover:text-authority-navy dark:bg-achievement-gold dark:hover:bg-authority-navy dark:text-authority-navy dark:hover:text-white transition-all duration-300"
              asChild
            >
              <a href="/signup">
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold border-authority-navy text-authority-navy hover:bg-authority-navy hover:text-white dark:border-achievement-gold dark:text-achievement-gold dark:hover:bg-achievement-gold dark:hover:text-authority-navy transition-all duration-300"
              asChild
            >
              <a href="/signup">
                Watch Demo
              </a>
            </Button>
          </div>

          {/* Social Proof */}
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
            Join engineering teams at leading companies who've eliminated manual
            review bottlenecks
          </p>

          {/* Company Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {APP_CONFIG.companyLogos.map((company) => (
              <div key={company} className="text-slate-400 dark:text-slate-500 font-semibold text-lg">
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
