import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingLayout } from "@/layouts/landing-layout";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { Landing } from "@/pages/landing";
import { Login } from "@/pages/login";
import { Signup } from "@/pages/signup";
import { Dashboard } from "@/pages/dashboard";
import { Analytics } from "@/pages/analytics";
import { Repositories } from "@/pages/repositories";
import { Settings } from "@/pages/settings";

function App() {
  return (
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
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/analytics"
          element={
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          }
        />
        <Route
          path="/repositories"
          element={
            <DashboardLayout>
              <Repositories />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
