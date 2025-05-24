// const jwt = require('jsonwebtoken'); // No longer needed since authentication is bypassed

exports.handler = async (event, context) => {
  // Allow preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: '',
    };
  }

  try {
    // Skip authentication - always return admin access
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: 'admin@racing.team',
          name: 'Admin User',
          roles: ['admin'],
          isAdmin: true
        }
      }),
    };

    /*
    // Original authentication code (commented out)
    // Get authorization header
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'No valid token provided' }),
      };
    }

    const token = authHeader.replace('Bearer ', '');

    // Verify JWT token using Netlify's public key
    // Note: In a real implementation, you would fetch Netlify's public key
    // For now, we'll do basic token validation
    let user;
    try {
      // Decode without verification for demo purposes
      // In production, you should verify the signature
      const decoded = jwt.decode(token);
      
      if (!decoded || !decoded.email) {
        throw new Error('Invalid token structure');
      }
      
      user = decoded;
    } catch (error) {
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Invalid token' }),
      };
    }

    // Check if user has admin privileges
    const isAdmin = checkAdminAccess(user);

    if (!isAdmin) {
      return {
        statusCode: 403,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          error: 'Insufficient privileges',
          message: 'Admin access required'
        }),
      };
    }

    // Return user info for valid admin
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: user.email,
          name: user.user_metadata?.full_name || user.email,
          roles: user.app_metadata?.roles || [],
          isAdmin: true
        }
      }),
    };
    */

  } catch (error) {
    console.error('Auth function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
    };
  }
};

// Check if user has admin access
function checkAdminAccess(user) {
  if (!user) return false;
  
  // Check app_metadata for admin role (set by Netlify admin)
  const roles = user.app_metadata?.roles || [];
  if (roles.includes('admin')) return true;
  
  // Check user_metadata for admin flag
  if (user.user_metadata?.admin === true) return true;
  
  // Check if user is in allowed admin emails list
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  if (adminEmails.includes(user.email)) return true;
  
  // For demo purposes, allow specific test emails
  const defaultAdminEmails = [
    'admin@example.com',
    'administrator@vitian.edu.in',
    'cms.admin@racing.team'
  ];
  
  if (defaultAdminEmails.includes(user.email)) return true;
  
  return false;
}