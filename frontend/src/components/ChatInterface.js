import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, Loader2 } from 'lucide-react';
import './ChatInterface.css';

const ChatInterface = ({ onGenerateWebsite, chatHistory, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onGenerateWebsite(inputValue.trim());
      setInputValue('');
    }
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'user':
        return <User size={16} />;
      case 'ai':
        return <Bot size={16} />;
      case 'system':
        return <Bot size={16} />;
      case 'error':
        return <AlertCircle size={16} />;
      default:
        return <Bot size={16} />;
    }
  };

  const getMessageClass = (type) => {
    switch (type) {
      case 'user':
        return 'message user-message';
      case 'ai':
        return 'message ai-message';
      case 'system':
        return 'message system-message';
      case 'error':
        return 'message error-message';
      default:
        return 'message';
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h3>💬 AI Assistant</h3>
        <p>Describe what you want to build</p>
      </div>
      
      <div className="chat-messages">
        {chatHistory.map((message) => (
          <div key={message.id} className={getMessageClass(message.type)}>
            <div className="message-icon">
              {getMessageIcon(message.type)}
            </div>
            <div className="message-content">
              <p>{message.message}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message ai-message">
            <div className="message-icon">
              <Bot size={16} />
            </div>
            <div className="message-content">
              <div className="loading-indicator">
                <Loader2 size={16} className="spinner" />
                <span>Generating your website...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>
      
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe the website you want to build..."
            disabled={isLoading}
            className="chat-input"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="send-button"
          >
            {isLoading ? (
              <Loader2 size={18} className="spinner" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
        <div className="input-hint">
          Try: "build me a hello world website" or "create a modern landing page"
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
