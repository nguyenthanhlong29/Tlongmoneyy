'use client';

import { initiateFacebookLogin } from '@/lib/facebook-auth';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-5xl">💰</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Tlongmoney
          </h1>
          <p className="text-gray-600">
            Đăng nhập để bắt đầu kiếm tiền
          </p>
        </div>

        <button
          onClick={initiateFacebookLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Đăng nhập Facebook
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Bằng cách đăng nhập, bạn đồng ý với điều khoản sử dụng của chúng tôi
        </p>
      </div>
    </div>
  );
}
