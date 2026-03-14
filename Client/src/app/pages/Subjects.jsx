import { Plus, BookOpen, Clock, X, Loader2, Trash2, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import Input from '../components/Input';

export default function Subjects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#2563EB');

  // --- STATE TOAST NOTIFICATION ---
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // --- STATE DỮ LIỆU THỰC ---
  const [subjects, setSubjects] = useState([]); 
  const [loadingData, setLoadingData] = useState(true); 

  // --- STATE FORM NHẬP ---
  const [subjectName, setSubjectName] = useState('');
  const [targetHours, setTargetHours] = useState('');
  const [iconEmoji, setIconEmoji] = useState('📚');
  const [loadingAdd, setLoadingAdd] = useState(false); 

  // --- STATE XÓA MÔN HỌC ---
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const colors = ['#2563EB', '#7C3AED', '#22C55E', '#F59E0B', '#EF4444', '#06B6D4', '#8B5CF6', '#EC4899'];

  // --- HELPER SHOW TOAST ---
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000); 
  };

  const fetchSubjects = async () => {
    setLoadingData(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/v1/subjects/getSubject', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (response.ok) {
        setSubjects(result.data || []); 
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách môn học:", error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // --- LOGIC THÊM MÔN HỌC ---
  const handleAddSubject = async () => {
    if (!subjectName.trim()) {
      return showToast("Please enter a subject name!", "warning");
    }

    // 1. KIỂM TRA TRÙNG MÔN HỌC
    const isDuplicate = subjects.some(
      (sub) => sub.name.trim().toLowerCase() === subjectName.trim().toLowerCase()
    );
    if (isDuplicate) {
      return showToast(`Subject "${subjectName.trim()}" already exists!`, "error");
    }
    
    setLoadingAdd(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/v1/subjects/createSubject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: subjectName.trim(),
          weeklyStudyHours: parseInt(targetHours) || 0, 
          colorCode: selectedColor,
          icon: iconEmoji
        })
      });

      if (response.ok) {
        setIsModalOpen(false);
        setSubjectName('');
        setTargetHours('');
        setIconEmoji('📚');
        fetchSubjects(); 
        showToast("Subject added successfully!", "success");
      } else {
        const errorData = await response.json();
        showToast(errorData.message || "Failed to add subject", "error");
      }
    } catch (error) {
      showToast("Server connection error", "error");
    } finally {
      setLoadingAdd(false);
    }
  };

  // --- LOGIC BẬT POPUP XÓA ---
  const triggerDelete = (e, subject) => {
    e.stopPropagation(); 
    setSubjectToDelete(subject);
    setIsDeleteModalOpen(true);
  };

  // --- LOGIC XÁC NHẬN XÓA (GỌI API) ---
  const confirmDeleteSubject = async () => {
    if (!subjectToDelete) return;
    setLoadingDelete(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/v1/subjects/deleteSubject/${subjectToDelete.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setIsDeleteModalOpen(false);
        setSubjectToDelete(null);
        fetchSubjects(); 
        showToast("Subject deleted successfully!", "success");
      } else {
        const errorData = await response.json();
        showToast(errorData.message || "Failed to delete subject", "error");
      }
    } catch (error) {
      showToast("Server connection error", "error");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      
      {/* --- TOAST NOTIFICATION --- */}
      {toast.show && (
        <div className={`fixed top-24 right-8 z-[200] flex items-center gap-3 px-5 py-4 rounded-[12px] shadow-2xl animate-in slide-in-from-right-8 fade-in duration-300 ${
          toast.type === 'error' ? 'bg-red-500 text-white' : 
          toast.type === 'warning' ? 'bg-amber-500 text-white' : 
          'bg-[#10B981] text-white'
        }`}>
          {toast.type === 'error' ? <AlertCircle size={22} /> : 
           toast.type === 'warning' ? <AlertTriangle size={22} /> : 
           <CheckCircle2 size={22} />}
          <span className="font-medium text-[14px] pr-2">{toast.message}</span>
          <button onClick={() => setToast({ show: false, message: '', type: 'success' })} className="ml-auto opacity-70 hover:opacity-100 cursor-pointer">
            <X size={18} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="dark:text-white">Subjects</h1>
          <p className="text-[16px] text-[#6B7280] dark:text-[#94A3B8] mt-2">Manage your study subjects and track progress</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex flex-row items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-[8px] hover:bg-primary/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
          <span className="font-semibold text-[15px] leading-none">Add Subject</span>
        </button>
      </div>

      {loadingData ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
          <p className="text-[#6B7280] dark:text-[#94A3B8]">Loading your subjects...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card key={subject.id} className="p-6 hover:shadow-xl transition-shadow cursor-pointer group relative">
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-[12px] flex items-center justify-center text-2xl dark:opacity-80" 
                  style={{ backgroundColor: `${subject.colorCode || '#2563EB'}20` }}
                >
                  {subject.icon || '📚'}
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={(e) => triggerDelete(e, subject)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-100 dark:hover:bg-red-500/20 shadow-sm"
                    title="Delete Subject"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div 
                    className="w-2 h-2 rounded-full group-hover:scale-150 transition-transform" 
                    style={{ backgroundColor: subject.colorCode || '#2563EB' }}
                  ></div>
                </div>

              </div>
              <h3 className="text-[20px] font-semibold text-[#111827] dark:text-white mb-4">{subject.name}</h3>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] text-[#6B7280] dark:text-[#94A3B8]">Progress</span>
                  <span className="text-[14px] font-semibold" style={{ color: subject.colorCode || '#2563EB' }}>
                    {subject.progress || 0}%
                  </span>
                </div>
                <div className="w-full h-2 bg-[#F8FAFC] dark:bg-[#0F172A] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${subject.progress || 0}%`, backgroundColor: subject.colorCode || '#2563EB' }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB] dark:border-[#334155]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-[#6B7280] dark:text-[#94A3B8]" />
                    <span className="text-[12px] text-[#6B7280] dark:text-[#94A3B8]">Study Hours</span>
                  </div>
                  <p className="text-[16px] font-semibold text-[#111827] dark:text-white">
                    {subject.weeklyStudyHours || 0}h
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-[#6B7280] dark:text-[#94A3B8]" />
                    <span className="text-[12px] text-[#6B7280] dark:text-[#94A3B8]">Tasks</span>
                  </div>
                  <p className="text-[16px] font-semibold text-[#111827] dark:text-white">
                    {subject.totalTasks || 0}
                  </p>
                </div>
              </div>
            </Card>
          ))}

          <Card 
            className="p-6 border-2 border-dashed border-[#E5E7EB] dark:border-[#334155] hover:border-primary dark:hover:border-primary bg-transparent hover:bg-[#EFF6FF] dark:hover:bg-[#1e3a8a]/20 transition-all cursor-pointer flex items-center justify-center min-h-[280px]"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-[#EFF6FF] dark:bg-[#1e3a8a]/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-primary dark:text-[#60A5FA]" />
              </div>
              <h3 className="text-[16px] font-medium text-[#111827] dark:text-white mb-1">Add New Subject</h3>
              <p className="text-[14px] text-[#6B7280] dark:text-[#94A3B8]">Start tracking a new subject</p>
            </div>
          </Card>
        </div>
      )}

      {/* --- POPUP XÁC NHẬN XÓA MÔN HỌC --- */}
      {isDeleteModalOpen && subjectToDelete && (
        <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E293B] border dark:border-[#334155] rounded-3xl p-8 w-full max-w-[440px] shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FEF2F2] dark:bg-[#451a1a] rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="w-8 h-8 text-[#EF4444]" />
              </div>
              <h2 className="text-[24px] font-bold text-[#111827] dark:text-white mb-2">Delete Subject?</h2>
              <p className="text-[#6B7280] dark:text-[#94A3B8] text-[15px] leading-relaxed">
                Are you sure you want to delete <span className="font-semibold text-gray-800 dark:text-gray-200">"{subjectToDelete.name}"</span>? All related tasks might also be affected. This action cannot be undone.
              </p>
            </div>
            
            <div className="flex gap-3 mt-10">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-6 py-3 bg-[#F8FAFC] dark:bg-[#0F172A] text-[#475569] dark:text-[#CBD5E1] font-bold rounded-xl border border-[#E5E7EB] dark:border-[#334155] hover:bg-[#F1F5F9] dark:hover:bg-[#1e293b] transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteSubject}
                disabled={loadingDelete}
                className={`flex-1 flex justify-center items-center px-6 py-3 bg-[#EF4444] text-white font-bold rounded-xl shadow-lg shadow-red-500/20 hover:bg-[#dc2626] hover:-translate-y-0.5 transition-all cursor-pointer ${loadingDelete ? 'opacity-50' : ''}`}
              >
                {loadingDelete ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- POPUP THÊM MỚI MÔN HỌC --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E293B] dark:border dark:border-[#334155] rounded-3xl p-8 w-full max-w-[450px] shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-[#94a3b8] hover:text-[#ef4444] transition-colors cursor-pointer bg-[#f8fafc] dark:bg-[#0F172A] hover:bg-[#fee2e2] dark:hover:bg-red-500/20 p-2 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <div className="mb-6">
              <h2 className="text-[24px] font-bold text-[#0f172a] dark:text-white">Add New Subject</h2>
              <p className="text-[#64748b] dark:text-[#94A3B8] text-[14px] mt-1">Expand your knowledge.</p>
            </div>
            <div className="space-y-6">
              <Input label="Subject Name" placeholder="e.g., Math" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Target (hours/week)" type="number" placeholder="10" value={targetHours} onChange={(e) => setTargetHours(e.target.value)} />
                <Input label="Icon (Emoji)" placeholder="⚛️" value={iconEmoji} onChange={(e) => setIconEmoji(e.target.value)} />
              </div>
              
              <div>
                <label className="block text-[14px] font-medium text-[#111827] dark:text-gray-200 mb-3">Theme Color</label>
                <div className="flex gap-3">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full hover:scale-110 transition-all cursor-pointer shadow-sm ${
                        selectedColor === color ? 'ring-2 ring-offset-2 dark:ring-offset-[#1E293B]' : ''
                      }`}
                      style={{ backgroundColor: color, ringColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-[#f1f5f9] dark:border-[#334155] flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="cursor-pointer px-6 dark:border-[#475569] dark:text-[#CBD5E1]">Cancel</Button>
                <button 
                  onClick={handleAddSubject}
                  disabled={loadingAdd}
                  className={`flex flex-row items-center justify-center gap-2 px-6 py-2.5 text-white rounded-[10px] shadow-md transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap ${loadingAdd ? 'opacity-50' : ''}`}
                  style={{ backgroundColor: selectedColor }}
                >
                  {loadingAdd ? 'Adding...' : 'Add Subject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}