import { Bell, Search } from 'lucide-react';
import { Link, useNavigate } from "react-router"; 
import { LogOut } from "lucide-react";
import { useState, useEffect } from 'react';

export default function Navbar() {
  const navigate = useNavigate();

  // State lưu thông tin User trên Navbar
  const [userData, setUserData] = useState({
    name: 'Loading...',
    avatar: '...',
    avatarUrl: ''
  });

  // Lấy dữ liệu người dùng khi vừa load trang
  useEffect(() => {
    const loadUserData = () => {
      const editedProfile = localStorage.getItem('userProfile');
      const loginUser = localStorage.getItem('user');

      if (editedProfile) {
        const parsed = JSON.parse(editedProfile);
        setUserData({ name: parsed.name, avatar: parsed.avatar, avatarUrl: parsed.avatarUrl || '' });
      } else if (loginUser) {
        const parsedDB = JSON.parse(loginUser);
        const fullName = parsedDB.fullName || 'User';
        
        const nameParts = fullName.trim().split(' ');
        let initials = 'U';
        if (nameParts.length >= 2) {
          initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
        } else {
          initials = fullName.substring(0, 2).toUpperCase();
        }

        setUserData({ name: fullName, avatar: initials, avatarUrl: '' });
      }
    };

    loadUserData(); 
    window.addEventListener('profileUpdated', loadUserData);
    return () => window.removeEventListener('profileUpdated', loadUserData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile"); 
    navigate("/login");
  };

  return (
    <nav className="h-16 bg-white dark:bg-[#1E293B] border-b border-[#E5E7EB] dark:border-[#334155] flex items-center justify-between px-8 fixed top-0 left-0 right-0 z-40 transition-colors duration-300">
      <div className="flex items-center gap-6">
        <h1 className="text-[20px] font-semibold text-[#111827] dark:text-white transition-colors">Smart Study Planner</h1>
      </div>
      
      <div className="flex items-center gap-4">
        
        {/* Notifications */}
        <button className="relative p-2 hover:bg-[#F8FAFC] dark:hover:bg-[#334155] rounded-[8px] transition-colors cursor-pointer">
          <Bell className="w-5 h-5 text-[#6B7280] dark:text-[#94A3B8]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-0"> 
          {/* Profile */}
          <Link 
            to="/profile" 
            className="flex items-center gap-2 py-1 px-2 hover:bg-[#F8FAFC] dark:hover:bg-[#334155] rounded-[8px] transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center overflow-hidden">
              {userData.avatarUrl ? (
                <img src={userData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[14px] font-medium text-white">{userData.avatar}</span>
              )}
            </div>
            <span className="text-[14px] font-medium text-[#111827] dark:text-white pr-1 transition-colors">
              {userData.name}
            </span>
          </Link>

          {/* Log out */}
          <button 
            onClick={handleLogout}
            className="p-2 text-[#EF4444] hover:bg-[#FEF2F2] dark:hover:bg-[#EF4444]/10 rounded-[8px] transition-colors cursor-pointer ml-1"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
          
        </div>
      </div>
    </nav>
  );
}