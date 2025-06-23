import React, { useState, useEffect } from "react";
import VocabList from "./components/VocabList";
import GenerateWords from "./components/GenerateWords";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [vocab, setVocab] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set initial theme based on user preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
    
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute("data-theme", !darkMode ? "dark" : "light");
  };

  const handleNewWords = (newWords) => {
    setVocab(prev => [...newWords, ...prev]);
  };

  return (
    <div className="App">
      <div className="background-design"></div>
      <header className="app-header">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "🌞" : "🌙"}
        </button>
        <h1>Vocab Training Pro</h1>
        <p>Expand your vocabulary with AI-generated words!</p>
      </header>
      
      <main>
        <div className="controls">
          <GenerateWords onNewWords={handleNewWords} />
        </div>
        <VocabList onVocabUpdate={setVocab} vocab={vocab} />
      </main>
    </div>
  );
}

export default App;
