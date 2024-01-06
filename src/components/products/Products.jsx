import { createRef, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import productData from '../../../src/assets/data/products.json'
import '../../App.css'
import './Products.css'
import iconsMap from '../../assets/iconMap';
import { NavLink } from 'react-router-dom';

export default function Products() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [animationPhase, setAnimationPhase] = useState('initial');
  const containerRef = useRef(null);
  const selectedRef = useRef(null);
  const iconsContainerRef = useRef(null);
  const iconRefs = useRef({});

  useEffect(() => {
    if (selectedIcon && containerRef.current && selectedRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const selectedRect = selectedRef.current.getBoundingClientRect();
      const centerX = -(selectedRect.left - containerRect.left - selectedRect.width / 2);
      const centerY = -(selectedRect.top - containerRect.top - selectedRect.height / 2);

      selectedRef.current.style.transform = `translate(${centerX}px, ${centerY}px) scale(1.5)`;
    }
  }, [selectedIcon]);

  useEffect(() => {
    if (animationPhase === 'columnResizing') {
      const columnElement = document.querySelector('.column');
      const handleTransitionEnd = () => {
        setAnimationPhase('resetting');
        // Remove listener to prevent memory leaks
        columnElement.removeEventListener('transitionend', handleTransitionEnd);
      };
  
      columnElement.addEventListener('transitionend', handleTransitionEnd);
  
      return () => {
        columnElement.removeEventListener('transitionend', handleTransitionEnd);
      };
    }
  }, [animationPhase]);
  

  const handleIconClick = (iconData) => {
    setAnimationPhase('iconAnimating');
    const iconRef = iconRefs.current[iconData.name];
    if (iconsContainerRef.current && iconRef.current) {
      const containerRect = iconsContainerRef.current.getBoundingClientRect();
      const iconRect = iconRef.current.getBoundingClientRect();
  
      const centerX = (containerRect.width / 2) - (iconRect.width / 2) - iconRect.left + containerRect.left;
      const centerY = (containerRect.height / 2) - (iconRect.height / 2) - iconRect.top + containerRect.top;
  
      setSelectedIcon({ ...iconData, centerX, centerY });
    }
  };
  


  const handleReset = () => {
    setSelectedIcon(null);
    if (selectedRef.current) {
      selectedRef.current.style.transform = 'none';
    }
  };


  const iconVariants = {
    hidden: { scale: 0, opacity: 0, transition: { duration: .3 } },
    visible: { scale: 1, opacity: 1, transition: { duration: .3 } },
  };
  

  return (
    <div className='section-products'>
      <div className='row'>
        <motion.div
          className={`${selectedIcon ? 'shrink' : 'column left-column'}`}>
          <div className='icons-container' ref={iconsContainerRef}>
            {selectedIcon && <img className='reset-btn' onClick={handleReset} src="/icons/vertical-lines.svg" />}
            <div className={`${selectedIcon ? 'no-grid' : 'icons show-all'}`}>
              {
                productData.map((iconData) => {
                const IconComponent = iconsMap[iconData.id];
                const isSelected = selectedIcon && iconData.name === selectedIcon.name;
                if (!iconRefs.current[iconData.name]) {
                  iconRefs.current[iconData.name] = createRef();
                }

                  return (
                    <motion.div
                      onAnimationComplete={() => {
                        if (animationPhase === 'iconAnimating') {
                          setAnimationPhase('columnResizing');
                        }
                      }}
                      ref={iconRefs.current[iconData.name]}
                      key={iconData.name}
                      className={`icon ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleIconClick(iconData)}
                      variants={iconVariants}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.2 }}
                      animate={selectedIcon ? (isSelected ? {
                        x: selectedIcon.centerX,
                        y: selectedIcon.centerY,
                        scale: 1.5,
                        transition: { duration: 0.3 }
                      } : "hidden") : "visible"}
                      style={{ '--hover-color': iconData.color, '--selected-color': isSelected ? iconData.color : 'initial' }}
                    >
                      <IconComponent />
                    </motion.div>
                  );
                })
              }
            </div>
          </div>
        </motion.div>
        
        <motion.div
          onAnimationComplete={() => {
            if (animationPhase === 'iconAnimating') {
              setAnimationPhase('columnResizing');
            }
          }}
          className={`column ${animationPhase === 'columnResizing' ? 'right-column expanded' : 'right-column'}`}
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
                <p style={{ color: selectedIcon.contrastColor }} className='sub-text'>{selectedIcon.subText}</p>
                <div className="hr" style={{ border: `thin solid ${selectedIcon.contrastColor}` }} />
                <div className='links'>
                  <NavLink to={selectedIcon.productLink}>
                  <span style={{ color: selectedIcon.contrastColor }}>Shop</span>
                  </NavLink>
                  <NavLink to={selectedIcon.shopLink}>
                  <span style={{ color: selectedIcon.contrastColor }} >Visit {selectedIcon.name}</span>
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
