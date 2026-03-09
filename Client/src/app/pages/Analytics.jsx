import { TrendingUp, Clock, CheckCircle, Target } from 'lucide-react';
import Card from '../components/Card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Analytics() {
  const weeklyStudyData = [ { day: 'Mon', hours: 4.5 }, { day: 'Tue', hours: 3.2 }, { day: 'Wed', hours: 5.1 }, { day: 'Thu', hours: 2.8 }, { day: 'Fri', hours: 4.0 }, { day: 'Sat', hours: 6.5 }, { day: 'Sun', hours: 3.5 } ];
  const taskCompletionData = [ { month: 'Sep', completed: 45, total: 60 }, { month: 'Oct', completed: 52, total: 65 }, { month: 'Nov', completed: 58, total: 70 }, { month: 'Dec', completed: 48, total: 55 }, { month: 'Jan', completed: 62, total: 75 }, { month: 'Feb', completed: 70, total: 80 } ];
  const subjectDistribution = [ { name: 'Mathematics', value: 30, color: '#2563EB' }, { name: 'Physics', value: 25, color: '#7C3AED' }, { name: 'Biology', value: 20, color: '#22C55E' }, { name: 'Chemistry', value: 15, color: '#F59E0B' }, { name: 'History', value: 10, color: '#EF4444' } ];
  
  const stats = [
    { icon: Clock, label: 'Total Study Time', value: '142h', change: '+12%', color: '#2563EB', bg: '#EFF6FF', darkBg: '#1e3a8a' },
    { icon: CheckCircle, label: 'Tasks Completed', value: '248', change: '+18%', color: '#22C55E', bg: '#F0FDF4', darkBg: '#14532d' },
    { icon: Target, label: 'Goals Achieved', value: '15/20', change: '+5%', color: '#7C3AED', bg: '#FAF5FF', darkBg: '#5b21b6' },
    { icon: TrendingUp, label: 'Avg. Daily Hours', value: '4.2h', change: '+8%', color: '#F59E0B', bg: '#FFFBEB', darkBg: '#78350f' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="dark:text-white">Analytics</h1>
        <p className="text-[16px] text-[#6B7280] dark:text-[#94A3B8] mt-2">Track your study performance and progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-[12px] flex items-center justify-center dark:opacity-80" style={{ backgroundColor: stat.bg }}>
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <span className="px-2 py-1 bg-[#F0FDF4] dark:bg-[#14532d]/40 text-[#22C55E] dark:text-[#4ade80] rounded-[6px] text-[12px] font-medium">
                  {stat.change}
                </span>
              </div>
              <p className="text-[14px] text-[#6B7280] dark:text-[#94A3B8] mb-1">{stat.label}</p>
              <h3 className="text-[28px] font-bold text-[#111827] dark:text-white">{stat.value}</h3>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h2 className="mb-6 dark:text-white">Weekly Study Hours</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyStudyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} className="dark:opacity-20" />
              <XAxis dataKey="day" stroke="#6B7280" tick={{ fill: '#94A3B8' }} />
              <YAxis stroke="#6B7280" tick={{ fill: '#94A3B8' }} />
              <Tooltip cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }} contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} />
              <Bar dataKey="hours" fill="#2563EB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="mb-6 dark:text-white">Subject Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={subjectDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                {subjectDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {subjectDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[14px] text-[#6B7280] dark:text-[#94A3B8]">{item.name}</span>
                </div>
                <span className="text-[14px] font-semibold text-[#111827] dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="mb-6 dark:text-white">Task Completion Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={taskCompletionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} className="dark:opacity-20" />
            <XAxis dataKey="month" stroke="#6B7280" tick={{ fill: '#94A3B8' }} />
            <YAxis stroke="#6B7280" tick={{ fill: '#94A3B8' }} />
            <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="completed" stroke="#22C55E" strokeWidth={3} dot={{ r: 5, fill: '#22C55E' }} name="Completed Tasks" />
            <Line type="monotone" dataKey="total" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: '#6B7280' }} name="Total Tasks" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}