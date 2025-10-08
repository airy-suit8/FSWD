import React, { useState } from 'react';
import './App.css';

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        setResult(eval(expression).toString());
      } catch {
        setResult('Error');
      }
    } else if (value === 'DEL') {
      setExpression(expression.slice(0, -1));
    } else if (value === 'ClearAll') {
      setExpression('');
      setResult('');
    } else {
      setExpression(expression + value);
    }
  };

  const buttons = ['/', '*', '+', '-', 'DEL', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '=', 'ClearAll'];

  return (
    <div className="app">
      <div className="calculator">
        <div className="display">
          <small className="result">{result && `(${result})`}</small>
          <div className="expression">{expression || '0'}</div>
        </div>

        <div className="buttons">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => handleClick(btn)}
              className={btn === '=' ? 'button equal' : 
                       ['/', '*', '+', '-', 'DEL'].includes(btn) ? 'button operator' : 
                       'button'}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
