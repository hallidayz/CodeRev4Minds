import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { analyticsData, dashboardData } from "@/data/dashboard-data";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UsersIcon,
} from "lucide-react";

export function Analytics() {
  const weeklyData = dashboardData.weeklyTrend.labels.map((label, index) => ({
    day: label,
    reviews: dashboardData.weeklyTrend.reviews[index],
    issues: dashboardData.weeklyTrend.issues[index],
  }));

  const issueTypeData = [
    { name: "Critical", value: 23, color: "hsl(var(--chart-1))" },
    { name: "Major", value: 45, color: "hsl(var(--chart-2))" },
    { name: "Minor", value: 67, color: "hsl(var(--chart-3))" },
    { name: "Info", value: 34, color: "hsl(var(--chart-4))" },
  ];

  const performanceData = [
    { metric: "Code Quality", current: 87, previous: 82 },
    { metric: "Review Speed", current: 92, previous: 88 },
    { metric: "Issue Resolution", current: 89, previous: 91 },
    { metric: "Team Efficiency", current: 94, previous: 89 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Analytics
        </h1>
        <p className="text-muted-foreground">
          Insights into your code review performance and team productivity
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Code Quality Score
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.codeQuality.score}/100
            </div>
            <p className="text-xs text-green-600">
              +{analyticsData.codeQuality.change}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Review Time
            </CardTitle>
            <ClockIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.reviewMetrics.averageTime}min
            </div>
            <p className="text-xs text-blue-600">
              -15% faster than industry avg
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              False Positives
            </CardTitle>
            <AlertTriangleIcon className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.reviewMetrics.falsePositives}%
            </div>
            <p className="text-xs text-green-600">
              Under 5% target threshold
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Issues Resolved
            </CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.reviewMetrics.resolved}%
            </div>
            <p className="text-xs text-green-600">
              +5% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Weekly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Review Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="aspect-[none] h-[300px]"
              config={{}}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <ChartTooltip />
                  <XAxis dataKey="day" />
                  <Line
                    type="monotone"
                    dataKey="reviews"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    radius={4}
                  />
                  <Line
                    type="monotone"
                    dataKey="issues"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    radius={4}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Issue Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Issue Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="aspect-[none] h-[300px]"
              config={{}}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip />
                  <Pie
                    data={issueTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {issueTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {issueTypeData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 text-sm"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>
            Performance Metrics Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="aspect-[none] h-[300px]"
            config={{}}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <ChartTooltip />
                <XAxis dataKey="metric" />
                <Bar
                  dataKey="current"
                  fill="hsl(var(--chart-1))"
                  radius={4}
                />
                <Bar
                  dataKey="previous"
                  fill="hsl(var(--chart-2))"
                  radius={4}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5" />
            Team Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.teamPerformance.map((member, index) => (
              <div
                key={member.name}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">
                      {member.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {member.reviews} reviews completed
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {member.accuracy}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    accuracy
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
