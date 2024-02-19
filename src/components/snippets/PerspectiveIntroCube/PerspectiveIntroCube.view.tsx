import { FC, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';

import IntroCube from 'assets/images/cubes/IntroCube.png';
import CubeTexts from './subComponents/CurrentCubeTexts';
import { IntroCubeTextsProps } from './subComponents/IntroCubeTexts';

interface Props {
  showLast: boolean;
}
const PerspectiveIntroCubeView: FC<Props> = ({ showLast }) => {
  const currentCubeTexts: IntroCubeTextsProps[] = useMemo(() => {
    return [
      {
        position: 'top',
        texts: {
          top: '100%',
          bottom: 'RISK',
        },
      },
      {
        position: 'left',
        texts: {
          top: '100%',
          bottom: 'GROWTH',
        },
      },
      {
        position: 'right',
        texts: {
          top: '100%',
          bottom: 'DIVIDEND',
        },
      },
    ];
  }, []);

  const lastCubeTexts: IntroCubeTextsProps[] = useMemo(() => {
    return [
      {
        position: 'top',
        texts: {
          top: 'Realign',
          bottom: 'RISK',
        },
      },
      {
        position: 'left',
        texts: {
          top: 'Accelerate',
          bottom: 'GROWTH',
        },
      },
      {
        position: 'right',
        texts: {
          top: 'Amplify',
          bottom: 'DIVIDEND',
        },
      },
    ];
  }, []);

  return (
    <div className="perspectiveIntroCube-wrapper relative h-[392px] w-[340px] m-auto">
      <div className="introcube-image-wrapper absolute">
        <img className="h-[392px] w-[340px]" src={IntroCube} alt="intro-cube" />
      </div>
      <div className="introcube-texts-wrapper relative h-full">
        <AnimatePresence>
          {showLast ? (
            <CubeTexts cubeTexts={lastCubeTexts} />
          ) : (
            <CubeTexts cubeTexts={currentCubeTexts} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PerspectiveIntroCubeView;
