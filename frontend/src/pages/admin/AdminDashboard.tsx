import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import adminCmsService from '../../services/adminCmsService';

const adminDashboardStyles = {
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  statCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
  },
  statCount: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#c11212', // Red text
    marginBottom: '5px',
  },
  statLabel: {
    color: '#1a1a1a', // Black text
    fontSize: '16px',
  },
  contentSection: {
    background: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px',
  },
  sectionTitle: {
    borderBottom: '2px solid #c11212', // Red border
    paddingBottom: '10px',
    marginBottom: '20px',
    color: '#1a1a1a', // Black text
    fontSize: '20px',
    fontWeight: 'bold',
  },
  dataTypeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
  },
  dataTypeCard: {
    background: '#f9f9f9',
    padding: '15px',
    borderRadius: '6px',
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    textDecoration: 'none',
    color: '#1a1a1a', // Black text
    transition: 'all 0.3s ease',
  },
  dataTypeCardHover: {
    background: '#f0f0f0',
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  dataTypeIcon: {
    fontSize: '30px',
    marginBottom: '10px',
    color: '#c11212', // Red text
  },
  dataTypeName: {
    fontWeight: 'bold',
  },
};

// Content types for the CMS with matching icons
const dataTypes = [
  { name: 'Team Members', path: '/admin/members', icon: '👥', dataKey: 'members' },
  { name: 'Projects', path: '/admin/projects', icon: '🏎️', dataKey: 'projects' },
  { name: 'Events', path: '/admin/events', icon: '📅', dataKey: 'events' },
  { name: 'Sponsors', path: '/admin/sponsors', icon: '🤝', dataKey: 'sponsors' },
  { name: 'News', path: '/admin/news', icon: '📰', dataKey: 'news' },
  { name: 'Gallery', path: '/admin/gallery', icon: '🖼️', dataKey: 'gallery' },
  { name: 'Achievements', path: '/admin/achievements', icon: '🏆', dataKey: 'achievements' },
  { name: 'Merchandise', path: '/admin/merchandise', icon: '👕', dataKey: 'merchandise' },
  { name: 'Racing Journey', path: '/admin/racing-journey', icon: '🛣️', dataKey: 'racing-journey' },
  { name: 'Team Info', path: '/admin/team-info', icon: 'ℹ️', dataKey: 'team-info' },
];

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<{ label: string; count: number; icon: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Create an array to store our stats
        const statsData = [];
        
        // Fetch each data type and add its count to stats
        const members = await adminCmsService.getMembers();
        statsData.push({ label: 'Team Members', count: members.length, icon: '👥' });
        
        const projects = await adminCmsService.getProjects();
        statsData.push({ label: 'Projects', count: projects.length, icon: '🏎️' });
        
        const events = await adminCmsService.getEvents();
        statsData.push({ label: 'Events', count: events.length, icon: '📅' });
        
        const sponsors = await adminCmsService.getSponsors();
        statsData.push({ label: 'Sponsors', count: sponsors.length, icon: '🤝' });
        
        // Add more items if you want to show more stats
        const news = await adminCmsService.getNews();
        statsData.push({ label: 'News Articles', count: news.length, icon: '📰' });
        
        const gallery = await adminCmsService.getGallery();
        statsData.push({ label: 'Gallery Items', count: gallery.length, icon: '🖼️' });
        
        setStats(statsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <h1>Dashboard</h1>
      
      {/* Statistics Section */}
      <div style={adminDashboardStyles.statsContainer}>
        {loading ? (
          <p>Loading statistics...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          stats.map((stat, index) => (
            <div key={index} style={adminDashboardStyles.statCard}>
              <div style={adminDashboardStyles.dataTypeIcon}>{stat.icon}</div>
              <div style={adminDashboardStyles.statCount}>{stat.count}</div>
              <div style={adminDashboardStyles.statLabel}>{stat.label}</div>
            </div>
          ))
        )}
      </div>
      
      {/* Manage Content Section */}
      <div style={adminDashboardStyles.contentSection}>
        <h2 style={adminDashboardStyles.sectionTitle}>Manage Content</h2>
        <div style={adminDashboardStyles.dataTypeGrid}>
          {dataTypes.map((dataType, index) => (
            <DataTypeCard key={index} {...dataType} />
          ))}
        </div>
      </div>
      
      {/* Quick Tips Section */}
      <div style={adminDashboardStyles.contentSection}>
        <h2 style={adminDashboardStyles.sectionTitle}>Quick Tips</h2>
        <ul>
          <li>Use the sidebar navigation to access different content sections</li>
          <li>You can download JSON data files after making changes</li>
          <li>Remember to upload images to the correct folders</li>
          <li>All changes are saved automatically</li>
        </ul>
      </div>
    </AdminLayout>
  );
};

// DataType Card Component with hover effect
const DataTypeCard: React.FC<{ name: string; path: string; icon: string; dataKey?: string }> = ({ name, path, icon }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <Link
      to={path}
      style={{
        ...adminDashboardStyles.dataTypeCard,
        ...(isHovered ? adminDashboardStyles.dataTypeCardHover : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={adminDashboardStyles.dataTypeIcon}>{icon}</div>
      <div style={adminDashboardStyles.dataTypeName}>{name}</div>
    </Link>
  );
};

export default AdminDashboard;
