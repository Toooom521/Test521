import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { auth } from '../firebase/config';

// 创建身份验证上下文
const AuthContext = createContext();

// 自定义Hook，用于在组件中访问认证上下文
export function useAuth() {
  return useContext(AuthContext);
}

// 身份验证提供者组件
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // 发送验证码
  async function sendVerificationCode(phoneNumber) {
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      return confirmationResult;
    } catch (error) {
      throw error;
    }
  }

  // 验证验证码
  async function confirmCode(confirmationResult, code) {
    try {
      const result = await confirmationResult.confirm(code);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // 注册方法
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // 登录方法
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // 登出方法
  function logout() {
    return signOut(auth);
  }

  // 使用Google登录
  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  // 重置密码
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // 更新用户资料
  function updateUserProfile(displayName, photoURL) {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL
    });
  }

  // 更新邮箱
  function updateUserEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  // 更新密码
  function updateUserPassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  // 发送邮箱验证
  function sendVerificationEmail() {
    return sendEmailVerification(auth.currentUser);
  }

  // 监听用户认证状态变化
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // 清理订阅
    return unsubscribe;
  }, []);

  // 提供的值
  const value = {
    currentUser,
    signup,
    login,
    logout,
    loginWithGoogle,
    resetPassword,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    sendVerificationEmail,
    sendVerificationCode,
    confirmCode
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 