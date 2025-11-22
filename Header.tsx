'use client';

import { User } from '@/types/auth';
import Image from 'next/image';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-3xl">💰</div>
        <h1 className="text-2xl font-bold text-gray-800">
          Tlongmoney
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-medium text-gray-700">{user.name}</span>
        </div>

        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}
