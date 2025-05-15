import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function AuthDetails() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="flex space-x-4">
                        <Link          to="/login"          className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200"        >          登录        </Link>        <Link          to="/signup"          className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200"        >          注册        </Link>
      </div>
    );
  }

  return (
        <Link      to="/profile"      className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-500 transition-colors duration-200"    >
      <img
        src={currentUser.photoURL || 'https://via.placeholder.com/32'}
        alt="头像"
        className="w-8 h-8 rounded-full object-cover border-2 border-indigo-600"
      />
      <span>{currentUser.displayName || currentUser.email}</span>
    </Link>
  );
} 