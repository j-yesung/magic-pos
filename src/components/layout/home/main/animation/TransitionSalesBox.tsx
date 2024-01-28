import { useObserver } from '@/hooks/service/useObserver';
import { motion } from 'framer-motion';
import React, { MutableRefObject } from 'react';

interface Props {
  delay: number;
  children: React.ReactNode;
  target: MutableRefObject<HTMLFormElement | null>;
}

const TransitionSalesBox = (props: Props) => {
  const { delay, children, target } = props;
  const { isVisible } = useObserver({ target, option: { threshold: 0.5 } });

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
      transition={{ duration: 1, delay: delay }}
    >
      {children}
    </motion.div>
  );
};

export default TransitionSalesBox;
