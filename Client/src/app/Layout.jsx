import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-64 mt-16 p-8">
        <div className="max-w-[1440px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
