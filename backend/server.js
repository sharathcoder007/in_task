const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize LLM providers
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key-here'
});

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'your-gemini-api-key-here');

// Store generated websites in memory (in production, use a database)
let generatedWebsites = new Map();

// Generate website endpoint
app.post('/api/generate-website', async (req, res) => {
  try {
    const { prompt, provider = 'auto' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Create a system message for the LLM
    const systemMessage = `You are a web developer. Generate COMPLETE, VALID HTML code for a website based on the user's description. 
    
    IMPORTANT REQUIREMENTS:
    1. Return ONLY valid HTML code - no explanations, no markdown
    2. Include ALL necessary HTML, CSS, and JavaScript in a single HTML file
    3. Use proper HTML5 structure with <!DOCTYPE html>, <html>, <head>, and <body> tags
    4. Include all CSS in <style> tags in the <head>
    5. Include all JavaScript in <script> tags before </body>
    6. Make it modern, responsive, and visually appealing
    7. Ensure the website is fully functional and self-contained
    
    Example structure:
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Website Title</title>
        <style>
            /* Your CSS here */
        </style>
    </head>
    <body>
        <!-- Your HTML content here -->
        <script>
            // Your JavaScript here
        </script>
    </body>
    </html>`;

    let generatedCode = '';
    let usedProvider = '';

    // Try to generate with the specified provider or fallback
    if (provider === 'gemini' || (provider === 'auto' && !process.env.OPENAI_API_KEY && process.env.GEMINI_API_KEY)) {
      // Use Gemini
      try {
        const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
          systemMessage,
          prompt
        ]);
        generatedCode = result.response.text();
        usedProvider = 'gemini';
      } catch (geminiError) {
        console.error('Gemini generation failed:', geminiError);
        if (provider === 'gemini') {
          throw geminiError; // If specifically requested, don't fallback
        }
      }
    }

    // Fallback to OpenAI if Gemini failed or wasn't used
    if (!generatedCode && process.env.OPENAI_API_KEY) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: prompt }
          ],
          max_tokens: 3000,
          temperature: 0.7,
        });
        generatedCode = completion.choices[0].message.content;
        usedProvider = 'openai';
      } catch (openaiError) {
        console.error('OpenAI generation failed:', openaiError);
        throw openaiError;
      }
    }

    if (!generatedCode) {
      throw new Error('No available LLM provider could generate the website');
    }
    
    // Clean up the generated code
    generatedCode = generatedCode.trim();
    
    // Ensure it starts with <!DOCTYPE html> or <html>
    if (!generatedCode.startsWith('<!DOCTYPE html') && !generatedCode.startsWith('<html')) {
      // Wrap in proper HTML structure if missing
      generatedCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="container">
        ${generatedCode}
    </div>
</body>
</html>`;
    }
    
    // Generate a unique ID for this website
    const websiteId = Date.now().toString();
    
    // Store the generated code
    generatedWebsites.set(websiteId, {
      id: websiteId,
      prompt: prompt,
      code: generatedCode,
      timestamp: new Date().toISOString(),
      provider: usedProvider
    });

    res.json({
      success: true,
      websiteId: websiteId,
      code: generatedCode,
      provider: usedProvider,
      message: 'Website generated successfully!'
    });

  } catch (error) {
    console.error('Error generating website:', error);
    res.status(500).json({ 
      error: 'Failed to generate website',
      details: error.message 
    });
  }
});


// Get generated website by ID
app.get('/api/website/:id', (req, res) => {
  const { id } = req.params;
  const website = generatedWebsites.get(id);
  
  if (!website) {
    return res.status(404).json({ error: 'Website not found' });
  }
  
  res.json(website);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    availableProviders: {
      openai: !!process.env.OPENAI_API_KEY,
      gemini: !!process.env.GEMINI_API_KEY
    }
  });
});

// Get current LLM configuration
app.get('/api/config', (req, res) => {
  res.json({
    availableProviders: {
      openai: !!process.env.OPENAI_API_KEY,
      gemini: !!process.env.GEMINI_API_KEY
    },
    defaultProvider: process.env.GEMINI_API_KEY ? 'gemini' : 'openai'
  });
});

// Test specific provider endpoint
app.post('/api/test-provider', async (req, res) => {
  try {
    const { provider } = req.body;
    
    if (provider === 'openai' && process.env.OPENAI_API_KEY) {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello" }],
        max_tokens: 10,
      });
      res.json({ success: true, provider: 'openai', message: 'OpenAI connection successful' });
    } else if (provider === 'gemini' && process.env.GEMINI_API_KEY) {
      const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent("Hello");
      const response = await result.response;
      res.json({ success: true, provider: 'gemini', message: 'Gemini connection successful' });
    } else {
      res.status(400).json({ error: `Provider ${provider} not available or not configured` });
    }
  } catch (error) {
    res.status(500).json({ error: `Provider test failed: ${error.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Available providers: OpenAI(${!!process.env.OPENAI_API_KEY}), Gemini(${!!process.env.GEMINI_API_KEY})`);
});