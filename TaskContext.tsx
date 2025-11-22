'use client';

import React, { createContext, useContext, useState } from 'react';
import { Task, TaskDetails } from '@/types/task';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: (token: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
  fetchTaskDetails: (taskId: string, source: 'bumx' | 'golike', token: string) => Promise<TaskDetails | null>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async (token: string) => {
    setLoading(true);
    setError(null);

    try {
      const [bumxResponse, golikeResponse] = await Promise.allSettled([
        fetch('/api/tasks/bumx', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }),
        fetch('/api/tasks/golike', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }),
      ]);

      const allTasks: Task[] = [];

      if (bumxResponse.status === 'fulfilled' && bumxResponse.value.ok) {
        const bumxTasks = await bumxResponse.value.json();
        allTasks.push(...bumxTasks);
      }

      if (golikeResponse.status === 'fulfilled' && golikeResponse.value.ok) {
        const golikeTasks = await golikeResponse.value.json();
        allTasks.push(...golikeTasks);
      }

      if (allTasks.length === 0) {
        setError('Không thể lấy nhiệm vụ từ các API');
      }

      setTasks(allTasks);
    } catch (err) {
      setError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.');
      console.error('Fetch tasks error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTaskById = (id: string): Task | undefined => {
    return tasks.find(task => task.id === id);
  };

  const fetchTaskDetails = async (
    taskId: string,
    source: 'bumx' | 'golike',
    token: string
  ): Promise<TaskDetails | null> => {
    try {
      const response = await fetch(`/api/tasks/${taskId}?source=${source}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Không thể lấy chi tiết nhiệm vụ');
      }

      const taskDetails = await response.json();
      return taskDetails;
    } catch (err) {
      console.error('Fetch task details error:', err);
      setError('Không thể lấy chi tiết nhiệm vụ');
      return null;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        getTaskById,
        fetchTaskDetails,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
