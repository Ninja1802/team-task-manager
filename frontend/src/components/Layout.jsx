import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div
        style={{
          marginLeft: 'var(--sidebar-width)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          position: 'relative',
          zIndex: 1,
        }}
        className="main-content-wrapper"
      >
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main style={{ flex: 1, padding: '28px 32px' }}>
          <Outlet />
        </main>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .main-content-wrapper {
            margin-left: 0 !important;
          }
          .main-content-wrapper main {
            padding: 20px 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
