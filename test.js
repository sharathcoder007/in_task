const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001';

async function testBackend() {
  console.log('🧪 Testing Cloud IDE Backend...\n');

  try {
    // Test health check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/api/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test website generation (without API key for now)
    console.log('\n2. Testing website generation...');
    try {
      const generateResponse = await axios.post(`${API_BASE_URL}/api/generate-website`, {
        prompt: 'build me a hello world website'
      });
      console.log('✅ Website generation passed:', generateResponse.data.message);
    } catch (error) {
      if (error.response?.status === 500) {
        console.log('⚠️  Website generation failed (expected without API key):', error.response.data.error);
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    console.log('\n🎉 Backend tests completed!');
    console.log('\nTo run with full functionality:');
    console.log('1. Set your OpenAI API key in backend/.env');
    console.log('2. Restart the backend server');
    console.log('3. Run: npm run dev');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\nMake sure the backend server is running on port 3001');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testBackend();
}

module.exports = { testBackend };
