import { useState } from 'react'
import { motion } from 'framer-motion';
import productData from '../src/assets/data/products.json'
import './App.css'
import iconsMap from './assets/iconMap';

function App() {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    console.log('click icon');
  };

  const handleReset = () => {
    setSelectedIcon(null);
  };

  return (
    <main>
      <div className='row'>
        <motion.div
          className={`${selectedIcon ? 'shrink' : 'column left-column'}`}>
          <div className='icons-container'>
            {selectedIcon && <img className='reset-btn' onClick={handleReset} src="../public/icons/vertical-lines.svg" />}
            <div className={`${selectedIcon ? 'no-grid' : 'icons show-all'}`}>
              {
                productData.map((iconData) => {
                const IconComponent = iconsMap[iconData.id];
                const isSelected = selectedIcon && iconData.name === selectedIcon.name;
                  return (
                    <div
                      key={iconData.name}
                      className={`icon ${isSelected ? 'selected' : ''}`}
                      style={{ '--hover-color': iconData.color, '--selected-color': isSelected ? iconData.color : 'initial' }}
                      onClick={() => handleIconClick(iconData)}
                    >
                      <IconComponent />
                    </div>
                  );
                })
              }
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className={` ${selectedIcon ? 'column right-column expanded' : 'column right-column'}`}
          style={{ backgroundColor: selectedIcon ? selectedIcon.color : 'initial' }}
          animate={{ flex: selectedIcon ? '0 0 50%' : '0 0 33.3%' }}
        >
          <div
           style={{ 
            backgroundColor: selectedIcon?.color,
            opacity: .5
           }}
           className='background'></div>
          {
            selectedIcon ?
            (
              <div className='caption'>
                <h2 className='text'>{selectedIcon.name}</h2>
                <hr />
                <div className='links'>
                  <a href='#'>
                  <span style={{ transitionDelay: '0.3s' }}>Shop</span>
                  </a>
                  <a href='#'>
                  <span style={{ transitionDelay: '0.6s' }}>Visit {selectedIcon.name}</span>
                  </a>
                </div>
              </div>
            )
            :
            (
              <div className='caption'>
                <h2 className="vertical-text">
                  <span>P</span>
                  <span>r</span>
                  <span>o</span>
                  <span>d</span>
                  <span>u</span>
                  <span>c</span>
                  <span>t</span>
                  <span>s</span>
                </h2>
                <img src="../public/icons/vertical-lines.svg" />
              </div>
            )
          }
        </motion.div>
      </div>
    </main>
  )
}

export default App
