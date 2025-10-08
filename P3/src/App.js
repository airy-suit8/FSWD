import React, { useState, useEffect } from 'react';

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h1>Welcome to CHARUSAT!!!!</h1>
      <h2>It is {currentDateTime.toLocaleDateString()}</h2>
      <h2>It is {currentDateTime.toLocaleTimeString()}</h2>
    </div>
  );
}

export default App;