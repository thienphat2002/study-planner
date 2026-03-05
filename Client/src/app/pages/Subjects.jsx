import { Plus, BookOpen, Clock, TrendingUp } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useState } from 'react';
import Modal from '../components/Modal';
import Input from '../components/Input';

export default function Subjects() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const subjects = [
    { 
      id: 1, 
      name: 'Mathematics', 
      color: '#2563EB', 
      progress: 85, 
      hours: 24,
      topics: 12,
      icon: '📐'
    },
    { 
      id: 2, 
      name: 'Physics', 
      color: '#7C3AED', 
      progress: 72, 
      hours: 18,
      topics: 10,
      icon: '⚛️'
    },
    { 
      id: 3, 
      name: 'Biology', 
      color: '#22C55E', 
      progress: 90, 
      hours: 20,
      topics: 15,
      icon: '🧬'
    },
    { 
      id: 4, 
      name: 'Chemistry', 
      color: '#F59E0B', 
      progress: 65, 
      hours: 16,
      topics: 8,
      icon: '🧪'
    },
    { 
      id: 5, 
      name: 'History', 
      color: '#EF4444', 
      progress: 78, 
      hours: 14,
      topics: 9,
      icon: '📚'
    },
    { 
      id: 6, 
      name: 'English', 
      color: '#06B6D4', 
      progress: 88, 
      hours: 22,
      topics: 11,
      icon: '✍️'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Subjects</h1>
          <p className="text-[16px] text-[#6B7280] mt-2">Manage your study subjects and track progress</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Subject
        </Button>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.id} className="p-6 hover:shadow-xl transition-shadow cursor-pointer group">
            {/* Subject Header */}
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-[12px] flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${subject.color}20` }}
              >
                {subject.icon}
              </div>
              <div 
                className="w-2 h-2 rounded-full group-hover:scale-150 transition-transform"
                style={{ backgroundColor: subject.color }}
              ></div>
            </div>

            {/* Subject Name */}
            <h3 className="text-[20px] font-semibold text-[#111827] mb-4">{subject.name}</h3>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] text-[#6B7280]">Progress</span>
                <span className="text-[14px] font-semibold" style={{ color: subject.color }}>
                  {subject.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-[#F8FAFC] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${subject.progress}%`,
                    backgroundColor: subject.color 
                  }}
                ></div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-[#6B7280]" />
                  <span className="text-[12px] text-[#6B7280]">Study Hours</span>
                </div>
                <p className="text-[16px] font-semibold text-[#111827]">{subject.hours}h</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-[#6B7280]" />
                  <span className="text-[12px] text-[#6B7280]">Topics</span>
                </div>
                <p className="text-[16px] font-semibold text-[#111827]">{subject.topics}</p>
              </div>
            </div>
          </Card>
        ))}

        {/* Add New Subject Card */}
        <Card 
          className="p-6 border-2 border-dashed border-[#E5E7EB] hover:border-[#2563EB] hover:bg-[#EFF6FF] transition-all cursor-pointer flex items-center justify-center min-h-[280px]"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-[#2563EB]" />
            </div>
            <h3 className="text-[16px] font-medium text-[#111827] mb-1">Add New Subject</h3>
            <p className="text-[14px] text-[#6B7280]">Start tracking a new subject</p>
          </div>
        </Card>
      </div>

      {/* Add Subject Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Subject">
        <div className="space-y-4">
          <Input label="Subject Name" placeholder="e.g., Mathematics" />
          <div className="space-y-2">
            <label className="block text-[14px] font-medium text-[#111827]">Subject Color</label>
            <div className="flex gap-2">
              {['#2563EB', '#7C3AED', '#22C55E', '#F59E0B', '#EF4444', '#06B6D4', '#8B5CF6', '#EC4899'].map(color => (
                <button
                  key={color}
                  className="w-10 h-10 rounded-[8px] hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <Input label="Study Goal (hours/week)" type="number" placeholder="e.g., 10" />
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary">Add Subject</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
