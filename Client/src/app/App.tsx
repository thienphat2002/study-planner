import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react';

export default function App() {
  
  useEffect(() => {
    document.body.classList.add('bg-[#F8FAFC]', 'dark:bg-[#0F172A]', 'overscroll-y-none');

    const savedSettings = localStorage.getItem('userSettings');
    
    // 1. Kiểm tra xem người dùng có đang ở trang Auth không
    const currentPath = window.location.pathname.toLowerCase();
    const isAuthPage = ['/login', '/signup', '/forgotpassword'].includes(currentPath);

    // Đặt màu mặc định nếu chưa có
    let themeColor = '#2563EB'; 

    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      
      // 2. LOGIC ĐÃ ĐƯỢC NÂNG CẤP:
      // Nếu bật Dark Mode VÀ KHÔNG PHẢI trang Auth -> Mới thêm class 'dark'
      if (parsed.appearance === 'dark' && !isAuthPage) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        // Trái lại (hoặc đang ở trang Auth) -> Gỡ class 'dark' ngay lập tức
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }

      // Lấy màu người dùng đã chọn
      if (parsed.primaryColor) {
        themeColor = parsed.primaryColor;
      }
    } else if (isAuthPage) {
      // Đề phòng trường hợp người dùng mới toanh chưa có settings mà F5 trang Auth
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }

    // Tiêm màu này vào biến CSS toàn cục cho cả trang web
    document.documentElement.style.setProperty('--color-primary', themeColor);

  }, []); 

  return <RouterProvider router={router} />;
}