import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import { cartContext } from '../CartContextProvider/CartContextProvider';

export default function Navbar() {
  let {numOfProducts} = useContext(cartContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { userToken, setUserToken } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  function logOut() {
    setUserToken(null);
    localStorage.removeItem('userToken');
    navigate('/login');
  }

  const NavLink = ({ to, children }) => (
    <Link 
      to={to}
      className={`block py-2 px-3 rounded transition-colors ${
        isActive(to)
          ? 'text-white bg-green-600 md:bg-transparent md:text-green-600 md:dark:text-green-500'
          : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
      }`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-neutral-200 border-gray-200 dark:bg-gray-900 py-3 fixed w-full z-[1000] top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="e-commerce Logo" />
        </Link>

        <button 
          onClick={toggleMenu}
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
          aria-controls="navbar-default" 
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg 
            className="w-5 h-5" 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 17 14"
          >
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div 
          className={`w-full md:block md:w-auto transition-all duration-300 ease-in-out ${
            isMobile ? 'overflow-hidden' : ''
          } ${
            isMenuOpen ? 'max-h-[500px]' : 'max-h-0 md:max-h-[none]'
          }`}
          id="navbar-default"
        >
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8 rtl:space-x-reverse pb-4 md:pb-0 md:justify-between w-[100%]">
            {userToken ? (
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/cart">Cart</NavLink></li>
                <li><NavLink to="/wishList">Wish List</NavLink></li>
                <li><NavLink to="/products">Products</NavLink></li>
                <li><NavLink to="/categories">Categories</NavLink></li>
                <li><NavLink to="/brands">Brands</NavLink></li>
              </ul>
            ) : null}

            {!userToken ? (
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
              </ul>
            ) : null}
            
            {userToken ? (
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <div><i className="fa-solid fa-cart-shopping text-neutral-600 relative text-2xl "><span className=' text-[12px] text-white absolute top-[-40%] end-[-50%] p-1 px-2 bg-green-600 rounded-sm'>{numOfProducts}</span></i> </div>

                </li>
                <li>
                  <button 
                    onClick={logOut}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}