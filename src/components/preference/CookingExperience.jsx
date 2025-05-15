import { useState } from 'react';
import StepTemplate from './StepTemplate';
import BubbleSelector from './BubbleSelector';
import CookingExperienceQuiz from './CookingExperienceQuiz';
import { AnimatePresence } from 'framer-motion';

const experienceOptions = [
  { value: 'beginner', label: '新手' },
  { value: 'intermediate', label: '中级' },
  { value: 'advanced', label: '高级' },
  { value: 'professional', label: '资深厨师' }
];

// 不同经验水平的描述
const experienceDescriptions = {
  beginner: '刚开始学做饭，只会做简单的菜肴，需要详细的步骤指导。',
  intermediate: '有一定的烹饪经验，能够理解基本的烹饪技巧和方法。',
  advanced: '熟练掌握各种烹饪技巧，能够自己改进菜谱，尝试复杂的烹饪方法。',
  professional: '专业厨师水平，精通各种烹饪技巧，追求精确和高品质的烹饪体验。'
};

export default function CookingExperience({ selected, onSelect, onNext, onBack }) {
  const [showQuiz, setShowQuiz] = useState(false);
  
  // 处理问卷完成后的操作
  const handleQuizComplete = (result) => {
    onSelect(result);
    setShowQuiz(false);
  };
  
  // 关闭问卷
  const handleQuizCancel = () => {
    setShowQuiz(false);
  };
  
  return (
    <>
      <StepTemplate
        title="你的烹饪经验如何？"
        description="选择最符合你烹饪水平的选项（单选）"
        onNext={onNext}
        onBack={onBack}
        nextDisabled={!selected}
        nextLabel="完成"
      >
        <div className="mb-8">
          <BubbleSelector
            options={experienceOptions}
            selected={selected}
            onChange={onSelect}
            multiSelect={false}
            colorScheme="blue"
          />
        </div>
        
        <div className="flex justify-center mb-8">
          <button 
            onClick={() => setShowQuiz(true)}
            className="text-blue-500 hover:text-blue-700 underline flex items-center text-font"
          >
            <span className="mr-1">🤔</span>
            不知道怎么判断？点我做个小测试
          </button>
        </div>
        
        {selected && (
          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium mb-2 text-blue-700 text-font">{experienceOptions.find(o => o.value === selected)?.label}:</h3>
            <p className="text-blue-800 text-font">{experienceDescriptions[selected]}</p>
          </div>
        )}
      </StepTemplate>
      
      <AnimatePresence>
        {showQuiz && (
          <CookingExperienceQuiz 
            onComplete={handleQuizComplete} 
            onCancel={handleQuizCancel}
          />
        )}
      </AnimatePresence>
    </>
  );
} 