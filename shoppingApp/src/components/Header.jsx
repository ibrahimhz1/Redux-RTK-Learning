import React from 'react'

import Logo from '../assets/amazon.svg'
import Search from '../assets/search.svg'
import InianFlag from '../assets/indianflag.svg';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="upper">
        <div className='imgDiv'> <img src={Logo} alt="logo" onClick={() => navigate('/')} /> </div>
        <div className='locationDiv'>
          <div className="left">
            <i className="ri-map-pin-line"></i>
          </div>
          <div className="right">
            <span className='upper'>Deliver to Pondicherry 605104</span>
            <span className='lower'>Sign in to update your location</span>
          </div>
        </div>
        <div className='searchBarDiv'>
          <select name="selectCategory" id="selectCategory" className='selectionDiv'>
            <option value="all">All</option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
          <input type="text" spellCheck="false" />
          <button> <img src={Search} alt="" /> </button>
        </div>
        <div className='languageDiv'>
          <img src={InianFlag} alt="languageflag" />
          <span>EN</span>
        </div>
        <div className='AccountDiv'>
          <span className='upper'>Hello, Mohammed</span>
          <span className='lower'>Accounts & Lists</span>
        </div>
        <div className='ordersDiv'>
          <Link to="/orders" className='returnAndOrders'>
            <span className='upper'>Return</span>
            <span className='lower'>& Orders</span>
          </Link>
        </div>
        <div className='cartDiv' onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
          <i className="ri-shopping-cart-line"></i>
          <span>Cart</span>
        </div>
      </div>
      <div className="lower">
        <ul>
          <li><i className="ri-menu-line menu-icon"></i> All</li>
          <li>Fresh</li>
          <li>Sell</li>
          <li>Today's Deal</li>
          <li>Buy Again</li>
          <li>Best Sellers</li>
          <li>Prime</li>
          <li>Mobiles</li>
          <li>Customer Service</li>
          <li>Gift Cards</li>
          <li>Electronics</li>
          <li>New Releases</li>
          <li>Coupons</li>
        </ul>
      </div>
    </header>
  )
}

export default Header