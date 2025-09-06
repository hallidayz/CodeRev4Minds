import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { repositories } from "@/data/dashboard-data";
import {
  SearchIcon,
  GitBranchIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon,
  FilterIcon,
} from "lucide-react";

export function Repositories() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "scanning":
        return <Badge className="bg-yellow-100 text-yellow-800">Scanning</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-100 text-blue-800",
      Python: "bg-green-100 text-green-800",
      "React Native": "bg-purple-100 text-purple-800",
      Go: "bg-cyan-100 text-cyan-800",
      "Vue.js": "bg-emerald-100 text-emerald-800",
      "Node.js": "bg-yellow-100 text-yellow-800",
    };
    return colors[language] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Repositories</h1>
          <p className="text-muted-foreground">
            Manage and monitor your code repositories
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Repository
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search repositories..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <FilterIcon className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Repository Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {repositories.map((repo) => (
          <Card key={repo.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <GitBranchIcon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{repo.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {repo.lastScan}
                    </p>
                  </div>
                </div>
                {getStatusBadge(repo.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Language and Coverage */}
              <div className="flex items-center justify-between">
                <Badge className={getLanguageColor(repo.language)}>
                  {repo.language}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Coverage: {repo.coverage}%
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <AlertCircleIcon className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-lg font-semibold">{repo.issues}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Issues</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-lg font-semibold">{repo.pullRequests}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Pull Requests</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  Scan Now
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {repositories.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Repositories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {repositories.filter(r => r.status === "active").length}
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {repositories.filter(r => r.status === "scanning").length}
            </div>
            <div className="text-sm text-muted-foreground">Scanning</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600">
              {repositories.reduce((sum, r) => sum + r.issues, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Issues</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
