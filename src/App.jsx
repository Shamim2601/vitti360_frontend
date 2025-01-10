import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './services/auth_service';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      {/* Fixed Header Container */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      
      {/* Main Content with padding-top to prevent overlap with header */}
      <div className="w-full pt-12"> {/* Adjust pt-16 based on the header height */}
        <main>
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
