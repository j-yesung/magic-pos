import React from 'react';

interface ButtonProps {
  text: string;
  handler: React.MouseEventHandler;
  disabled?: boolean;
}

const StepButton = ({ text, handler, disabled = false }: ButtonProps) => {
  return (
    <button onClick={handler} disabled={disabled}>
      {text}
    </button>
  );
};

export default StepButton;
