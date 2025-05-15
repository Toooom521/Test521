import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// 受保护的路由组件，只有已登录用户才能访问
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  
  // 如果未登录，重定向到登录页面
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // 否则，渲染子组件
  return children;
}

export default PrivateRoute; 