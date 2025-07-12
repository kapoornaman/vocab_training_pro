import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function VocabCard({ word, meaning, example, created_at, isNew }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`vocab-card ${isVisible ? 'visible' : ''} ${isFlipped ? 'flipped' : ''}`}
      onClick={handleCardClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-header">
            <h3 className="word-title">
              {word}
              {isNew && <span className="new-badge">✨ New</span>}
            </h3>
            <div className="card-meta">
              <span className="date-badge">{formatDate(created_at)}</span>
            </div>
          </div>
          
          <div className="card-content">
            <div className="meaning-section">
              <div className="section-label">Meaning</div>
              <p className="meaning-text">{meaning}</p>
            </div>
            
            <div className="flip-hint">
              <span>Click to see example</span>
              <span className="flip-icon">🔄</span>
            </div>
          </div>
        </div>
        
        <div className="card-back">
          <div className="card-header">
            <h3 className="word-title">{word}</h3>
            <button 
              className="flip-back-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
            >
              ← Back
            </button>
          </div>
          
          <div className="card-content">
            <div className="example-section">
              <div className="section-label">Example Usage</div>
              <p className="example-text">"{example}"</p>
            </div>
            
            <div className="pronunciation-section">
              <div className="section-label">Pronunciation</div>
              <p className="pronunciation-text">/{word}/</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="vocab-card skeleton-card">
      <div className="card-inner">
        <div className="card-front">
          <div className="card-header">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-badge"></div>
          </div>
          <div className="card-content">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text short"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VocabList({ onVocabUpdate, vocab: propVocab, loading, setLoading }) {
  const [error, setError] = useState(null);
  const [vocab, setVocab] = useState(propVocab || []);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (propVocab) {
      setVocab(propVocab);
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/vocab/all`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch vocabulary");
        return res.json();
      })
      .then((data) => {
        setVocab(data);
        onVocabUpdate?.(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [propVocab, onVocabUpdate, setLoading]);

  const sortedVocab = [...vocab].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.created_at) - new Date(a.created_at);
      case 'oldest':
        return new Date(a.created_at) - new Date(b.created_at);
      case 'alphabetical':
        return a.word.localeCompare(b.word);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="vocab-section">
        <div className="section-header">
          <h2>Loading Your Vocabulary...</h2>
        </div>
        <div className="vocab-list">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vocab-section">
        <div className="error-state">
          <div className="error-icon">😔</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!vocab.length) {
    return (
      <div className="vocab-section">
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>No vocabulary words yet</h3>
          <p>Generate your first set of words to start building your vocabulary!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vocab-section">
      <div className="section-header">
        <h2>Your Vocabulary Collection</h2>
        <div className="sort-controls">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>
      
      <div className="vocab-list">
        {sortedVocab.map((item, index) => (
          <VocabCard 
            key={item.id || item.word} 
            {...item} 
            isNew={index < 3}
          />
        ))}
      </div>
    </div>
  );
}

export default VocabList; 