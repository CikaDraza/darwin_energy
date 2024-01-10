import React from 'react'
import { NavLink } from 'react-router-dom'
import productData from '../../../src/assets/data/products.json'

export default function Card() {
  const [selected, setSelected] = React.useState('');
  const matches = useMediaQuery('(min-width: 480px)');

  const handleLoading = (product) => {
    setSelected(product._id);
  };

  return (
    <div sx={{ width: "100%", '& a': {textDecoration: 'none'} }}>
      {
        product._id === selected &&
        <img className='circular-progress' sx={{position: 'absolute', left: '45%', top: '20%', zIndex: 1, transform: 'translateX(-50%)'}} size={50} />
      }
        <div className='card-action-area'>
          {
            productData?.map(item => (
              <NavLink onClick={() => handleLoading(item)}>
                <div className='card-media' sx={{ justifyContent: {xs: 'center', sm: 'flex-end'}, alignItems: 'center','& img': {width: `${imgWidth}!important`, height: `${imgHeight}`, marginTop: `${marginTop}`}, overflow: 'hidden'  }} component="div">
                  <img src={item}  alt={item.name} />
                </div>
              </NavLink>
            ))
          }
        </div>
        <div className='card-actions'>
          <button size="small">Add to cart</button>
        </div>
    </div>
  )
}
