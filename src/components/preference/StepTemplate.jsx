import { motion } from 'framer-motion';

export default function StepTemplate({
  title,
  description,
  children,
  onNext,
  onBack,
  nextDisabled = false,
  nextLabel = '下一步',
  showBackButton = true
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 text-font">{title}</h2>
        {description && (
          <p className="text-gray-600 text-font">{description}</p>
        )}
      </div>

      <div className="flex-grow mb-8">
        {children}
      </div>

      <div className="flex justify-between">
        {showBackButton ? (
          <button
            onClick={onBack}
            className="px-6 py-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-font"
          >
            返回
          </button>
        ) : <div></div>}

        <button
          onClick={onNext}
          disabled={nextDisabled}
          className={`px-6 py-2 rounded-full text-font ${
            nextDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-yellow-400 text-black hover:bg-yellow-500 transition-colors'
          }`}
        >
          {nextLabel}
        </button>
      </div>
    </motion.div>
  );
} 