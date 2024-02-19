import { FC } from 'react';

import { CURRENCY_SYMBOLS } from 'common/consts';
import { getSplitTitle } from 'common/utils/String';
import PayoffChart from 'components/fragments/ETAShowCase/PayoffChart';
import YieldChart from '../YieldChart';
import { DivDetailsProps } from './DivDetails.props';

interface DivDetailsMobileProps extends DivDetailsProps {
  changeActiveETAType: () => void;
}

const DivDetailsMobile: FC<DivDetailsMobileProps> = (props) => {
  return (
    <div className="mobile-divDetails-component relative">
      <div className={`mobile-dd-currencyAmount text-white relative`}>
        <div
          className={`text-[${props.textColor}] text-right absolute top-[-7.2em] right-0`}
        >
          <sup className="text-[24px]">
            {CURRENCY_SYMBOLS.get(props.activeSecurity.region)}
          </sup>
          <span className="text-5xl">
            {props.content.incomeETAPrice
              ? props.content.incomeETAPrice.toFixed(2).toString().split('.')[0]
              : 0}
            .
          </span>
          <span className="text-[24px]">
            {props.content.incomeETAPrice
              ? props.content.incomeETAPrice.toFixed(2).toString().split('.')[1]
              : 0}
          </span>
        </div>
      </div>
      <div
        className={`pb-2 font-din2014 cursor-pointer text-right text-[${props.textColor}]`}
        onClick={props.changeActiveETAType}
      >
        <span className="text-[27px]">
          <span
            className={`font-extrabold ${
              props.textColor === '#FFFFFF' ? 'eta-text-shadow' : ''
            }`}
          >
            {getSplitTitle(props.profile.label, 0)}
          </span>
          <span
            className={`font-normal ${
              props.textColor === '#FFFFFF' ? 'eta-text-shadow' : ''
            }`}
          >
            {getSplitTitle(props.profile.label, 1)}
          </span>
        </span>
        <sup
          className={`font-bold text-base  ${
            props.textColor === '#FFFFFF' ? 'eta-text-shadow' : ''
          }`}
        >
          ETA
        </sup>
      </div>
      <div className={`box-title-chart`} onClick={props.changeActiveETAType}>
        <div className="flex flex-col div-bar-chart">
          <YieldChart
            activeSecurity={props.activeSecurity}
            color={props.color}
            barFill={props.barFill}
            barStroke={props.barStroke}
            content={props.content}
            profile={props.profile}
          />
        </div>
        <PayoffChart
          hasYAxis={false}
          color={props.color}
          stroke={props.stroke}
          content={props.content}
          profile={props.profile}
          profile2={props.profile2}
          activeSecurity={props.activeSecurity}
          etaPercentFill={props.etaPercentFill}
          riskExposure={props.riskExposure}
          chartHeight={189}
          detailsPosition="h-[189px]"
          lastPrice={props.content.incomeETAPrice}
          etaPrice={props.content.incomeETAPrice}
          establishmentPrice={props.content.incomeETAPrice}
          type="income"
        />
      </div>
    </div>
  );
};

export default DivDetailsMobile;
