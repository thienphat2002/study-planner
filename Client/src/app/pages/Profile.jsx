import { useState, useEffect } from 'react';
import { User, Mail, Calendar, Award, Target, TrendingUp, Edit, X, ArrowRight, Plus } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input'; 

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Loading...',
    email: 'Đang tải...',
    joinDate: 'Đang tải...',
    avatar: 'U',
    avatarUrl: '' 
  });

  const [goals, setGoals] = useState([
    { id: 1, title: 'Study 30 hours this week', current: 22, target: 30, color: '#2563EB' },
    { id: 2, title: 'Complete 20 tasks', current: 15, target: 20, color: '#22C55E' },
    { id: 3, title: 'Master 5 subjects', current: 3, target: 5, color: '#7C3AED' },
    { id: 4, title: 'Read 2 technical books', current: 1, target: 2, color: '#F59E0B' }, 
  ]);
  const [showAllGoals, setShowAllGoals] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', target: '', color: '#2563EB' });
  const colors = ['#2563EB', '#7C3AED', '#22C55E', '#F59E0B', '#EF4444', '#06B6D4'];

  const displayedGoals = showAllGoals ? goals : goals.slice(0, 3); 

  useEffect(() => {
    const loginUser = localStorage.getItem('user');
    const editedProfile = localStorage.getItem('userProfile');

    let dbUser = {};
    if (loginUser) {
      dbUser = JSON.parse(loginUser);
    }

    const realEmail = dbUser.email || 'Chưa cập nhật email';
    let formattedDate = 'Chưa có thông tin';
    if (dbUser.createdAt) {
      const date = new Date(dbUser.createdAt);
      formattedDate = date.toLocaleString('vi-VN', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        day: '2-digit', month: '2-digit', year: 'numeric'
      }).replace(' ', ' - '); 
    }

    const fullName = dbUser.fullName || 'User';
    const nameParts = fullName.trim().split(' ');
    let initials = 'U';
    if (nameParts.length >= 2) {
      initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    } else {
      initials = fullName.substring(0, 2).toUpperCase();
    }

    if (editedProfile) {
      const parsed = JSON.parse(editedProfile);
      setProfile({
        name: parsed.name,
        email: realEmail, 
        joinDate: formattedDate, 
        avatar: parsed.avatar,
        avatarUrl: parsed.avatarUrl || ''
      });
    } else {
      setProfile({
        name: fullName,
        email: realEmail,
        joinDate: formattedDate,
        avatar: initials,
        avatarUrl: ''
      });
    }
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [isViewingImage, setIsViewingImage] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', avatar: '', avatarUrl: '' });

  const handleEditClick = () => {
    setEditForm({ 
      name: profile.name, 
      avatar: profile.avatar,
      avatarUrl: profile.avatarUrl 
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    const updated = { 
      ...profile, 
      name: editForm.name, 
      avatar: editForm.avatar,
      avatarUrl: editForm.avatarUrl 
    };
    setProfile(updated);
    setIsEditing(false);
    localStorage.setItem('userProfile', JSON.stringify(updated));
    window.dispatchEvent(new Event('profileUpdated'));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, avatarUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target) return; 
    const goalToAdd = {
      id: Date.now(),
      title: newGoal.title,
      current: 0,
      target: parseInt(newGoal.target),
      color: newGoal.color
    };
    setGoals([...goals, goalToAdd]);
    setIsGoalModalOpen(false);
    setNewGoal({ title: '', target: '', color: '#2563EB' }); 
  };

  const achievements = [
    { icon: '🎯', title: '7-Day Streak', description: 'Studied for 7 consecutive days', color: '#2563EB' },
    { icon: '⚡', title: 'Early Bird', description: 'Started studying before 8 AM', color: '#F59E0B' },
    { icon: '🏆', title: 'Task Master', description: 'Completed 100 tasks', color: '#22C55E' },
    { icon: '📚', title: 'Bookworm', description: 'Logged 50+ study hours', color: '#7C3AED' },
  ];

  const stats = [
    { label: 'Total Study Hours', value: '142h', icon: TrendingUp, color: '#2563EB' },
    { label: 'Tasks Completed', value: '248', icon: Target, color: '#22C55E' },
    { label: 'Current Streak', value: '12 days', icon: Award, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <h1 className="dark:text-white">Profile</h1>
        <button 
          onClick={handleEditClick}
          className="flex flex-row items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155] text-[#475569] dark:text-[#CBD5E1] rounded-[8px] hover:bg-[#F8FAFC] dark:hover:bg-[#334155] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
        >
          <Edit className="w-4 h-4 flex-shrink-0" />
          <span className="font-semibold text-[14px] leading-none">Edit Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 p-6">
          <div className="flex flex-col items-center mb-6">
            <div 
              className={`w-24 h-24 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-full flex items-center justify-center mb-4 overflow-hidden shadow-md transition-all ${profile.avatarUrl ? 'cursor-pointer hover:ring-4 hover:ring-[#2563EB]/30' : ''}`}
              onClick={() => {
                if (profile.avatarUrl) setIsViewingImage(true);
              }}
            >
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[32px] font-bold text-white">{profile.avatar}</span>
              )}
            </div>
            <h2 className="text-center mb-1 dark:text-white">{profile.name}</h2>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#E5E7EB] dark:border-[#334155]">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#6B7280] dark:text-[#94A3B8]" />
              <div>
                <p className="text-[12px] text-[#6B7280] dark:text-[#64748B]">Email</p>
                <p className="text-[14px] text-[#111827] dark:text-[#CBD5E1]">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#6B7280] dark:text-[#94A3B8]" />
              <div>
                <p className="text-[12px] text-[#6B7280] dark:text-[#64748B]">Member Since</p>
                <p className="text-[14px] text-[#111827] dark:text-[#CBD5E1]">{profile.joinDate}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-6 pt-6 border-t border-[#E5E7EB] dark:border-[#334155]">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-[#F8FAFC] dark:bg-[#0F172A] rounded-[8px] border border-transparent dark:border-[#334155]">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    <span className="text-[14px] text-[#6B7280] dark:text-[#94A3B8]">{stat.label}</span>
                  </div>
                  <span className="text-[16px] font-semibold text-[#111827] dark:text-white">{stat.value}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="dark:text-white">Current Goals</h2>
              
              {goals.length > 3 && (
                <button 
                  onClick={() => setShowAllGoals(!showAllGoals)}
                  className="text-[14px] font-bold text-[#2563EB] dark:text-[#60A5FA] hover:text-[#1d4ed8] dark:hover:text-[#93C5FD] flex items-center gap-1 transition-colors group cursor-pointer px-2 py-1 rounded-md hover:bg-[#EFF6FF] dark:hover:bg-[#1E293B]"
                >
                  {showAllGoals ? 'View Less' : 'View All'} 
                  <ArrowRight className={`w-4 h-4 transition-transform ${showAllGoals ? 'rotate-180' : 'group-hover:translate-x-1'}`} />
                </button>
              )}
            </div>

            <div className="space-y-4 animate-in fade-in duration-300">
              {displayedGoals.map((goal) => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={goal.id}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-[16px] font-medium text-[#111827] dark:text-white">{goal.title}</h4>
                      <span className="text-[14px] font-semibold" style={{ color: goal.color }}>
                        {goal.current}/{goal.target}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-[#F8FAFC] dark:bg-[#0F172A] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%`, backgroundColor: goal.color }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => setIsGoalModalOpen(true)}
              className="mt-6 w-full py-3.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-2 border-dashed border-[#E5E7EB] dark:border-[#334155] text-[#2563EB] dark:text-[#60A5FA] rounded-[12px] font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-[#EFF6FF] dark:hover:bg-[#1E293B] hover:border-[#2563EB] dark:hover:border-[#60A5FA] transition-all cursor-pointer"
            >
              <Plus className="w-5 h-5" strokeWidth={2.5} />
              Add New Goal
            </button>
          </Card>

          <Card className="p-6">
            <h2 className="mb-6 dark:text-white">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-4 border-2 border-[#E5E7EB] dark:border-[#334155] rounded-[12px] hover:border-[#2563EB] dark:hover:border-[#60A5FA] hover:shadow-lg transition-all cursor-pointer bg-white dark:bg-[#1E293B]">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-12 h-12 rounded-[12px] flex items-center justify-center text-2xl flex-shrink-0 dark:opacity-80"
                      style={{ backgroundColor: `${achievement.color}20` }}
                    >
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-1">{achievement.title}</h4>
                      <p className="text-[14px] text-[#6B7280] dark:text-[#94A3B8]">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-6 dark:text-white">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex gap-4 pb-4 border-b border-[#E5E7EB] dark:border-[#334155]">
                <div className="w-2 h-2 bg-[#2563EB] rounded-full mt-2 shadow-[0_0_8px_#2563EB]"></div>
                <div className="flex-1">
                  <p className="text-[14px] text-[#111827] dark:text-[#E2E8F0] font-medium">Completed "Math Assignment - Chapter 5"</p>
                  <p className="text-[12px] text-[#6B7280] dark:text-[#64748B] mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4 pb-4 border-b border-[#E5E7EB] dark:border-[#334155]">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full mt-2 shadow-[0_0_8px_#22C55E]"></div>
                <div className="flex-1">
                  <p className="text-[14px] text-[#111827] dark:text-[#E2E8F0] font-medium">Studied Physics for 2 hours</p>
                  <p className="text-[12px] text-[#6B7280] dark:text-[#64748B] mt-1">5 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4 pb-4 border-b border-[#E5E7EB] dark:border-[#334155]">
                <div className="w-2 h-2 bg-[#F59E0B] rounded-full mt-2 shadow-[0_0_8px_#F59E0B]"></div>
                <div className="flex-1">
                  <p className="text-[14px] text-[#111827] dark:text-[#E2E8F0] font-medium">Achieved "7-Day Streak" badge</p>
                  <p className="text-[12px] text-[#6B7280] dark:text-[#64748B] mt-1">Yesterday</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* MODAL SỬA PROFILE */}
      {isEditing && (
        <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E293B] border dark:border-[#334155] rounded-[24px] p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 text-[#94a3b8] hover:text-[#ef4444] transition-colors cursor-pointer bg-[#f8fafc] dark:bg-[#0F172A] hover:bg-[#fee2e2] dark:hover:bg-red-500/20 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-[#111827] dark:text-white">Edit Profile</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-[14px] font-medium text-[#374151] dark:text-white mb-2">Profile Picture</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] rounded-full flex items-center justify-center overflow-hidden shrink-0">
                    {editForm.avatarUrl ? (
                      <img src={editForm.avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[20px] font-bold text-[#6B7280] dark:text-[#94A3B8]">{editForm.avatar || 'JD'}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-[#6B7280] dark:text-[#94A3B8] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#EFF6FF] dark:file:bg-[#1e3a8a]/40 file:text-[#2563EB] dark:file:text-[#60A5FA] hover:file:bg-[#DBEAFE] dark:hover:file:bg-[#1e3a8a]/60 transition-all cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <Input 
                label="Full Name" 
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Enter your full name"
              />
              <Input 
                label="Avatar Initials" 
                maxLength={2}
                value={editForm.avatar}
                onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value.toUpperCase() })}
                placeholder="e.g. TP"
              />
              <div className="pt-4 flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)} className="cursor-pointer px-6">
                  <span className="font-semibold">Cancel</span>
                </Button>
                <button 
                  onClick={handleSave}
                  className="flex flex-row items-center justify-center px-6 py-2.5 bg-[#2563EB] text-white rounded-[10px] shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#1d4ed8] cursor-pointer whitespace-nowrap"
                >
                  <span className="font-semibold text-[15px] leading-none">Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL THÊM GOAL */}
      {isGoalModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E293B] border dark:border-[#334155] rounded-3xl p-8 w-full max-w-[450px] shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsGoalModalOpen(false)}
              className="absolute top-6 right-6 text-[#94a3b8] hover:text-[#ef4444] transition-colors cursor-pointer bg-[#f8fafc] dark:bg-[#0F172A] hover:bg-[#fee2e2] dark:hover:bg-red-500/20 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-[24px] font-bold text-[#0f172a] dark:text-white">Create New Goal</h2>
              <p className="text-[#64748b] dark:text-[#94A3B8] text-[14px] mt-1">Set a target to keep yourself motivated.</p>
            </div>
            
            <div className="space-y-6">
              <Input 
                label="Goal Title" 
                placeholder="e.g., Read 3 books this month" 
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
              />
              
              <Input 
                label="Target Amount (Number)" 
                type="number" 
                placeholder="e.g., 3" 
                value={newGoal.target}
                onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
              />

              <div>
                <label className="block text-[14px] font-medium text-[#111827] dark:text-white mb-3">Goal Theme Color</label>
                <div className="flex gap-3 flex-wrap">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setNewGoal({...newGoal, color})}
                      className={`w-10 h-10 rounded-full transition-all cursor-pointer shadow-sm ${
                        newGoal.color === color ? 'ring-4 ring-offset-2 dark:ring-offset-[#1E293B] scale-110' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: color, ringColor: `${color}50` }}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#f1f5f9] dark:border-[#334155] flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setIsGoalModalOpen(false)} className="cursor-pointer px-6">
                  <span className="font-semibold">Cancel</span>
                </Button>
                <button 
                  onClick={handleAddGoal}
                  className="flex flex-row items-center justify-center gap-2 px-6 py-2.5 text-white rounded-[10px] shadow-md transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: newGoal.color }}
                >
                  <Plus className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
                  <span className="font-semibold text-[15px] leading-none">Add Goal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL XEM ẢNH FULL SIZE */}
      {isViewingImage && profile.avatarUrl && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsViewingImage(false)} 
        >
          <button
            onClick={() => setIsViewingImage(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all cursor-pointer z-50"
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={profile.avatarUrl} 
            alt="Full Avatar" 
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl animate-in zoom-in duration-200 cursor-default"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
}