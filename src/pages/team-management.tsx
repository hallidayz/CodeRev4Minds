import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  UsersIcon, 
  UserPlusIcon, 
  MailIcon, 
  ShieldIcon,
  TrashIcon,
  XIcon
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'developer' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
  joinedAt: string;
  lastActiveAt: string;
  avatar?: string;
}

interface Invitation {
  id: string;
  email: string;
  role: 'admin' | 'developer' | 'viewer';
  status: 'pending' | 'accepted' | 'expired';
  sentAt: string;
  expiresAt: string;
}

export function TeamManagement() {
  const { user, organization, inviteUser } = useAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'developer' as 'admin' | 'developer' | 'viewer'
  });
  const [isInviting, setIsInviting] = useState(false);

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    try {
      setIsLoading(true);
      // Mock data - replace with actual API calls
      const mockMembers: TeamMember[] = [
        {
          id: '1',
          name: 'John Smith',
          email: 'john@company.com',
          role: 'admin',
          status: 'active',
          joinedAt: '2024-01-15',
          lastActiveAt: '2024-01-20',
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah@company.com',
          role: 'developer',
          status: 'active',
          joinedAt: '2024-01-10',
          lastActiveAt: '2024-01-19',
        },
        {
          id: '3',
          name: 'Mike Wilson',
          email: 'mike@company.com',
          role: 'developer',
          status: 'active',
          joinedAt: '2024-01-05',
          lastActiveAt: '2024-01-18',
        },
        {
          id: '4',
          name: 'Emily Davis',
          email: 'emily@company.com',
          role: 'viewer',
          status: 'pending',
          joinedAt: '2024-01-20',
          lastActiveAt: '2024-01-20',
        }
      ];

      const mockInvitations: Invitation[] = [
        {
          id: '1',
          email: 'newuser@company.com',
          role: 'developer',
          status: 'pending',
          sentAt: '2024-01-19',
          expiresAt: '2024-01-26',
        }
      ];

      setTeamMembers(mockMembers);
      setInvitations(mockInvitations);
    } catch (error) {
      console.error('Failed to load team data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteData.email || !inviteData.role) return;

    try {
      setIsInviting(true);
      await inviteUser(inviteData.email, inviteData.role);
      
      // Add to invitations list
      const newInvitation: Invitation = {
        id: Date.now().toString(),
        email: inviteData.email,
        role: inviteData.role,
        status: 'pending',
        sentAt: new Date().toISOString().split('T')[0],
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      };
      
      setInvitations(prev => [...prev, newInvitation]);
      setInviteData({ email: '', role: 'developer' });
      setShowInviteForm(false);
    } catch (error) {
      console.error('Failed to invite user:', error);
      alert('Failed to invite user. Please try again.');
    } finally {
      setIsInviting(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;
    
    try {
      // API call to remove member
      setTeamMembers(prev => prev.filter(member => member.id !== memberId));
    } catch (error) {
      console.error('Failed to remove member:', error);
    }
  };

  const handleCancelInvitation = async (invitationId: string) => {
    try {
      // API call to cancel invitation
      setInvitations(prev => prev.filter(invitation => invitation.id !== invitationId));
    } catch (error) {
      console.error('Failed to cancel invitation:', error);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'developer': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Team Management
              </h1>
              <p className="text-slate-600">
                Manage your team members and organization settings
              </p>
            </div>
            <Button
              onClick={() => setShowInviteForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <UserPlusIcon className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </div>
        </div>

        {/* Organization Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldIcon className="w-5 h-5 text-blue-600" />
              Organization Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-sm font-medium text-slate-600">Organization</Label>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {organization?.name || 'Your Organization'}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-600">Plan</Label>
                <p className="text-lg font-semibold text-slate-900 dark:text-white capitalize">
                  {organization?.plan || 'Professional'}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-600">Team Size</Label>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {teamMembers.length} / {organization?.maxUsers || 10} members
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invite Form */}
        {showInviteForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Invite New Team Member</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInviteUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={inviteData.email}
                      onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="user@company.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={inviteData.role}
                      onValueChange={(value: 'admin' | 'developer' | 'viewer') => 
                        setInviteData(prev => ({ ...prev, role: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Viewer</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={isInviting}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isInviting ? 'Sending...' : 'Send Invitation'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowInviteForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Pending Invitations */}
        {invitations.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MailIcon className="w-5 h-5 text-blue-600" />
                Pending Invitations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invitations.map((invitation) => (
                  <div
                    key={invitation.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{invitation.email}</p>
                        <p className="text-sm text-slate-600">
                          Invited {new Date(invitation.sentAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getRoleBadgeColor(invitation.role)}>
                        {invitation.role}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelInvitation(invitation.id)}
                    >
                      <XIcon className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5 text-blue-600" />
              Team Members ({teamMembers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-slate-900 dark:text-white">{member.name}</p>
                        {member.id === user?.id && (
                          <Badge className="bg-blue-100 text-blue-800">You</Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{member.email}</p>
                      <p className="text-xs text-slate-500">
                        Joined {new Date(member.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getRoleBadgeColor(member.role)}>
                      {member.role}
                    </Badge>
                    <Badge className={getStatusBadgeColor(member.status)}>
                      {member.status}
                    </Badge>
                    {member.id !== user?.id && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
