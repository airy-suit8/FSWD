import React from 'react';

export default function HomePage({ onNavigate, isAuthenticated }) {
  if (isAuthenticated) {
    return null; 
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1115 0%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        textAlign: 'center',
        color: '#e2e8f0',
        maxWidth: '800px'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          letterSpacing: '2px'
        }}>
          OrgAuth Portal
        </h1>
        
        
        
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => onNavigate('login')}
            style={{
              background: '#22c55e',
              color: '#0a1115',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              
             
            }}
            
          >
            Login
          </button>
          
          <button
            onClick={() => onNavigate('register')}
            style={{
              background: 'transparent',
              color: '#e2e8f0',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              border: '2px solid #22c55e',
              fontSize: '1.1rem',
              fontWeight: '600',
         
              transition: 'background 0.3s, transform 0.3s'
            }}
           
          >
            Register
          </button>
        </div>
        
        <div style={{
          marginTop: '4rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          opacity: '0.8'
        }}>
          
        </div>
      </div>
    </div>
  );
}

// Dashboard component for authenticated users
export function Homepage({ user, onLogout }) {
  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: '#0a1115'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          background: '#0f172a',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(2,6,23,0.3)',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            color: '#22c55e',
            fontSize: '2.5rem',
            marginBottom: '1rem'
          }}>
            Welcome back, {user.fullName}!
          </h1>
          <p style={{
            color: '#cbd5e1',
            fontSize: '1.2rem',
            marginBottom: '2rem'
          }}>
            Department: {user.department} | Email: {user.email}
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: '#132031',
              color: '#e2e8f0',
              padding: '1.5rem',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginBottom: '1rem' ,alignContent: 'center'}}>this is my internal prctical exam webapp</h3>
              
            </div>
            
           
          </div>
          
          <button
            onClick={onLogout}
            style={{
              background: '#22c55e',
              color: '#0a1115',
              padding: '0.8rem 2rem',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
            
              marginTop: '2rem',
            
            }}
           
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}