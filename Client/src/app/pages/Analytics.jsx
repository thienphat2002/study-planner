import { TrendingUp, Clock, CheckCircle, Target } from 'lucide-react';
import Card from '../components/Card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Analytics() {
  const weeklyStudyData = [
    { day: 'Mon', hours: 4.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 5.1 },
    { day: 'Thu', hours: 2.8 },
    { day: 'Fri', hours: 4.0 },
    { day: 'Sat', hours: 6.5 },
    { day: 'Sun', hours: 3.5 },
  ];

  const taskCompletionData = [
    { month: 'Sep', completed: 45, total: 60 },
    { month: 'Oct', completed: 52, total: 65 },
    { month: 'Nov', completed: 58, total: 70 },
    { month: 'Dec', completed: 48, total: 55 },
    { month: 'Jan', completed: 62, total: 75 },
    { month: 'Feb', completed: 70, total: 80 },
  ];

  const subjectDistribution = [
    { name: 'Mathematics', value: 30, color: '#2563EB' },
    { name: 'Physics', value: 25, color: '#7C3AED' },
    { name: 'Biology', value: 20, color: '#22C55E' },
    { name: 'Chemistry', value: 15, color: '#F59E0B' },
    { name: 'History', value: 10, color: '#EF4444' },
  ];

  const stats = [
    { icon: Clock, label: 'Total Study Time', value: '142h', change: '+12%', color: '#2563EB', bg: '#EFF6FF' },
    { icon: CheckCircle, label: 'Tasks Completed', value: '248', change: '+18%', color: '#22C55E', bg: '#F0FDF4' },
    { icon: Target, label: 'Goals Achieved', value: '15/20', change: '+5%', color: '#7C3AED', bg: '#FAF5FF' },
    { icon: TrendingUp, label: 'Avg. Daily Hours', value: '4.2h', change: '+8%', color: '#F59E0B', bg: '#FFFBEB' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Analytics</h1>
        <p className="text-[16px] text-[#6B7280] mt-2">Track your study performance and progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div 
                  className="w-12 h-12 rounded-[12px] flex items-center justify-center"
                  style={{ backgroundColor: stat.bg }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <span className="px-2 py-1 bg-[#F0FDF4] text-[#22C55E] rounded-[6px] text-[12px] font-medium">
                  {stat.change}
                </span>
              </div>
              <p className="text-[14px] text-[#6B7280] mb-1">{stat.label}</p>
              <h3 className="text-[28px] font-bold text-[#111827]">{stat.value}</h3>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Study Hours */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="mb-6">Weekly Study Hours</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyStudyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              />
              <Bar dataKey="hours" fill="#2563EB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Subject Distribution */}
        <Card className="p-6">
          <h2 className="mb-6">Subject Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={subjectDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {subjectDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {subjectDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-[14px] text-[#6B7280]">{item.name}</span>
                </div>
                <span className="text-[14px] font-semibold text-[#111827]">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Task Completion Trend */}
      <Card className="p-6">
        <h2 className="mb-6">Task Completion Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={taskCompletionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="completed" 
              stroke="#22C55E" 
              strokeWidth={3}
              dot={{ r: 5, fill: '#22C55E' }}
              name="Completed Tasks"
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#E5E7EB" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4, fill: '#6B7280' }}
              name="Total Tasks"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
