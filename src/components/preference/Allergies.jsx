import StepTemplate from './StepTemplate';
import BubbleSelector from './BubbleSelector';
import { useState } from 'react';

const allergyOptions = [
  { value: 'seafood', label: '海鲜' },
  { value: 'nuts', label: '坚果' },
  { value: 'dairy', label: '牛奶/乳制品' },
  { value: 'wheat', label: '小麦/麸质' },
  { value: 'eggs', label: '鸡蛋' },
  { value: 'soy', label: '大豆' },
  { value: 'sesame', label: '芝麻' },
  { value: 'peanuts', label: '花生' },
  { value: 'shellfish', label: '贝类' },
  { value: 'fish', label: '鱼类' },
  { value: 'custom', label: '自定义' }
];

export default function Allergies({ selected, onSelect, onNext, onBack }) {
  const [customAllergy, setCustomAllergy] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(selected.some(allergy => !allergyOptions.map(o => o.value).includes(allergy)));

  const handleSelect = (values) => {
    // 检查是否选择了"自定义"选项
    const hasCustom = values.includes('custom');
    setShowCustomInput(hasCustom);
    
    // 如果包含自定义选项但是没有自定义内容，则只更新选中的预设选项
    if (hasCustom && !customAllergy) {
      onSelect(values);
    } else if (hasCustom && customAllergy) {
      // 如果有自定义内容，添加到选项中
      const customValues = values.filter(v => v !== 'custom');
      customValues.push(customAllergy);
      onSelect(customValues);
    } else {
      // 没有选自定义，正常更新
      onSelect(values);
    }
  };

  const handleCustomChange = (e) => {
    setCustomAllergy(e.target.value);
    
    // 更新选中的值，替换掉可能存在的旧自定义值
    if (e.target.value) {
      const baseValues = selected.filter(allergy => allergyOptions.map(o => o.value).includes(allergy));
      onSelect([...baseValues, e.target.value]);
    }
  };

  const handleSubmitCustom = (e) => {
    e.preventDefault();
    if (customAllergy) {
      // 确保自定义值在选中的值中
      const baseValues = selected.filter(allergy => allergyOptions.map(o => o.value).includes(allergy));
      onSelect([...baseValues, customAllergy]);
    }
  };

  return (
    <StepTemplate
      title="你有食物过敏吗？"
      description="选择你需要避免的食物（可多选，如果没有过敏源可直接点击下一步）"
      onNext={onNext}
      onBack={onBack}
    >
      <div className="mb-8">
        <BubbleSelector
          options={allergyOptions}
          selected={selected.filter(allergy => allergyOptions.map(o => o.value).includes(allergy))}
          onChange={handleSelect}
          multiSelect={true}
          colorScheme="green"
        />
      </div>
      
      {showCustomInput && (
        <form onSubmit={handleSubmitCustom} className="mt-4">
          <div className="flex items-center">
            <input
              type="text"
              value={customAllergy}
              onChange={handleCustomChange}
              placeholder="输入你的过敏源"
              className="flex-grow p-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-400 text-font"
            />
            <button
              type="submit"
              className="bg-green-400 text-black px-4 py-3 rounded-r-full hover:bg-green-500 transition-colors text-font"
            >
              添加
            </button>
          </div>
        </form>
      )}
      
      {selected.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-2 text-gray-700 text-font">已选择的过敏源:</h3>
          <div className="flex flex-wrap gap-2">
            {selected.map(allergy => {
              // 查找预设选项
              const option = allergyOptions.find(o => o.value === allergy);
              return (
                <span
                  key={allergy}
                  className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm text-font"
                >
                  {option ? option.label : allergy}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </StepTemplate>
  );
} 