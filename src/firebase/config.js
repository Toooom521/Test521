// Firebase 配置文件
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase配置信息
const firebaseConfig = {
  apiKey: "AIzaSyAFF3Np1prKnj6yNuH9xgIsnvAYkKd3rsE",
  authDomain: "zhuyi-ai-e6ca6.firebaseapp.com",
  projectId: "zhuyi-ai-e6ca6",
  storageBucket: "zhuyi-ai-e6ca6.firebasestorage.app",
  messagingSenderId: "796344749764",
  appId: "1:796344749764:web:82ed94882ddfd71d8c4391",
  measurementId: "G-939T1DJWNC"
};

// 初始化Firebase
const app = initializeApp(firebaseConfig);

// 导出认证服务
export const auth = getAuth(app);
// 导出分析服务 - 只在浏览器环境中初始化
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export default app; 