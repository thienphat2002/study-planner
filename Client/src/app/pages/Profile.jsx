import { useState, useEffect } from 'react';
import { User, Mail, Calendar, Award, Target, TrendingUp, Edit, X, Upload } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Loading...',
    email: '...',
    joinDate: '...',
    major: 'Computer Science',
    avatar: 'U',
    avatarUrl: '' 
  });

  // Tự động lấy dữ liệu DB lúc vừa vào trang Profile
  useEffect(() => {
    const loginUser = localStorage.getItem('user');
    const editedProfile = localStorage.getItem('userProfile');

    let dbUser = {};
    if (loginUser) dbUser = JSON.parse(loginUser);

    // 1. Dịch ngày tháng từ DB (createdAt) ra chữ cho đẹp
    let formattedDate = 'Recently';
    if (dbUser.createdAt) {
      const date = new Date(dbUser.createdAt);
      formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    // 2. Tạo Avatar viết tắt
    const fullName = dbUser.fullName || 'Unknown User';
    const nameParts = fullName.trim().split(' ');
    let initials = 'U';
    if (nameParts.length >= 2) {
      initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    } else {
      initials = fullName.substring(0, 2).toUpperCase();
    }

    // 3. Đắp dữ liệu vào Profile
    if (editedProfile) {
      const parsed = JSON.parse(editedProfile);
      setProfile({
        name: parsed.name,
        email: dbUser.email || 'No email',
        joinDate: formattedDate,
        major: 'Computer Science',
        avatar: parsed.avatar,
        avatarUrl: parsed.avatarUrl || ''
      });
    } else {
      setProfile({
        name: fullName,
        email: dbUser.email || 'No email',
        joinDate: formattedDate,
        major: 'Computer Science',
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

    // Lưu lại và báo cho Navbar biết
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
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <h1>Profile</h1>
        <Button variant="outline" onClick={handleEditClick}>
          <Edit className="w-5 h-5 mr-2" />
          Edit Profile
        </Button>
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
            <h2 className="text-center mb-1">{profile.name}</h2>
            <p className="text-[14px] text-[#6B7280] text-center">{profile.major}</p>
          </div>

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
            {/* ĐÃ XÓA PHẦN GRADE THEO YÊU CẦU */}
          </div>

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

        <div className="lg:col-span-2 space-y-6">
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
                        style={{ width: `${progress}%`, backgroundColor: goal.color }}
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

          <Card className="p-6">
            <h2 className="mb-6">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-4 border-2 border-[#E5E7EB] rounded-[12px] hover:border-[#2563EB] hover:shadow-lg transition-all cursor-pointer">
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

      {/* MODAL SỬA PROFILE */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 text-[#6B7280] hover:text-[#EF4444] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 text-[#111827]">Edit Profile</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Profile Picture</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#F8FAFC] border border-[#E5E7EB] rounded-full flex items-center justify-center overflow-hidden shrink-0">
                    {editForm.avatarUrl ? (
                      <img src={editForm.avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[20px] font-bold text-[#6B7280]">{editForm.avatar || 'JD'}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-[#6B7280]
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#EFF6FF] file:text-[#2563EB]
                        hover:file:bg-[#DBEAFE] transition-all cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full h-[48px] px-4 rounded-[12px] border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all text-[#111827]"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#374151] mb-2">Avatar Initials</label>
                <input
                  type="text"
                  maxLength={2}
                  value={editForm.avatar}
                  onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value.toUpperCase() })}
                  className="w-full h-[48px] px-4 rounded-[12px] border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all text-[#111827]"
                  placeholder="e.g. TP"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  style={{ backgroundColor: '#2563EB', color: 'white' }}
                >
                  Save Changes
                </Button>
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