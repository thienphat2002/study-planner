import { User, Mail, Calendar, Award, Target, TrendingUp, Edit } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Profile() {
  const profile = {
    name: 'John Doe',
    email: 'john.doe@university.edu',
    joinDate: 'January 15, 2026',
    grade: 'Junior',
    major: 'Computer Science',
    avatar: 'JD'
  };

  const achievements = [
    { icon: '🎯', title: '7-Day Streak', description: 'Studied for 7 consecutive days', color: '#2563EB' },
    { icon: '⚡', title: 'Early Bird', description: 'Started studying before 8 AM', color: '#F59E0B' },
    { icon: '🏆', title: 'Task Master', description: 'Completed 100 tasks', color: '#22C55E' },
    { icon: '📚', title: 'Bookworm', description: 'Logged 50+ study hours', color: '#7C3AED' },
  ];

  const goals = [
    { title: 'Study 30 hours this week', current: 22, target: 30, color: '#2563EB' },
    { title: 'Complete 20 tasks', current: 15, target: 20, color: '#22C55E' },
    { title: 'Master 5 subjects', current: 3, target: 5, color: '#7C3AED' },
  ];

  const stats = [
    { label: 'Total Study Hours', value: '142h', icon: TrendingUp, color: '#2563EB' },
    { label: 'Tasks Completed', value: '248', icon: Target, color: '#22C55E' },
    { label: 'Current Streak', value: '12 days', icon: Award, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>Profile</h1>
        <Button variant="outline">
          <Edit className="w-5 h-5 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <Card className="lg:col-span-1 p-6">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center mb-4">
              <span className="text-[32px] font-bold text-white">{profile.avatar}</span>
            </div>
            <h2 className="text-center mb-1">{profile.name}</h2>
            <p className="text-[14px] text-[#6B7280] text-center">{profile.major}</p>
          </div>

          {/* Info */}
          <div className="space-y-3 pt-6 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#6B7280]" />
              <div>
                <p className="text-[12px] text-[#6B7280]">Email</p>
                <p className="text-[14px] text-[#111827]">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#6B7280]" />
              <div>
                <p className="text-[12px] text-[#6B7280]">Member Since</p>
                <p className="text-[14px] text-[#111827]">{profile.joinDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-[#6B7280]" />
              <div>
                <p className="text-[12px] text-[#6B7280]">Grade</p>
                <p className="text-[14px] text-[#111827]">{profile.grade}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 mt-6 pt-6 border-t border-[#E5E7EB]">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-[8px]">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    <span className="text-[14px] text-[#6B7280]">{stat.label}</span>
                  </div>
                  <span className="text-[16px] font-semibold text-[#111827]">{stat.value}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Goals & Achievements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Goals */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2>Current Goals</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {goals.map((goal, index) => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-[16px] font-medium text-[#111827]">{goal.title}</h4>
                      <span className="text-[14px] font-semibold" style={{ color: goal.color }}>
                        {goal.current}/{goal.target}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-[#F8FAFC] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${progress}%`,
                          backgroundColor: goal.color 
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button variant="primary" className="w-full mt-6">
              Add New Goal
            </Button>
          </Card>

          {/* Achievements */}
          <Card className="p-6">
            <h2 className="mb-6">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="p-4 border-2 border-[#E5E7EB] rounded-[12px] hover:border-[#2563EB] hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-12 h-12 rounded-[12px] flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ backgroundColor: `${achievement.color}15` }}
                    >
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[16px] font-semibold text-[#111827] mb-1">{achievement.title}</h4>
                      <p className="text-[14px] text-[#6B7280]">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex gap-4 pb-4 border-b border-[#E5E7EB]">
                <div className="w-2 h-2 bg-[#2563EB] rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-[14px] text-[#111827] font-medium">Completed "Math Assignment - Chapter 5"</p>
                  <p className="text-[12px] text-[#6B7280]">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4 pb-4 border-b border-[#E5E7EB]">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-[14px] text-[#111827] font-medium">Studied Physics for 2 hours</p>
                  <p className="text-[12px] text-[#6B7280]">5 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4 pb-4 border-b border-[#E5E7EB]">
                <div className="w-2 h-2 bg-[#F59E0B] rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-[14px] text-[#111827] font-medium">Achieved "7-Day Streak" badge</p>
                  <p className="text-[12px] text-[#6B7280]">Yesterday</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#7C3AED] rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-[14px] text-[#111827] font-medium">Added new subject "Chemistry"</p>
                  <p className="text-[12px] text-[#6B7280]">2 days ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
