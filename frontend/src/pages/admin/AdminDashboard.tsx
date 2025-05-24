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
  const [error, setError] = useState<string | null>(null);  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Create an array to store our stats
        const statsData = [];
        
        console.log('AdminDashboard: Starting to fetch data...');
        
        // Fetch each data type and add its count to stats, with error handling for each
        const dataTypes = [
          { key: 'members', label: 'Team Members', icon: '👥', service: adminCmsService.getMembers },
          { key: 'projects', label: 'Projects', icon: '🏎️', service: adminCmsService.getProjects },
          { key: 'events', label: 'Events', icon: '📅', service: adminCmsService.getEvents },
          { key: 'sponsors', label: 'Sponsors', icon: '🤝', service: adminCmsService.getSponsors },
          { key: 'news', label: 'News Articles', icon: '📰', service: adminCmsService.getNews },
          { key: 'gallery', label: 'Gallery Items', icon: '🖼️', service: adminCmsService.getGallery }
        ];
        
        for (const dataType of dataTypes) {
          try {
            console.log(`AdminDashboard: Fetching ${dataType.key}...`);
            const data = await dataType.service();
            const count = Array.isArray(data) ? data.length : (data ? 1 : 0);
            statsData.push({ 
              label: dataType.label, 
              count: count, 
              icon: dataType.icon 
            });
            console.log(`AdminDashboard: Successfully loaded ${dataType.key} with ${count} items`);
          } catch (e) {
            console.error(`AdminDashboard: Error fetching ${dataType.key}:`, e);
            statsData.push({ 
              label: dataType.label, 
              count: 0, 
              icon: dataType.icon 
            });
          }
        }
        
        console.log('AdminDashboard: All data fetched, setting stats:', statsData);
        setStats(statsData);
        setLoading(false);
      } catch (err) {
        console.error('AdminDashboard: Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. The admin panel is running in demo mode.');
        setLoading(false);
        
        // Set default stats even in error case
        setStats([
          { label: 'Team Members', count: 0, icon: '👥' },
          { label: 'Projects', count: 0, icon: '🏎️' },
          { label: 'Events', count: 0, icon: '📅' },
          { label: 'Sponsors', count: 0, icon: '🤝' },
          { label: 'News Articles', count: 0, icon: '📰' },
          { label: 'Gallery Items', count: 0, icon: '🖼️' }
        ]);
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
