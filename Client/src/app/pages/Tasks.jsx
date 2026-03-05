import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';

export default function Tasks() {
  const [activeTab, setActiveTab] = useState('list');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { id: 'list', label: 'List View' },
    { id: 'board', label: 'Board View' },
    { id: 'matrix', label: 'Matrix View' },
  ];

  const tasks = {
    todo: [
      { id: 1, title: 'Complete Math Assignment', subject: 'Mathematics', priority: 'high', due: 'Today' },
      { id: 2, title: 'Read Chapter 5', subject: 'Biology', priority: 'medium', due: 'Tomorrow' },
    ],
    inProgress: [
      { id: 3, title: 'Physics Lab Report', subject: 'Physics', priority: 'high', due: 'March 4' },
    ],
    completed: [
      { id: 4, title: 'History Essay', subject: 'History', priority: 'low', due: 'Yesterday' },
    ],
  };

  const priorityColors = {
    high: 'border-l-[#EF4444]',
    medium: 'border-l-[#F59E0B]',
    low: 'border-l-[#22C55E]',
  };

  const renderListView = () => (
    <div className="space-y-4">
      {Object.entries(tasks).map(([status, taskList]) => (
        <div key={status}>
          <h3 className="text-[16px] font-semibold text-[#111827] mb-3 capitalize">{status.replace(/([A-Z])/g, ' $1')}</h3>
          <div className="space-y-3">
            {taskList.map((task) => (
              <Card key={task.id} className={`p-4 border-l-4 ${priorityColors[task.priority]} hover:shadow-lg transition-shadow cursor-pointer`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-5 border-2 border-[#2563EB] rounded-[4px]"></div>
                    <div>
                      <h4 className="text-[16px] font-medium text-[#111827]">{task.title}</h4>
                      <p className="text-[14px] text-[#6B7280]">{task.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[14px] text-[#6B7280]">Due: {task.due}</span>
                    <span className={`px-3 py-1 rounded-[6px] text-[12px] font-medium ${
                      task.priority === 'high' ? 'bg-[#EF4444] text-white' :
                      task.priority === 'medium' ? 'bg-[#F59E0B] text-white' :
                      'bg-[#22C55E] text-white'
                    }`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderBoardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(tasks).map(([status, taskList]) => (
        <div key={status}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-semibold text-[#111827] capitalize">
              {status.replace(/([A-Z])/g, ' $1')}
            </h3>
            <span className="px-2 py-1 bg-[#F8FAFC] rounded-[6px] text-[14px] font-medium text-[#6B7280]">
              {taskList.length}
            </span>
          </div>
          <div className="space-y-3">
            {taskList.map((task) => (
              <Card key={task.id} className="p-4 cursor-pointer hover:shadow-lg transition-shadow">
                <h4 className="text-[16px] font-medium text-[#111827] mb-2">{task.title}</h4>
                <p className="text-[14px] text-[#6B7280] mb-3">{task.subject}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[#6B7280]">{task.due}</span>
                  <span className={`px-2 py-1 rounded-[6px] text-[12px] font-medium ${
                    task.priority === 'high' ? 'bg-[#FEE2E2] text-[#EF4444]' :
                    task.priority === 'medium' ? 'bg-[#FEF3C7] text-[#F59E0B]' :
                    'bg-[#DCFCE7] text-[#22C55E]'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderMatrixView = () => (
    <div className="grid grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-[16px] font-semibold text-[#111827] mb-4">Urgent & Important</h3>
        <div className="space-y-3 min-h-[300px]">
          {tasks.todo.filter(t => t.priority === 'high').map(task => (
            <div key={task.id} className="p-3 bg-[#FEE2E2] rounded-[8px]">
              <p className="text-[14px] font-medium text-[#111827]">{task.title}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="text-[16px] font-semibold text-[#111827] mb-4">Not Urgent but Important</h3>
        <div className="space-y-3 min-h-[300px]">
          {tasks.todo.filter(t => t.priority === 'medium').map(task => (
            <div key={task.id} className="p-3 bg-[#FEF3C7] rounded-[8px]">
              <p className="text-[14px] font-medium text-[#111827]">{task.title}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="text-[16px] font-semibold text-[#111827] mb-4">Urgent but Not Important</h3>
        <div className="space-y-3 min-h-[300px]">
          <div className="p-3 bg-[#F8FAFC] rounded-[8px] text-center text-[14px] text-[#6B7280]">
            No tasks
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="text-[16px] font-semibold text-[#111827] mb-4">Not Urgent & Not Important</h3>
        <div className="space-y-3 min-h-[300px]">
          {tasks.completed.map(task => (
            <div key={task.id} className="p-3 bg-[#DCFCE7] rounded-[8px]">
              <p className="text-[14px] font-medium text-[#111827]">{task.title}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1>Tasks</h1>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Filters & Search */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 pr-4 py-2 w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>
          <Button variant="outline">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#E5E7EB]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-[16px] font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'text-[#2563EB] border-[#2563EB]'
                : 'text-[#6B7280] border-transparent hover:text-[#111827]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'list' && renderListView()}
      {activeTab === 'board' && renderBoardView()}
      {activeTab === 'matrix' && renderMatrixView()}

      {/* Add Task Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Task">
        <div className="space-y-4">
          <Input label="Task Title" placeholder="Enter task title" />
          <Input label="Subject" placeholder="Select subject" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Due Date" type="date" />
            <Input label="Details" placeholder="Task description" />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary">Create Task</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
