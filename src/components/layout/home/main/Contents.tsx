import styles from '../styles/Home.module.css';
import { SliderArea, StartButton, StickBar, Title, WateMark } from './module-export';

const Contents = () => {
  return (
    <>
      <StickBar />
      <Title />
      <WateMark />
      <StartButton />
      <SliderArea />
      <Video />
    </>
  );
};

export default Contents;
