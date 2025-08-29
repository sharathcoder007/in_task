import React, { useState, useRef, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import LivePreview from './components/LivePreview';
import './App.css';

function App() {
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('auto');
  const [availableProviders, setAvailableProviders] = useState({});
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'system',
      message: 'Hello! I\'m your AI web development assistant. I can use either OpenAI or Gemini to generate websites. Choose your preferred provider or let me auto-select the best available option.'
    }
  ]);

  // Fetch available providers on component mount
  useEffect(() => {
    fetchAvailableProviders();
  }, []);

  const fetchAvailableProviders = async () => {
    try {
      const response = await fetch('/api/config');
      const data = await response.json();
      setAvailableProviders(data.availableProviders);
      if (data.defaultProvider) {
        setSelectedProvider(data.defaultProvider);
      }
    } catch (error) {
      console.error('Failed to fetch providers:', error);
    }
  };

  const handleGenerateWebsite = async (prompt) => {
    setIsLoading(true);
    
    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: prompt
    };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      const response = await fetch('/api/generate-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          provider: selectedProvider === 'auto' ? 'auto' : selectedProvider
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedCode(data.code);
        
        // Add AI response to chat with provider info
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          message: `I've created a website using ${data.provider.toUpperCase()} based on your request: "${prompt}". The website is now displayed in the preview panel on the right. You can continue to refine it by asking for changes!`
        };
        setChatHistory(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || 'Failed to generate website');
      }
    } catch (error) {
      console.error('Error:', error);
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        type: 'error',
        message: `Sorry, I encountered an error: ${error.message}. Please check your API key configuration.`
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderChange = (provider) => {
    setSelectedProvider(provider);
    const message = {
      id: Date.now(),
      type: 'system',
      message: `Switched to ${provider === 'auto' ? 'auto-selection' : provider.toUpperCase()} provider.`
    };
    setChatHistory(prev => [...prev, message]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🚀 Cloud IDE</h1>
          <p>AI-Powered Web Development</p>
        </div>
        <div className="provider-selector">
          <label htmlFor="provider-select">LLM Provider: </label>
          <select 
            id="provider-select"
            value={selectedProvider}
            onChange={(e) => handleProviderChange(e.target.value)}
            className="provider-dropdown"
          >
            <option value="auto">Auto (Best Available)</option>
            {availableProviders.gemini && <option value="gemini">Gemini</option>}
            {availableProviders.openai && <option value="openai">OpenAI</option>}
          </select>
        </div>
      </header>
      
      <main className="app-main">
        <div className="ide-container">
          <ChatInterface 
            onGenerateWebsite={handleGenerateWebsite}
            chatHistory={chatHistory}
            isLoading={isLoading}
            selectedProvider={selectedProvider}
          />
          <LivePreview 
            code={generatedCode}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;