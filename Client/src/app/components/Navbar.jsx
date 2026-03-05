import { Bell, Search, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-8 fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center gap-6">
        <h1 className="text-[20px] font-semibold text-[#111827]">Smart Study Planner</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-80 bg-[#F8FAFC] border border-[#E5E7EB] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
          />
        </div>
        
        {/* Notifications */}
        <button className="relative p-2 hover:bg-[#F8FAFC] rounded-[8px] transition-colors">
          <Bell className="w-5 h-5 text-[#6B7280]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
        </button>
        
        {/* Profile */}
        <button className="flex items-center gap-2 p-2 hover:bg-[#F8FAFC] rounded-[8px] transition-colors">
          <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="text-[14px] font-medium text-[#111827]">John Doe</span>
        </button>
      </div>
    </nav>
  );
}
