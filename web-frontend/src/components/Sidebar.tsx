import React, { useState } from 'react';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [width, setWidth] = useState(200); // 初始寬度

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      setWidth(Math.max(150, Math.min(newWidth, 500))); // 限制最小 150px，最大 500px
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <aside
      style={{
        width: `${width}px`, // 讓 Sidebar 可調整
        minWidth: '150px',
        maxWidth: '500px',
        backgroundColor: '#f0f0f0',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        userSelect: 'none',
        overflow: 'hidden', // 防止內容超出
      }}
    >
      {children}

      {/* 可拖拉的區域 */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: '5px',
          height: '100%',
          backgroundColor: '#ccc',
          cursor: 'ew-resize',
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />
    </aside>
  );
};

export default Sidebar;
