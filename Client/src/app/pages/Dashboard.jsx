import { useState, useEffect } from 'react';
import { Clock, CheckCircle, BookOpen, TrendingUp, Calendar as CalendarIcon, X, ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router'; 
import Card from '../components/Card';
import Button from '../components/Button';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Student');
  const [greeting, setGreeting] = useState('Good Morning');
  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    const loadUserName = () => {
      const editedProfile = localStorage.getItem('userProfile');
      const loginUser = localStorage.getItem('user');

      let fullName = 'Student';
      if (editedProfile) {
        fullName = JSON.parse(editedProfile).name;
      } 
      else if (loginUser) {
        const dbUser = JSON.parse(loginUser);
        fullName = dbUser.fullName || 'Student';
      }
      setUserName(fullName);
    };

    loadUserName();
    window.addEventListener('profileUpdated', loadUserName);

    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }

    return () => window.removeEventListener('profileUpdated', loadUserName);
  }, []);

  const stats = [
    { icon: Clock, label: 'Study Hours Today', value: '4.5h', color: '#2563EB', bg: '#EFF6FF' },
    { icon: CheckCircle, label: 'Tasks Completed', value: '12/18', color: '#22C55E', bg: '#F0FDF4' },
    { icon: BookOpen, label: 'Active Subjects', value: '6', color: '#7C3AED', bg: '#FAF5FF' },
    { icon: TrendingUp, label: 'Weekly Progress', value: '85%', color: '#F59E0B', bg: '#FFFBEB' },
  ];

  const upcomingTasks = [
    { title: 'Complete Math Assignment', subject: 'Mathematics', due: 'Today, 5:00 PM', priority: 'high' },
    { title: 'Read Chapter 5 - Biology', subject: 'Biology', due: 'Tomorrow, 10:00 AM', priority: 'medium' },
    { title: 'Prepare for Physics Quiz', subject: 'Physics', due: 'March 4, 2:00 PM', priority: 'high' },
    { title: 'Submit History Essay', subject: 'History', due: 'March 5, 11:59 PM', priority: 'low' },
  ];

  const studySessions = [
    { subject: 'Mathematics', duration: '2h 30m', time: '9:00 AM - 11:30 AM' },
    { subject: 'Physics', duration: '1h 15m', time: '2:00 PM - 3:15 PM' },
    { subject: 'Biology', duration: '45m', time: '4:00 PM - 4:45 PM' },
  ];

  const priorityColors = {
    high: 'bg-[#EF4444] text-white',
    medium: 'bg-[#F59E0B] text-white',
    low: 'bg-[#22C55E] text-white',
  };

  const todayTimeline = [
    { time: '08:00 AM', title: 'Morning Review', type: 'Review', duration: '1h', color: '#2563EB', bg: '#EFF6FF' },
    { time: '09:00 AM', title: 'Mathematics', type: 'Study Session', duration: '2h 30m', color: '#7C3AED', bg: '#FAF5FF' },
    { time: '12:00 PM', title: 'Lunch & Rest', type: 'Break', duration: '1h', color: '#6B7280', bg: '#F3F4F6' },
    { time: '01:00 PM', title: 'Math Assignment', type: 'Task Deadline', duration: 'Due 5:00 PM', color: '#EF4444', bg: '#FEF2F2' },
    { time: '02:00 PM', title: 'Physics', type: 'Study Session', duration: '1h 15m', color: '#22C55E', bg: '#F0FDF4' },
    { time: '04:00 PM', title: 'Biology', type: 'Study Session', duration: '45m', color: '#F59E0B', bg: '#FFFBEB' },
  ];

  return (
    <div className="space-y-8 relative">
      <Card className="p-8 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] border-none">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">{greeting}, {userName}! 👋</h1>
            <p className="text-white/90 text-[16px]">You have 6 tasks to complete today. Keep up the great work!</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowSchedule(true)}
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 cursor-pointer"
          >
            View Schedule
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[14px] text-[#6B7280] dark:text-[#94A3B8] mb-2">{stat.label}</p>
                  <h3 className="text-[32px] font-bold text-[#111827] dark:text-white">{stat.value}</h3>
                </div>
                <div 
                  className="w-12 h-12 rounded-[12px] flex items-center justify-center dark:!bg-[#0F172A] transition-colors"
                  style={{ backgroundColor: stat.bg }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="dark:text-white">Upcoming Tasks</h2>
            <button 
              onClick={() => navigate('/tasks')}
              className="text-[14px] font-bold text-[#2563EB] dark:text-[#3B82F6] hover:text-[#1d4ed8] dark:hover:text-[#60A5FA] flex items-center gap-1 transition-colors group cursor-pointer px-2 py-1 rounded-md hover:bg-[#EFF6FF] dark:hover:bg-[#0F172A]"
            >
              View All 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 bg-[#F8FAFC] dark:bg-[#0F172A] border border-transparent dark:border-[#334155] rounded-[8px] hover:bg-[#EFF6FF] dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
              >
                <div className="mt-1">
                  <div className="w-5 h-5 border-2 border-[#2563EB] rounded-[4px] hover:bg-[#2563EB] transition-colors cursor-pointer"></div>
                </div>
                <div className="flex-1">
                  <h4 className="text-[16px] font-medium text-[#111827] dark:text-white mb-1">{task.title}</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-[14px] text-[#6B7280] dark:text-[#94A3B8]">{task.subject}</span>
                    <span className="text-[14px] text-[#6B7280] dark:text-[#94A3B8] flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {task.due}
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-[6px] text-[12px] font-medium ${priorityColors[task.priority]}`}>
                  {task.priority.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 flex flex-col">
          <h2 className="mb-6 dark:text-white">Today's Classes</h2>
          <div className="space-y-4 flex-1">
            {studySessions.map((session, index) => (
              <div key={index} className="pb-4 border-b border-[#E5E7EB] dark:border-[#334155] last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[16px] font-medium text-[#111827] dark:text-white">{session.subject}</h4>
                  <span className="text-[14px] font-semibold text-[#2563EB] dark:text-[#3B82F6]">{session.duration}</span>
                </div>
                <p className="text-[14px] text-[#6B7280] dark:text-[#94A3B8]">{session.time}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => navigate('/pomodoro')}
            className="mt-6 w-full py-3.5 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-[12px] font-bold text-[15px] flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-1 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" />
            Start Study Session
          </button>
        </Card>
      </div>

      {showSchedule && (
        <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-hidden flex flex-col transition-colors border dark:border-[#334155]">
            
            <button
              onClick={() => setShowSchedule(false)}
              className="absolute top-6 right-6 text-[#94a3b8] hover:text-[#ef4444] transition-colors cursor-pointer bg-[#f8fafc] dark:bg-[#0F172A] hover:bg-[#fee2e2] dark:hover:bg-red-500/20 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-8">
              <h2 className="text-[24px] font-bold text-[#0f172a] dark:text-white">Today's Schedule</h2>
              <p className="text-[#64748b] dark:text-[#94A3B8] mt-1 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            <div className="overflow-y-auto pr-4 pb-4 custom-scrollbar">
              <div className="relative border-l-2 border-[#e2e8f0] dark:border-[#334155] ml-4 space-y-8 mt-2">
                
                {todayTimeline.map((item, index) => (
                  <div key={index} className="relative pl-8">
                    <div 
                      className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-[4px] border-white dark:border-[#1E293B] shadow-sm"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    
                    <span className="text-[14px] font-bold text-[#475569] dark:text-[#CBD5E1] mb-2 block">{item.time}</span>
                    
                    <div 
                      className="p-4 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer dark:!bg-[#0F172A] dark:!border-[#334155]"
                      style={{ backgroundColor: item.bg, borderColor: `${item.color}30` }}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-[16px] font-bold" style={{ color: item.color }}>{item.title}</h4>
                        <span 
                          className="px-2 py-1 rounded-md text-[12px] font-semibold dark:!bg-[#1E293B] dark:text-white"
                          style={{ backgroundColor: `${item.color}20`, color: item.color }}
                        >
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[14px] flex items-center gap-1 mt-2" style={{ color: `${item.color}90` }}>
                        <Clock className="w-4 h-4" />
                        {item.duration}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="relative pl-8 pt-4">
                  <div className="absolute -left-[9px] top-5 w-4 h-4 rounded-full border-[3px] border-white dark:border-[#1E293B] bg-[#cbd5e1] dark:bg-[#475569]"></div>
                  <span className="text-[14px] font-bold text-[#94a3b8] dark:text-[#64748B] italic">End of day</span>
                </div>
                
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#f1f5f9] dark:border-[#334155] flex justify-end">
              <Button 
                onClick={() => setShowSchedule(false)} 
                style={{ backgroundColor: '#2563EB', color: 'white' }}
                className="cursor-pointer hover:opacity-90 transition-opacity"
              >
                Awesome, Got it!
              </Button>
            </div>
            
          </div>
        </div>
      )}
      
    </div>
  );
}