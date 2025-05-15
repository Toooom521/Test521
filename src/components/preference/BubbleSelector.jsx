import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// 随机生成气泡大小的函数，增加随机性
const getRandomSize = () => {
  // 70px ~ 130px 之间的随机值，增加范围使差异更明显
  return Math.floor(Math.random() * 60) + 70;
};

// 随机生成位置偏移量
const getRandomOffset = () => {
  // -5px ~ 5px 之间的随机值
  return Math.floor(Math.random() * 10) - 5;
};

export default function BubbleSelector({
  options = [],
  selected = [],
  onChange,
  multiSelect = true,
  colorScheme = 'yellow'
}) {
  // 为每个选项生成随机大小和偏移量
  const [bubbleStyles, setBubbleStyles] = useState({});
  
  useEffect(() => {
    // 初始化气泡大小和位置
    const styles = {};
    options.forEach(option => {
      styles[option.value] = {
        size: getRandomSize(),
        offsetX: getRandomOffset(),
        offsetY: getRandomOffset(),
        rotation: Math.random() * 5 - 2.5 // -2.5° ~ 2.5° 的随机旋转
      };
    });
    setBubbleStyles(styles);
  }, [options]);

  const handleSelect = (value) => {
    if (multiSelect) {
      if (selected.includes(value)) {
        onChange(selected.filter(item => item !== value));
      } else {
        onChange([...selected, value]);
      }
    } else {
      onChange(value);
    }
  };

  const isSelected = (value) => {
    if (multiSelect) {
      return selected.includes(value);
    } else {
      return selected === value;
    }
  };

  // 根据colorScheme生成颜色
  const getBubbleColors = (isSelected) => {
    const colors = {
      yellow: {
        bg: isSelected ? 'bg-yellow-400' : 'bg-yellow-100',
        text: isSelected ? 'text-black' : 'text-gray-700',
        hover: 'hover:bg-yellow-200',
        border: isSelected ? 'border-yellow-500' : 'border-yellow-200',
        shadow: isSelected ? 'shadow-lg' : 'shadow-md'
      },
      green: {
        bg: isSelected ? 'bg-green-400' : 'bg-green-100',
        text: isSelected ? 'text-black' : 'text-gray-700',
        hover: 'hover:bg-green-200',
        border: isSelected ? 'border-green-500' : 'border-green-200',
        shadow: isSelected ? 'shadow-lg' : 'shadow-md'
      },
      blue: {
        bg: isSelected ? 'bg-blue-400' : 'bg-blue-100',
        text: isSelected ? 'text-white' : 'text-gray-700',
        hover: 'hover:bg-blue-200',
        border: isSelected ? 'border-blue-500' : 'border-blue-200',
        shadow: isSelected ? 'shadow-lg' : 'shadow-md'
      }
    };

    return colors[colorScheme] || colors.yellow;
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center py-4">
      {options.map((option) => {
        const isItemSelected = isSelected(option.value);
        const colors = getBubbleColors(isItemSelected);
        const style = bubbleStyles[option.value] || { size: 100, offsetX: 0, offsetY: 0, rotation: 0 };
        
        return (
          <motion.button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`${colors.bg} ${colors.text} ${colors.hover} ${colors.border} ${colors.shadow} rounded-full border-2 flex items-center justify-center transition-all duration-300 relative text-font`}
            style={{
              width: `${style.size}px`,
              height: `${style.size}px`,
              fontSize: `${Math.max(14, style.size / 6)}px`,
              transform: `translate(${style.offsetX}px, ${style.offsetY}px) rotate(${style.rotation}deg)`,
              zIndex: isItemSelected ? 10 : 1
            }}
            whileHover={{ 
              scale: 1.05, 
              zIndex: 20,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: isItemSelected ? 1.05 : 1
            }}
            layout
          >
            {option.label}
          </motion.button>
        );
      })}
    </div>
  );
} 