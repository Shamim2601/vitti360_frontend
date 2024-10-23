import React, { useState } from 'react';
import { Container } from '../index';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Import FontAwesome Bars icon
import logo from '/favicon.ico';
import authService from '../../appwrite/auth_service';
import { logout } from '../../store/authSlice';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to control dropdown visibility
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Navigation items
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: authStatus,
    },
    {
      name: 'Support',
      slug: '/support',
      active: !authStatus,
    },
    {
      name: 'Circular',
      slug: '/circular',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: !authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: !authStatus,
    },
  ];

  // Filter nav items that should go inside the dropdown
  const dropdownItems = navItems.filter(item =>
    item.slug !== '/' && item.slug !== '/login' && item.slug !== '/signup' && item.slug !== '/support'
  );

  // Logout handler function
  const logoutHandler = () => {
    authService.logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Toggle the dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex items-center'>
          {/* Logo */}
          <div className='mr-4'>
            <Link to='/'>
              <img src={logo} alt="logo" className='w-12' />
            </Link>
          </div>

          {/* Main navigation */}
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active && (item.slug === '/' || item.slug === '/login' || item.slug === '/signup' || item.slug === '/support') ? (
                <li key={item.name} className='mr-4'>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* Dropdown for more items and Logout, visible only if authStatus is true */}
            {!authStatus && (
              <li className='relative'>
                {/* Toggle dropdown on FaBars click */}
                <button
                  onClick={toggleDropdown}
                  className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >
                  <FaBars className='inline text-xl' /> {/* Dropdown icon */}
                </button>

                {/* Dropdown content */}
                {isDropdownOpen && (
                  <ul className='absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-10'>
                    {dropdownItems.map(item => (
                      item.active && (
                        <li key={item.name}>
                          <button
                            onClick={() => {
                              navigate(item.slug);
                              setDropdownOpen(false); // Close dropdown after navigating
                            }}
                            className='block px-4 py-2 w-full text-left hover:bg-blue-100 rounded-t'
                          >
                            {item.name}
                          </button>
                        </li>
                      )
                    ))}

                    {/* Logout button inside dropdown */}
                    <li>
                      <button
                        onClick={() => {
                          logoutHandler();
                          setDropdownOpen(false); // Close dropdown after logout
                        }}
                        className='block px-4 py-2 w-full text-left hover:bg-red-100 rounded-t'
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
