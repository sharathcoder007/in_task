import React, { useRef, useEffect, useState } from 'react';
import { Monitor, Smartphone, RefreshCw, ExternalLink } from 'lucide-react';
import './LivePreview.css';

const LivePreview = ({ code, isLoading }) => {
  const iframeRef = useRef(null);
  const [viewMode, setViewMode] = useState('desktop');
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    if (iframeRef.current && code) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      
      iframeDoc.open();
      iframeDoc.write(code);
      iframeDoc.close();
    }
  }, [code]);

  const handleRefresh = () => {
    if (iframeRef.current && code) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      
      iframeDoc.open();
      iframeDoc.write(code);
      iframeDoc.close();
    }
  };

  const getViewModeStyles = () => {
    switch (viewMode) {
      case 'mobile':
        return { width: '375px', height: '667px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      default:
        return { width: '100%', height: '100%' };
    }
  };

  const getViewModeIcon = () => {
    switch (viewMode) {
      case 'mobile':
        return <Smartphone size={18} />;
      case 'tablet':
        return <Monitor size={18} />;
      default:
        return <Monitor size={18} />;
    }
  };

  if (!code) {
    return (
      <div className="live-preview">
        <div className="preview-header">
          <h3>🖥️ Live Preview</h3>
          <p>Your generated website will appear here</p>
        </div>
        <div className="preview-placeholder">
          <div className="placeholder-content">
            <Monitor size={64} />
            <h4>No Website Generated Yet</h4>
            <p>Start by describing what you want to build in the chat panel on the left.</p>
            <div className="placeholder-examples">
              <div className="example-item">
                <span>💡</span>
                <span>"build me a hello world website"</span>
              </div>
              <div className="example-item">
                <span>💡</span>
                <span>"create a modern landing page"</span>
              </div>
              <div className="example-item">
                <span>💡</span>
                <span>"make a portfolio website"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="live-preview">
      <div className="preview-header">
        <div className="header-left">
          <h3>🖥️ Live Preview</h3>
          <p>Real-time website preview</p>
        </div>
        <div className="header-controls">
          <div className="view-mode-toggle">
            <button
              className={`view-mode-btn ${viewMode === 'desktop' ? 'active' : ''}`}
              onClick={() => setViewMode('desktop')}
              title="Desktop View"
            >
              <Monitor size={16} />
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'tablet' ? 'active' : ''}`}
              onClick={() => setViewMode('tablet')}
              title="Tablet View"
            >
              <Monitor size={16} />
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'mobile' ? 'active' : ''}`}
              onClick={() => setViewMode('mobile')}
              title="Mobile View"
            >
              <Smartphone size={16} />
            </button>
          </div>
          <button
            className="refresh-btn"
            onClick={handleRefresh}
            title="Refresh Preview"
          >
            <RefreshCw size={16} />
          </button>
          <button
            className="code-toggle-btn"
            onClick={() => setShowCode(!showCode)}
            title={showCode ? 'Hide Code' : 'Show Code'}
          >
            {showCode ? 'Preview' : 'Code'}
          </button>
        </div>
      </div>
      
      <div className="preview-content">
        {showCode ? (
          <div className="code-display">
            <div className="code-header">
              <span>Generated HTML Code</span>
              <button
                className="copy-btn"
                onClick={() => navigator.clipboard.writeText(code)}
                title="Copy Code"
              >
                Copy
              </button>
            </div>
            <pre className="code-content">
              <code>{code}</code>
            </pre>
          </div>
        ) : (
          <div className="iframe-container" style={getViewModeStyles()}>
            <iframe
              ref={iframeRef}
              title="Generated Website Preview"
              className="preview-iframe"
              sandbox="allow-scripts allow-same-origin"
            />
            {isLoading && (
              <div className="loading-overlay">
                <div className="loading-spinner"></div>
                <span>Generating website...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;
