import React from 'react';
import clsx from 'classnames';
import _ from 'lodash';

import { ETATypes, Nullable } from 'common/types';
import { CurrencyText } from 'components/primitives';
import GuardIcon from 'components/primitives/Icons/Guard.icon';
import { CURRENCY_SYMBOLS } from 'common/consts';

import './EquityDetail.scss';

const ETATitle: React.FC<{ name: string }> = ({ name }) => {
  const words = _.words(name);
  return (
    <h4 className="flex justify-center items-start p-0 text-gray-700 text-center text-[27px] leading-[35.29px] mb-[6px]">
      <span className="font-bold">{words[0]}</span>
      <span className="font-light">{words[1]}</span>
      <sup className="mt-1 ml-1 text-sm font-bold uppercase">eta</sup>
    </h4>
  );
};

const GrowthExposure: React.FC<
  { priceValue: number } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ className, priceValue = 0, ...props }) => {
  const priceText = priceValue.toFixed(2)?.toString().split('.');
  return (
    <div className={clsx('flex flex-col', className)}>
      <div className="mb-1 uppercase font-semibold text-xxs text-white">Generating</div>
      <div className="flex items-baseline text-gray-700">
        <span
          className="text-[50px] font-light leading-none"
          style={{ marginBottom: -1, marginRight: -2 }}
        >
          {priceText[0]}
        </span>
        <span className="text-[25px] font-light">.{priceText[1]}x</span>
      </div>
      <div className="uppercase font-semibold text-xxs text-white">Growth Exposure</div>
    </div>
  );
};

const RunningYield: React.FC<
  { yieldValue: number } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ className, yieldValue = 0, ...props }) => {
  const yieldText = yieldValue.toFixed(2)?.toString().split('.');
  return (
    <div className={clsx('flex flex-col', className)}>
      <div className="uppercase font-semibold text-xxs text-white">Generating</div>
      <div className="flex items-baseline text-gray-700">
        <span
          className="text-[50px] font-light leading-none"
          style={{ marginBottom: -1, marginRight: -2 }}
        >
          {yieldText[0]}
        </span>
        <span className="text-[25px] font-light">.{yieldText[1]}%</span>
      </div>
      <div className="uppercase font-semibold text-xxs text-white">Running Yield</div>
    </div>
  );
};

const CapitalGuard: React.FC<
  { guardValue: number } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ className, guardValue = 0, ...props }) => {
  const guardText = guardValue.toFixed(2)?.toString().split('.');
  return (
    <div className={clsx('flex flex-col', className)}>
      <div className="mb-1 uppercase font-semibold text-xs">Capital Guard</div>
      <div className="flex items-end text-gray-700">
        <span
          className="text-5xl font-light"
          style={{ marginBottom: -1, marginRight: -2 }}
        >
          {guardText[0]}
        </span>
        <span className="text-3xl font-light">.{guardText[1]}%</span>
      </div>
    </div>
  );
};

const NoGuard: React.FC<
  { etaName: ETATypes } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ className, etaName, ...props }) => (
  <div className={clsx('flex flex-col', className)}>
    <div className="mt-2 mb-2 min-w-[80px] uppercase font-semibold text-xs text-center">
      No Guard
    </div>
    <div className="flex items-end text-gray-700">
      <div
        className={clsx(
          'equity-detail__no-guard  mb-2 min-w-[80px] text-xs font-bold text-white tracking-wide',
          etaName
        )}
      >
        1<sup>ST</sup> LOSS
      </div>
    </div>
  </div>
);

const ETASnippet: React.FC<
  { symbol: string, volume: number } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ className, symbol, volume = 0, ...props }) => {
  return (
    <div className={clsx('flex flex-col', className)}>
      <div className="mb-0 uppercase font-semibold text-xxs">{symbol}</div>
      <div className="flex items-end text-gray-700">
        <span
          className="text-[25px] font-light"
          style={{ marginRight: -2 }}
        >
          <CurrencyText value={volume} decimalScale={0} symbol="" />
        </span>
      </div>
    </div>
  );
};

const ETAPrice: React.FC<{ price: number, region: string; } & React.HtmlHTMLAttributes<HTMLDivElement>> = ({ className, price = 0, region, ...props }) => (
  <div className={clsx('flex flex-col', className)}>
    <div className="flex items-end text-gray-700">
      <span
        className="text-[25px] font-light"
        style={{ marginRight: -2 }}
      >
        <CurrencyText symbol={CURRENCY_SYMBOLS.get(region)} value={price} />
      </span>
    </div>
    <div className="uppercase font-semibold text-xxs">Per ETA</div>
  </div>
);

const EquityDetailView: React.FC<
  {
    etaName: Nullable<ETATypes>;
    guardValue: number;
    lastPrice: number;
    positionValue: number;
    symbol: string;
    totalPriceExposure: number;
    totalYieldExposure: number;
    volume: number;
    region?: string;
  } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({
  className,
  etaName,
  guardValue = 0,
  lastPrice = 0,
  positionValue = 0,
  symbol,
  totalPriceExposure,
  totalYieldExposure,
  volume = 0,
  style,
  region = 'AU',
  ...props
}) => {
  if (!etaName) return null;
  return (
    <div className={clsx('equity-detail', className)} style={style}>
      <ETATitle name={etaName} />
      <div className="absolute -bottom-20 w-full flex flex-col items-center">
        <span className="equity-detail__position-value block mb-2 w-32 tracking-wider font-light text-center text-xxs uppercase">Position Value</span>
        <h2 className="mb-0 w-full font-extralight text-center text-white text-[45px]">
          <CurrencyText symbol={CURRENCY_SYMBOLS.get(region)} value={positionValue} decimalScale={0} />
        </h2>
      </div>
      <hr
        className={clsx('equity-detail__sep', `equity-detail__sep--${etaName}`)}
      />
      {/* {_.includes(['PureGrowth', 'PureDiv'], etaName) ? (
        <div className="equity-detail__box flex flex-col justify-center items-center h-24 text-white">
          {etaName === 'PureGrowth' && (
            <GrowthExposure
              className="justify-center items-center scale-75"
              priceValue={totalPriceExposure}
            />
          )}
          {etaName === 'PureDiv' && (
            <RunningYield
              className="justify-center items-center scale-75"
              yieldValue={totalYieldExposure}
            />
          )}
        </div>
      ) : ( */}
      <div className="equity-detail__triangles flex flex-col justify-center items-center h-28 text-white">
        <ETASnippet
          className="absolute left-[10px] top-[10px] items-start"
          symbol={symbol}
          volume={volume}
        />
        <ETAPrice className="absolute right-[10px] bottom-[10px] items-end" price={lastPrice} region={region} />
      </div>
      {/* )} */}
      <div className="equity-detail__box mt-[-2px] flex flex-col justify-center items-center h-24">
        {_.includes(['DivGuard', 'MaxDiv', 'PureDiv'], etaName) ? (
          <RunningYield
            className="justify-center items-center"
            yieldValue={totalYieldExposure}
          />
        ) : (
          <GrowthExposure
            className="justify-center items-center"
            priceValue={totalPriceExposure}
          />
        )}
        {/* <span className="mb-2 uppercase text-xxs text-gray-600">
          Position Value
        </span>
        <h3 className="mb-0 font-light text-white">
          <CurrencyText value={positionValue} />
        </h3> */}
      </div>
    </div>
  );
};

export default EquityDetailView;
