import React, { useState } from 'react';
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
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#1a1a1a', // Black text
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
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
  error: {
    color: '#c11212', // Red text
    marginTop: '20px',
    textAlign: 'center' as const,
  }
};

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [buttonHover, setButtonHover] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    const success = await login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.loginBox}>
        <div style={loginStyles.header}>
          <h1 style={loginStyles.title}>Racing Team CMS</h1>
          <p style={loginStyles.subtitle}>Content Management System</p>
        </div>
        
        <form style={loginStyles.form} onSubmit={handleSubmit}>
          <div style={loginStyles.inputGroup}>
            <label style={loginStyles.label} htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              style={loginStyles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          
          <div style={loginStyles.inputGroup}>
            <label style={loginStyles.label} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              style={loginStyles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="submit"
            style={{
              ...loginStyles.button,
              ...(buttonHover ? loginStyles.buttonHover : {})
            }}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            Login
          </button>
          
          {error && <p style={loginStyles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
