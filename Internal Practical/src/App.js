import React, { useState } from 'react';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage, { Homepage } from './pages/HomePage';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  const renderContent = () => {
    if (isAuthenticated && currentView === 'dashboard') {
      return <Homepage user={user} onLogout={handleLogout} />;
    }

    switch (currentView) {
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={setCurrentView} />;
      case 'register':
        return <Register onNavigate={setCurrentView} />;
      default:
        return <HomePage onNavigate={setCurrentView} isAuthenticated={isAuthenticated} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {renderContent()}
    </div>
  );
}

export default App;
