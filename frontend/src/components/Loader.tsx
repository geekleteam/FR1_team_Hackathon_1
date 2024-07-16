import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center h-[200px] w-[200px]">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 border-4 border-gray-200 border-t-secondary-pink rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <img src={'/logo.png'} alt="Tentacle pink" className="w-24 h-24 object-contain" />
        </div>
      </div>
    </div>
  );
};
