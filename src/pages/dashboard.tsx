import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "@/components/dashboard-stats";
import { dashboardData, repositories } from "@/data/dashboard-data";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  GitBranchIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "lucide-react";

export function Dashboard() {
  const recentActivity = [
    {
      id: 1,
      type: "review",
      message: "Code review completed for frontend-app",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      type: "issue",
      message: "12 new issues found in api-service",
      time: "15 minutes ago",
      status: "warning",
    },
    {
      id: 3,
      type: "scan",
      message: "Automated scan started for mobile-client",
      time: "1 hour ago",
      status: "info",
    },
    {
      id: 4,
      type: "resolved",
      message: "8 critical issues resolved in data-pipeline",
      time: "2 hours ago",
      status: "success",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "review":
        return (
          <CheckCircleIcon className="w-4 h-4 text-green-600" />
        );
      case "issue":
        return (
          <AlertCircleIcon className="w-4 h-4 text-yellow-600" />
        );
      case "scan":
        return (
          <ClockIcon className="w-4 h-4 text-blue-600" />
        );
      case "resolved":
        return (
          <CheckCircleIcon className="w-4 h-4 text-green-600" />
        );
      default:
        return (
          <GitBranchIcon className="w-4 h-4 text-gray-600" />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                >
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      {activity.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  to="/analytics"
                  className="flex items-center gap-2"
                >
                  View all activity
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              asChild
              className="w-full justify-start"
            >
              <Link to="/repositories">
                <GitBranchIcon className="w-4 h-4 mr-2" />
                Scan Repository
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="w-full justify-start"
            >
              <Link to="/analytics">
                <AlertCircleIcon className="w-4 h-4 mr-2" />
                View Issues
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="w-full justify-start"
            >
              <Link to="/settings">
                <CheckCircleIcon className="w-4 h-4 mr-2" />
                Configure Rules
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Repository Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Repository Overview</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link to="/repositories">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repositories.slice(0, 6).map((repo) => (
              <div
                key={repo.id}
                className="p-4 rounded-lg border bg-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium truncate">
                    {repo.name}
                  </h3>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      repo.status === "active"
                        ? "bg-green-500"
                        : repo.status === "scanning"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>{repo.language}</span>
                    <span>{repo.issues} issues</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coverage: {repo.coverage}%</span>
                    <span>{repo.pullRequests} PRs</span>
                  </div>
                  <div className="text-xs">
                    {repo.lastScan}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
