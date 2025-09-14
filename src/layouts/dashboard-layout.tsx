import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/contexts/ThemeContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-pure-foundation dark:bg-executive-depth">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with theme toggle */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-pure-foundation dark:bg-executive-depth">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
