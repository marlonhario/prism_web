import { useState } from 'react';
import classNames from 'classnames';
import { motion, PanInfo } from 'framer-motion';
import { etaColorMap } from 'common/consts/etaColorMap';
import MaturityTermSlider from 'components/primitives/MaturityTermSlider';
import { MinifiedSecurityDropdown } from 'components/fragments/ETAShowCase/SecurityDropdown';
import { NewCubeModel, Perspective } from 'components/NewCubeModel';
import {
  formatCurrency,
  formatNumber,
} from 'components/NewLearnMoreMarket/utils';
import CustomShareETAMarkets from 'assets/images/custom-share-eta-market.png';
import { CustomShareMobileProps } from './CustomShare.props';
import { cubeAnimation } from './config';
import PayoffChart from 'components/fragments/ETAShowCase/PayoffChart';
import './CustomShare.scss';
import { Bar, BarChart } from 'recharts';

export default function CustomShareViewMobile({
  eta,
  etaColors,
  currency: propsCurrency,
  underlyingShare,
  dividendYield,
  etaData,
  dividendForecastData,
  cubePercentage,
  lastPrice,
  maturityTerm,
  dimensions,
  growthProfile,
  growthChartColor,
  divChartColor,
  isMobile,
  useMobileHeader,
  onChangeETA,
  onChangeLastPrice,
  onChangeMaturityTerm,
  onChangeProfileView,
  onShowMarkets,
}: CustomShareMobileProps) {
  const [direction, setDirection] = useState<number>(0);

  /**
   * handle interactive swipe event to
   * switch between cube colors
   * @param info PanInfo
   */
  const handleCubeSwipe = (info: PanInfo) => {
    const currentIndex = etaColors.indexOf(eta);
    const direction = info.offset.x < 0 ? 1 : -1;
    const nextIndex = currentIndex + direction;

    setDirection(direction);
    onChangeProfileView(nextIndex === 0 ? 'default' : 'options');
    onChangeETA(
      etaColors[
      nextIndex < 0 ? etaColors.length - 1 : nextIndex % etaColors.length
      ] as Perspective
    );
  };

  /**
   * render the formatted currency
   * @param currency formatter currency
   * @returns 
   */
  const renderFormattedCurrency = (currency: string) => {
    const symbol = currency.split('')[0];
    const price = currency.slice(1).split('.');

    return (
      <div>
        <sup className={'leading-[0.8] text-[14px] text-white'}>{symbol}</sup>

        <span
          className={'font-light flex-1 leading-[25px] text-[22px] text-white'}
        >
          {price[0]}
        </span>

        <span
          className={'font-light flex-1 leading-[25px] text-[14px] text-white'}
        >
          .{price[1]}
        </span>
      </div>
    );
  };

  return (
    <div className={'custom-share flex flex-col w-full h-full'}>
      {useMobileHeader && (
        <div
          className={
            'custom-share-header flex items-center gap-x-[20px] relative px-[15px] z-10'
          }
          style={{
            flex: isMobile ? '0 0 47px' : '0 0 75px',
            height: isMobile ? '47px' : '75px',
          }}
        >
          <div
            className={classNames(
              'market-container flex flex-row gap-x-3 items-center w-[35%] cursor-pointer',
              {
                'mr-auto': !isMobile,
              }
            )}
            onClick={onShowMarkets}
          >
            <img
              src={CustomShareETAMarkets}
              alt={''}
              style={{
                width: isMobile ? 30 : 45,
              }}
            />

            <div className="flex flex-col font-din2014">
              <h3
                className={classNames('mb-0 text-[white] ', {
                  'font-light leading-[11px] text-[11px]': isMobile,
                  'font-bold leading-[22px] text-[22px]': !isMobile,
                })}
              >
                ETA
              </h3>
              <span
                className={classNames('mb-0 text-[white] ', {
                  'font-light leading-[11px] text-[11px]': isMobile,
                  'font-light text-[17px] leading-[17px]': !isMobile,
                })}
              >
                MARKETS
              </span>
            </div>
          </div>

          {isMobile ? (
            <div
              className={
                'flex items-center absolute top-0 bottom-0 left-1/2 translate-x-[-50%]'
              }
            >
              <span
                className={
                  'leading-[12px] text-[13px] uppercase text-[#5F6369] tracking-[0.03em]'
                }
              >
                Custom Share
              </span>
            </div>
          ) : (
            <div className={'flex-1'}>
              <MinifiedSecurityDropdown
                lastPrice={formatCurrency(underlyingShare)}
                yieldPercent={formatNumber(dividendYield, 2) + '%'}
              />
            </div>
          )}
        </div>
      )}

      <div
        className={'custom-share-body flex-1 pb-[50px] prism-scrollbar'}
        style={{ zoom: 1 }}
      >
        <div
          className={'custom-share-body-content flex flex-col w-full h-full'}
        >
          <div
            className={
              'custom-share-slider flex flex-col gap-y-[10px] relative mt-[15px] px-5'
            }
          >
            <div
              className={
                'custom-share-slider-content flex items-center justify-center relative'
              }
            >
              <div
                className={
                  'custom-share-cube order-1 flex items-center justify-between'
                }
                style={{ zoom: (dimensions.width / 1200) * 1.25 }}
              >
                <motion.div
                  {...cubeAnimation}
                  key={eta}
                  custom={direction}
                  drag={'x'}
                  className={
                    'order-1 flex flex-col relative w-[550px] h-[550px]'
                  }
                  onDragEnd={(_, info) => handleCubeSwipe(info)}
                >
                  <NewCubeModel
                    perspective={eta}
                    etaPairs={[]}
                    etaType={eta}
                    profile={'growth'}
                    sliderProfile={'growth'}
                    allocations={cubePercentage}
                    sliderPercentage={cubePercentage}
                    isDemo={false}
                    hasActiveSecurity={true}
                    hideViewText={true}
                    hideBackground={true}
                    canView={true}
                    onAllocationsChange={() => { }}
                    updateCubePercentage={() => { }}
                    onHover={(etaType, profileType, showType) => { }}
                  />
                </motion.div>
              </div>

              <div
                className={
                  'custom-share-cube-growth order-0 flex flex-col justify-center relative w-[140px] px-[17px] py-[16px]'
                }
              >
                <span
                  className={
                    'leading-[1.4] text-[14px] uppercase text-white tracking-[0.04em]'
                  }
                >
                  Growth
                </span>

                <span
                  className={
                    'leading-[1.4] text-[23px] text-white tracking-[0.04em]'
                  }
                >
                  {formatNumber(Number(eta ? etaData.growthValue : 0), 2)}x
                </span>
              </div>

              <div
                className={
                  'custom-share-cube-yield order-2 flex flex-col justify-center relative w-[140px] px-[17px] py-[16px] text-right'
                }
              >
                <span
                  className={
                    'leading-[1.4] text-[14px] uppercase text-white tracking-[0.04em]'
                  }
                >
                  Yield
                </span>

                <span
                  className={
                    'leading-[1.4] text-[23px] text-white tracking-[0.04em]'
                  }
                >
                  {formatNumber(eta ? Number(etaData.dividendValue) : 0, 2)}%
                </span>
              </div>
            </div>

            <div
              className={
                'custom-share-slider-controls flex justify-center gap-x-[13px] z-[10]'
              }
            >
              {etaColors.map((color, i) => (
                <div
                  key={i}
                  className={classNames(
                    'flex items-center justify-center gap-x-[5px] w-[7px] h-[7px] rounded-full cursor-pointer',
                    {
                      ['border border-white']: eta === color,
                    }
                  )}
                  style={{
                    backgroundColor: color
                      ? etaColorMap[color].color
                      : '#FFFFFF',
                  }}
                  onClick={() => onChangeETA(color as Perspective)}
                />
              ))}
            </div>
          </div>

          <div
            className={
              'custom-share-chart justify-evenly flex taller:flex-col taller:items-center taller:zoom-normal taller:gap-y-5 px-4 mt-8'
            }
          >
            <div className="custom-share-payoff-chart">
              <PayoffChart
                hasYAxis={true}
                color={growthChartColor.color}
                stroke={growthChartColor.stroke}
                content={{
                  growthETAPrice: etaData.growthEstablishmentPrice,
                  growthEstablishmentPrice: etaData.growthEstablishmentPrice,
                  growthLastPrice: etaData.growthLastPrice,
                  growthPercentageofShare: etaData.growthPercentageofShare,
                  growthSymbol: '',
                  incomeETAPrice: etaData.incomeEstablishmentPrice,
                  incomeEstablishmentPrice: etaData.incomeEstablishmentPrice,
                  incomeLastPrice: etaData.incomeLastPrice,
                  incomePercentageofShare: etaData.incomePercentageofShare,
                  incomeSymbol: '',
                  normalisedGrowthPrice: etaData.normalisedGrowthPrice,
                }}
                profile={growthProfile}
                etaPercentFill={growthChartColor.etaPercentFill}
                riskExposure={''}
                chartHeight={100}
                detailsPosition=""
                lastPrice={etaData.growthETAPrice}
                etaPrice={etaData.growthETAPrice}
                establishmentPrice={etaData.growthETAPrice}
                type="growth"
                hideDetails={true}
              />
            </div>
            <div className="div-bar-chart w-[250px]">
              <BarChart
                data={dividendForecastData}
                width={250}
                height={100}
                barSize={3}
                style
              >
                <Bar
                  dataKey="dividendETA"
                  fill={divChartColor.barFill}
                  stroke={divChartColor.barStroke}
                  radius={[10, 10, 0, 0]}
                  name="Dividend ETA"
                />
              </BarChart>
            </div>
          </div>

          <div className={'flex flex-col gap-y-[61px] pb-[60px] mt-[60px]'}>
            <div className={'flex flex-col px-[30px]'}>
              <div className={'flex items-center justify-between mb-[11px]'}>
                {renderFormattedCurrency(
                  formatCurrency(
                    Math.abs(etaData.growthETAPrice),
                    propsCurrency
                  )
                )}

                <span
                  className={
                    'font-light flex-1 leading-[25px] text-center text-[16px] uppercase text-white'
                  }
                >
                  Bid
                </span>

                {renderFormattedCurrency(
                  formatCurrency(
                    Math.abs(etaData.incomeETAPrice),
                    propsCurrency
                  )
                )}
              </div>

              <MaturityTermSlider
                value={lastPrice}
                threshold={1}
                disable={!eta}
                onChange={onChangeLastPrice}
              />
            </div>

            <div className={'flex flex-col px-[30px]'}>
              <div className={'flex items-center justify-between mb-[11px]'}>
                <span
                  className={
                    'font-light flex-1 leading-[25px] text-[14px] text-white'
                  }
                >
                  1 YEAR
                </span>

                <span
                  className={
                    'font-light flex-1 leading-[16px] mt-[-20px] text-center text-[16px] uppercase text-white opacity-60'
                  }
                >
                  Maturity <br />
                  Term
                </span>

                <span
                  className={
                    'font-light flex-1 leading-[25px] text-[14px] text-right text-white'
                  }
                >
                  10 YEARS
                </span>
              </div>

              <MaturityTermSlider
                value={maturityTerm}
                minValue={1}
                maxValue={10}
                showValue={true}
                onChange={onChangeMaturityTerm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
