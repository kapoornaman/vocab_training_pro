import React, { useState, useEffect } from "react";
import VocabList from "./components/VocabList";
import GenerateWords from "./components/GenerateWords";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [vocab, setVocab] = useState([]);
  const [filteredVocab, setFilteredVocab] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWords: 0,
    recentWords: 0,
    todayWords: 0
  });

  useEffect(() => {
    // Set initial theme based on user preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
    
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    // Update stats when vocab changes
    const today = new Date().toDateString();
    const todayCount = vocab.filter(word => 
      new Date(word.created_at).toDateString() === today
    ).length;
    
    setStats({
      totalWords: vocab.length,
      recentWords: vocab.slice(0, 5).length,
      todayWords: todayCount
    });
  }, [vocab]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute("data-theme", !darkMode ? "dark" : "light");
  };

  const handleNewWords = (newWords) => {
    setVocab(prev => [...newWords, ...prev]);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredVocab(vocab);
      return;
    }
    
    const filtered = vocab.filter(word =>
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVocab(filtered);
  };

  useEffect(() => {
    setFilteredVocab(vocab);
  }, [vocab]);

  return (
    <div className="App">
      <div className="background-design"></div>
      <div className="floating-particles"></div>
      
      <header className="app-header">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "🌞" : "🌙"}
        </button>
        <div className="header-content">
          <h1>
            <span className="gradient-text">Vocab Training Pro</span>
            <span className="sparkle">✨</span>
          </h1>
          <p>Expand your vocabulary with AI-generated words!</p>
          
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">{stats.totalWords}</span>
              <span className="stat-label">Total Words</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.todayWords}</span>
              <span className="stat-label">Today</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.recentWords}</span>
              <span className="stat-label">Recent</span>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        <div className="controls-section">
          <div className="controls">
            <GenerateWords onNewWords={handleNewWords} />
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <VocabList 
          onVocabUpdate={setVocab} 
          vocab={filteredVocab} 
          loading={loading}
          setLoading={setLoading}
        />
      </main>
    </div>
  );
}

export default App;
