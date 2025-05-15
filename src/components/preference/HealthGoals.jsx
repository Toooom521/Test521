import StepTemplate from './StepTemplate';
import BubbleSelector from './BubbleSelector';
import { useState } from 'react';

const healthGoalOptions = [
  { value: 'weight-loss', label: '减肥' },
  { value: 'muscle-gain', label: '增肌' },
  { value: 'weight-maintain', label: '维持体重' },
  { value: 'blood-sugar-control', label: '控制血糖' },
  { value: 'low-fat', label: '低脂饮食' },
  { value: 'low-carb', label: '低碳水饮食' },
  { value: 'high-protein', label: '高蛋白饮食' },
  { value: 'vegetarian', label: '素食主义' },
  { value: 'custom', label: '自定义' }
];

export default function HealthGoals({ selected, onSelect, onNext, onBack }) {
  const [customGoal, setCustomGoal] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(selected.some(goal => !healthGoalOptions.map(o => o.value).includes(goal)));

  const handleSelect = (values) => {
    // 检查是否选择了"自定义"选项
    const hasCustom = values.includes('custom');
    setShowCustomInput(hasCustom);
    
    // 如果包含自定义选项但是没有自定义内容，则只更新选中的预设选项
    if (hasCustom && !customGoal) {
      onSelect(values);
    } else if (hasCustom && customGoal) {
      // 如果有自定义内容，添加到选项中
      const customValues = values.filter(v => v !== 'custom');
      customValues.push(customGoal);
      onSelect(customValues);
    } else {
      // 没有选自定义，正常更新
      onSelect(values);
    }
  };

  const handleCustomChange = (e) => {
    setCustomGoal(e.target.value);
    
    // 更新选中的值，替换掉可能存在的旧自定义值
    if (e.target.value) {
      const baseValues = selected.filter(goal => healthGoalOptions.map(o => o.value).includes(goal));
      onSelect([...baseValues, e.target.value]);
    }
  };

  const handleSubmitCustom = (e) => {
    e.preventDefault();
    if (customGoal) {
      // 确保自定义值在选中的值中
      const baseValues = selected.filter(goal => healthGoalOptions.map(o => o.value).includes(goal));
      onSelect([...baseValues, customGoal]);
    }
  };

  return (
    <StepTemplate
      title="你的健康目标是什么？"
      description="选择你想要通过饮食达到的健康目标（可多选）"
      onNext={onNext}
      onBack={onBack}
      nextDisabled={selected.length === 0}
    >
      <div className="mb-8">
        <BubbleSelector
          options={healthGoalOptions}
          selected={selected.filter(goal => healthGoalOptions.map(o => o.value).includes(goal))}
          onChange={handleSelect}
          multiSelect={true}
          colorScheme="yellow"
        />
      </div>
      
      {showCustomInput && (
        <form onSubmit={handleSubmitCustom} className="mt-4">
          <div className="flex items-center">
            <input
              type="text"
              value={customGoal}
              onChange={handleCustomChange}
              placeholder="输入你的自定义健康目标"
              className="flex-grow p-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-yellow-400 text-font"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black px-4 py-3 rounded-r-full hover:bg-yellow-500 transition-colors text-font"
            >
              添加
            </button>
          </div>
        </form>
      )}
      
      {selected.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-2 text-gray-700 text-font">已选择的健康目标:</h3>
          <div className="flex flex-wrap gap-2">
            {selected.map(goal => {
              // 查找预设选项
              const option = healthGoalOptions.find(o => o.value === goal);
              return (
                <span
                  key={goal}
                  className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm text-font"
                >
                  {option ? option.label : goal}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </StepTemplate>
  );
} 