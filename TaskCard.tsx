'use client';

import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  reward: number;
  onAcceptTask: (taskId: string, source: 'bumx' | 'golike') => void;
}

export default function TaskCard({ task, reward, onAcceptTask }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {task.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {task.platform}
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              {task.type}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-green-600">
          {reward}đ
        </div>

        <button
          onClick={() => onAcceptTask(task.id, task.source)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 font-medium"
        >
          Nhận nhiệm vụ
        </button>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        Nguồn: {task.source === 'bumx' ? 'BumX' : 'Golike'}
      </div>
    </div>
  );
}
