import { motion } from 'framer-motion';

interface Props {
  text: string;
  index: number;
  className?: string;
}

const TransitionText = (props: Props) => {
  const { text, index, className } = props;

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={index}
      transition={{ duration: 0.5 }}
    >
      {text}
    </motion.p>
  );
};

export default TransitionText;
