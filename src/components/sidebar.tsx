import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboardIcon,
  GitBranchIcon,
  BarChart3Icon,
  SettingsIcon,
  LogOutIcon,
  BrainIcon,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Repositories",
    href: "/repositories",
    icon: GitBranchIcon,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3Icon,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BrainIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">CodeRev4Minds</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-left",
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src="https://github.com/yahyabedirhan.png"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              Sarah Chen
            </p>
            <p className="text-xs text-slate-400 truncate">
              sarah@techflow.com
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <LogOutIcon className="mr-3 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  );
}
