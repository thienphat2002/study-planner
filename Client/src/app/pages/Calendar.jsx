import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input'; 

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 2)); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('class');

  const events = [
    { id: 1, title: 'Math Exam', type: 'exam', date: 5, color: '#EF4444' },
    { id: 2, title: 'Physics Class', type: 'class', date: 3, color: '#2563EB' },
    { id: 3, title: 'Study Session', type: 'study', date: 2, color: '#22C55E' },
    { id: 4, title: 'Biology Lab', type: 'class', date: 4, color: '#2563EB' },
    { id: 5, title: 'History Assignment Due', type: 'task', date: 6, color: '#F59E0B' },
  ];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysArray = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };
  const getEventsForDay = (day) => events.filter(event => event.date === day);
  const isToday = (day) => {
    const today = new Date(2026, 2, 2);
    return day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
  };

  const eventTypes = [
    { id: 'class', label: 'Class', color: '#2563EB', bg: '#EFF6FF', darkBg: '#1e3a8a' },
    { id: 'exam', label: 'Exam', color: '#EF4444', bg: '#FEF2F2', darkBg: '#7f1d1d' },
    { id: 'task', label: 'Task', color: '#F59E0B', bg: '#FFFBEB', darkBg: '#78350f' },
    { id: 'vacation ', label: 'Vacation', color: '#22C55E', bg: '#F0FDF4', darkBg: '#14532d' }
  ];

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <h1 className="dark:text-white">Calendar</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex flex-row items-center justify-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white rounded-[8px] hover:bg-[#1d4ed8] shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
          <span className="font-semibold text-[15px] leading-none">Add Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="dark:text-white">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="dark:border-[#475569] dark:text-[#CBD5E1]">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="dark:border-[#475569] dark:text-[#CBD5E1]">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {dayNames.map(day => (
              <div key={day} className="text-center py-2 text-[14px] font-semibold text-[#6B7280] dark:text-[#94A3B8]">{day}</div>
            ))}
            {getDaysArray().map((day, index) => {
              const dayEvents = day ? getEventsForDay(day) : [];
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border border-[#E5E7EB] dark:border-[#334155] rounded-[8px] transition-colors ${day ? 'bg-white dark:bg-[#1E293B] hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A] cursor-pointer' : 'bg-[#F8FAFC] dark:bg-[#0F172A]'} ${isToday(day) ? 'ring-2 ring-[#2563EB]' : ''}`}
                >
                  {day && (
                    <>
                      <div className={`text-[14px] font-medium mb-1 ${isToday(day) ? 'text-[#2563EB]' : 'text-[#111827] dark:text-white'}`}>{day}</div>
                      <div className="space-y-1">
                        {dayEvents.map(event => (
                          <div key={event.id} className="text-[10px] px-2 py-1 rounded-[4px] text-white truncate" style={{ backgroundColor: event.color }}>
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-[16px] font-semibold text-[#111827] dark:text-white mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {events.map(event => (
              <div key={event.id} className="p-3 bg-[#F8FAFC] dark:bg-[#0F172A] border border-transparent dark:border-[#334155] rounded-[8px]">
                <div className="flex items-start gap-2">
                  <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: event.color }}></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-medium text-[#111827] dark:text-white truncate">{event.title}</h4>
                    <p className="text-[12px] text-[#6B7280] dark:text-[#94A3B8]">March {event.date}, 2026</p>
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 bg-white dark:bg-[#1E293B] rounded-[4px] text-[#6B7280] dark:text-[#CBD5E1] capitalize border border-[#E5E7EB] dark:border-[#334155]">{event.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E5E7EB] dark:border-[#334155]">
            <h4 className="text-[14px] font-medium text-[#111827] dark:text-white mb-3">Event Types</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#2563EB]"></div><span className="text-[12px] text-[#6B7280] dark:text-[#94A3B8]">Class</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#EF4444]"></div><span className="text-[12px] text-[#6B7280] dark:text-[#94A3B8]">Exam</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div><span className="text-[12px] text-[#6B7280] dark:text-[#94A3B8]">Task</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#22C55E]"></div><span className="text-[12px] text-[#6B7280] dark:text-[#94A3B8]">Vacation</span></div>
            </div>
          </div>
        </Card>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E293B] dark:border dark:border-[#334155] rounded-3xl p-8 w-full max-w-[500px] shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-[#94a3b8] hover:text-[#ef4444] transition-colors cursor-pointer bg-[#f8fafc] dark:bg-[#0F172A] hover:bg-[#fee2e2] dark:hover:bg-red-500/20 p-2 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <div className="mb-6">
              <h2 className="text-[24px] font-bold text-[#0f172a] dark:text-white">Add New Event</h2>
              <p className="text-[#64748b] dark:text-[#94A3B8] text-[14px] mt-1">Schedule your upcoming activities.</p>
            </div>
            <div className="space-y-5">
              <Input label="Event Title" placeholder="e.g., Final Physics Exam" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Date" type="date" />
                <Input label="Time" type="time" />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#111827] dark:text-white mb-2">Event Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {eventTypes.map(type => {
                    const isSelected = selectedType === type.id;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`py-3 px-4 rounded-xl text-[14px] font-semibold border-2 transition-all flex items-center gap-3 cursor-pointer ${isSelected ? 'scale-[1.02]' : 'border-[#E5E7EB] dark:border-[#334155] bg-white dark:bg-[#0F172A] text-[#6B7280] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]'}`}
                        style={isSelected ? { borderColor: type.color, backgroundColor: document.documentElement.classList.contains('dark') ? type.darkBg : type.bg, color: type.color } : {}}
                      >
                        <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: type.color }}></div>
                        {type.label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="pt-5 border-t border-[#f1f5f9] dark:border-[#334155] flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="cursor-pointer px-6 dark:border-[#475569] dark:text-[#CBD5E1]">
                  <span className="font-semibold">Cancel</span>
                </Button>
                <button 
                  className="flex flex-row items-center justify-center gap-2 px-6 py-2.5 text-white rounded-[10px] shadow-md transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: eventTypes.find(t => t.id === selectedType)?.color || '#2563EB' }}
                >
                  <Plus className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
                  <span className="font-semibold text-[15px] leading-none">Add Event</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}