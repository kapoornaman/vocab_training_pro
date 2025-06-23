import React, { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function GenerateWords({ onNewWords }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`${API_URL}/api/vocab/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      
      if (!res.ok) throw new Error("Failed to generate words");
      
      const data = await res.json();
      onNewWords?.(data);
      setSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={handleGenerate} 
        disabled={loading}
        style={{ 
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {loading ? (
          <>
            <span style={{ opacity: loading ? 0 : 1 }}>Generate New Words</span>
            <span 
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'spin 1s linear infinite'
              }}
            >
              ⚡
            </span>
          </>
        ) : (
          <>
            <span>Generate New Words</span>
            {success && <span style={{ marginLeft: '8px' }}>✨</span>}
          </>
        )}
      </button>
      
      {error && (
        <div style={{ 
          color: 'var(--error)',
          fontSize: '0.9rem',
          marginTop: '8px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default GenerateWords; 