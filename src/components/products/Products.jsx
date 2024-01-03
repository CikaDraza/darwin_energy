import { useState } from 'react'
import { motion } from 'framer-motion';
import productData from '../../../src/assets/data/products.json'
import '../../App.css'
import './Products.css'
import iconsMap from '../../assets/iconMap';
import { NavLink } from 'react-router-dom';

export default function Products() {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  const handleReset = () => {
    setSelectedIcon(null);
  };

  return (
    <div className='section-products'>
      <div className='row'>
        <motion.div
          className={`${selectedIcon ? 'shrink' : 'column left-column'}`}>
          <div className='icons-container'>
            {selectedIcon && <img className='reset-btn' onClick={handleReset} src="/icons/vertical-lines.svg" />}
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
                  <NavLink to={selectedIcon.productLink}>
                  <span>Shop</span>
                  </NavLink>
                  <NavLink to={selectedIcon.shopLink}>
                  <span>Visit {selectedIcon.name}</span>
                  </NavLink>
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
                <img src="/icons/vertical-lines.svg" />
              </div>
            )
          }
        </motion.div>
      </div>
    </div>
  )
}

