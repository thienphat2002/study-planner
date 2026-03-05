import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 2)); // March 2, 2026

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
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventsForDay = (day) => {
    return events.filter(event => event.date === day);
  };

  const isToday = (day) => {
    const today = new Date(2026, 2, 2);
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1>Calendar</h1>
        <Button variant="primary">
          <Plus className="w-5 h-5 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-3 p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Names */}
            {dayNames.map(day => (
              <div key={day} className="text-center py-2 text-[14px] font-semibold text-[#6B7280]">
                {day}
              </div>
            ))}

            {/* Days */}
            {getDaysArray().map((day, index) => {
              const dayEvents = day ? getEventsForDay(day) : [];
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border border-[#E5E7EB] rounded-[8px] ${
                    day ? 'bg-white hover:bg-[#F8FAFC] cursor-pointer transition-colors' : 'bg-[#F8FAFC]'
                  } ${isToday(day) ? 'ring-2 ring-[#2563EB]' : ''}`}
                >
                  {day && (
                    <>
                      <div className={`text-[14px] font-medium mb-1 ${isToday(day) ? 'text-[#2563EB]' : 'text-[#111827]'}`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.map(event => (
                          <div
                            key={event.id}
                            className="text-[10px] px-2 py-1 rounded-[4px] text-white truncate"
                            style={{ backgroundColor: event.color }}
                          >
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

        {/* Events List */}
        <Card className="p-6">
          <h3 className="text-[16px] font-semibold text-[#111827] mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {events.map(event => (
              <div key={event.id} className="p-3 bg-[#F8FAFC] rounded-[8px]">
                <div className="flex items-start gap-2">
                  <div 
                    className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                    style={{ backgroundColor: event.color }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-medium text-[#111827] truncate">{event.title}</h4>
                    <p className="text-[12px] text-[#6B7280]">March {event.date}, 2026</p>
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 bg-white rounded-[4px] text-[#6B7280] capitalize">
                      {event.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
            <h4 className="text-[14px] font-medium text-[#111827] mb-3">Event Types</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2563EB]"></div>
                <span className="text-[12px] text-[#6B7280]">Class</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                <span className="text-[12px] text-[#6B7280]">Exam</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                <span className="text-[12px] text-[#6B7280]">Task</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
                <span className="text-[12px] text-[#6B7280]">Study Session</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
