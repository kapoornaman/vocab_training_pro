import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function VocabCard({ word, meaning, example }) {
  return (
    <div className="vocab-card">
      <h3>
        {word}
        <span className="tag">New</span>
      </h3>
      <p><strong>Meaning:</strong> {meaning}</p>
      <p><strong>Example:</strong> <em>{example}</em></p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="vocab-card">
      <div className="skeleton" style={{ height: "2rem", width: "60%", marginBottom: "1rem" }} />
      <div className="skeleton" style={{ height: "1rem", width: "100%", marginBottom: "0.5rem" }} />
      <div className="skeleton" style={{ height: "1rem", width: "90%" }} />
    </div>
  );
}

function VocabList({ onVocabUpdate, vocab: propVocab }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vocab, setVocab] = useState(propVocab || []);

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
  }, [propVocab, onVocabUpdate]);

  if (loading) {
    return (
      <div className="vocab-list">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "var(--error)", padding: "2rem" }}>
        Error: {error}
      </div>
    );
  }

  if (!vocab.length) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-secondary)" }}>
        No vocabulary words yet.
      </div>
    );
  }

  return (
    <div className="vocab-list">
      {vocab.map((item) => (
        <VocabCard key={item.id || item.word} {...item} />
      ))}
    </div>
  );
}

export default VocabList; 