import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings, X, Save, Loader2 } from 'lucide-react'; 
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input'; 

export default function Pomodoro() {
  const [durations, setDurations] = useState({ focus: 25, shortBreak: 5, longBreak: 15 });
  const [time, setTime] = useState(durations.focus * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); 
  const [sessions, setSessionsCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [tempDurations, setTempDurations] = useState(durations);
  
  // --- STATE CHỜ API LƯU ---
  const [isSaving, setIsSaving] = useState(false);

  const modes = {
    focus: { duration: durations.focus * 60, label: 'Focus Time', color: '#2563EB' },
    shortBreak: { duration: durations.shortBreak * 60, label: 'Short Break', color: '#22C55E' },
    longBreak: { duration: durations.longBreak * 60, label: 'Long Break', color: '#7C3AED' },
  };

  // --- HÀM GỌI API LƯU THỜI GIAN HỌC VÀO DB ---
  const saveStudySessionToDB = async (durationInMinutes) => {
    setIsSaving(true);
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:5000/api/v1/studySession/saveTime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          // Gửi số phút học thực tế (ví dụ: 25 phút). Bạn có thể điều chỉnh body này nếu Backend yêu cầu trường dữ liệu khác.
          durationMinutes: durationInMinutes,
          sessionType: 'Pomodoro Focus' 
        })
      });

      if (!response.ok) {
        console.error("Lỗi khi lưu thời gian học vào DB");
      } else {
        console.log(`Đã lưu ${durationInMinutes} phút học vào Database!`);
      }
    } catch (error) {
      console.error("Lỗi kết nối server khi lưu thời gian:", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    let interval = null;
    
    if (isRunning && time > 0) {
      interval = setInterval(() => setTime(t => t - 1), 1000);
    } else if (isRunning && time === 0) {
      // KHI ĐỒNG HỒ ĐẾM NGƯỢC VỀ 0
      setIsRunning(false); 
      
      // Nếu là chế độ Focus, cộng thêm 1 session và GỌI API LƯU DB
      if (mode === 'focus') {
        setSessionsCompleted(s => s + 1);
        saveStudySessionToDB(durations.focus); // Gọi API lưu số phút
        
        // Tự động chuyển sang nghỉ ngắn (hoặc nghỉ dài nếu đã đủ 4 pomodoro)
        if ((sessions + 1) % 4 === 0) {
           handleModeChange('longBreak');
        } else {
           handleModeChange('shortBreak');
        }
      } else {
        // Nếu vừa nghỉ xong, tự động quay lại chế độ Focus
        handleModeChange('focus');
      }
    }
    
    return () => clearInterval(interval);
  }, [isRunning, time, mode, sessions, durations.focus]); // Thêm dependencies đầy đủ

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const progress = ((modes[mode].duration - time) / modes[mode].duration) * 100;

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => { setIsRunning(false); setTime(modes[mode].duration); };
  
  const handleModeChange = (newMode) => { 
    setMode(newMode); 
    setTime(modes[newMode].duration); 
    setIsRunning(false); 
  };
  
  const handleSaveSettings = () => { 
    setDurations(tempDurations); 
    setTime(tempDurations[mode] * 60); 
    setIsRunning(false); 
    setShowSettings(false); 
  };
  
  const handleOpenSettings = () => { 
    setTempDurations(durations); 
    setShowSettings(true); 
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="dark:text-white">Pomodoro Timer</h1>
          <p className="text-[16px] text-[#6B7280] dark:text-[#94A3B8] mt-2">Stay focused and productive with the Pomodoro Technique</p>
        </div>
        <button 
          onClick={handleOpenSettings}
          className="flex flex-row items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155] text-[#475569] dark:text-[#CBD5E1] rounded-[8px] hover:bg-[#F8FAFC] dark:hover:bg-[#334155] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
        >
          <Settings className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
          <span className="font-semibold text-[15px] leading-none">Settings</span>
        </button>
      </div>

      {/* HIỂN THỊ DẤU HIỆU ĐANG LƯU DỮ LIỆU */}
      {isSaving && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-sm animate-in slide-in-from-top-4">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Saving session to Dashboard...
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <Card className="lg:col-span-2 p-12 relative overflow-hidden">
          <div className="flex justify-center gap-4 mb-12">
            {Object.entries(modes).map(([key, { label, color }]) => (
              <button
                key={key}
                onClick={() => handleModeChange(key)}
                className={`px-6 py-2 rounded-[8px] text-[16px] font-medium transition-all ${
                  mode === key ? 'text-white shadow-lg scale-105' : 'bg-[#F8FAFC] dark:bg-[#0F172A] text-[#6B7280] dark:text-[#94A3B8] hover:bg-[#E5E7EB] dark:hover:bg-[#334155]'
                }`}
                style={mode === key ? { backgroundColor: color } : {}}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center mb-12">
            <div className="relative">
              <svg className="w-80 h-80 transform -rotate-90">
                <circle cx="160" cy="160" r="140" stroke="currentColor" className="text-[#F8FAFC] dark:text-[#0F172A]" strokeWidth="12" fill="none" />
                <circle cx="160" cy="160" r="140" stroke={modes[mode].color} strokeWidth="12" fill="none" strokeDasharray={`${2 * Math.PI * 140}`} strokeDashoffset={`${2 * Math.PI * 140 * (1 - progress / 100)}`} strokeLinecap="round" className="transition-all duration-1000 ease-linear" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-[72px] font-bold text-[#111827] dark:text-white tabular-nums tracking-tight">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div className="text-[20px] text-[#6B7280] dark:text-[#94A3B8] mt-1 font-medium">{modes[mode].label}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            {!isRunning ? (
              <Button variant="primary" size="lg" onClick={handleStart} className="px-12 hover:scale-105 transition-transform cursor-pointer" style={{ backgroundColor: modes[mode].color, borderColor: modes[mode].color }}>
                <Play className="w-6 h-6 mr-2 fill-current" /> Start
              </Button>
            ) : (
              <Button variant="warning" size="lg" onClick={handlePause} className="px-12 hover:scale-105 transition-transform cursor-pointer" style={{ backgroundColor: '#F59E0B', borderColor: '#F59E0B', color: 'white' }}>
                <Pause className="w-6 h-6 mr-2 fill-current" /> Pause
              </Button>
            )}
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleReset} 
              className="cursor-pointer hover:bg-[#F8FAFC] dark:!bg-transparent dark:hover:!bg-[#334155] dark:!border-[#475569] dark:!text-white transition-colors"
            >
              <RotateCcw className="w-6 h-6 mr-2" /> Reset
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-4">Today's Sessions</h3>
            <div className="text-center py-6">
              <div className="text-[56px] font-bold text-[#2563EB] dark:text-[#60A5FA] mb-1 leading-none">{sessions}</div>
              <p className="text-[14px] text-[#6B7280] dark:text-[#94A3B8] font-medium">Completed Sessions</p>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`h-2.5 rounded-full transition-colors duration-500 ${i < sessions ? 'bg-[#2563EB] dark:bg-[#3B82F6] shadow-sm' : 'bg-[#E2E8F0] dark:bg-[#334155]'}`}></div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-4">How it Works</h3>
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-[#EFF6FF] dark:bg-[#1e3a8a]/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[14px] font-bold text-[#2563EB] dark:text-[#60A5FA]">1</span>
                </div>
                <div>
                  <p className="text-[14px] text-[#111827] dark:text-white font-semibold">Focus for 25 minutes</p>
                  <p className="text-[13px] text-[#6B7280] dark:text-[#94A3B8] mt-0.5">Work on a single task</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-[#F0FDF4] dark:bg-[#14532d]/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[14px] font-bold text-[#22C55E] dark:text-[#4ade80]">2</span>
                </div>
                <div>
                  <p className="text-[14px] text-[#111827] dark:text-white font-semibold">Take a 5-minute break</p>
                  <p className="text-[13px] text-[#6B7280] dark:text-[#94A3B8] mt-0.5">Relax and recharge</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-[#FAF5FF] dark:bg-[#5b21b6]/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[14px] font-bold text-[#7C3AED] dark:text-[#a78bfa]">3</span>
                </div>
                <div>
                  <p className="text-[14px] text-[#111827] dark:text-white font-semibold">After 4 sessions</p>
                  <p className="text-[13px] text-[#6B7280] dark:text-[#94A3B8] mt-0.5">Take a 15-minute break</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E293B] dark:border dark:border-[#334155] rounded-3xl p-8 w-full max-w-[400px] shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowSettings(false)} className="absolute top-6 right-6 text-[#94a3b8] hover:text-[#ef4444] transition-colors cursor-pointer bg-[#f8fafc] dark:bg-[#0F172A] hover:bg-[#fee2e2] dark:hover:bg-red-500/20 p-2 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <div className="mb-6">
              <h2 className="text-[24px] font-bold text-[#0f172a] dark:text-white">Timer Settings</h2>
              <p className="text-[#64748b] dark:text-[#94A3B8] text-[14px] mt-1">Customize your Pomodoro intervals.</p>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-[14px] font-medium text-[#111827] dark:text-white mb-2 flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></div>Focus Time <span className="text-[#6B7280] dark:text-[#94A3B8] font-normal">(min)</span></label>
                <input type="number" min="1" value={tempDurations.focus} onChange={(e) => setTempDurations({...tempDurations, focus: Number(e.target.value)})} className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-[15px] font-semibold text-[#111827] dark:text-white" />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#111827] dark:text-white mb-2 flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></div>Short Break <span className="text-[#6B7280] dark:text-[#94A3B8] font-normal">(min)</span></label>
                <input type="number" min="1" value={tempDurations.shortBreak} onChange={(e) => setTempDurations({...tempDurations, shortBreak: Number(e.target.value)})} className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 focus:border-[#22C55E] transition-all text-[15px] font-semibold text-[#111827] dark:text-white" />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#111827] dark:text-white mb-2 flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]"></div>Long Break <span className="text-[#6B7280] dark:text-[#94A3B8] font-normal">(min)</span></label>
                <input type="number" min="1" value={tempDurations.longBreak} onChange={(e) => setTempDurations({...tempDurations, longBreak: Number(e.target.value)})} className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all text-[15px] font-semibold text-[#111827] dark:text-white" />
              </div>
              <div className="pt-5 border-t border-[#f1f5f9] dark:border-[#334155] flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowSettings(false)} className="cursor-pointer px-5 dark:border-[#475569] dark:text-[#CBD5E1]">
                  <span className="font-semibold">Cancel</span>
                </Button>
                <button onClick={handleSaveSettings} className="flex flex-row items-center justify-center gap-2 px-6 py-2.5 bg-[#2563EB] text-white rounded-[10px] hover:bg-[#1d4ed8] shadow-md transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap">
                  <Save className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold text-[15px] leading-none">Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}