
import React from 'react';


export default function Navbar({ currentView, onNavigate, isAuthenticated, onLogout }) {
	return (
		<nav style={{
			width: '100%',
			background: '#0f172a',
			color: '#fff',
			padding: '0.75rem 2rem',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			boxShadow: '0 2px 8px rgba(2,6,23,0.25)'
		}}>
			<div 
				style={{ 
					fontWeight: 700, 
					fontSize: '1.3rem', 
					letterSpacing: '1px',
					cursor: 'pointer'
				}}
				onClick={() => onNavigate('home')}
			>
				OrgAuth Portal
			</div>
			<div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
				{!isAuthenticated ? (
					<>
						<span 
							onClick={() => onNavigate('home')} 
						style={{ 
							color: currentView === 'home' ? '#e2e8f0' : '#cbd5e1', 
								textDecoration: 'none', 
								fontWeight: currentView === 'home' ? 700 : 500,
								cursor: 'pointer',
								transition: 'color 0.3s'
							}}
						>
							Home
						</span>
						<span 
							onClick={() => onNavigate('login')} 
						style={{ 
							color: currentView === 'login' ? '#e2e8f0' : '#cbd5e1', 
								textDecoration: 'none', 
								fontWeight: currentView === 'login' ? 700 : 500,
								cursor: 'pointer',
								transition: 'color 0.3s'
							}}
						>
							Login
						</span>
						<span 
							onClick={() => onNavigate('register')} 
						style={{ 
							color: currentView === 'register' ? '#e2e8f0' : '#cbd5e1', 
								textDecoration: 'none', 
								fontWeight: currentView === 'register' ? 700 : 500,
								cursor: 'pointer',
								transition: 'color 0.3s'
							}}
						>
							Register
						</span>
					</>
				) : (
					<button
						onClick={onLogout}
						style={{
							background: 'transparent',
							color: '#22c55e',
							border: '1px solid #22c55e',
							padding: '0.5rem 1rem',
							borderRadius: '6px',
							cursor: 'pointer',
							fontWeight: '500',
							transition: 'all 0.3s'
						}}
						onMouseOver={(e) => {
							e.target.style.background = '#22c55e';
							e.target.style.color = '#0a1115';
						}}
						onMouseOut={(e) => {
							e.target.style.background = 'transparent';
							e.target.style.color = '#22c55e';
						}}
					>
						Logout
					</button>
				)}
			</div>
		</nav>
	);
}