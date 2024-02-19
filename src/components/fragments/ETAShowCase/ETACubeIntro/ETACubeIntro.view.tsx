import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';

import {
  PrismETAStep,
  WholeShare as WholeShareStep,
} from 'components/snippets';
import './styles.scss';

interface ETACubeIntroViewProps {
  setShowIntro: (isShow: boolean) => void;
  isLastView: boolean;
  setIsLastView: (isShow: boolean) => void;
}
const ETACubeIntroView: FC<ETACubeIntroViewProps> = ({
  setShowIntro,
  isLastView,
  setIsLastView,
}) => {
  return (
    <div className="etacubeintro-wrapper h-full w-full flex flex-col justify-center">
      <AnimatePresence>
        {isLastView ? (
          <PrismETAStep
            setIsLastView={setIsLastView}
            setShowIntro={setShowIntro}
          />
        ) : (
          <WholeShareStep setIsLastView={setIsLastView} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ETACubeIntroView;
