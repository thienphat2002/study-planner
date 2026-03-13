import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react';

export default function App() {
  
  useEffect(() => {
    document.body.classList.add('bg-[#F8FAFC]', 'dark:bg-[#0F172A]', 'overscroll-y-none');

    const savedSettings = localStorage.getItem('userSettings');
    const currentPath = window.location.pathname.toLowerCase();
    const isAuthPage = ['/login', '/signup', '/forgotpassword'].includes(currentPath);

    // Đặt màu mặc định nếu chưa có
    let themeColor = '#2563EB'; 

    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      if (parsed.appearance === 'dark' && !isAuthPage) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
      if (parsed.primaryColor) {
        themeColor = parsed.primaryColor;
      }
    } else if (isAuthPage) {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    document.documentElement.style.setProperty('--color-primary', themeColor);

  }, []); 

  return <RouterProvider router={router} />;
}