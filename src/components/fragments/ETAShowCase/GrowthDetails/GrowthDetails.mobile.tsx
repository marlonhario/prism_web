import { FC } from 'react';

import { CURRENCY_SYMBOLS } from 'common/consts';
import { getSplitTitle } from 'common/utils/String';
import PayoffChart from 'components/fragments/ETAShowCase/PayoffChart';
import { GrowthDetailsProps } from './GrowthDetails.props';

interface GrowthDetailsMobileProps extends GrowthDetailsProps {
  changeActiveETAType: () => void;
}
const GrowthDetailsMobile: FC<GrowthDetailsMobileProps> = (props) => {
  return (
    <div className="mobile-growthDetails-component relative">
      <div
        className={`mobile-gd-currencyAmount text-[${props.textColor}] absolute top-[-7.2em] left-0`}
      >
        <sup className="text-[24px]">
          {CURRENCY_SYMBOLS.get(props.activeSecurity.region)}
        </sup>
        <span className="text-5xl">
          {props.content.growthETAPrice
            ? props.content.growthETAPrice.toFixed(2).toString().split('.')[0]
            : 0}
          .
        </span>
        <span className="text-[24px]">
          {props.content.growthETAPrice
            ? props.content.growthETAPrice.toFixed(2).toString().split('.')[1]
            : 0}
        </span>
      </div>
      <div
        className={`mobile-gd-title pb-2 font-din2014 text-left cursor-pointer
        text-[${props.textColor}]`}
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
          className={`font-bold text-base ${
            props.textColor === '#FFFFFF' ? 'eta-text-shadow' : ''
          }`}
        >
          ETA
        </sup>
      </div>
      <div className="box-title-chart" onClick={props.changeActiveETAType}>
        <div className={`text-center text-white py-3 no-dividend`}>
          NO DIVIDEND
        </div>
        <PayoffChart
          hasYAxis={true}
          color={props.color}
          stroke={props.stroke}
          content={props.content}
          profile={props.profile}
          profile2={props.profile2}
          activeSecurity={props.activeSecurity}
          etaPercentFill={props.etaPercentFill}
          riskExposure={props.riskExposure}
          chartHeight={330}
          detailsPosition="h-[330px]"
          lastPrice={props.content.growthETAPrice}
          etaPrice={props.content.growthETAPrice}
          establishmentPrice={props.content.growthETAPrice}
          type="growth"
        />
      </div>
    </div>
  );
};

export default GrowthDetailsMobile;
