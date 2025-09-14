import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  GithubIcon, 
  GitBranchIcon, 
  ExternalLinkIcon,
  CheckIcon,
  AlertCircleIcon,
  LoaderIcon,
  PlusIcon,
  EyeIcon,
  EyeOffIcon
} from "lucide-react";
import { repositoryService, Repository } from "@/services/repositoryService";

interface ProviderRepos {
  provider: 'github' | 'gitlab' | 'bitbucket';
  repositories: Repository[];
  isConnected: boolean;
  isLoading: boolean;
}

export function RepositoryConnect() {
  const [providers, setProviders] = useState<ProviderRepos[]>([
    { provider: 'github', repositories: [], isConnected: false, isLoading: false },
    { provider: 'gitlab', repositories: [], isConnected: false, isLoading: false },
    { provider: 'bitbucket', repositories: [], isConnected: false, isLoading: false },
  ]);
  
  const [selectedRepos, setSelectedRepos] = useState<Set<string>>(new Set());
  const [isConnecting, setIsConnecting] = useState(false);
  const [showToken, setShowToken] = useState<{ [key: string]: boolean }>({});
  const [tokens, setTokens] = useState<{ [key: string]: string }>({});

  const handleConnectProvider = async (provider: 'github' | 'gitlab' | 'bitbucket') => {
    const token = tokens[provider];
    if (!token) {
      alert('Please enter your access token');
      return;
    }

    try {
      const providerIndex = providers.findIndex(p => p.provider === provider);
      setProviders(prev => prev.map((p, index) => 
        index === providerIndex ? { ...p, isLoading: true } : p
      ));

      await repositoryService.connectProvider(provider, token);
      const repos = await repositoryService.getProviderRepositories(provider);

      setProviders(prev => prev.map((p, index) => 
        index === providerIndex 
          ? { ...p, repositories: repos, isConnected: true, isLoading: false }
          : p
      ));
    } catch (error) {
      console.error(`Failed to connect ${provider}:`, error);
      alert(`Failed to connect to ${provider}. Please check your token.`);
      
      setProviders(prev => prev.map(p => 
        p.provider === provider ? { ...p, isLoading: false } : p
      ));
    }
  };

  const handleDisconnectProvider = async (provider: 'github' | 'gitlab' | 'bitbucket') => {
    try {
      await repositoryService.disconnectProvider(provider);
      setProviders(prev => prev.map(p => 
        p.provider === provider 
          ? { ...p, repositories: [], isConnected: false }
          : p
      ));
      setSelectedRepos(prev => {
        const newSet = new Set(prev);
        providers
          .find(p => p.provider === provider)
          ?.repositories.forEach(repo => newSet.delete(repo.id));
        return newSet;
      });
    } catch (error) {
      console.error(`Failed to disconnect ${provider}:`, error);
    }
  };

  const handleSelectRepository = (repoId: string) => {
    setSelectedRepos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(repoId)) {
        newSet.delete(repoId);
      } else {
        newSet.add(repoId);
      }
      return newSet;
    });
  };

  const handleConnectRepositories = async () => {
    if (selectedRepos.size === 0) {
      alert('Please select at least one repository');
      return;
    }

    try {
      setIsConnecting(true);
      
      for (const repoId of selectedRepos) {
        const provider = providers.find(p => 
          p.repositories.some(r => r.id === repoId)
        );
        const repo = provider?.repositories.find(r => r.id === repoId);
        
        if (repo) {
          await repositoryService.addRepository({
            provider: repo.provider,
            fullName: repo.fullName,
            accessToken: tokens[repo.provider],
          });
        }
      }

      alert(`Successfully connected ${selectedRepos.size} repositories!`);
      setSelectedRepos(new Set());
    } catch (error) {
      console.error('Failed to connect repositories:', error);
      alert('Failed to connect some repositories. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'github': return <GithubIcon className="w-5 h-5" />;
      case 'gitlab': return <GitBranchIcon className="w-5 h-5" />;
      case 'bitbucket': return <GitBranchIcon className="w-5 h-5" />;
      default: return <GitBranchIcon className="w-5 h-5" />;
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'github': return 'bg-gray-900 hover:bg-gray-800';
      case 'gitlab': return 'bg-orange-600 hover:bg-orange-700';
      case 'bitbucket': return 'bg-blue-600 hover:bg-blue-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Connect Repositories
          </h1>
          <p className="text-slate-600">
            Connect your repositories from GitHub, GitLab, or Bitbucket to start automated code reviews
          </p>
        </div>

        {/* Provider Connections */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {providers.map((provider) => (
            <Card key={provider.provider}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getProviderIcon(provider.provider)}
                  {provider.provider.charAt(0).toUpperCase() + provider.provider.slice(1)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!provider.isConnected ? (
                  <>
                    <div>
                      <Label htmlFor={`token-${provider.provider}`}>
                        Access Token
                      </Label>
                      <div className="relative">
                        <Input
                          id={`token-${provider.provider}`}
                          type={showToken[provider.provider] ? "text" : "password"}
                          value={tokens[provider.provider] || ''}
                          onChange={(e) => setTokens(prev => ({
                            ...prev,
                            [provider.provider]: e.target.value
                          }))}
                          placeholder="Enter your access token"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowToken(prev => ({
                            ...prev,
                            [provider.provider]: !prev[provider.provider]
                          }))}
                        >
                          {showToken[provider.provider] ? (
                            <EyeOffIcon className="w-4 h-4" />
                          ) : (
                            <EyeIcon className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        <a
                          href={`https://${provider.provider}.com/settings/tokens`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Get your token here
                          <ExternalLinkIcon className="w-3 h-3 inline ml-1" />
                        </a>
                      </p>
                    </div>
                    <Button
                      onClick={() => handleConnectProvider(provider.provider)}
                      disabled={provider.isLoading || !tokens[provider.provider]}
                      className={`w-full ${getProviderColor(provider.provider)}`}
                    >
                      {provider.isLoading ? (
                        <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <PlusIcon className="w-4 h-4 mr-2" />
                      )}
                      Connect
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">Connected</span>
                    </div>
                    <div className="text-sm text-slate-600">
                      {provider.repositories.length} repositories available
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleDisconnectProvider(provider.provider)}
                      className="w-full"
                    >
                      Disconnect
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Repository Selection */}
        {providers.some(p => p.isConnected && p.repositories.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Select Repositories</span>
                <Badge variant="outline">
                  {selectedRepos.size} selected
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {providers
                  .filter(p => p.isConnected && p.repositories.length > 0)
                  .map((provider) => (
                    <div key={provider.provider}>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        {getProviderIcon(provider.provider)}
                        {provider.provider.charAt(0).toUpperCase() + provider.provider.slice(1)} Repositories
                      </h3>
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {provider.repositories.map((repo) => (
                          <div
                            key={repo.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedRepos.has(repo.id)
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                            onClick={() => handleSelectRepository(repo.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-slate-900 dark:text-white truncate">
                                  {repo.name}
                                </h4>
                                <p className="text-sm text-slate-600 truncate">
                                  {repo.fullName}
                                </p>
                                {repo.description && (
                                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                    {repo.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {repo.language}
                                  </Badge>
                                  {repo.private && (
                                    <Badge variant="outline" className="text-xs">
                                      Private
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              {selectedRepos.has(repo.id) && (
                                <CheckIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>

              {selectedRepos.size > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      {selectedRepos.size} repository{selectedRepos.size !== 1 ? 'ies' : ''} selected
                    </div>
                    <Button
                      onClick={handleConnectRepositories}
                      disabled={isConnecting}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isConnecting ? (
                        <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <PlusIcon className="w-4 h-4 mr-2" />
                      )}
                      Connect Selected Repositories
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircleIcon className="w-5 h-5 text-blue-600" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">Creating Access Tokens</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• GitHub: Go to Settings → Developer settings → Personal access tokens</li>
                  <li>• GitLab: Go to User Settings → Access Tokens</li>
                  <li>• Bitbucket: Go to Personal settings → App passwords</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">Required Permissions</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Repository read access</li>
                  <li>• Webhook creation (for automatic scans)</li>
                  <li>• Pull request access (for integration)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
