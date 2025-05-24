import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import EventsPage from './pages/EventsPage';
import SponsorsPage from './pages/SponsorsPage';
import GalleryPage from './pages/GalleryPage';
import MerchandisePage from './pages/MerchandisePage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import MembersEditorPage from './pages/admin/MembersEditorPage';
import EventsEditorPage from './pages/admin/EventsEditorPage';
import SponsorsEditorPage from './pages/admin/SponsorsEditorPage';
import NewsEditorPage from './pages/admin/NewsEditorPage';
import GalleryEditorPage from './pages/admin/GalleryEditorPage';
import AchievementsEditorPage from './pages/admin/AchievementsEditorPage';
import ProjectsEditorPage from './pages/admin/ProjectsEditorPage';
import MerchandiseEditorPage from './pages/admin/MerchandiseEditorPage';
import RacingJourneyEditorPage from './pages/admin/RacingJourneyEditorPage';
import TeamInfoEditorPage from './pages/admin/TeamInfoEditorPage';

// Common components and context
import LoadingSpinner from './components/common/LoadingSpinner';
import { LoadingProvider } from './context/LoadingContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { checkBackendConnection } from './services/api';

import './index.css';
import './App.css';

// Page transition component
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  if (isLoading) {
    return <LoadingSpinner fullPage size="md" />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  const [backendConnected, setBackendConnected] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkBackendConnection();
      setBackendConnected(isConnected);
    };

    checkConnection();
  }, []);

  if (!backendConnected) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Backend Connection Error</h1>
          <p className="mt-2">Unable to connect to the backend server.</p>
          <p>Please make sure the backend server is running.</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/merchandise" element={<MerchandisePage />} />
          {/* Admin routes */}
        <Route path="/admin/login" element={<Navigate to="/admin" replace />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/members" element={<MembersEditorPage />} />
          <Route path="/admin/events" element={<EventsEditorPage />} />
          <Route path="/admin/sponsors" element={<SponsorsEditorPage />} />
          <Route path="/admin/news" element={<NewsEditorPage />} />
          <Route path="/admin/gallery" element={<GalleryEditorPage />} />
          <Route path="/admin/achievements" element={<AchievementsEditorPage />} />
          <Route path="/admin/projects" element={<ProjectsEditorPage />} />
          <Route path="/admin/merchandise" element={<MerchandiseEditorPage />} />
          <Route path="/admin/racing-journey" element={<RacingJourneyEditorPage />} />
          <Route path="/admin/team-info" element={<TeamInfoEditorPage />} />
        </Route>
      </Routes>
    </PageTransition>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <LoadingProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </LoadingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
