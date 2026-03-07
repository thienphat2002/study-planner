import { Moon, Sun } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useState } from 'react';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    taskReminders: true,
    studyReminders: false,
    weeklyReport: true,
  });

  const [appearance, setAppearance] = useState('light');

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    // Thêm max-w-4xl để giao diện không bị bành trướng quá to trên màn hình lớn
    <div className="space-y-6 max-w-4xl"> 
      <div>
        <h1>Settings</h1>
        <p className="text-[16px] text-[#6B7280] mt-2">Manage your preferences and account settings</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <Card className="p-6">
          <h2 className="mb-6">Appearance</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-3">Theme</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setAppearance('light')}
                  className={`p-4 border-2 rounded-[12px] transition-all ${
                    appearance === 'light'
                      ? 'border-[#2563EB] bg-[#EFF6FF]'
                      : 'border-[#E5E7EB] hover:border-[#2563EB]'
                  }`}
                >
                  <Sun className="w-8 h-8 mx-auto mb-2 text-[#F59E0B]" />
                  <p className="text-[14px] font-medium text-[#111827]">Light Mode</p>
                </button>
                <button
                  onClick={() => setAppearance('dark')}
                  className={`p-4 border-2 rounded-[12px] transition-all ${
                    appearance === 'dark'
                      ? 'border-[#2563EB] bg-[#EFF6FF]'
                      : 'border-[#E5E7EB] hover:border-[#2563EB]'
                  }`}
                >
                  <Moon className="w-8 h-8 mx-auto mb-2 text-[#7C3AED]" />
                  <p className="text-[14px] font-medium text-[#111827]">Dark Mode</p>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-3">Font Size</label>
              <select className="w-full px-4 py-2 bg-white border border-[#E5E7EB] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
                <option>Small</option>
                <option selected>Medium (Default)</option>
                <option>Large</option>
              </select>
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-3">Primary Color</label>
              <div className="flex gap-3">
                {['#2563EB', '#7C3AED', '#22C55E', '#F59E0B', '#EF4444', '#06B6D4'].map(color => (
                  <button
                    key={color}
                    className="w-12 h-12 rounded-[8px] hover:scale-110 transition-transform ring-2 ring-offset-2 ring-transparent hover:ring-[#2563EB]"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <h2 className="mb-6">Notifications</h2>
          
          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
              { key: 'push', label: 'Push Notifications', description: 'Get notifications on your device' },
              { key: 'taskReminders', label: 'Task Reminders', description: 'Reminders for upcoming tasks' },
              { key: 'studyReminders', label: 'Study Session Reminders', description: 'Reminders to start study sessions' },
              { key: 'weeklyReport', label: 'Weekly Progress Report', description: 'Receive weekly summary emails' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-[8px]">
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-[#111827]">{item.label}</p>
                  <p className="text-[12px] text-[#6B7280]">{item.description}</p>
                </div>
                <button
                  onClick={() => toggleNotification(item.key)}
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    notifications[item.key] ? 'bg-[#2563EB]' : 'bg-[#E5E7EB]'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6">
          <h2 className="mb-6">Study Preferences</h2>
          
          <div className="space-y-4">
            <Input 
              label="Default Pomodoro Duration (minutes)" 
              type="number" 
              defaultValue="25"
            />
            <Input 
              label="Short Break Duration (minutes)" 
              type="number" 
              defaultValue="5"
            />
            <Input 
              label="Long Break Duration (minutes)" 
              type="number" 
              defaultValue="15"
            />
            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-3">Default Task Priority</label>
              <select className="w-full px-4 py-2 bg-white border border-[#E5E7EB] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
                <option>Low</option>
                <option selected>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className="block text-[14px] font-medium text-[#111827] mb-3">Week Start Day</label>
              <select className="w-full px-4 py-2 bg-white border border-[#E5E7EB] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
                <option>Sunday</option>
                <option selected>Monday</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-[#E5E7EB]">
            <Button variant="outline">Reset to Default</Button>
            <Button variant="primary">Save Changes</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}