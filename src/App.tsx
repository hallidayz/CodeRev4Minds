import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LandingLayout } from "@/layouts/landing-layout";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { Landing } from "@/pages/landing";
import { Login } from "@/pages/login";
import { Signup } from "@/pages/signup";
import { Docs } from "@/pages/docs";
import { Dashboard } from "@/pages/dashboard";
import { Analytics } from "@/pages/analytics";
import { Repositories } from "@/pages/repositories";
import { RepositoryConnect } from "@/pages/repository-connect";
import { TeamManagement } from "@/pages/team-management";
import { Settings } from "@/pages/settings";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing Page Routes */}
          <Route
            path="/"
            element={
              <LandingLayout>
                <Landing />
              </LandingLayout>
            }
          />
          <Route
            path="/docs"
            element={
              <LandingLayout>
                <Docs />
              </LandingLayout>
            }
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Analytics />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/repositories"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Repositories />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/repositories/connect"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <RepositoryConnect />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/team"
            element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <TeamManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
