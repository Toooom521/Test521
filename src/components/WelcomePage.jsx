import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

export default function WelcomePage() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Navbar />
      <div 
        className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center relative overflow-hidden"
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
          className="z-10 flex flex-col items-center p-8 rounded-xl bg-white/10 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1 
            className="text-6xl font-bold text-white mb-6 text-center drop-shadow-lg hover:scale-105 transition-transform duration-300 tracking-widest zhuyi-font"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            煮 意
          </motion.h1>

          <motion.p 
            className="text-white text-xl text-center max-w-xl px-4 drop-shadow text-font"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            今天你想吃什么？<br />
            这是一个围绕你真实食欲设计的智能食谱平台，<br />
            既满足你的口味偏好，又能帮你聪明处理冰箱剩余的食材。
          </motion.p>

          <motion.button
            onClick={() => navigate("/preference")}
            className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-md relative overflow-hidden group text-font"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="relative z-10">开始定制化之旅</span>
            <div className="absolute inset-0 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </motion.button>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
    </>
  );
} 