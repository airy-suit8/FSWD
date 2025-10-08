import React, { useState } from 'react';

export default function Register({ onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          onNavigate('login');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
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
        maxWidth: '450px'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#22c55e',
          marginBottom: '2rem',
          fontSize: '1.8rem',
          fontWeight: '700'
        }}>
          Register for The Portal
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
        
        {success && (
          <div style={{
            background: '#064e3b',
            color: '#bbf7d0',
            padding: '0.75rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            border: '1px solid #34d399'
          }}>
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
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
            
          />
          
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
          
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            style={{
              padding: '0.8rem',
              borderRadius: '12px',
              border: '2px solid #334155',
              fontSize: '1rem',
              background: '#0a1115',
              color: '#e2e8f0'
            }}
          >
            <option value="">Select Department</option>
            <option value="cse">Computer Science and Engineering</option>
            <option value="it">Information Technology</option>
            <option value="ce">Computer Engineering</option>
            <option value="aiml">Artificial Intelligence</option>
            <option value="ee">Electrical Engineering</option>
            <option value="ec">Electronics and Engineering</option>
            <option value="me">Mechanical Engineering</option>
            

          </select>
          
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
          
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{
              padding: '0.8rem',
              borderRadius: '12px',
              border: '2px solid #334155',
              background: '#0b1220',
              color: '#e2e8f0',
              fontSize: '1rem',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#93c5fd'}
            onBlur={(e) => e.target.style.borderColor = '#334155'}
          />
          
          <button
            type="submit"
            style={{
              background: '#22c55e',
              color: '#0a1115',
              padding: '0.9rem',
              borderRadius: '12px',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
           
              marginTop: '0.5rem',
       
            }}
            
          >
            Register
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#94a3b8' }}>
          Already have an account?{' '}
          <span
            onClick={() => onNavigate('login')}
            style={{ color: '#22c55e', cursor: 'pointer', fontWeight: '600' }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}