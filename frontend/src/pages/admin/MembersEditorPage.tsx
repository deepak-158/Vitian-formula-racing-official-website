import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import JsonEditor from '../../components/admin/JsonEditor';
import adminCmsService from '../../services/adminCmsService';
import { Member } from '../../services/dataService';

const adminPageStyles = {
  header: {
    marginBottom: '20px',
  },
  title: {
    color: '#1a1a1a', // Black text
    marginBottom: '5px',
  },
  description: {
    color: '#666',
    marginBottom: '20px',
  },
  loadingIndicator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px 0',
  },
  errorMessage: {
    color: '#c11212', // Red text
    padding: '20px',
    background: '#ffebee',
    borderRadius: '8px',
    marginBottom: '20px',
  },
};

const MembersEditorPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      setError('');
      const membersData = await adminCmsService.getMembers();
      setMembers(membersData);
    } catch (error) {
      console.error('Error loading members:', error);
      setError('Failed to load team members data. Please refresh the page and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMembers = async (data: Member[]): Promise<boolean> => {
    try {
      const success = await adminCmsService.saveMembers(data);
      if (success) {
        setMembers(data);
      }
      return success;
    } catch (error) {
      console.error('Error saving members:', error);
      return false;
    }
  };

  return (
    <AdminLayout>
      <div style={adminPageStyles.header}>
        <h1 style={adminPageStyles.title}>Manage Team Members</h1>
        <p style={adminPageStyles.description}>
          Edit the team members data in JSON format. You can download the updated JSON file after saving changes.
        </p>
      </div>

      {loading ? (
        <div style={adminPageStyles.loadingIndicator}>
          Loading team members data...
        </div>
      ) : error ? (
        <div style={adminPageStyles.errorMessage}>{error}</div>
      ) : (
        <JsonEditor
          title="Team Members JSON"
          data={members}
          onSave={handleSaveMembers}
          fileName="members.json"
        />
      )}
    </AdminLayout>
  );
};

export default MembersEditorPage;
