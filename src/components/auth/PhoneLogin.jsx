import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

export default function PhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [codeSent, setCodeSent] = useState(false);
  const { sendVerificationCode, confirmCode } = useAuth();
  const navigate = useNavigate();

  // 处理发送验证码
  async function handleSendCode(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 格式化手机号码（添加国家代码）
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+86${phoneNumber}`;
      const result = await sendVerificationCode(formattedPhone);
      setConfirmationResult(result);
      setCodeSent(true);
      setSuccess('验证码已发送！');
    } catch (error) {
      setError('发送验证码失败：' + error.message);
    } finally {
      setLoading(false);
    }
  }

  // 处理验证码确认
  async function handleConfirmCode(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await confirmCode(confirmationResult, verificationCode);
      navigate('/'); // 登录成功后跳转到首页
    } catch (error) {
      setError('验证码验证失败：' + error.message);
    } finally {
      setLoading(false);
    }
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
        <div>
          <h2 className="text-3xl font-extrabold text-center text-white title-font">手机验证码登录</h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            <span>或者 </span>
            <Link to="/login" className="font-medium text-yellow-400 hover:text-yellow-300">
              使用邮箱登录
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}

        <div id="recaptcha-container" className="flex justify-center mb-4"></div>

        {!codeSent ? (
          <form onSubmit={handleSendCode} className="mt-8 space-y-6">
            <div>
              <label htmlFor="phone-number" className="sr-only">手机号码</label>
              <input
                id="phone-number"
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="请输入手机号码"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                {loading ? '发送中...' : '发送验证码'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleConfirmCode} className="mt-8 space-y-6">
            <div>
              <label htmlFor="verification-code" className="sr-only">验证码</label>
              <input
                id="verification-code"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="请输入验证码"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                {loading ? '验证中...' : '验证'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setCodeSent(false)}
                className="text-sm text-yellow-400 hover:text-yellow-300"
              >
                重新发送验证码
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
} 