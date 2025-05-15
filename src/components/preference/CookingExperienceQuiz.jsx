import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 问卷题目
const questions = [
  {
    id: 'frequency',
    question: '你多久做一次饭？',
    options: [
      { value: 'A', label: '几乎不做', level: 'beginner' },
      { value: 'B', label: '一周1～2次', level: 'intermediate' },
      { value: 'C', label: '每周做饭超过3次', level: 'advanced' },
      { value: 'D', label: '每天做饭，擅长多种做法', level: 'professional' }
    ]
  },
  {
    id: 'dishes',
    question: '你能完成哪些类型的菜？',
    options: [
      { value: 'A', label: '泡面、炒鸡蛋', level: 'beginner' },
      { value: 'B', label: '两三道简单家常菜', level: 'intermediate' },
      { value: 'C', label: '会炖菜、煲汤、烘焙', level: 'advanced' },
      { value: 'D', label: '会自创菜谱、模仿高级菜', level: 'professional' }
    ]
  },
  {
    id: 'confidence',
    question: '做菜时的自信程度？',
    options: [
      { value: 'A', label: '经常紧张，需要看菜谱', level: 'beginner' },
      { value: 'B', label: '可做还原度70%的菜', level: 'intermediate' },
      { value: 'C', label: '了解火候，能调整做法', level: 'advanced' },
      { value: 'D', label: '靠感觉都能做好', level: 'professional' }
    ]
  },
  {
    id: 'tools',
    question: '拥有的厨具？',
    options: [
      { value: 'A', label: '只有基础锅、电饭煲', level: 'beginner' },
      { value: 'B', label: '拥有电饭煲、蒸锅等基础厨具', level: 'intermediate' },
      { value: 'C', label: '拥有烤箱、空气炸锅等', level: 'advanced' },
      { value: 'D', label: '拥有专业料理工具', level: 'professional' }
    ]
  }
];

// 结果分析和趣味描述
const resultDescriptions = {
  beginner: {
    title: '厨房探索者',
    description: '你正处于烹饪之旅的起点，别担心，每个大厨都是从这里开始的！'
  },
  intermediate: {
    title: '厨房实践家',
    description: '看得出你已经是厨房小高手啦～还有更广阔的烹饪世界等着你去探索！'
  },
  advanced: {
    title: '烹饪艺术家',
    description: '你对食材和烹饪技巧有很好的掌握，能够创造出让人惊喜的美食！'
  },
  professional: {
    title: '厨艺大师',
    description: '你几乎可以驾驭任何烹饪挑战，你的厨艺堪比专业厨师！'
  }
};

export default function CookingExperienceQuiz({ onComplete, onCancel }) {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState(null);
  
  // 选择问题答案
  const selectAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
    
    // 自动前进到下一题
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 最后一题，计算结果
      calculateResult({
        ...answers,
        [questionId]: answer
      });
    }
  };
  
  // 计算测试结果
  const calculateResult = (finalAnswers) => {
    const levelCount = {
      beginner: 0,
      intermediate: 0,
      advanced: 0,
      professional: 0
    };
    
    // 统计每个等级的选择次数
    Object.values(finalAnswers).forEach(answer => {
      levelCount[answer.level]++;
    });
    
    // 根据规则判断等级
    let finalLevel = 'beginner';
    
    // 专业级：至少2题选D（professional）
    if (levelCount.professional >= 2) {
      finalLevel = 'professional';
    }
    // 高级：多数选C（advanced）
    else if (levelCount.advanced >= 2) {
      finalLevel = 'advanced';
    }
    // 中级：多数选B（intermediate）
    else if (levelCount.intermediate >= 2) {
      finalLevel = 'intermediate';
    }
    // 默认新手
    
    setResult(finalLevel);
  };
  
  // 完成测试，返回结果
  const handleComplete = () => {
    onComplete(result);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100">
          <h3 className="text-xl font-bold text-gray-800 text-font">烹饪经验测试</h3>
          {!result && (
            <p className="text-sm text-gray-600 text-font">问题 {currentQuestion + 1}/{questions.length}</p>
          )}
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-medium mb-4 text-gray-800 text-font">
                  {questions[currentQuestion].question}
                </h3>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option.value}
                      className="w-full text-left px-4 py-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors text-gray-700 text-font flex items-center"
                      onClick={() => selectAnswer(questions[currentQuestion].id, option)}
                    >
                      <span className="h-6 w-6 rounded-full bg-yellow-200 text-center text-yellow-800 font-medium mr-3 flex-shrink-0 flex items-center justify-center">
                        {option.value}
                      </span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-between mt-6">
                  <button 
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 text-font"
                  >
                    取消
                  </button>
                  
                  {currentQuestion > 0 && (
                    <button 
                      onClick={() => setCurrentQuestion(currentQuestion - 1)}
                      className="px-4 py-2 text-yellow-600 hover:text-yellow-700 text-font"
                    >
                      上一题
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="bg-yellow-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🎉</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-800 text-font">
                  你是{resultDescriptions[result].title}！
                </h3>
                
                <p className="text-gray-600 mb-6 text-font">
                  你的厨艺等级是：
                  <span className="font-bold text-yellow-600">
                    {result === 'beginner' && '新手'}
                    {result === 'intermediate' && '中级'}
                    {result === 'advanced' && '高级'}
                    {result === 'professional' && '资深厨师'}
                  </span>
                </p>
                
                <p className="text-gray-600 mb-8 text-font">
                  {resultDescriptions[result].description}
                </p>
                
                <button
                  onClick={handleComplete}
                  className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-full text-black font-bold shadow-md transition-colors text-font"
                >
                  确认结果
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
} 