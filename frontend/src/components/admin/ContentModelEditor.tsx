import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import JsonEditor from '../../components/admin/JsonEditor';
import ImageUploader from '../../components/admin/ImageUploader';
import adminCmsService from '../../services/adminCmsService';

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
  tabContainer: {
    display: 'flex',
    borderBottom: '1px solid #ddd',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#666',
    background: 'transparent',
    border: 'none',
    borderBottom: '3px solid transparent',
  },
  activeTab: {
    color: '#c11212', // Red text
    borderBottom: '3px solid #c11212', // Red border
  },
};

interface ContentEditorProps {
  title: string;
  dataType: string;
  description: string;
  imageFolder?: string;
  fetchData: () => Promise<any>;
  saveData: (data: any) => Promise<boolean>;
}

const ContentModelEditor: React.FC<ContentEditorProps> = ({
  title,
  dataType,
  description,
  imageFolder,
  fetchData,
  saveData,
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('json-editor');
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const contentData = await fetchData();
      setData(contentData);
    } catch (error) {
      console.error(`Error loading ${dataType}:`, error);
      setError(`Failed to load ${dataType} data. Please refresh the page and try again.`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSaveData = async (updatedData: any): Promise<boolean> => {
    try {
      const success = await saveData(updatedData);
      if (success) {
        setData(updatedData);
      }
      return success;
    } catch (error) {
      console.error(`Error saving ${dataType}:`, error);
      return false;
    }
  };
  
  const handleImageUpload = async (files: File[]): Promise<string[]> => {
    const uploadedPaths: string[] = [];
    
    // In a real implementation, this would upload to your server
    // For this demo, just log and return mock URLs
    for (const file of files) {
      console.log(`Would upload ${file.name} to ${imageFolder}`);
      // Mock a path that matches the structure in your project
      const path = `/images/${imageFolder}/${file.name}`;
      uploadedPaths.push(path);
    }
    
    return uploadedPaths;
  };
  
  return (
    <AdminLayout>
      <div style={adminPageStyles.header}>
        <h1 style={adminPageStyles.title}>{title}</h1>
        <p style={adminPageStyles.description}>{description}</p>
      </div>
      
      <div style={adminPageStyles.tabContainer}>
        <button 
          style={{
            ...adminPageStyles.tab,
            ...(activeTab === 'json-editor' ? adminPageStyles.activeTab : {})
          }}
          onClick={() => setActiveTab('json-editor')}
        >
          JSON Editor
        </button>
        {imageFolder && (
          <button 
            style={{
              ...adminPageStyles.tab,
              ...(activeTab === 'image-uploader' ? adminPageStyles.activeTab : {})
            }}
            onClick={() => setActiveTab('image-uploader')}
          >
            Image Uploader
          </button>
        )}
      </div>
      
      {loading ? (
        <div style={adminPageStyles.loadingIndicator}>
          Loading {dataType} data...
        </div>
      ) : error ? (
        <div style={adminPageStyles.errorMessage}>{error}</div>
      ) : (
        <>
          {activeTab === 'json-editor' && (
            <JsonEditor
              title={`${title} JSON`}
              data={data}
              onSave={handleSaveData}
              fileName={`${dataType}.json`}
            />
          )}
          
          {activeTab === 'image-uploader' && imageFolder && (
            <ImageUploader
              title={`Upload Images for ${title}`}
              destination={`/images/${imageFolder}/`}
              onUpload={handleImageUpload}
            />
          )}
        </>
      )}
    </AdminLayout>
  );
};

export default ContentModelEditor;
