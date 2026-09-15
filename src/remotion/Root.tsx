import { Composition, registerRoot } from 'remotion';
import { HeroBackground } from './HeroBackground';
import '../styles/index.css';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroBackground"
        component={HeroBackground}
        durationInFrames={900} // 30 seconds
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
