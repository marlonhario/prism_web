import React from 'react';
import clsx from 'classnames';
import { motion, Variants } from 'framer-motion';
import _ from 'lodash';

import { ETATypes, Nullable } from 'common/types';

import './EquityLayers.scss';

const TopETALayer: React.FC<
  {
    etaName: ETATypes;
    scale: number;
    etaUnits: number;
    rightAlign?: boolean;
  } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({
  className,
  etaName,
  scale = 0,
  etaUnits = 0,
  rightAlign = false,
  ...props
}) => {
  const words = _.words(etaName);
  return (
    <div className={clsx('absolute flex items-center', className)} {...props}>
      <div
        className={clsx(
          'absolute -top-20 w-full',
          rightAlign ? 'text-right' : ''
        )}
      >
        <h4 className="-mb-1 text-white tracking-wide">
          <span className="font-bold">{words[0]}</span>
          <span className="font-light">{words[1]}</span>
        </h4>
        <span className="uppercase font-light text-lg text-black tracking-widest">
          Values
        </span>
      </div>
      <motion.div
        initial={{ width: 0, height: 0 }}
        className={clsx(
          `eta-layer__${etaName}`,
          'absolute bottom-0 z-0 w-full h-full eta-layer',
          rightAlign ? 'left-0' : 'right-0'
        )}
        animate={{
          height: `${scale}%`,
          width: `${scale}%`,
        }}
      />
    </div>
  );
};

const BottomLayer: React.FC<{ scale: number }> = ({ scale = 0 }) => (
  <div
    className="absolute uppercase text-xl text-gray-600 tracking-wider"
    style={{
      top: 49,
      left: 3,
      width: 173,
      height: 186,
      transform: 'rotate(54deg) skew(-6deg, -24deg) scale(0.5)',
    }}
  >
    <motion.div
      initial={{
        width: 0,
        height: 0,
        background:
          'linear-gradient(140deg, #000000 0%, rgba(0, 0, 0, 0) 72.75%), #474C55',
      }}
      className="absolute w-full h-full"
      animate={{
        height: `${scale}%`,
        width: `${scale}%`,
      }}
    />
  </div>
);

const EquityLayersView: React.FC<
  {
    growthETA: Nullable<ETATypes>;
    incomeETA: Nullable<ETATypes>;
    cashReturned: number;
    growthSlider: number;
    incomeSlider: number;
    incomeUnits: number;
    growthUnits: number;
    cashSqrLength: number;
    growthSqrLength: number;
    incomeSqrLength: number;
    onSlide: (field: string, val: number) => void;
  } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({
  className,
  cashReturned = 0,
  incomeETA,
  growthETA,
  growthSlider = 0,
  incomeSlider = 0,
  incomeUnits = 0,
  growthUnits = 0,
  cashSqrLength = 0,
  growthSqrLength = 0,
  incomeSqrLength = 0,
  style,
  onSlide,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'absolute flex justify-center z-1 w-[180px] h-[180px]',
        className
      )}
      style={style}
    >
      {growthETA && incomeETA && (
        <React.Fragment>
          <TopETALayer
            etaName={growthETA}
            etaUnits={growthUnits}
            scale={growthSqrLength}
            style={{
              transform: 'rotate(-13deg) skew(-13deg, -17deg) scale(0.5)',
              top: -16,
              left: -40,
              width: 178,
              height: 178,
            }}
          />
          <TopETALayer
            className="justify-end"
            etaName={incomeETA}
            etaUnits={incomeUnits}
            scale={incomeSqrLength}
            style={{
              transform: 'rotate(20deg) skew(20deg, 10deg) scale(0.5)',
              top: -13,
              right: -42,
              width: 185,
              height: 172,
            }}
            rightAlign
          />

          <BottomLayer scale={cashSqrLength > 0 ? cashSqrLength : 0} />
        </React.Fragment>
      )}
    </div>
  );
};

export default EquityLayersView;
