// components/SnackBar.jsx
import React from 'react';
import { X } from 'lucide-react';

export const SnackBar = ({ backgroundColor, message, handleFunction, handleFunctionInput }) => {
  return (
    <div
      style={{
        backgroundColor: `${backgroundColor}`,
        color: 'white',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px',
        borderRadius: '5px',
      }}
    >
      {message}
      <button
        onClick={() => handleFunction(handleFunctionInput)}
        className="ml-2 text-white bg-transparent border-none align-middle cursor-pointer"
      >
        <X />
      </button>
    </div>
  );
};

