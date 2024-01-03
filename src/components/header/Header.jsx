import { Link, NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import productData from '../../../src/assets/data/products.json'
import './Header.css';
import { useRef, useState } from 'react';
import Autocomplete from '../autocomplete/Autocomplete';

const Header = () => {
  const [showProductsDropdown, setShowProductsDropdown] = useState(true);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    setShowProductsDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowProductsDropdown(false);
  };

  return (
    <header className='header'>
      <div className='container'>
        <div className="top-header">
          <div className="logo">
            <Link to="/">
              <img src="../../public/icons/Darwin_Logo.png" alt="darwin logo" />
            </Link>
          </div>
          <div className='navigation'>
            <nav className="nav-links">
              <NavLink to="#support" className="nav-link">Support</NavLink>
              <NavLink to="#shopping" className="nav-link">Shopping</NavLink>
              <NavLink to="#account" className="nav-link">My Account</NavLink>
            </nav>
            <div className="search-bar">
              <Autocomplete suggestions={productData}/>
            </div>
            <div className="selectors">
              <select className="language-selector">
                <option value="be">BE</option>
                <option value="fr">FR</option>
                <option value="nl">NL</option>
                <option value="us">US</option>
              </select>
              <span className="separator">·</span>
              <select className="currency-selector">
                <option value="eur">€</option>
                <option value="usd">$</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bottom-header">
          <nav className="bottom-nav">
            <NavLink onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} to="#products" className="bottom-nav-link">PRODUCTS</NavLink>
              
            <NavLink to="#engineering" className="bottom-nav-link">ENGINEERING</NavLink>
            <NavLink to="#it" className="bottom-nav-link">IT</NavLink>
            <NavLink to="#financing" className="bottom-nav-link">FINANCING</NavLink>
            <NavLink to="#community" className="bottom-nav-link">COMMUNITY</NavLink>
            <CSSTransition
              in={showProductsDropdown}
              timeout={600}
              classNames="dropdown"
              unmountOnExit
              nodeRef={dropdownRef}
              >
              <div onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave} ref={dropdownRef} className={showProductsDropdown ? "dropdown-menu" : "dropdown-menu hidden"}>
                <ul>
                  {
                    productData.map(item => (
                      <li style={{ '--hover-color': item.color }} key={item.id}>{item.name}</li>
                    ))
                  }
                </ul>
              </div>
            </CSSTransition>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
