import React, { useState } from 'react';

// Image Uploader Component Styles
const imageUploaderStyles = {
  container: {
    background: 'white',
    borderRadius: '8px',
    padding: '25px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px',
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
  uploadContainer: {
    border: '2px dashed #ddd',
    borderRadius: '8px',
    padding: '30px',
    textAlign: 'center' as const,
    marginBottom: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  uploadContainerDragOver: {
    border: '2px dashed #c11212', // Red border
    background: '#f9f9f9',
  },
  uploadIcon: {
    fontSize: '40px',
    marginBottom: '10px',
    color: '#c11212', // Red text
  },
  uploadText: {
    color: '#666',
    marginBottom: '15px',
  },
  browseButton: {
    background: '#c11212', // Red background
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'inline-block',
  },
  hiddenInput: {
    display: 'none',
  },
  imagePreviewContainer: {
    marginTop: '20px',
  },
  previewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '15px',
  },
  previewItem: {
    position: 'relative' as const,
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  previewImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover' as const,
  },
  previewOverlay: {
    position: 'absolute' as const,
    bottom: '0',
    left: '0',
    right: '0',
    padding: '8px',
    background: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeButton: {
    background: '#c11212', // Red background
    color: 'white',
    border: 'none',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  uploadProgressContainer: {
    marginTop: '15px',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '5px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#c11212', // Red background
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  progressText: {
    color: '#666',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  errorMessage: {
    color: '#c11212', // Red text
    marginTop: '10px',
  },
};

interface ImageUploaderProps {
  title: string;
  destination: string; // Destination folder path
  onUpload: (files: File[]) => Promise<string[]>;
  maxFiles?: number;
  acceptedTypes?: string; // e.g., 'image/png,image/jpeg'
}

interface PreviewFile {
  file: File;
  previewUrl: string;
  progress: number;
  uploaded: boolean;
  error?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  title,
  destination,
  onUpload,
  maxFiles = 10,
  acceptedTypes = 'image/png,image/jpeg,image/svg+xml,image/gif'
}) => {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };
  
  const handleDragLeave = () => {
    setDragOver(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (fileList: FileList) => {
    if (files.length + fileList.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} files at once.`);
      return;
    }
    
    setError('');
    
    const newFiles: PreviewFile[] = Array.from(fileList)
      .filter(file => acceptedTypes.includes(file.type))
      .map(file => ({
        file,
        previewUrl: URL.createObjectURL(file),
        progress: 0,
        uploaded: false
      }));
      
    if (newFiles.length !== fileList.length) {
      setError('Some files were not added because they are not of an accepted file type.');
    }
    
    setFiles(prev => [...prev, ...newFiles]);
  };
  
  const removeFile = (index: number) => {
    const newFiles = [...files];
    
    // Release the object URL to prevent memory leaks
    URL.revokeObjectURL(newFiles[index].previewUrl);
    
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  
  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please add files to upload.');
      return;
    }
    
    setUploading(true);
    setError('');
    
    try {
      // In a real implementation, you would upload each file and track progress
      // This is a simplified version for demonstration
      
      // Create a copy of files array to update progress
      const updatedFiles = [...files];
      
      // Simulate file upload progress
      for (let i = 0; i < updatedFiles.length; i++) {
        // Update progress to 50%
        updatedFiles[i] = { ...updatedFiles[i], progress: 50 };
        setFiles(updatedFiles.slice());
        
        // Wait a bit to simulate upload time
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Update progress to 100% and mark as uploaded
        updatedFiles[i] = { 
          ...updatedFiles[i], 
          progress: 100,
          uploaded: true 
        };
        setFiles(updatedFiles.slice());
      }
      
      // In a real implementation, you would call your API to upload the files
      const filesToUpload = files.map(f => f.file);
      await onUpload(filesToUpload);
      
    } catch (error) {
      setError('An error occurred while uploading files. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };
  
  const fileInputRef = React.createRef<HTMLInputElement>();
  
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div style={imageUploaderStyles.container}>
      <div style={imageUploaderStyles.header}>
        <h2 style={imageUploaderStyles.title}>{title}</h2>
      </div>
      
      <div 
        style={{
          ...imageUploaderStyles.uploadContainer,
          ...(dragOver ? imageUploaderStyles.uploadContainerDragOver : {})
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <div style={imageUploaderStyles.uploadIcon}>📁</div>
        <p style={imageUploaderStyles.uploadText}>
          Drag and drop your files here, or click to browse
        </p>
        <div style={imageUploaderStyles.browseButton}>
          Choose Files
        </div>
        <input
          ref={fileInputRef}
          type="file"
          style={imageUploaderStyles.hiddenInput}
          onChange={handleFileInput}
          multiple
          accept={acceptedTypes}
        />
      </div>
      
      {error && <div style={imageUploaderStyles.errorMessage}>{error}</div>}
      
      {files.length > 0 && (
        <div style={imageUploaderStyles.imagePreviewContainer}>
          <h3>Selected Files ({files.length})</h3>
          
          <div style={imageUploaderStyles.previewGrid}>
            {files.map((file, index) => (
              <div key={index} style={imageUploaderStyles.previewItem}>
                {file.file.type.startsWith('image/') ? (
                  <img 
                    src={file.previewUrl} 
                    alt={file.file.name}
                    style={imageUploaderStyles.previewImage}
                  />
                ) : (
                  <div style={{
                    ...imageUploaderStyles.previewImage,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f0f0f0'
                  }}>
                    {file.file.name.split('.').pop()?.toUpperCase()}
                  </div>
                )}
                
                <div style={imageUploaderStyles.previewOverlay}>
                  <span>{file.file.name.length > 15 
                    ? file.file.name.substring(0, 12) + '...' 
                    : file.file.name}
                  </span>
                  <button 
                    style={imageUploaderStyles.removeButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                  >
                    ×
                  </button>
                </div>
                
                {(uploading || file.progress > 0) && (
                  <div style={imageUploaderStyles.uploadProgressContainer}>
                    <div style={imageUploaderStyles.progressBar}>
                      <div 
                        style={{
                          ...imageUploaderStyles.progressFill,
                          width: `${file.progress}%`
                        }}
                      ></div>
                    </div>
                    <div style={imageUploaderStyles.progressText}>
                      <span>{file.uploaded ? 'Uploaded' : 'Uploading...'}</span>
                      <span>{file.progress}%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              style={{
                ...imageUploaderStyles.browseButton,
                opacity: uploading ? 0.7 : 1,
              }}
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload to ' + destination}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
