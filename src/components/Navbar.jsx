import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthDetails from './auth/AuthDetails';

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: '首页', path: '/' },
    { name: '食谱推荐', path: '/recipes' },
    { name: '我的收藏', path: '/favorites' },
    { name: '个人设置', path: '/settings' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo区域 */}
          <div className="flex-shrink-0 flex items-center">
            <span 
              className="text-2xl font-bold text-yellow-500 cursor-pointer tracking-widest zhuyi-font"
              onClick={() => navigate('/')}
            >
              煮 意
            </span>
          </div>

          {/* 桌面端导航链接 */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-gray-600 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors text-font"
              >
                {item.name}
              </button>
            ))}
            
            {/* 认证状态组件 */}
            <div className="ml-4">
              <AuthDetails />
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-yellow-500 p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-yellow-500 hover:bg-gray-50 rounded-md text-base font-medium text-font"
                >
                  {item.name}
                </button>
              ))}
              
              {/* 移动端认证状态组件 */}
              <div className="px-3 py-2">
                <AuthDetails />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 