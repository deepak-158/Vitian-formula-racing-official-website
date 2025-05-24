import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { refreshData } from '../../utils/dataRefresh';

// Admin CSS styles
const adminStyles = {
  sidebar: {
    background: '#1a1a1a', // Black background
    color: 'white',
    minHeight: '100vh',
    padding: '20px 0',
    width: '250px',
  },
  sidebarLink: {
    color: 'white',
    padding: '12px 20px',
    display: 'block',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  activeSidebarLink: {
    backgroundColor: '#c11212', // Red background for active link
    color: 'white',
    padding: '12px 20px',
    display: 'block',
    textDecoration: 'none',
    fontWeight: 'bold',
  },  header: {
    background: '#c11212', // Red background
    color: 'white',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    background: 'white',
    color: '#c11212', // Red text
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  headerActions: {
    display: 'flex',
    gap: '10px',
  },
  content: {
    padding: '30px',
    flexGrow: 1,
  },  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column' as const,
  },
  mainArea: {
    display: 'flex',
    flexGrow: 1,
  },
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const [refreshing, setRefreshing] = useState(false);
  
  const handleLogout = () => {
    logout();
  };
  
  const handleRefreshData = async () => {
    setRefreshing(true);
    try {
      const success = await refreshData();
      if (success) {
        alert('Data refreshed successfully!');
      } else {
        alert('Failed to refresh data. Please try again.');
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
      alert('An error occurred while refreshing data.');
    } finally {
      setRefreshing(false);
    }
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
    return (
    <div style={adminStyles.wrapper}>
      {/* Header */}
      <header style={adminStyles.header}>
        <h1>Racing Team CMS</h1>
        <div style={adminStyles.headerActions}>          <button 
            style={{
              ...adminStyles.logoutButton, 
              background: '#1a1a1a',
              color: 'white',
              opacity: refreshing ? 0.7 : 1,
              cursor: refreshing ? 'not-allowed' : 'pointer'
            }}
            onClick={handleRefreshData}
            title="Refresh data files in public directory"
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
          <button 
            style={adminStyles.logoutButton}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
      
      {/* Main content area with sidebar */}
      <div style={adminStyles.mainArea}>
        {/* Sidebar navigation */}
        <aside style={adminStyles.sidebar}>
          <nav>
            <Link 
              to="/admin" 
              style={isActive('/admin') ? adminStyles.activeSidebarLink : adminStyles.sidebarLink}
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/members" 
              style={isActive('/admin/members') ? adminStyles.activeSidebarLink : adminStyles.sidebarLink}
            >
              Team Members
            </Link>
            <Link 
              to="/admin/projects" 
              style={isActive('/admin/projects') ? adminStyles.activeSidebarLink : adminStyles.sidebarLink}
            >
              Projects
            </Link>
            <Link 
              to="/admin/events" 
              style={isActive('/admin/events') ? adminStyles.activeSidebarLink : adminStyles.sidebarLink}
            >
              Events
            </Link>
            <Link 
              to="/admin/sponsors" 
              style={isActive('/admin/sponsors') ? adminStyles.activeSidebarLink : adminStyles.sidebarLink}
            >
              Sponsors
            </Link>
            <Link 
              to="/admin/news" 
              style={isActive('/admin/news') ? adminStyles.activeSidebarLink : adminStyles.sidebarLink}
            >
              News
            </Link>
            <Link 
              to="/admin/gallery" 
              style={isActive('/admin/gallery') ? adminStyles.activeSidebarLink : adminStyles.sidebarLink}
            >
              Gallery
            </Link>
            <Link 
              to="/admin/achievements" 
              style={isActive('/admin/achievements') ? adminStyles.activeSidebarLink : adminStyles.sidebarLink}
            >
              Achievements
            </Link>
            <Link 
              to="/admin/merchandise" 
              style={isActive('/admin/merchandise') ? adminStyles.activeSidebarLink : adminStyles.sidebarLink}
            >
              Merchandise
            </Link>
            <Link 
              to="/admin/racing-journey" 
              style={isActive('/admin/racing-journey') ? adminStyles.activeSidebarLink : adminStyles.sidebarLink}
            >
              Racing Journey
            </Link>
            <Link 
              to="/admin/team-info" 
              style={isActive('/admin/team-info') ? adminStyles.activeSidebarLink : adminStyles.sidebarLink}
            >
              Team Info
            </Link>
          </nav>
        </aside>
        
        {/* Main content */}
        <main style={adminStyles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
