import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HealthGoals from './HealthGoals';
import FlavorPreferences from './FlavorPreferences';
import Allergies from './Allergies';
import CuisinePreferences from './CuisinePreferences';
import CookingExperience from './CookingExperience';
import Navbar from '../Navbar';

const steps = [
  'health-goals',
  'flavor-preferences',
  'allergies',
  'cuisine-preferences',
  'cooking-experience'
];

export default function PreferenceJourney() {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    healthGoals: [],
    flavorPreferences: [],
    allergies: [],
    cuisinePreferences: [],
    cookingExperience: ''
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 完成所有步骤，保存配置并重定向到首页或推荐页面
      console.log('所有配置完成:', preferences);
      navigate('/recipes');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const updatePreferences = (type, value) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // 根据当前步骤渲染对应的组件
  const renderStep = () => {
    switch (steps[currentStep]) {
      case 'health-goals':
        return (
          <HealthGoals 
            selected={preferences.healthGoals}
            onSelect={(value) => updatePreferences('healthGoals', value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'flavor-preferences':
        return (
          <FlavorPreferences 
            selected={preferences.flavorPreferences}
            onSelect={(value) => updatePreferences('flavorPreferences', value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'allergies':
        return (
          <Allergies 
            selected={preferences.allergies}
            onSelect={(value) => updatePreferences('allergies', value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'cuisine-preferences':
        return (
          <CuisinePreferences 
            selected={preferences.cuisinePreferences}
            onSelect={(value) => updatePreferences('cuisinePreferences', value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'cooking-experience':
        return (
          <CookingExperience 
            selected={preferences.cookingExperience}
            onSelect={(value) => updatePreferences('cookingExperience', value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Navbar />
      <div className="pt-24 pb-10 px-4 max-w-6xl mx-auto">
        {/* 进度指示器 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {steps.map((step, index) => (
              <div 
                key={step} 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  index < currentStep ? 'bg-yellow-500 text-white' : 
                  index === currentStep ? 'bg-yellow-400 text-black' : 
                  'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div 
              className="absolute top-0 left-0 h-full bg-yellow-400 rounded-full transition-all"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* 当前步骤的内容 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 min-h-[400px]">
          {renderStep()}
        </div>
      </div>
    </div>
  );
} 