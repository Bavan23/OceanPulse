import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import SplashScreen from "./pages/SplashScreen";
import AuthPage from "./pages/AuthPage";
import TermsPage from "./pages/TermsPage";
import CitizenDashboard from "./pages/CitizenDashboard";
import SubmitHazard from "./pages/SubmitHazard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMapView from "./pages/AdminMapView";
import AdminReports from "./pages/AdminReports";
import AdminSocial from "./pages/AdminSocial";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import AdminAnalytics from './pages/AdminAnalytics';

// Context
import { AuthProvider } from "./contexts/AuthContext";
import { OfflineProvider } from "./contexts/OfflineContext";
import { LoadingProvider } from "./contexts/LoadingContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <OfflineProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/terms" element={<TermsPage />} />
              
              {/* Citizen Routes */}
              <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
              <Route path="/citizen/submit" element={<SubmitHazard />} />
              <Route path="/citizen/profile" element={<ProfilePage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/map" element={<AdminMapView />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/social" element={<AdminSocial />} />
              <Route path="/admin/profile" element={<ProfilePage />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </OfflineProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;