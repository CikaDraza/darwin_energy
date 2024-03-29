import React, { createRef, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useMediaQuery from '../useMediaQuery/useMediaQuery';
import productData from '../../assets/data/products.json';
import iconsMap from '../../assets/iconMap';
import { NavLink } from 'react-router-dom';
import './SectionFourColumn.css'


export default function SectionFourColumn() {
  const [expandedColumn, setExpandedColumn] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [animationPhase, setAnimationPhase] = useState('initial');
  const match = useMediaQuery('(max-width: 680px)');
  const selectedRef = useRef(null);
  const iconsContainerRef = useRef(null);
  const iconRefs = useRef({});

  useEffect(() => {
    if (selectedIcon && iconsContainerRef.current && selectedRef.current) {
      const containerRect = iconsContainerRef.current.getBoundingClientRect();
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
  
      columnElement?.addEventListener('transitionend', handleTransitionEnd);
  
      return () => {
        columnElement?.removeEventListener('transitionend', handleTransitionEnd);
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

  const columnVariants = {
    initial: {
      flex: '0 0 25%',
      opacity: 1
    },
    expanded: {
      flex: '0 0 100%',
      opacity: 1,
      transition: { duration: 0.5 }
    },
    collapsed: {
      flex: '0 0 0%',
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const renderAdditionalContent = (column) => {
    let leftWidth, rightWidth, position, name;

    switch (column) {
      case 'People':
        leftWidth = '33.3%';
        rightWidth = '66.6%';
        position = 'left';
        name = 'people';
        break;
      case 'Products':
        leftWidth = '66.6%';
        rightWidth = '33.3%';
        position = 'right';
        name = 'products';
        break;
      case 'Finances':
        leftWidth = '33.3%';
        rightWidth = '66.6%';
        position = 'left';
        name = 'finances';
        break;
      case 'Systems':
        leftWidth = '66.6%';
        rightWidth = '33.3%';
        position = 'right';
        name = 'systems';
        break;
      default:
        leftWidth = rightWidth = '50%'; // default case
    }

  return (
    <div className='section-products'>
      <div className='row'>
        <motion.div className='columns' style={{ flex: `0 0 ${leftWidth}`, padding: name === 'products' ? 0 : 20 }} animate={{ flex: selectedIcon ? '0 0 50%' : `0 0 ${leftWidth}` }}>
          {
            position === 'right' && name === 'systems' || name === 'products' ?
            name === 'products' ?
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
            :
            <p>Content for {column}</p>
            :
            <div className='caption'>
              <h2 className="vertical-text">
              {
                match ? <span>{column}</span>
                :
                <div>
                  <span>{column.slice(0, 1)}</span>
                  <span>{column.slice(1, 2)}</span>
                  <span>{column.slice(2, 3)}</span>
                  <span>{column.slice(3, 4)}</span>
                  <span>{column.slice(4, 5)}</span>
                  <span>{column.slice(5, 6)}</span>
                  <span>{column.slice(6, 7)}</span>
                  <span>{column.slice(7, 8)}</span>
                </div>
              }
              </h2>
              <button className='reset-column' onClick={() => setExpandedColumn(null)}>
                <img src="/icons/vertical-lines.svg" />
              </button>
            </div>
          }
        </motion.div>
        <motion.div className='columns' style={{ flex: `0 0 ${rightWidth}`, padding: name === 'products' ? 0 : 20, '--border-left__color': selectedIcon ? 'transparent' : '#DBDBDB' }} animate={{ flex: selectedIcon ? '0 0 50%' : `0 0 ${rightWidth}` }}>
          {
            position === 'left' && name === 'people' || name === 'finances' ?
            <p>Content for {column}</p>
            :
            name === 'products' ?
            <motion.div
              onAnimationComplete={() => {
                if (animationPhase === 'iconAnimating') {
                  setAnimationPhase('columnResizing');
                }
              }}
              className={`column ${animationPhase === 'columnResizing' ? 'small-column expanded' : 'small-column'}`}
              style={{ backgroundColor: selectedIcon ? selectedIcon.color : 'initial', '--border__color': selectedIcon ? 'transparent' : '#DBDBDB' }}
            >
              {
                selectedIcon ?
                (
                  <div className={selectedIcon ? 'caption selected' : 'caption'}>
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
                    {
                      match ? <span>{column}</span>
                      :
                      <div>
                        <span>{column.slice(0, 1)}</span>
                        <span>{column.slice(1, 2)}</span>
                        <span>{column.slice(2, 3)}</span>
                        <span>{column.slice(3, 4)}</span>
                        <span>{column.slice(4, 5)}</span>
                        <span>{column.slice(5, 6)}</span>
                        <span>{column.slice(6, 7)}</span>
                        <span>{column.slice(7, 8)}</span>
                      </div>
                    }
                    </h2>
                    <button className='reset-column' onClick={() => setExpandedColumn(null)}>
                      <img src="/icons/vertical-lines.svg" />
                    </button>
                  </div>
                )
              }
            </motion.div>
            :
            <div>
                <div className='caption'>
                  <h2 className="vertical-text">
                  {
                    match ? <span>{column}</span>
                    :
                    <div>
                      <span>{column.slice(0, 1)}</span>
                      <span>{column.slice(1, 2)}</span>
                      <span>{column.slice(2, 3)}</span>
                      <span>{column.slice(3, 4)}</span>
                      <span>{column.slice(4, 5)}</span>
                      <span>{column.slice(5, 6)}</span>
                      <span>{column.slice(6, 7)}</span>
                      <span>{column.slice(7, 8)}</span>
                    </div>
                  }
                  </h2>
                  <button className='reset-column' onClick={() => setExpandedColumn(null)}>
                    <img src="/icons/vertical-lines.svg" />
                  </button>
                </div>
            </div>
          }
        </motion.div>
      </div>
    </div>
    );
  };

  return (
    <div className='section-four-column' style={{ display: 'flex' }}>
      {['People', 'Products', 'Finances', 'Systems'].map((column) => (
        <motion.div
          key={column}
          variants={columnVariants}
          initial="initial"
          animate={expandedColumn === column ? 'expanded' : expandedColumn ? 'collapsed' : 'initial'}
          style={{ overflow: 'hidden', '--border-left__color': expandedColumn ? 'transparent' : '#DBDBDB' }}
          className= {expandedColumn ? '' : 'columns'}
        >
          {expandedColumn === column ? (
            renderAdditionalContent(column)
          ) : (
            <>
              <div className='caption'>
                <h2 className="vertical-text">
                {
                  match ? <span>{column}</span>
                  :
                  <div>
                    <span>{column.slice(0, 1)}</span>
                    <span>{column.slice(1, 2)}</span>
                    <span>{column.slice(2, 3)}</span>
                    <span>{column.slice(3, 4)}</span>
                    <span>{column.slice(4, 5)}</span>
                    <span>{column.slice(5, 6)}</span>
                    <span>{column.slice(6, 7)}</span>
                    <span>{column.slice(7, 8)}</span>
                  </div>
                }
                </h2>
                <button style={{transform: 'rotateZ(90deg)'}} className='reset-column' onClick={() => setExpandedColumn(column)}>
                  <img src="/icons/vertical-lines.svg" />
                </button>
              </div>
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
}