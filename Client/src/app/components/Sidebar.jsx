import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  BookOpen, 
  Timer, 
  BarChart3, 
  User, 
  Settings 
} from 'lucide-react';
import { useLocation, Link } from 'react-router';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: BookOpen, label: 'Subjects', path: '/subjects' },
  { icon: Timer, label: 'Pomodoro', path: '/pomodoro' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  
  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] fixed left-0 top-16 bottom-0 z-30">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-[8px] transition-all ${
                isActive 
                  ? 'bg-[#2563EB] text-white shadow-[0_4px_12px_rgba(37,99,235,0.2)]' 
                  : 'text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#111827]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[16px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
