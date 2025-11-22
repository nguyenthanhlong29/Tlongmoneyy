'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTasks } from '@/contexts/TaskContext';
import Header from './Header';
import Sidebar from './Sidebar';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { calculateReward } from '@/lib/rewards';
import { TaskDetails } from '@/types/task';

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const { tasks, loading, error, fetchTasks, fetchTaskDetails } = useTasks();
  const [activeSection, setActiveSection] = useState('tasks');
  const [selectedTask, setSelectedTask] = useState<TaskDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      fetchTasks(token);
    }
  }, [token]);

  const handleAcceptTask = async (taskId: string, source: 'bumx' | 'golike') => {
    if (!token) return;

    const taskDetails = await fetchTaskDetails(taskId, source, token);
    if (taskDetails) {
      setSelectedTask(taskDetails);
      setIsModalOpen(true);
    }
  };

  const handleExecuteTask = () => {
    // Logic để thực hiện nhiệm vụ
    console.log('Executing task:', selectedTask);
    setIsModalOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💰</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Chào mừng đến với Tlongmoney
            </h2>
            <p className="text-gray-600">
              Chọn "Nhiệm vụ" để bắt đầu kiếm tiền
            </p>
          </div>
        );

      case 'tasks':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Danh sách nhiệm vụ
            </h2>

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {!loading && !error && tasks.length === 0 && (
              <div className="text-center py-12 text-gray-600">
                Không có nhiệm vụ nào
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => {
                const taskKey = `${task.source}-${task.id}`;
                return (
                  <TaskCard
                    key={taskKey}
                    task={task}
                    reward={calculateReward(task)}
                    onAcceptTask={handleAcceptTask}
                  />
                );
              })}
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ví tiền</h2>
            <p className="text-gray-600">Tính năng đang phát triển</p>
          </div>
        );

      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Cài đặt</h2>
            <p className="text-gray-600">Tính năng đang phát triển</p>
          </div>
        );

      default:
        return null;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={logout} />

      <div className="flex">
        <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />

        <main className="flex-1 p-6 lg:ml-64">
          {renderContent()}
        </main>
      </div>

      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onExecute={handleExecuteTask}
      />
    </div>
  );
}
