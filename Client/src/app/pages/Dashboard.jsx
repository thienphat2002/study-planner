import { Clock, CheckCircle, BookOpen, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Dashboard() {
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

  return (
    <div className="space-y-8">
      {/* Greeting Card */}
      <Card className="p-8 bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">Good Morning, John! 👋</h1>
            <p className="text-white/90 text-[16px]">You have 6 tasks to complete today. Keep up the great work!</p>
          </div>
          <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
            View Schedule
          </Button>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[14px] text-[#6B7280] mb-2">{stat.label}</p>
                  <h3 className="text-[32px] font-bold text-[#111827]">{stat.value}</h3>
                </div>
                <div 
                  className="w-12 h-12 rounded-[12px] flex items-center justify-center"
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
        {/* Upcoming Tasks */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2>Upcoming Tasks</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 bg-[#F8FAFC] rounded-[8px] hover:bg-[#EFF6FF] transition-colors cursor-pointer"
              >
                <div className="mt-1">
                  <div className="w-5 h-5 border-2 border-[#2563EB] rounded-[4px] hover:bg-[#2563EB] transition-colors cursor-pointer"></div>
                </div>
                <div className="flex-1">
                  <h4 className="text-[16px] font-medium text-[#111827] mb-1">{task.title}</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-[14px] text-[#6B7280]">{task.subject}</span>
                    <span className="text-[14px] text-[#6B7280] flex items-center gap-1">
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

        {/* Study Summary */}
        <Card className="p-6">
          <h2 className="mb-6">Today's Study Sessions</h2>
          <div className="space-y-4">
            {studySessions.map((session, index) => (
              <div key={index} className="pb-4 border-b border-[#E5E7EB] last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[16px] font-medium text-[#111827]">{session.subject}</h4>
                  <span className="text-[14px] font-semibold text-[#2563EB]">{session.duration}</span>
                </div>
                <p className="text-[14px] text-[#6B7280]">{session.time}</p>
              </div>
            ))}
            <Button variant="primary" className="w-full mt-4">
              Start Study Session
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
