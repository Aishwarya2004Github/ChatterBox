import React, { useEffect } from 'react';
import './ButterflyBackground.css'; // Butterfly styles

const ButterflyBackground = () => {
  useEffect(() => {
    const container = document.querySelector('.butterfly-container');
    
    // Clear existing butterflies to prevent duplication
    container.innerHTML = '';

    // Create 100 butterflies
    for (let i = 0; i < 100; i++) {
      const butterfly = document.createElement('div');
      butterfly.classList.add('butterfly');

      // Randomize start position and movement direction
      butterfly.style.setProperty('--x-start', Math.random());
      butterfly.style.setProperty('--y-start', Math.random());
      butterfly.style.setProperty('--x-move', (Math.random() - 0.5) * 2); // Random movement between -1 and 1
      butterfly.style.setProperty('--y-move', (Math.random() - 0.5) * 2);

      container.appendChild(butterfly);
    }
  }, []);

  return <div className="butterfly-container"></div>;
};

export default ButterflyBackground;
