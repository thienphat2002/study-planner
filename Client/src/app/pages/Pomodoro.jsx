import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings, X } from 'lucide-react'; // Import thêm icon X
import Card from '../components/Card';
import Button from '../components/Button';

export default function Pomodoro() {
  // 1. Thêm State để lưu trữ cài đặt thời gian (đơn vị: phút)
  const [durations, setDurations] = useState({
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  // 2. Các State cơ bản giữ nguyên, nhưng lấy giá trị khởi tạo từ durations
  const [time, setTime] = useState(durations.focus * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); 
  const [sessions, setSessionsCompleted] = useState(0);

  // 3. State cho cửa sổ Settings
  const [showSettings, setShowSettings] = useState(false);
  const [tempDurations, setTempDurations] = useState(durations);

  // 4. Biến modes động hóa theo State durations
  const modes = {
    focus: { duration: durations.focus * 60, label: 'Focus Time', color: '#2563EB' },
    shortBreak: { duration: durations.shortBreak * 60, label: 'Short Break', color: '#22C55E' },
    longBreak: { duration: durations.longBreak * 60, label: 'Long Break', color: '#7C3AED' },
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      if (mode === 'focus') {
        setSessionsCompleted(s => s + 1);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, time, mode]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const progress = ((modes[mode].duration - time) / modes[mode].duration) * 100;

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(modes[mode].duration);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setTime(modes[newMode].duration);
    setIsRunning(false);
  };

  // 5. Hàm lưu cài đặt
  const handleSaveSettings = () => {
    setDurations(tempDurations); // Cập nhật thời gian mới
    setTime(tempDurations[mode] * 60); // Cập nhật luôn đồng hồ hiện tại
    setIsRunning(false); // Dừng đồng hồ để tránh nhảy số
    setShowSettings(false); // Đóng modal
  };

  // Mở settings thì copy dữ liệu thật sang dữ liệu tạm
  const handleOpenSettings = () => {
    setTempDurations(durations);
    setShowSettings(true);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1>Pomodoro Timer</h1>
          <p className="text-[16px] text-[#6B7280] mt-2">Stay focused and productive with the Pomodoro Technique</p>
        </div>
        {/* Sửa nút Settings để mở Modal */}
        <Button variant="outline" onClick={handleOpenSettings}>
          <Settings className="w-5 h-5 mr-2" />
          Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timer Card */}
        <Card className="lg:col-span-2 p-12">
          {/* Mode Selector */}
          <div className="flex justify-center gap-4 mb-12">
            {Object.entries(modes).map(([key, { label, color }]) => (
              <button
                key={key}
                onClick={() => handleModeChange(key)}
                className={`px-6 py-2 rounded-[8px] text-[16px] font-medium transition-all ${
                  mode === key
                    ? 'text-white shadow-lg'
                    : 'bg-[#F8FAFC] text-[#6B7280] hover:bg-[#E5E7EB]'
                }`}
                style={mode === key ? { backgroundColor: color } : {}}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Circular Timer */}
          <div className="flex items-center justify-center mb-12">
            <div className="relative">
              <svg className="w-80 h-80 transform -rotate-90">
                <circle
                  cx="160" cy="160" r="140" stroke="#F8FAFC" strokeWidth="12" fill="none"
                />
                <circle
                  cx="160" cy="160" r="140" stroke={modes[mode].color} strokeWidth="12" fill="none"
                  strokeDasharray={`${2 * Math.PI * 140}`}
                  strokeDashoffset={`${2 * Math.PI * 140 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-[72px] font-bold text-[#111827] tabular-nums">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div className="text-[20px] text-[#6B7280] mt-2">
                  {modes[mode].label}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            {!isRunning ? (
              <Button variant="primary" size="lg" onClick={handleStart} className="px-12">
                <Play className="w-6 h-6 mr-2" /> Start
              </Button>
            ) : (
              <Button variant="warning" size="lg" onClick={handlePause} className="px-12">
                <Pause className="w-6 h-6 mr-2" /> Pause
              </Button>
            )}
            <Button variant="outline" size="lg" onClick={handleReset}>
              <RotateCcw className="w-6 h-6 mr-2" /> Reset
            </Button>
          </div>
        </Card>

        {/* Stats & Info - Giữ nguyên không đổi */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-[16px] font-semibold text-[#111827] mb-4">Today's Sessions</h3>
            <div className="text-center py-6">
              <div className="text-[48px] font-bold text-[#2563EB] mb-2">{sessions}</div>
              <p className="text-[14px] text-[#6B7280]">Completed Sessions</p>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`h-2 rounded-full ${i < sessions ? 'bg-[#2563EB]' : 'bg-[#F8FAFC]'}`}></div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-[16px] font-semibold text-[#111827] mb-4">How it Works</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-[#EFF6FF] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[14px] font-semibold text-[#2563EB]">1</span>
                </div>
                <div>
                  <p className="text-[14px] text-[#111827] font-medium">Focus for 25 minutes</p>
                  <p className="text-[12px] text-[#6B7280]">Work on a single task</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-[#F0FDF4] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[14px] font-semibold text-[#22C55E]">2</span>
                </div>
                <div>
                  <p className="text-[14px] text-[#111827] font-medium">Take a 5-minute break</p>
                  <p className="text-[12px] text-[#6B7280]">Relax and recharge</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-[#FAF5FF] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[14px] font-semibold text-[#7C3AED]">3</span>
                </div>
                <div>
                  <p className="text-[14px] text-[#111827] font-medium">After 4 sessions</p>
                  <p className="text-[12px] text-[#6B7280]">Take a 15-minute break</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-[16px] font-semibold text-[#111827] mb-4">Current Task</h3>
            <div className="p-4 bg-[#F8FAFC] rounded-[8px]">
              <p className="text-[14px] font-medium text-[#111827]">Math Assignment - Chapter 5</p>
              <p className="text-[12px] text-[#6B7280] mt-1">Mathematics</p>
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              Change Task
            </Button>
          </Card>
        </div>
      </div>

      {/* GIAO DIỆN MODAL SETTINGS */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <Card className="p-6 w-full max-w-md bg-white shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#111827]">Timer Settings</h2>
              <button onClick={() => setShowSettings(false)} className="text-[#6B7280] hover:text-[#111827]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-1">Focus Time (minutes)</label>
                <input 
                  type="number" 
                  min="1"
                  value={tempDurations.focus}
                  onChange={(e) => setTempDurations({...tempDurations, focus: Number(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-1">Short Break (minutes)</label>
                <input 
                  type="number" 
                  min="1"
                  value={tempDurations.shortBreak}
                  onChange={(e) => setTempDurations({...tempDurations, shortBreak: Number(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B7280] mb-1">Long Break (minutes)</label>
                <input 
                  type="number" 
                  min="1"
                  value={tempDurations.longBreak}
                  onChange={(e) => setTempDurations({...tempDurations, longBreak: Number(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveSettings}>
                Save Changes
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}