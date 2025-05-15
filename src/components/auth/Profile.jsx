import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Profile() {
  const { currentUser, updateUserProfile, updateUserEmail, updateUserPassword, sendVerificationEmail, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // 处理图片上传
  async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // 验证文件类型
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('请上传 JPG、PNG 或 GIF 格式的图片');
      return;
    }

    // 验证文件大小（限制为 2MB）
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setError('图片大小不能超过 2MB');
      return;
    }

    try {
      setUploading(true);
      setError('');
      
      // 创建存储引用
      const storage = getStorage();
      const fileExtension = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExtension}`;
      const storageRef = ref(storage, `profile_images/${currentUser.uid}/${fileName}`);
      
      // 上传文件
      await uploadBytes(storageRef, file);
      
      // 获取下载URL
      const downloadURL = await getDownloadURL(storageRef);
      
      // 更新用户资料
      await updateUserProfile(displayName, downloadURL);
      setPhotoURL(downloadURL);
      setSuccess('头像上传成功！');
    } catch (error) {
      console.error('Upload error:', error);
      if (error.code === 'storage/unauthorized') {
        setError('没有权限上传头像，请确保您已登录');
      } else {
        setError('头像上传失败：' + error.message);
      }
    } finally {
      setUploading(false);
    }
  }

  // 处理退出登录
  async function handleLogout() {
    try {
      setError('');
      await logout();
      navigate('/login');
    } catch (error) {
      setError('退出登录失败：' + error.message);
    }
  }

  // 处理切换账号
  function handleSwitchAccount() {
    navigate('/login');
  }

  // 更新个人资料
  async function handleProfileUpdate(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await updateUserProfile(displayName, photoURL);
      setSuccess('个人资料更新成功！');
    } catch (error) {
      setError('更新个人资料失败：' + error.message);
    }

    setLoading(false);
  }

  // 更新邮箱
  async function handleEmailUpdate(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await updateUserEmail(email);
      await sendVerificationEmail();
      setSuccess('邮箱更新成功！请查收验证邮件。');
    } catch (error) {
      setError('更新邮箱失败：' + error.message);
    }

    setLoading(false);
  }

  // 更新密码
  async function handlePasswordUpdate(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      return setError('两次输入的密码不一致');
    }

    setLoading(true);

    try {
      await updateUserPassword(password);
      setSuccess('密码更新成功！');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError('更新密码失败：' + error.message);
    }

    setLoading(false);
  }

  // 处理返回
  function handleBack() {
    navigate(-1);
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ 
        background: `
          linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),
          url('/images/food_background.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#4a5568'
      }}
    >
      <motion.div 
        className="max-w-md w-full space-y-8 p-8 rounded-xl bg-white/10 backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="text-white hover:text-yellow-400 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-3xl font-extrabold text-white title-font">个人设置</h2>
          <div className="w-6"></div> {/* 占位，保持标题居中 */}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            {success}
          </div>
        )}

        <div className="space-y-6">
          {/* 头像上传 */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={photoURL || 'https://via.placeholder.com/150'}
                alt="头像"
                className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute bottom-0 right-0 bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-500 transition-colors duration-200"
              >
                {uploading ? '上传中...' : '更换头像'}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* 基本信息更新 */}
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label htmlFor="display-name" className="sr-only">显示名称</label>
              <input
                id="display-name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="显示名称"
              />
            </div>
          </form>

          {/* 邮箱更新 */}
          <form onSubmit={handleEmailUpdate} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">邮箱地址</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="邮箱地址"
              />
            </div>
          </form>

          {/* 密码更新 */}
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label htmlFor="password" className="sr-only">新密码</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="新密码"
              />
            </div>
            <div>
              <label htmlFor="password-confirm" className="sr-only">确认新密码</label>
              <input
                id="password-confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="确认新密码"
              />
            </div>
          </form>

          {/* 操作按钮 */}
          <div className="space-y-4">
            <button
              onClick={handleProfileUpdate}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              {loading ? '保存中...' : '保存设置'}
            </button>
            
            <div className="flex space-x-4">
              <button
                onClick={handleSwitchAccount}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                切换账号
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 