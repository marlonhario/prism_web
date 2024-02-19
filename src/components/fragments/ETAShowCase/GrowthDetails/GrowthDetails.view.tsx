import { GrowthDetailsProps } from './GrowthDetails.props';
import { getSplitTitle } from 'common/utils/String';
import PayoffChart from 'components/fragments/ETAShowCase/PayoffChart';
import { useContext } from 'react';
import { MainContext } from 'context/MainContext';
import { Title10Description27 } from 'components/common/titleDescription';
import { CURRENCY_SYMBOLS } from 'common/consts';
import GrowthDetailsMobile from './GrowthDetails.mobile';

const GrowthDetailsView: React.FC<GrowthDetailsProps> = (
  props: GrowthDetailsProps
) => {

   //Changes the active ETA type to growth
  const changeActiveETAType = () => {
    props.setActiveEtaType('growth');
  };

  const { expand: isEducationPanelExpanded } = useContext(MainContext);
  const isActive = props.textColor === '#FFFFFF';
  const isIdle = !isActive && !props.textColor;

  return (
    <div className="mt-2 w-full max-w-[248px]">
      {props.isMobileView ? (
        <GrowthDetailsMobile
          {...props}
          changeActiveETAType={changeActiveETAType}
        />
      ) : (
        <>
          {' '}
          <div
            className={`pb-2 font-din2014 text-left cursor-pointer
        ${!isIdle ? `text-[${props.textColor}]` : 'text-white'}`}
            onClick={changeActiveETAType}
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

            <Title10Description27
              classes="text-left mt-1"
              title="growth exposure"
              title_class={!isIdle ? `text-[${props.textColor}]` : 'text-white'}
              description_class={`${
                isActive ? props.color : `text-[${props.textColor}]`
              } ${isEducationPanelExpanded ? 'mb-0' : 'mb-5'}`}
              description={`${props.profile.multipler[0]}.${props.profile.multipler[1]}X`}
            />
          </div>
          {
            <div
              className={`box-title-chart ${
                isEducationPanelExpanded
                  ? 'opacity-0 select-none z-0 h-[430px]'
                  : ''
              }`}
              onClick={changeActiveETAType}
            >
              <div className={`text-center text-white py-3 no-dividend`}>
                NO DIVIDEND
              </div>
              {/* The Area Chart for growth */}
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
          }
          <div
            className={`relative flex justify-center mt-3 flex-col items-center
        ${isEducationPanelExpanded ? 'mr-6 top-[30px]' : 'gap-y-2'}`}
          >
            <button
              className={`text-[13px] py-1 w-1/2 font-medium leading-none ${
                isIdle || isActive ? 'target-bid-btn' : 'matched-offer-btn'
              } ${!isIdle ? `text-[${props.textColor}]` : 'text-white'}`}
            >
              {isIdle || isActive ? 'TARGET BID' : 'MATCHED OFFER'}
            </button>
            <div
              className={`${
                isIdle ? 'text-white' : `text-[${props.textColor}]`
              }`}
            >
              <sup className="text-[24px]">
                {CURRENCY_SYMBOLS.get(props.activeSecurity.region)}
              </sup>
              <span className="text-5xl">
                {props.content.growthETAPrice
                  ? props.content.growthETAPrice
                      .toFixed(2)
                      .toString()
                      .split('.')[0]
                  : 0}
                .
              </span>
              <span className="text-[24px]">
                {props.content.growthETAPrice
                  ? props.content.growthETAPrice
                      .toFixed(2)
                      .toString()
                      .split('.')[1]
                  : 0}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GrowthDetailsView;
