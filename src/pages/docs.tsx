import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpenIcon, 
  CodeIcon, 
  ZapIcon, 
  ShieldIcon, 
  UsersIcon,
  ArrowRightIcon,
  CopyIcon,
  CheckIcon,
  GithubIcon,
  GitBranchIcon,
  SettingsIcon
} from "lucide-react";
import { useState } from "react";

export function Docs() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const apiEndpoints = [
    {
      method: "GET",
      endpoint: "/api/repositories",
      description: "Get all repositories for the authenticated user",
      example: `curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://api.coderev4minds.com/repositories`
    },
    {
      method: "POST",
      endpoint: "/api/repositories/scan",
      description: "Trigger a code review scan for a repository",
      example: `curl -X POST \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"repositoryId": "repo-123", "branch": "main"}' \\
  https://api.coderev4minds.com/repositories/scan`
    },
    {
      method: "GET",
      endpoint: "/api/reviews/{reviewId}",
      description: "Get detailed results of a code review",
      example: `curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://api.coderev4minds.com/reviews/review-456`
    },
    {
      method: "POST",
      endpoint: "/api/users/invite",
      description: "Invite a user to your organization",
      example: `curl -X POST \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@company.com", "role": "developer"}' \\
  https://api.coderev4minds.com/users/invite`
    }
  ];

  const integrationSteps = [
    {
      step: 1,
      title: "Install CLI Tool",
      description: "Install our command-line interface to get started",
      code: "npm install -g @code-rev-minds/cli"
    },
    {
      step: 2,
      title: "Authenticate",
      description: "Login with your Code Rev Minds account",
      code: "code-rev-minds login"
    },
    {
      step: 3,
      title: "Connect Repository",
      description: "Link your GitHub/GitLab repository",
      code: "code-rev-minds connect --repo owner/repo-name"
    },
    {
      step: 4,
      title: "Configure Rules",
      description: "Set up your custom review rules",
      code: "code-rev-minds rules --file .code-rev-minds.yml"
    },
    {
      step: 5,
      title: "Start Scanning",
      description: "Begin automated code reviews",
      code: "code-rev-minds scan --auto"
    }
  ];

  const webhookExamples = [
    {
      platform: "GitHub",
      description: "Automatically trigger reviews on pull requests",
      code: `{
  "action": "opened",
  "pull_request": {
    "number": 123,
    "head": {
      "ref": "feature/new-feature",
      "sha": "abc123"
    },
    "base": {
      "ref": "main"
    }
  },
  "repository": {
    "full_name": "owner/repo",
   "clone_url": "ttps://github.com/owner/repo.git"
  }
}`
    },
    {
      platform: "GitLab",
      description: "Trigger reviews on merge requests",
      code: `{
  "object_kind": "merge_request",
  "object_attributes": {
    "id": 123,
    "source_branch": "feature/new-feature",
    "target_branch": "main",
    "last_commit": {
      "id": "abc123"
    }
  },
  "project": {
    "name": "My Project",
    "git_http_url": "https://gitlab.com/owner/repo.git"
  }
}`
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpenIcon className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Documentation</h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to integrate Code Rev Minds into your development workflow
            </p>
          </div>

          {/* Quick Start */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ZapIcon className="w-5 h-5 text-blue-600" />
                Quick Start Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {integrationSteps.map((step) => (
                  <div key={step.step} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 mb-3">
                        {step.description}
                      </p>
                      <div className="relative">
                        <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                          <code>{step.code}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(step.code, `step-${step.step}`)}
                        >
                          {copiedCode === `step-${step.step}` ? (
                            <CheckIcon className="w-4 h-4" />
                          ) : (
                            <CopyIcon className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* API Reference */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CodeIcon className="w-5 h-5 text-blue-600" />
                API Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge 
                        className={
                          endpoint.method === "GET" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-slate-900 dark:text-white font-mono">
                        {endpoint.endpoint}
                      </code>
                    </div>
                    <p className="text-slate-600 mb-4">
                      {endpoint.description}
                    </p>
                    <div className="relative">
                      <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{endpoint.example}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(endpoint.example, `api-${index}`)}
                      >
                        {copiedCode === `api-${index}` ? (
                          <CheckIcon className="w-4 h-4" />
                        ) : (
                          <CopyIcon className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Webhook Integration */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranchIcon className="w-5 h-5 text-blue-600" />
                Webhook Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {webhookExamples.map((webhook, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-purple-100 text-purple-800">
                        {webhook.platform}
                      </Badge>
                      <span className="text-slate-600">
                        {webhook.description}
                      </span>
                    </div>
                    <div className="relative">
                      <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{webhook.code}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(webhook.code, `webhook-${index}`)}
                      >
                        {copiedCode === `webhook-${index}` ? (
                          <CheckIcon className="w-4 h-4" />
                        ) : (
                          <CopyIcon className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integration Guides */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GithubIcon className="w-5 h-5 text-blue-600" />
                  GitHub Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Connect your GitHub repositories and enable automated code reviews on every pull request.
                </p>
                <Button variant="outline" className="w-full">
                  View Guide
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldIcon className="w-5 h-5 text-blue-600" />
                  Security & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Learn about our security measures, data protection, and compliance certifications.
                </p>
                <Button variant="outline" className="w-full">
                  View Guide
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UsersIcon className="w-5 h-5 text-blue-600" />
                  Team Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Set up team permissions, manage user access, and configure organization settings.
                </p>
                <Button variant="outline" className="w-full">
                  View Guide
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Configuration Examples */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-blue-600" />
                Configuration Examples
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">.code-rev-minds.yml</h3>
                  <div className="relative">
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                      <code>{`# Code Rev Minds Configuration
repositories:
  - name: "frontend-app"
    path: "./src"
    languages: ["typescript", "javascript"]
    rules:
      - type: "security"
        severity: "high"
      - type: "performance"
        severity: "medium"
      - type: "code-quality"
        severity: "low"

notifications:
  slack:
    webhook: "https://hooks.slack.com/..."
  email:
    enabled: true
    recipients: ["team@company.com"]

scanning:
  auto_scan: true
  schedule: "on-push"
  exclude_patterns:
    - "node_modules/**"
    - "dist/**"
    - "*.test.ts"

team:
  default_role: "developer"
  require_approval: true
  max_reviewers: 2`}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard("config-example", "config")}
                    >
                      {copiedCode === "config" ? (
                        <CheckIcon className="w-4 h-4" />
                      ) : (
                        <CopyIcon className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Integration Guide */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CodeIcon className="w-5 h-5 text-blue-600" />
                Integration Guide
              </CardTitle>
              <CardDescription>
                Step-by-step instructions for integrating CodeRev with your development workflow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* GitHub Integration */}
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <GithubIcon className="w-5 h-5" />
                    GitHub Integration
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">1. Install CodeRev GitHub App</h4>
                      <p className="text-slate-600 mb-3">
                        Visit the GitHub Marketplace and install the CodeRev app to your organization or personal account.
                      </p>
                      <div className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>https://github.com/marketplace/coderev-minds</code>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">2. Configure Repository Access</h4>
                      <p className="text-slate-600 mb-3">
                        Grant CodeRev access to the repositories you want to analyze. You can select all repositories or specific ones.
                      </p>
                      <ul className="list-disc list-inside text-slate-600 space-y-1">
                        <li>Go to your repository Settings → Integrations → GitHub Apps</li>
                        <li>Find "CodeRev Minds" and click "Configure"</li>
                        <li>Select "All repositories" or choose specific repositories</li>
                        <li>Click "Save" to apply changes</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">3. Enable Code Reviews</h4>
                      <p className="text-slate-600 mb-3">
                        CodeRev will automatically start analyzing pull requests. No additional configuration required.
                      </p>
                    </div>
                  </div>
                </div>

                {/* GitLab Integration */}
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <CodeIcon className="w-5 h-5" />
                    GitLab Integration
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">1. Create Access Token</h4>
                      <p className="text-slate-600 mb-3">
                        Generate a personal access token with the required permissions.
                      </p>
                      <ul className="list-disc list-inside text-slate-600 space-y-1">
                        <li>Go to GitLab → User Settings → Access Tokens</li>
                        <li>Create a new token with these scopes: read_repository, read_api, read_user</li>
                        <li>Copy the generated token (you won't see it again)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">2. Add GitLab Integration</h4>
                      <p className="text-slate-600 mb-3">
                        Add your GitLab instance to CodeRev using the access token.
                      </p>
                      <div className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`curl -X POST https://api.coderev.com/integrations/gitlab \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My GitLab",
    "url": "https://gitlab.com",
    "access_token": "YOUR_GITLAB_TOKEN"
  }'`}</code>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">3. Configure Webhooks</h4>
                      <p className="text-slate-600 mb-3">
                        Set up webhooks to enable real-time analysis of merge requests.
                      </p>
                      <ul className="list-disc list-inside text-slate-600 space-y-1">
                        <li>Go to Project Settings → Integrations → Webhooks</li>
                        <li>Add webhook URL: https://api.coderev.com/webhooks/gitlab</li>
                        <li>Select triggers: Merge request events, Push events</li>
                        <li>Add secret token (provided in CodeRev dashboard)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bitbucket Integration */}
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <CodeIcon className="w-5 h-5" />
                    Bitbucket Integration
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">1. Create App Password</h4>
                      <p className="text-slate-600 mb-3">
                        Generate an app password with repository read permissions.
                      </p>
                      <ul className="list-disc list-inside text-slate-600 space-y-1">
                        <li>Go to Bitbucket → Personal settings → App passwords</li>
                        <li>Create new app password with "Repositories: Read" permission</li>
                        <li>Copy the generated password</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">2. Connect Bitbucket Workspace</h4>
                      <p className="text-slate-600 mb-3">
                        Add your Bitbucket workspace to CodeRev.
                      </p>
                      <div className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`curl -X POST https://api.coderev.com/integrations/bitbucket \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "workspace": "your-workspace",
    "username": "your-username",
    "app_password": "YOUR_APP_PASSWORD"
  }'`}</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CI/CD Integration */}
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <CodeIcon className="w-5 h-5" />
                    CI/CD Pipeline Integration
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">GitHub Actions</h4>
                      <div className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`name: CodeRev Analysis
on: [pull_request]

jobs:
  coderev:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run CodeRev Analysis
        uses: coderev/action@v1
        with:
          api-key: \${{ secrets.CODEREV_API_KEY }}
          fail-on-issues: false`}</code>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">GitLab CI</h4>
                      <div className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`coderev_analysis:
  stage: test
  image: coderev/analyzer:latest
  script:
    - coderev analyze --api-key $CODEREV_API_KEY
  only:
    - merge_requests`}</code>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">Jenkins Pipeline</h4>
                      <div className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{`pipeline {
  agent any
  stages {
    stage('CodeRev Analysis') {
      steps {
        sh 'docker run --rm -v $(pwd):/workspace coderev/analyzer:latest analyze --api-key $CODEREV_API_KEY'
      }
    }
  }
}`}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Need Help?
            </h2>
            <p className="text-slate-600 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Contact Support
              </Button>
              <Button variant="outline">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
