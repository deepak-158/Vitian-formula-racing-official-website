import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const loginStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5f5f5',
  },
  loginBox: {
    width: '400px',
    padding: '30px',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '30px',
  },
  logo: {
    width: '120px',
    marginBottom: '15px',
  },
  title: {
    color: '#c11212', // Red text
    marginBottom: '5px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#1a1a1a', // Black text
    fontSize: '16px',
    marginBottom: '10px',
  },
  description: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  },
  button: {
    background: '#c11212', // Red background
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  buttonHover: {
    background: '#a30f0f', // Darker red on hover
  },
  secondaryButton: {
    background: '#1a1a1a', // Black background
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  adminNote: {
    background: '#f0f8ff',
    border: '1px solid #c11212',
    borderRadius: '4px',
    padding: '15px',
    marginTop: '20px',
    fontSize: '14px',
    color: '#1a1a1a',
  },
  adminNoteTitle: {
    fontWeight: 'bold',
    color: '#c11212',
    marginBottom: '8px',
  }
};

const LoginPage: React.FC = () => {
  const { login, signup, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already authenticated and is admin
    if (isAuthenticated && isAdmin) {
      navigate('/admin');
    } else if (isAuthenticated && !isAdmin) {
      // User is logged in but not admin - show access denied message
      alert('Access denied. You do not have administrative privileges.');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleLogin = () => {
    login(); // This opens the Netlify Identity modal
  };

  const handleSignup = () => {
    signup(); // This opens the Netlify Identity signup modal
  };

  // If user is authenticated but not admin, show access denied
  if (isAuthenticated && !isAdmin) {
    return (
      <div style={loginStyles.container}>
        <div style={loginStyles.loginBox}>
          <div style={loginStyles.header}>
            <h1 style={loginStyles.title}>Access Denied</h1>
            <p style={loginStyles.subtitle}>Administrative Privileges Required</p>
          </div>
          <div style={{...loginStyles.adminNote, borderColor: '#ff6b6b', background: '#ffe0e0'}}>
            <div style={{...loginStyles.adminNoteTitle, color: '#d63031'}}>Access Restricted</div>
            <p>You are logged in but do not have administrative privileges to access the CMS. Please contact an administrator to request access.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.loginBox}>
        <div style={loginStyles.header}>
          <h1 style={loginStyles.title}>Racing Team CMS</h1>
          <p style={loginStyles.subtitle}>Content Management System</p>
          <p style={loginStyles.description}>
            Secure admin access for managing team content, events, and data.
          </p>
        </div>
        
        <div style={loginStyles.buttonContainer}>
          <button
            style={loginStyles.button}
            onClick={handleLogin}
          >
            Login with Netlify Identity
          </button>
          
          <button
            style={loginStyles.secondaryButton}
            onClick={handleSignup}
          >
            Request Access (Signup)
          </button>
        </div>        <div style={loginStyles.adminNote}>
          <div style={loginStyles.adminNoteTitle}>Admin Access Only</div>
          <p>
            This CMS is restricted to authorized team administrators. 
            If you need access, please contact your team administrator to be added to the allowed users list.
          </p>
          <p>
            <strong>Note:</strong> New signups require manual approval by an administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
