import React, { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function GenerateWords({ onNewWords }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setProgress(0);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const res = await fetch(`${API_URL}/api/vocab/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      
      if (!res.ok) throw new Error("Failed to generate words");
      
      const data = await res.json();
      
      // Complete progress
      setProgress(100);
      setTimeout(() => {
        onNewWords?.(data);
        setSuccess(true);
        setProgress(0);
        
        // Reset success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }, 300);
      
    } catch (err) {
      setError(err.message);
      setProgress(0);
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => setLoading(false), 300);
    }
  };

  return (
    <div className="generate-words-container">
      <button 
        onClick={handleGenerate} 
        disabled={loading}
        className={`generate-button ${loading ? 'loading' : ''} ${success ? 'success' : ''}`}
      >
        <div className="button-content">
          {loading ? (
            <>
              <div className="loading-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
              </div>
              <span className="button-text">Generating Amazing Words...</span>
            </>
          ) : (
            <>
              <span className="button-icon">🎯</span>
              <span className="button-text">Generate New Words</span>
              {success && <span className="success-icon">✨</span>}
            </>
          )}
        </div>
        
        {loading && (
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </button>
      
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="success-message">
          <span className="success-icon">🎉</span>
          <span>New words generated successfully!</span>
        </div>
      )}
    </div>
  );
}

export default GenerateWords; 