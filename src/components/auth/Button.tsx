import React from 'react';

type BurrtonProps = {
  type: 'submit' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

const Button = ({ type, onClick, children }: BurrtonProps) => {
  return (
    <button
      className="p-3 mt-5 mb-5 rounded-md text-white bg-purple-500 hover:bg-purple-600"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
