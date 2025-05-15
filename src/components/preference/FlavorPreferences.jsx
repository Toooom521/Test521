import StepTemplate from './StepTemplate';
import BubbleSelector from './BubbleSelector';
import { useState } from 'react';

const flavorOptions = [
  { value: 'spicy', label: '辣味' },
  { value: 'sour', label: '酸味' },
  { value: 'sweet', label: '甜味' },
  { value: 'salty', label: '咸味' },
  { value: 'bitter', label: '苦味' },
  { value: 'umami', label: '鲜味' },
  { value: 'light', label: '清淡' },
  { value: 'rich', label: '浓郁' },
  { value: 'custom', label: '自定义' }
];

export default function FlavorPreferences({ selected, onSelect, onNext, onBack }) {
  const [customFlavor, setCustomFlavor] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(selected.some(flavor => !flavorOptions.map(o => o.value).includes(flavor)));

  const handleSelect = (values) => {
    // 检查是否选择了"自定义"选项
    const hasCustom = values.includes('custom');
    setShowCustomInput(hasCustom);
    
    // 如果包含自定义选项但是没有自定义内容，则只更新选中的预设选项
    if (hasCustom && !customFlavor) {
      onSelect(values);
    } else if (hasCustom && customFlavor) {
      // 如果有自定义内容，添加到选项中
      const customValues = values.filter(v => v !== 'custom');
      customValues.push(customFlavor);
      onSelect(customValues);
    } else {
      // 没有选自定义，正常更新
      onSelect(values);
    }
  };

  const handleCustomChange = (e) => {
    setCustomFlavor(e.target.value);
    
    // 更新选中的值，替换掉可能存在的旧自定义值
    if (e.target.value) {
      const baseValues = selected.filter(flavor => flavorOptions.map(o => o.value).includes(flavor));
      onSelect([...baseValues, e.target.value]);
    }
  };

  const handleSubmitCustom = (e) => {
    e.preventDefault();
    if (customFlavor) {
      // 确保自定义值在选中的值中
      const baseValues = selected.filter(flavor => flavorOptions.map(o => o.value).includes(flavor));
      onSelect([...baseValues, customFlavor]);
    }
  };

  return (
    <StepTemplate
      title="你喜欢什么口味的食物？"
      description="选择你喜欢的口味（可多选）"
      onNext={onNext}
      onBack={onBack}
      nextDisabled={selected.length === 0}
    >
      <div className="mb-8">
        <BubbleSelector
          options={flavorOptions}
          selected={selected.filter(flavor => flavorOptions.map(o => o.value).includes(flavor))}
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
              value={customFlavor}
              onChange={handleCustomChange}
              placeholder="输入你喜欢的口味"
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
          <h3 className="font-medium mb-2 text-gray-700 text-font">已选择的口味偏好:</h3>
          <div className="flex flex-wrap gap-2">
            {selected.map(flavor => {
              // 查找预设选项
              const option = flavorOptions.find(o => o.value === flavor);
              return (
                <span
                  key={flavor}
                  className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm text-font"
                >
                  {option ? option.label : flavor}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </StepTemplate>
  );
} 