import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardData } from "@/data/dashboard-data";
import {
  TrendingUpIcon,
  ClockIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
} from "lucide-react";

export function DashboardStats() {
  const stats = [
    {
      title: "Total Reviews",
      value: dashboardData.stats.totalReviews.toLocaleString(),
      change: "+12%",
      changeType: "positive" as const,
      icon: TrendingUpIcon,
      description: "from last month",
    },
    {
      title: "Accuracy Rate",
      value: `${dashboardData.stats.accuracyRate}%`,
      change: "+2.1%",
      changeType: "positive" as const,
      icon: CheckCircleIcon,
      description: "from last month",
    },
    {
      title: "Time Saved",
      value: `${dashboardData.stats.timeSaved}hrs`,
      change: "per week",
      changeType: "neutral" as const,
      icon: ClockIcon,
      description: "per developer",
    },
    {
      title: "Issues Found",
      value: dashboardData.stats.issuesFound.toLocaleString(),
      change: "+8%",
      changeType: "positive" as const,
      icon: AlertTriangleIcon,
      description: "from last month",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <IconComponent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "negative"
                        ? "text-red-600"
                        : "text-muted-foreground"
                  }
                >
                  {stat.change}
                </span>{" "}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
