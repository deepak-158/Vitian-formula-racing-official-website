import React, { useState, useEffect } from 'react';
import { getJsonDownloadUrl } from '../../services/adminCmsService';

// JSON Editor Component Styles
const jsonEditorStyles = {
  container: {
    background: 'white',
    borderRadius: '8px',
    padding: '25px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    color: '#1a1a1a', // Black text
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  primaryButton: {
    background: '#c11212', // Red background
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  secondaryButton: {
    background: '#1a1a1a', // Black background
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  resetButton: {
    background: 'white',
    color: '#c11212', // Red text
    border: '1px solid #c11212',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  editor: {
    width: '100%',
    height: '500px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '14px',
    padding: '15px',
    lineHeight: 1.5,
  },
  footer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorMessage: {
    color: '#c11212', // Red text
    marginTop: '10px',
  },
  successMessage: {
    color: 'green',
    marginTop: '10px',
  },
  saveIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  saveStatus: {
    fontSize: '14px',
    color: '#666',
  },
};

interface JsonEditorProps {
  title: string;
  data: any;
  onSave: (data: any) => Promise<boolean>;
  fileName: string;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ title, data, onSave, fileName }) => {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [originalData, setOriginalData] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  // Initialize editor with formatted JSON
  useEffect(() => {
    if (data) {
      const formattedJson = JSON.stringify(data, null, 2);
      setJsonText(formattedJson);
      setOriginalData(formattedJson);
      
      // Create download URL
      setDownloadUrl(getJsonDownloadUrl(data));
    }
  }, [data]);

  // Reset to original data
  const handleReset = () => {
    setJsonText(originalData);
    setError('');
    setSuccessMessage('');
  };
  // Format JSON text
  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonText(formatted);
      setError('');
    } catch (error: any) {
      setError('Invalid JSON: ' + error.message);
    }
  };
  // Save changes
  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError('');
      setSuccessMessage('');
      
      // Parse JSON to validate it
      const parsedData = JSON.parse(jsonText);
      
      // Call the save function
      const success = await onSave(parsedData);
      
      if (success) {
        setSuccessMessage('Data saved successfully!');
        setOriginalData(jsonText);
        
        // Update download URL
        setDownloadUrl(getJsonDownloadUrl(parsedData));
      } else {
        setError('Failed to save data. Please try again.');
      }
    } catch (error: any) {
      setError('Invalid JSON: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };
  // Download JSON file
  const handleDownload = () => {
    try {
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName || 'data.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      setError('Error downloading file: ' + error.message);
    }
  };

  return (
    <div style={jsonEditorStyles.container}>
      <div style={jsonEditorStyles.header}>
        <h2 style={jsonEditorStyles.title}>{title}</h2>
        <div style={jsonEditorStyles.buttonGroup}>
          <button style={jsonEditorStyles.resetButton} onClick={handleReset}>
            Reset
          </button>
          <button style={jsonEditorStyles.secondaryButton} onClick={handleFormat}>
            Format JSON
          </button>
          <button style={jsonEditorStyles.secondaryButton} onClick={handleDownload}>
            Download JSON
          </button>
          <button 
            style={jsonEditorStyles.primaryButton} 
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
      
      <textarea
        style={jsonEditorStyles.editor}
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        spellCheck={false}
      />
      
      <div style={jsonEditorStyles.footer}>
        <div>
          {error && <div style={jsonEditorStyles.errorMessage}>{error}</div>}
          {successMessage && <div style={jsonEditorStyles.successMessage}>{successMessage}</div>}
        </div>
        <div style={jsonEditorStyles.saveIndicator}>
          {isSaving ? (
            <span style={jsonEditorStyles.saveStatus}>Saving...</span>
          ) : (
            originalData === jsonText ? (
              <span style={jsonEditorStyles.saveStatus}>No changes</span>
            ) : (
              <span style={jsonEditorStyles.saveStatus}>Unsaved changes</span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default JsonEditor;
