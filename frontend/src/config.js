// API Configuration
export const API_BASE_URL = 'https://in-task-server.onrender.com';

// Environment-based configuration
export const config = {
  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL || API_BASE_URL,
    endpoints: {
      config: '/api/config',
      generateWebsite: '/api/generate-website',
      website: '/api/website',
      health: '/api/health',
      testProvider: '/api/test-provider'
    }
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  return `${config.api.baseUrl}${endpoint}`;
};
