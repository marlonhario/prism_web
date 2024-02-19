import React, { useState } from 'react';
import clsx from 'classnames';
import CurrencyFormat from 'react-currency-format';
import { findIndex, first, last, words } from 'lodash';

import Icon from 'components/primitives/Icons';
import { CurrencyText } from 'components/primitives';
import { ETAColors, ETAPairing, ETATypes, Nullable } from 'common/types';
import { ETAPairingColors } from 'common/consts';

import './EquityCard.scss';

const MetaText: React.FC<{ label: string; value: any }> = ({
  label,
  value,
}) => {
  return (
    <>
      <dt className="font-bold text-xxs uppercase text-[#A49E99]">{label}</dt>
      <dd className="text-xs">{value}</dd>
    </>
  );
};

const EquityCardView: React.FC<{
  className?: string;
  etaCode: Nullable<string>;
  etaType?: ETATypes;
  establishPrice?: number;
  etaUnits: number;
  lastPrice: number;
}> = ({
  className,
  etaCode,
  establishPrice = 0,
  etaType = 'MaxDiv',
  etaUnits = 0,
  lastPrice = 0,
}) => {
    const [showMore, setShowMore] = useState<Boolean>(false);
    const etaStr = words(etaType);
    const etaBorder: ETAColors = `border-${etaType}`;

    const onShowMore = () => setShowMore(!showMore);

    return (
      <div className={clsx('equity-card-view', className)}>
        <span className="flex gap-x-1 items-start justify-center tracking-wider text-xl">
          <span>
            <strong className="font-bold">{etaStr[0]}</strong>
            <span className="font-light">{etaStr[1]}</span>
          </span>
          <span className="font-black text-xs">ETA</span>
        </span>
        <div
          className={clsx(
            'equity-eta-card flex flex-col pt-3 pb-2 w-48 bg-gray-100 shadow-inner-xl gap-y-2 border text-gray-400',
            etaBorder
          )}
        >
          <div className="text-center">
            <h2 className="-mb-2 text-gray-400 font-normal">
              <CurrencyText value={etaUnits * lastPrice} />
            </h2>
            <small>Position Value</small>
          </div>
          <div className="flex items-end">
            <div className="w-28 pl-2 text-center">
              <h4 className="-mb-1 font-medium text-gray-400">
                <CurrencyFormat
                  value={etaUnits}
                  displayType={'text'}
                  thousandSeparator
                />
              </h4>
              <p className="mb-0 text-xxs whitespace-nowrap">
                {etaType} Values
              </p>
            </div>
            <div className="flex-grow flex flex-col text-center text-gray-500">
              <p className="-mb-1 font-light text-base text-gray-400">
                <CurrencyText value={lastPrice} />
              </p>
              <p className="mb-0 text-gray-400 font-bold text-xxs uppercase">
                Last Price
              </p>
            </div>
          </div>
        </div>
        <button
          className={clsx(
            'flex items-center justify-center w-full bg-[#dddddd]',
            showMore ? 'hidden' : 'block'
          )}
          onClick={onShowMore}
        >
          <Icon name="expand" width={26} color="white" />
        </button>
        <div
          className={clsx(
            'flex mt-2 pl-2 overflow-hidden transition-height duration-400',
            showMore ? 'h-auto' : 'h-0'
          )}
        >
          <dl>
            <div className="equity-card-view__code">
              <MetaText label="Code" value={etaCode || ''} />
            </div>
            <MetaText label="Maturity" value="9.5 Years" />
            <MetaText
              label="last PRICE"
              value={<CurrencyText value={lastPrice} />}
            />
          </dl>
          <dl className="pl-3">
            <MetaText label="Value Allocation" value="Growth Only" />
            <MetaText label="Risk Allocation" value="First Capital Exposure" />
            <MetaText
              label="Establishment Price"
              value={<CurrencyText value={establishPrice} />}
            />
          </dl>
        </div>
      </div>
    );
  };

const EquityCardsView: React.FC<{
  className: string;
  etaCode: Nullable<string>;
  etas?: ETATypes[];
  etaPairing: Nullable<ETAPairing>;
  etaUnits?: number;
  lastPrice?: number;
  establishPrice?: number;
}> = ({
  className,
  etaCode,
  etaPairing,
  establishPrice = 0,
  etaUnits = 0,
  lastPrice = 0,
  etas = [],
}) => {
    const index = findIndex(
      etas,
      (e) => !!etaPairing && ETAPairingColors[e] === etaPairing
    );
    const etaType = etas[index];
    return (
      <div className={clsx('flex flex-col', className)}>
        <div
          className={clsx(
            'transition-all duration-500',
            etaType !== first(etas) ? 'flex-grow' : 'flex-none'
          )}
        />
        <EquityCardView
          {...{ etaCode, etaType, etaUnits, establishPrice, lastPrice }}
          className={etaType ? 'block' : 'hidden'}
          key={etaCode}
        />
        <div
          className={clsx(
            'transition-all duration-500',
            etaType !== last(etas) ? 'flex-grow' : 'flex-none'
          )}
        />
      </div>
    );
  };

export default EquityCardsView;
