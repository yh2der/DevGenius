import React from 'react';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <aside
      style={{
        width: '200px',
        backgroundColor: '#f0f0f0',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </aside>
  );
};

export default Sidebar;
