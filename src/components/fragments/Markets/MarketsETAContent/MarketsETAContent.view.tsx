import React from 'react';
import { MarketsETAContentProps } from './MarketsETAContent.props';
import cn from 'classnames';
import { ReactComponent as Plus } from 'assets/svg/plus.svg';
import { numberFormatter } from 'common/utils/String';
import { getSplitTitle } from 'common/utils/String';
import { MarketsSecurity } from 'common/interfaces/Markets/MarketsSecurity';
import useSelectorSafe from 'store/selectors/useSelectorSafe';
import './styles.scss';

const MarketsETAContent: React.FC<MarketsETAContentProps> = (
  props: MarketsETAContentProps
) => {
  const { prism } = useSelectorSafe((state) => state) || {};

  const handleClick = (e: React.MouseEvent) => {
    let security = {} as MarketsSecurity;
    if (props.security) {
      security = props.security;
    } else {
      security = prism?.securities.find(
        (security) => security.ticker === props.ticker
      ) as MarketsSecurity;
    }

    //Redirects to default view (Perspective or Optimiser) and selects the selected security and eta and shown to the page
    props.handleETAClick(props.eta.etaType, security);
  };

  return (
    <div
      className={cn(
        `text-[#FFFFFFE5] w-full h-10 flex-row mb-2 text-base cursor-pointer bg-[#ffffff0d] border-half border-solid border-white flex tracking-wider ltr eta-cotent-container`
        // props.selectedEtas.includes(props.eta.etaType) ? 'flex' : 'hidden'
      )}
      key={props.eta.etaType}
      onClick={handleClick}
    >
      <div className="w-[10%] flex flex-row border-r-half border-solid border-white eta-type-col">
        <div className={`w-[10%] max-w-[10%] min-w-[10%] background-${props.eta.etaType}`}></div>
        <div className="px-2 text-xs flex flex-col justify-center asx-row">
          <span className="tracking-normal">
            <span>{getSplitTitle(props.eta.etaType, 0)}</span>
            <span className="font-normal">
              {getSplitTitle(props.eta.etaType, 1)}
            </span>
            <sup>ETA</sup>
            <br />
          </span>

          <span>{props.ticker}</span>
        </div>
      </div>
      <div className="w-[14%] flex items-center pl-2 eta-remaining-term-col">
        <span>{props.eta.remainingTerm}Yrs</span>
      </div>
      <div className="w-[14%] flex items-center eta-change-col">
        <span
          className={cn(
            props.eta.change > 0 ? 'text-[#38D41F]' : 'text-red-500'
          )}
        >
          {props.eta.change > 0 ? '+' : ''}
          {props.eta.change}
        </span>
      </div>
      <div className="w-[14%] flex items-center eta-growth-multiple-last-col">
        {props.eta.last.toFixed(2)}{props.type === 'GROWTH MULTIPLE' ? 'X' : '%'}
      </div>
      <div className="w-[14%] flex items-center eta-growth-multiple-offer-col">
        {props.eta.offer.toFixed(2)}{props.type === 'GROWTH MULTIPLE' ? 'X' : '%'}
      </div>
      <div className="w-[14%] flex items-center eta-match-distance-col">
        {props.eta.matchDistance}%
      </div>
      <div className="w-[14%] flex items-center eta-value-in-circulation-col">
        ${numberFormatter(props.eta.valueInCirculation)}
      </div>
      <div
        className={`w-[6%] flex items-center button-col border-l-half border-solid border-white eta-add-col`}
      >
        <Plus
          className={`m-auto border-half border-solid border-white p-1 w-6 h-6 cursor-pointer`}
        />
      </div>
    </div>
  );
};

export default MarketsETAContent;
