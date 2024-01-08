import React from 'react';

interface ButtonProps {
  text: string;
  handler: React.MouseEventHandler;
}

const StepButton = (props: ButtonProps) => {
  return <button onClick={props.handler}>{props.text}</button>;
};

export default StepButton;
