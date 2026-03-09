import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react'; // 1. Import thêm useEffect

export default function App() {
  
  // 2. Thêm bộ não kiểm tra Dark Mode ở đây
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      
      // Kiểm tra xem trong settings đã lưu 'dark' chưa
      if (parsed.appearance === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []); // [] giúp logic này chạy 1 lần duy nhất khi load trang

  return <RouterProvider router={router} />;
}