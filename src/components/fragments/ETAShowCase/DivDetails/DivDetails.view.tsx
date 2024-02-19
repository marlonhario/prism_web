import { useContext, useEffect } from 'react';
import { DivDetailsProps } from './DivDetails.props';
import { getSplitTitle } from 'common/utils/String';
import PayoffChart from 'components/fragments/ETAShowCase/PayoffChart';
import { MainContext } from 'context/MainContext';
import { Title10Description27 } from 'components/common/titleDescription';
import { CURRENCY_SYMBOLS } from 'common/consts';
import YieldChart from '../YieldChart';
import DivDetailsMobile from './DivDetails.mobile';

const DivDetailsView: React.FC<DivDetailsProps> = (props: DivDetailsProps) => {
  const isActive = props.textColor === '#FFFFFF';
  const { expand: isEducationPanelExpanded } =
    useContext(MainContext);

  //Changes the active ETA type to div
  const changeActiveETAType = () => {
    props.setActiveEtaType('income');
  };

  useEffect(() => {
    document
      .querySelector(
        `#yield-graph-${props.profile.label} .recharts-reference-line .recharts-label tspan`
      )
      ?.setAttribute('x', '240');
  }, []);

  return (
    <div className="mt-2 w-full max-w-[248px]">
      {props.isMobileView ? (
        <DivDetailsMobile
          {...props}
          changeActiveETAType={changeActiveETAType}
        />
      ) : (
        <>
          <div
            className={`pb-2 font-din2014 cursor-pointer text-right text-[${props.textColor}]`}
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
              className={`font-bold text-base  ${
                props.textColor === '#FFFFFF' ? 'eta-text-shadow' : ''
              }`}
            >
              ETA
            </sup>
            <Title10Description27
              classes="text-right mt-1"
              title="running yield"
              title_class={`text-[${props.textColor}]`}
              description_class={`${
                isActive ? props.color : `text-[${props.textColor}]`
              } ${isEducationPanelExpanded ? 'mb-0' : 'mb-5'}`}
              description={`${props.profile.yield[0]}.${props.profile.yield[1]}%`}
            />
          </div>
          <div
            className={`box-title-chart
      ${isEducationPanelExpanded ? 'opacity-0 select-none z-0 h-[430px]' : ''}`}
            onClick={changeActiveETAType}
          >
            <div className="flex flex-col div-bar-chart">
              {/* The Bar Chart */}
              <YieldChart
                activeSecurity={props.activeSecurity}
                color={props.color}
                barFill={props.barFill}
                barStroke={props.barStroke}
                content={props.content}
                profile={props.profile}
              />
            </div>
            {/* The Area Chart for div */}
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
          <div
            className={`relative flex justify-end mt-3 flex-col items-center
              ${isEducationPanelExpanded ? 'ml-9 top-[30px]' : 'gap-y-2'}`}
          >
            <button
              className={`text-[13px] py-1 w-2/3 font-medium leading-none ${
                isActive ? 'target-bid-btn' : 'matched-offer-btn'
              } text-[${props.textColor}]`}
            >
              {isActive ? 'TARGET BID' : 'MATCHED OFFER'}
            </button>
            <div className={`text-[${props.textColor}]`}>
              <sup className="text-[24px]">
                {CURRENCY_SYMBOLS.get(props.activeSecurity.region)}
              </sup>
              <span className="text-5xl">
                {props.content.incomeETAPrice
                  ? props.content.incomeETAPrice
                      .toFixed(2)
                      .toString()
                      .split('.')[0]
                  : 0}
                .
              </span>
              <span className="text-[24px]">
                {props.content.incomeETAPrice
                  ? props.content.incomeETAPrice
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

export default DivDetailsView;
