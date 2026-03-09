import { Moon, Sun, Save, RotateCcw, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useState, useEffect } from 'react';

export default function Settings() {
  // --- CÁC STATE QUẢN LÝ THÔNG BÁO ---
  const [showToast, setShowToast] = useState(false); // Thông báo lưu thành công
  const [showResetModal, setShowResetModal] = useState(false); // Modal hỏi Reset

  const [notifications, setNotifications] = useState({
    email: true, push: true, taskReminders: true, studyReminders: false, weeklyReport: true,
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const [appearance, setAppearance] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#2563EB');
  const [fontSize, setFontSize] = useState('Medium (Default)');
  
  const [preferences, setPreferences] = useState({
    pomodoro: 25, shortBreak: 5, longBreak: 15, taskPriority: 'Medium', weekStart: 'Monday'
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setNotifications(parsed.notifications || notifications);
      setAppearance(parsed.appearance || 'light');
      setPrimaryColor(parsed.primaryColor || '#2563EB');
      setFontSize(parsed.fontSize || 'Medium (Default)');
      setPreferences(parsed.preferences || preferences);

      if (parsed.appearance === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const handleSave = () => {
    const allSettings = { notifications, appearance, primaryColor, fontSize, preferences };
    localStorage.setItem('userSettings', JSON.stringify(allSettings));
    
    if (appearance === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Hiện Toast thông báo lưu thành công
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Hàm xử lý Reset thực sự khi bấm confirm trên Modal
  const confirmReset = () => {
    setNotifications({ email: true, push: true, taskReminders: true, studyReminders: false, weeklyReport: true });
    setAppearance('light');
    setPrimaryColor('#2563EB');
    setFontSize('Medium (Default)');
    setPreferences({ pomodoro: 25, shortBreak: 5, longBreak: 15, taskPriority: 'Medium', weekStart: 'Monday' });
    localStorage.removeItem('userSettings');
    document.documentElement.classList.remove('dark');
    setShowResetModal(false); // Đóng modal
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto relative"> 
      
      {/* 1. TOAST THÔNG BÁO LƯU THÀNH CÔNG (HIỆN Ở GÓC) */}
      {showToast && (
        <div className="fixed top-24 right-8 z-[100] animate-in slide-in-from-right duration-300">
          <div className="bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155] shadow-2xl rounded-2xl p-4 flex items-center gap-3 min-w-[320px]">
            <div className="w-10 h-10 bg-[#DCFCE7] dark:bg-[#14532d] rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#111827] dark:text-white">Success!</p>
              <p className="text-[13px] text-[#6B7280] dark:text-[#94A3B8]">Your preferences have been saved.</p>
            </div>
            <button onClick={() => setShowToast(false)} className="ml-auto text-[#94A3B8] hover:text-[#6B7280] dark:hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. MODAL XÁC NHẬN RESET (HIỆN Ở GIỮA MÀN HÌNH) */}
      {showResetModal && (
        <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E293B] border dark:border-[#334155] rounded-3xl p-8 w-full max-w-[440px] shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FEF2F2] dark:bg-[#451a1a] rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="w-8 h-8 text-[#EF4444]" />
              </div>
              <h2 className="text-[24px] font-bold text-[#111827] dark:text-white mb-2">Reset All Settings?</h2>
              <p className="text-[#6B7280] dark:text-[#94A3B8] text-[15px] leading-relaxed">
                This will restore all preferences, notifications, and appearance to their default values. This action cannot be undone.
              </p>
            </div>
            
            <div className="flex gap-3 mt-10">
              <button 
                onClick={() => setShowResetModal(false)}
                className="flex-1 px-6 py-3 bg-[#F8FAFC] dark:bg-[#0F172A] text-[#475569] dark:text-[#CBD5E1] font-bold rounded-xl border border-[#E5E7EB] dark:border-[#334155] hover:bg-[#F1F5F9] dark:hover:bg-[#1e293b] transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={confirmReset}
                className="flex-1 px-6 py-3 bg-[#EF4444] text-white font-bold rounded-xl shadow-lg shadow-red-500/20 hover:bg-[#dc2626] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="dark:text-white transition-colors">Settings</h1>
        <p className="text-[16px] text-[#6B7280] dark:text-[#94A3B8] mt-2 transition-colors">Manage your preferences and account settings</p>
      </div>

      <div className="space-y-6">
        <Card className="p-6 dark:bg-[#1E293B] dark:border-[#334155] transition-colors">
          <h2 className="mb-6 dark:text-white">Appearance</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[14px] font-medium text-[#111827] dark:text-gray-200 mb-3">Theme</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setAppearance('light')}
                  className={`p-4 border-2 rounded-[12px] transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                    appearance === 'light'
                      ? 'border-[#2563EB] bg-[#EFF6FF] dark:bg-[#1e3a8a]/20 shadow-sm'
                      : 'border-[#E5E7EB] dark:border-[#475569] hover:border-[#2563EB] bg-white dark:bg-[#0F172A]'
                  }`}
                >
                  <Sun className={`w-8 h-8 ${appearance === 'light' ? 'text-[#F59E0B]' : 'text-[#94A3B8] dark:text-[#64748B]'}`} />
                  <p className={`text-[14px] font-semibold ${appearance === 'light' ? 'text-[#2563EB]' : 'text-[#475569] dark:text-[#94A3B8]'}`}>Light Mode</p>
                </button>
                <button
                  onClick={() => setAppearance('dark')}
                  className={`p-4 border-2 rounded-[12px] transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                    appearance === 'dark'
                      ? 'border-[#7C3AED] bg-[#F5F3FF] dark:bg-[#5b21b6]/30 shadow-sm'
                      : 'border-[#E5E7EB] dark:border-[#475569] hover:border-[#7C3AED] bg-white dark:bg-[#0F172A]'
                  }`}
                >
                  <Moon className={`w-8 h-8 ${appearance === 'dark' ? 'text-[#7C3AED]' : 'text-[#94A3B8] dark:text-[#64748B]'}`} />
                  <p className={`text-[14px] font-semibold ${appearance === 'dark' ? 'text-[#7C3AED]' : 'text-[#475569] dark:text-[#94A3B8]'}`}>Dark Mode</p>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] dark:text-gray-200 mb-3">Font Size</label>
              <select 
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-[15px] text-[#111827] dark:text-white cursor-pointer"
              >
                <option value="Small">Small</option>
                <option value="Medium (Default)">Medium (Default)</option>
                <option value="Large">Large</option>
              </select>
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] dark:text-gray-200 mb-3">Primary Color</label>
              <div className="flex gap-3">
                {['#2563EB', '#7C3AED', '#22C55E', '#F59E0B', '#EF4444', '#06B6D4'].map(color => (
                  <button
                    key={color}
                    onClick={() => setPrimaryColor(color)}
                    className={`w-12 h-12 rounded-full hover:scale-110 transition-all cursor-pointer shadow-sm ${
                      primaryColor === color ? 'ring-4 ring-offset-2 dark:ring-offset-[#1E293B]' : ''
                    }`}
                    style={{ backgroundColor: color, ringColor: `${color}60` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6 dark:bg-[#1E293B] dark:border-[#334155] transition-colors">
          <h2 className="mb-6 dark:text-white">Notifications</h2>
          
          <div className="space-y-3">
            {[
              { key: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
              { key: 'push', label: 'Push Notifications', description: 'Get notifications on your device' },
              { key: 'taskReminders', label: 'Task Reminders', description: 'Reminders for upcoming tasks' },
              { key: 'studyReminders', label: 'Study Session Reminders', description: 'Reminders to start study sessions' },
              { key: 'weeklyReport', label: 'Weekly Progress Report', description: 'Receive weekly summary emails' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-[#F8FAFC] dark:bg-[#0F172A] rounded-[10px] border border-transparent dark:border-[#1E293B] hover:border-[#E5E7EB] dark:hover:border-[#334155] transition-colors">
                <div className="flex-1">
                  <p className="text-[15px] font-semibold text-[#111827] dark:text-white">{item.label}</p>
                  <p className="text-[13px] text-[#6B7280] dark:text-[#94A3B8] mt-0.5">{item.description}</p>
                </div>
                <button
                  onClick={() => toggleNotification(item.key)}
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    notifications[item.key] ? 'bg-[#2563EB]' : 'bg-[#CBD5E1] dark:bg-[#475569]'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
                      notifications[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6 dark:bg-[#1E293B] dark:border-[#334155] transition-colors">
          <h2 className="mb-6 dark:text-white">Study Preferences</h2>
          
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[14px] font-medium text-[#111827] dark:text-gray-200 mb-2">Default Pomodoro</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={preferences.pomodoro}
                    onChange={(e) => setPreferences({...preferences, pomodoro: Number(e.target.value)})}
                    className="w-full pl-4 pr-12 py-3 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] text-[#111827] dark:text-white rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-[15px]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[13px]">min</span>
                </div>
              </div>
              
              <div>
                <label className="block text-[14px] font-medium text-[#111827] dark:text-gray-200 mb-2">Short Break</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={preferences.shortBreak}
                    onChange={(e) => setPreferences({...preferences, shortBreak: Number(e.target.value)})}
                    className="w-full pl-4 pr-12 py-3 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] text-[#111827] dark:text-white rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-[15px]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[13px]">min</span>
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#111827] dark:text-gray-200 mb-2">Long Break</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={preferences.longBreak}
                    onChange={(e) => setPreferences({...preferences, longBreak: Number(e.target.value)})}
                    className="w-full pl-4 pr-12 py-3 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] text-[#111827] dark:text-white rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-[15px]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[13px]">min</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[14px] font-medium text-[#111827] dark:text-gray-200 mb-2">Default Task Priority</label>
                <select 
                  value={preferences.taskPriority}
                  onChange={(e) => setPreferences({...preferences, taskPriority: e.target.value})}
                  className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] text-[#111827] dark:text-white rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-[15px] cursor-pointer"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#111827] dark:text-gray-200 mb-2">Week Start Day</label>
                <select 
                  value={preferences.weekStart}
                  onChange={(e) => setPreferences({...preferences, weekStart: e.target.value})}
                  className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] text-[#111827] dark:text-white rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-[15px] cursor-pointer"
                >
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-[#E5E7EB] dark:border-[#334155]">
            <button 
              onClick={() => setShowResetModal(true)} 
              className="flex flex-row items-center justify-center gap-2 px-6 py-2.5 bg-white dark:bg-transparent border border-[#E5E7EB] dark:border-[#475569] text-[#475569] dark:text-[#CBD5E1] rounded-[10px] hover:bg-[#F8FAFC] dark:hover:bg-[#334155] transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer whitespace-nowrap font-semibold"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </button>

            <button 
              onClick={handleSave}
              className="flex flex-row items-center justify-center gap-2 px-6 py-2.5 bg-[#2563EB] text-white rounded-[10px] hover:bg-[#1d4ed8] shadow-md transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap font-semibold"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}