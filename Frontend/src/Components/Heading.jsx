import React, { useState } from 'react';
import logo from '../assets/ETHNICIZE_LOGO.png';  
import cart from '../assets/icons8-cart-64.png';
import { Link } from 'react-router-dom'; 
import { useCart } from "./CartContext.jsx"; 

const Heading = () => {
  const { cartNumbers } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutcontainer, setlogoutcontainer] = useState(false);

  const closeLogoutModal = () => {
    setlogoutcontainer(false);
  };

  const closedropdownmodel = () => {
    setDropdownOpen(false);
  }

  return (
    <>
      <header className="bg-white shadow-md w-full top-0 z-50">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between space-x-4">
          {/* Logo */}
          <Link to='/'>
            <div className="relative flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-8 md:h-10" /> {/* Reduced size for mobile */}
              <span className="text-lg md:text-xl font-bold text-gray-800">ETHNICIZE</span> {/* Reduced text size */}
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-grow"> {/* Reduced width for mobile */}
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
            />
          </div>

          {/* My Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 text-gray-800 hover:text-blue-500 focus:outline-none"
            >
              <span className="text-sm">My Account</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5"  
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {dropdownOpen && (
  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
    <ul className="text-gray-800">
      <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer"><Link to='/profile'>My Profile</Link></li>
      <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer"><Link to='/order'>Orders</Link></li>
      <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer"><Link to='/wishlist'>Wishlist</Link></li>
      <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Help</li>
      <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer text-red-500" onClick={() => {setDropdownOpen(!dropdownOpen); setlogoutcontainer(!logoutcontainer)}}>Logout</li>
    </ul>
  </div>
)}

          </div>

          {/* Cart Button */}
          <div className="ml-4">
            <Link to="/cart">
              <button className="relative flex items-center justify-center">
                <img src={cart} alt="Cart" className="h-7 md:h-9 w-7 md:w-9 object-contain" /> {/* Reduced size for mobile */}
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.3 rounded-full">
                  {cartNumbers}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Logout Modal */}
      {logoutcontainer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-center mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Yes
              </button>
              <button onClick={closeLogoutModal} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Heading;
