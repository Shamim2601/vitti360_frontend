import React, { useState } from 'react';
import { Container } from '../index';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import logo from '/favicon.ico';
import authService from '../../services/auth_service';
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
      name: 'Support',
      slug: '/support',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Circulars',
      slug: '/circulars',
      active: authStatus,
    },
    {
      name: 'Forum',
      slug: '/forum',
      active: authStatus,
    },
    {
      name: 'Blogs',
      slug: '/blogs',
      active: authStatus,
    },
    {
      name: 'Bookshop',
      slug: '/bookshop',
      active: authStatus,
    },
    {
      name: 'Exams',
      slug: '/exams',
      active: authStatus,
    },
    {
      name: 'Dashboard',
      slug: '/dashboard',
      active: authStatus,
    },
  ];

  // Filter nav items that should go inside the dropdown
  const dropdownItems = navItems.filter(item =>
    item.slug !== '/support' && item.slug !== '/login' && item.slug !== '/signup'
    && item.slug !== '/circulars' && item.slug !== '/exams'
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
    <header className='pt-2 shadow bg-gray-500'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <img src={logo} alt="logo" className='w-12 mb-1' />
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active && (item.slug === '/support' 
                || item.slug === '/login' || item.slug === '/signup'
                || item.slug==='/circulars' || item.slug==='/exams'
              ) ? (
                <li key={item.name} className='mr-2'>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-2 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li className='relative'>
                <button
                  onClick={toggleDropdown}
                  className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >
                  <FaBars className='inline text-xl' />
                </button>

                {isDropdownOpen && (
                  <ul className='absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-10'>
                    {dropdownItems.map(item => (
                      item.active && (
                        <li key={item.name}>
                          <button
                            onClick={() => {
                              navigate(item.slug);
                              setDropdownOpen(false);
                            }}
                            className='block px-4 py-2 w-full text-left hover:bg-blue-100 rounded-t'
                          >
                            {item.name}
                          </button>
                        </li>
                      )
                    ))}

                    <li>
                      <button
                        onClick={() => {
                          logoutHandler();
                          setDropdownOpen(false);
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
