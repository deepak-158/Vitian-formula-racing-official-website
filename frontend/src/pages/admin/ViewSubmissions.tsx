import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This page is no longer needed since we're using Google Forms directly
// Redirecting to home page
const ViewSubmissions: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to home page
    navigate('/');
  }, [navigate]);

  return (
    <div className="container-custom py-16 text-center">
      <p>Redirecting to home page...</p>
    </div>
  );
};

export default ViewSubmissions; 