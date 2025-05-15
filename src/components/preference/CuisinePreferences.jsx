import StepTemplate from './StepTemplate';
import BubbleSelector from './BubbleSelector';
import { useState } from 'react';

const chineseCuisines = [
  { value: 'sichuan', label: '川菜' },
  { value: 'canton', label: '粤菜' },
  { value: 'shandong', label: '鲁菜' },
  { value: 'jiangsu', label: '苏菜' },
  { value: 'fujian', label: '闽菜' },
  { value: 'hunan', label: '湘菜' },
  { value: 'anhui', label: '徽菜' },
  { value: 'beijing', label: '京菜' }
];

const westernCuisines = [
  { value: 'french', label: '法餐' },
  { value: 'italian', label: '意大利餐' },
  { value: 'spanish', label: '西班牙餐' },
  { value: 'american', label: '美式餐' },
  { value: 'mexican', label: '墨西哥餐' },
  { value: 'greek', label: '希腊餐' }
];

const asianCuisines = [
  { value: 'japanese', label: '日式料理' },
  { value: 'korean', label: '韩式料理' },
  { value: 'thai', label: '泰国料理' },
  { value: 'vietnamese', label: '越南料理' },
  { value: 'indian', label: '印度料理' }
];

const otherOptions = [
  { value: 'custom', label: '自定义' }
];

export default function CuisinePreferences({ selected, onSelect, onNext, onBack }) {
  const [customCuisine, setCustomCuisine] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(
    selected.some(cuisine => ![...chineseCuisines, ...westernCuisines, ...asianCuisines, ...otherOptions]
      .map(o => o.value)
      .includes(cuisine))
  );

  const handleSelect = (values) => {
    // 检查是否选择了"自定义"选项
    const hasCustom = values.includes('custom');
    setShowCustomInput(hasCustom);
    
    // 如果包含自定义选项但是没有自定义内容，则只更新选中的预设选项
    if (hasCustom && !customCuisine) {
      onSelect(values);
    } else if (hasCustom && customCuisine) {
      // 如果有自定义内容，添加到选项中
      const customValues = values.filter(v => v !== 'custom');
      customValues.push(customCuisine);
      onSelect(customValues);
    } else {
      // 没有选自定义，正常更新
      onSelect(values);
    }
  };

  const handleCustomChange = (e) => {
    setCustomCuisine(e.target.value);
    
    // 更新选中的值，替换掉可能存在的旧自定义值
    if (e.target.value) {
      const baseValues = selected.filter(cuisine => 
        [...chineseCuisines, ...westernCuisines, ...asianCuisines, ...otherOptions]
          .map(o => o.value)
          .includes(cuisine)
      );
      onSelect([...baseValues, e.target.value]);
    }
  };

  const handleSubmitCustom = (e) => {
    e.preventDefault();
    if (customCuisine) {
      // 确保自定义值在选中的值中
      const baseValues = selected.filter(cuisine => 
        [...chineseCuisines, ...westernCuisines, ...asianCuisines, ...otherOptions]
          .map(o => o.value)
          .includes(cuisine)
      );
      onSelect([...baseValues, customCuisine]);
    }
  };

  const allOptions = [...chineseCuisines, ...westernCuisines, ...asianCuisines, ...otherOptions];

  return (
    <StepTemplate
      title="你喜欢哪种菜系？"
      description="选择你偏好的菜系（可多选）"
      onNext={onNext}
      onBack={onBack}
      nextDisabled={selected.length === 0}
    >
      <div className="space-y-8">
        <div>
          <h3 className="font-medium mb-3 text-gray-700 text-font">中国菜系</h3>
          <BubbleSelector
            options={chineseCuisines}
            selected={selected.filter(cuisine => chineseCuisines.map(o => o.value).includes(cuisine))}
            onChange={(values) => {
              // 合并其他类别的已选值
              const otherSelected = selected.filter(cuisine => 
                ![...chineseCuisines].map(o => o.value).includes(cuisine)
              );
              handleSelect([...values, ...otherSelected]);
            }}
            multiSelect={true}
            colorScheme="yellow"
          />
        </div>
        
        <div>
          <h3 className="font-medium mb-3 text-gray-700 text-font">西方菜系</h3>
          <BubbleSelector
            options={westernCuisines}
            selected={selected.filter(cuisine => westernCuisines.map(o => o.value).includes(cuisine))}
            onChange={(values) => {
              // 合并其他类别的已选值
              const otherSelected = selected.filter(cuisine => 
                ![...westernCuisines].map(o => o.value).includes(cuisine)
              );
              handleSelect([...values, ...otherSelected]);
            }}
            multiSelect={true}
            colorScheme="blue"
          />
        </div>
        
        <div>
          <h3 className="font-medium mb-3 text-gray-700 text-font">亚洲菜系</h3>
          <BubbleSelector
            options={asianCuisines}
            selected={selected.filter(cuisine => asianCuisines.map(o => o.value).includes(cuisine))}
            onChange={(values) => {
              // 合并其他类别的已选值
              const otherSelected = selected.filter(cuisine => 
                ![...asianCuisines].map(o => o.value).includes(cuisine)
              );
              handleSelect([...values, ...otherSelected]);
            }}
            multiSelect={true}
            colorScheme="green"
          />
        </div>
        
        <div>
          <h3 className="font-medium mb-3 text-gray-700 text-font">其他选项</h3>
          <BubbleSelector
            options={otherOptions}
            selected={selected.filter(cuisine => otherOptions.map(o => o.value).includes(cuisine))}
            onChange={(values) => {
              // 合并其他类别的已选值
              const otherSelected = selected.filter(cuisine => 
                ![...otherOptions].map(o => o.value).includes(cuisine)
              );
              handleSelect([...values, ...otherSelected]);
            }}
            multiSelect={true}
            colorScheme="yellow"
          />
        </div>
      </div>
      
      {showCustomInput && (
        <form onSubmit={handleSubmitCustom} className="mt-6">
          <div className="flex items-center">
            <input
              type="text"
              value={customCuisine}
              onChange={handleCustomChange}
              placeholder="输入你喜欢的其他菜系"
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
          <h3 className="font-medium mb-2 text-gray-700 text-font">已选择的菜系:</h3>
          <div className="flex flex-wrap gap-2">
            {selected.map(cuisine => {
              // 查找预设选项
              const option = allOptions.find(o => o.value === cuisine);
              return (
                <span
                  key={cuisine}
                  className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm text-font"
                >
                  {option ? option.label : cuisine}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </StepTemplate>
  );
} 