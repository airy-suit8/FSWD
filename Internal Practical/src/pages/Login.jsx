import React, { useState } from 'react';

export default function Login({ onLogin, onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        
        onLogin(data.user);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 60px)',
      padding: '2rem',
      background: '#0a1115'
    }}>
      <div style={{
        background: '#0f172a',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(2,6,23,0.3)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#22c55e',
          marginBottom: '2rem',
          fontSize: '1.8rem',
          fontWeight: '700'
        }}>
          Login to The Portal
        </h2>
        
        {error && (
          <div style={{
            background: '#7f1d1d',
            color: '#fecaca',
            padding: '0.75rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            border: '1px solid #ef4444'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: '0.8rem',
              borderRadius: '12px',
            border: '2px solid #334155',
            background: '#0a1115',
              color: '#e2e8f0',
              fontSize: '1rem',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#22c55e'}
            onBlur={(e) => e.target.style.borderColor = '#334155'}
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              padding: '0.8rem',
              borderRadius: '12px',
            border: '2px solid #334155',
            background: '#0a1115',
              color: '#e2e8f0',
              fontSize: '1rem',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#22c55e'}
            onBlur={(e) => e.target.style.borderColor = '#334155'}
          />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', color: '#94a3b8' }}>
              <input type="checkbox" style={{ marginRight: '0.5rem' }} />
              Remember me
            </label>
            <span style={{ color: '#22c55e', fontWeight: '500' }}>
              Forgot password?
            </span>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? '#334155' : '#22c55e',
              color: '#e2e8f0',
              padding: '0.9rem',
              borderRadius: '12px',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              
              marginTop: '0.5rem',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => !loading && (e.target.style.background = '#16a34a')}
            onMouseOut={(e) => !loading && (e.target.style.background = '#22c55e')}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#94a3b8' }}>
          Don't have an account?{' '}
          <span
            onClick={() => onNavigate('register')}
            style={{ color: '#22c55e', fontWeight: '600', cursor: 'pointer' }}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}