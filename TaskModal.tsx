'use client';

import { TaskDetails } from '@/types/task';
import { useEffect, useRef } from 'react';

interface TaskModalProps {
  task: TaskDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onExecute: () => void;
}

export default function TaskModal({ task, isOpen, onClose, onExecute }: TaskModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Chi tiết nhiệm vụ</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {task.title}
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                {task.platform}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">
                {task.type}
              </span>
            </div>
          </div>

          {task.description && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Mô tả:</h4>
              <p className="text-gray-600">{task.description}</p>
            </div>
          )}

          {task.instructions && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Hướng dẫn:</h4>
              <p className="text-gray-600 whitespace-pre-line">{task.instructions}</p>
            </div>
          )}

          {task.url && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Link:</h4>
              <a
                href={task.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {task.url}
              </a>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">ID nhiệm vụ:</span> {task.id}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Nguồn:</span> {task.source === 'bumx' ? 'BumX' : 'Golike'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
          >
            Đóng
          </button>
          <button
            onClick={onExecute}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 font-medium"
          >
            Thực hiện
          </button>
        </div>
      </div>
    </div>
  );
}
