import { motion } from 'framer-motion';

const Index = () => {
  const boxes = Array.from({ length: 40 }, (_, i) => i + 1);

  // 더미 데이터를 만들어서 렌더링
  const renderBoxes = () =>
    boxes.map((box, index) => (
      <motion.div
        key={index}
        style={{
          display: 'flex',
          gap: '10px',
          backgroundColor: 'white',
          width: '100px',
          height: '100px',
          border: '1px solid black',
        }}
      >
        {box}
      </motion.div>
    ));

  return (
    <div style={{ overflowX: 'hidden' }}>
      <motion.div
        style={{
          display: 'flex',
          x: '-100%',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        animate={{ x: '100%' }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div style={{ display: 'flex' }}>{renderBoxes()}</div>
        <div style={{ display: 'flex' }}>{renderBoxes()}</div>
      </motion.div>
      <motion.div
        style={{
          display: 'flex',
          x: '100%',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        animate={{ x: '-100%' }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div style={{ display: 'flex' }}>{renderBoxes()}</div>
        <div style={{ display: 'flex' }}>{renderBoxes()}</div>
      </motion.div>
    </div>
  );
};

export default Index;
