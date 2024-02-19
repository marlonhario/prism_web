import { motion } from 'framer-motion';
import { FC } from 'react';

export type PositionTypes = 'top' | 'left' | 'right';
export interface IntroCubeTextsProps {
  position: PositionTypes;
  texts: {
    top: string;
    bottom: string;
  };
}
const IntroCubeTexts: FC<IntroCubeTextsProps> = ({ position, texts }) => {
  const commonClass =
    'leading-10 tracking-widest text-[#8B8E94] mb-0 text-center';

  const topStyle = {
    top: '51px',
    left: '0',
    right: '0',
    fontSize: '30px',
  };
  const leftStyle = {
    transform: 'matrix(1, 0.58, 0, 0.89, 0, 0)',
    bottom: '111px',
    left: '30px',
    fontSize: '23px',
  };
  const rightStyle = {
    transform: 'matrix(1, -0.58, 0, 0.89, 0, 0)',
    bottom: '111px',
    right: '18px',
    fontSize: '23px',
  };

  const horizontalStyle = position === 'left' ? leftStyle : rightStyle;
  const wrapperStyle = position === 'top' ? topStyle : horizontalStyle;

  const containerMotion = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delay: 1,
      },
    },
  };
  return (
    <motion.div
      variants={containerMotion}
      initial="hidden"
      animate="show"
      style={wrapperStyle}
      className="introcube-texts-component-wrapper font-din2014 absolute"
    >
      <motion.p
        className={`font-light relative ${commonClass}`}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ delay: 2 }}
      >
        {texts.top}
      </motion.p>

      <p className={`font-medium ${commonClass}`}>{texts.bottom}</p>
    </motion.div>
  );
};

export default IntroCubeTexts;
