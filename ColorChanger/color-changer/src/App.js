import React, { useState } from 'react';
import './App.css';

function App() {
  const [color, setColor] = useState('#FFFFFF');

  const changeColor = () => {
    const newColor = getRandomColor();
    setColor(newColor);
  };

  const getRandomColor = () => {
    const colors = ['#F44336', '#9C27B0', '#2196F3', '#4CAF50', '#FFC107'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const style = {
    backgroundColor: color,
  };

  return (
    <div className="App" style={style}>
      <button onClick={changeColor}>Change Color</button>
    </div>
  );
}

export default App;
