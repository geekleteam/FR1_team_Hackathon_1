import React from 'react';
import { ChevronUp, Lock } from 'lucide-react';

const CustomArrows = () => (
  <div className="flex flex-col">
    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
      <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 0L11.1962 5.25H0.803848L6 0Z" fill="currentColor"/>
      </svg>
    </button>
    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none mt-1">
      <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6L0.803848 0.75H11.1962L6 6Z" fill="currentColor"/>
      </svg>
    </button>
  </div>
);

const InputWithArrows = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
    <div className="flex items-center">
      <input 
        type="number" 
        value={value} 
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm rounded-l px-2 py-1 w-12 text-right appearance-none border border-gray-300 dark:border-gray-700" 
        style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
      />
      <div className="border border-l-0 border-gray-300 dark:border-gray-700 rounded-r p-1">
        <CustomArrows />
      </div>
    </div>
  </div>
);

const BlockProperties = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 font-sans shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xs text-gray-600 dark:text-gray-400">ID</span>
          <input
            type="text"
            defaultValue="node-001"
            className="bg-gray-100 dark:bg-gray-800 text-sm rounded px-2 py-1 w-40 text-right border border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xs text-gray-600 dark:text-gray-400">Label</span>
          <input
            type="text"
            defaultValue="Action Sheet - iPad"
            className="bg-gray-100 dark:bg-gray-800 text-sm rounded px-2 py-1 w-40 text-right border border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 pb-3 border-b border-gray-200 dark:border-gray-700">
          <InputWithArrows label="X" value={16} />
          <InputWithArrows label="Y" value={12} />
          <InputWithArrows label="W" value={329} />
          <InputWithArrows label="H" value={18} />
        </div>
        <div>
          <span className="text-xs text-gray-600 dark:text-gray-400 block mb-1">Notes</span>
          <textarea
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm rounded px-2 py-1 h-20 resize-none border border-gray-300 dark:border-gray-700"
            defaultValue="Add any additional notes about this node here."
          />
        </div>
      </div>
      <div className="absolute top-2 right-2 flex space-x-2">
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          <ChevronUp size={20} />
        </button>
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          <Lock size={20} />
        </button>
      </div>
    </div>
  );
};

export default BlockProperties;