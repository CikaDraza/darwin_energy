import { Link, NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import productData from '../../../src/assets/data/products.json'
import './Header.css';
import { useRef, useState } from 'react';
import Autocomplete from '../autocomplete/Autocomplete';
import Dropdown from './Dropdown';

export default function Header() {
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [language, setLanguage] = useState('BE');
  const [currency, setCurrency] = useState('€');

  const handleMouseEnter = () => {
    setShowProductsDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowProductsDropdown(false);
  };

  return (
    <header className='header'>
      <div className='custom-container'>
        <div className="top-header">
          <div className="logo">
            <Link to="/">
              <img src="/icons/Darwin_Logo.png" alt="darwin logo" />
            </Link>
          </div>
          <div className='navigation'>
            <nav className="nav-links">
              <NavLink to="#support" className="nav-link">Support</NavLink>
              <NavLink to="/shop" className="nav-link">Shopping</NavLink>
              <NavLink to="#account" className="nav-link">My Account</NavLink>
            </nav>
            <div className="search-bar">
              <Autocomplete suggestions={productData}/>
            </div>
            <div className="selectors">
            <Dropdown
              languageOptions={['BE', 'FR', 'NL', 'US']}
              currencyOptions={['€', '$']}
              onLanguageSelect={setLanguage}
              onCurrencySelect={setCurrency}
            />
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
}
