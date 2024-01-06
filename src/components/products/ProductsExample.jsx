import productData from '../../assets/data/products.json'
import '../../App.css'
import './Products.css'
import iconsMap from '../../assets/iconMap';
import { NavLink } from 'react-router-dom';
import { useRef, useState } from 'react';

export default function ProductsExample() {  
  const [show, setShow] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const iconRefs = useRef({});

  const handleMouseEnter = (iconData) => {
    
    console.log("iconData.id:", iconData.id);
    
    setSelectedIcon(() => iconData.id);
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  return (
    <div className='section-products-example'>
      <div className='row'>
        <div
          className='column'>
          <div className='heading-container'>
            <h2 className='heading'>Explore Our Diverse Range of Renewable <br />Energy Solutions</h2>
            <div className='row'>
              <div className='column'>
                <p className='heading-text'>At <strong>DARWIN ENERGY INOVATOR</strong>, we are dedicated to pioneering the future of renewable energy. Our diverse array of products caters to both individual and commercial needs, ensuring that sustainable energy solutions are accessible to all. From cutting-edge solar modules to intelligent energy monitoring systems, our portfolio is designed to meet the evolving demands of the renewable energy sector.

                </p>
                <p className='heading-text'>We're not just manufacturing products; we're engineering a sustainable future. Explore our range and join us in this green energy revolution.</p>
              </div>
            </div>
          </div>
          <div className='icons-container'>
            <div
             className='icons show-all'>
              {
                productData.map((iconData) => {
                  const IconComponent = iconsMap[iconData.id];
                  console.log(selectedIcon === iconData.id ? iconData.color : undefined);
                  return (
                    <div
                    ref={iconRefs}
                    onMouseEnter={() => handleMouseEnter(iconData)}
                    onMouseLeave={handleMouseLeave}
                    key={iconData.id}
                    className='icon'
                    >
                      <IconComponent fill={selectedIcon === iconData.id ? iconData.color : undefined} />
                      <h3 className='text'>{iconData.name}</h3>
                      <p className='sub-text'>{iconData.subText}</p>
                      {
                        show && selectedIcon === iconData.id ?
                        <div className='links'>
                          <NavLink to={iconData.productLink}>
                          <span>Shop</span>
                          </NavLink>
                          <NavLink to={iconData.shopLink}>
                          <span >Visit {iconData.name}</span>
                          </NavLink>
                        </div>
                        :
                        <div className='links'></div>
                      }
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
