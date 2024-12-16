import React, { ReactNode } from 'react';
import { AuthProvider } from '@/app/context/AuthContext';
import NavBar from '@/app/components/Navigation/NavBar';

interface LayoutProps {
  children: ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthProvider>
            <NavBar />
            <main>{children}</main>{/* 頁面的內容將顯示在這裡 */}
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
