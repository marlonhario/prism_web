import { MouseEvent, useMemo } from 'react';
import { motion } from 'framer-motion';

import { slidersStyleConfig } from '../config';
import { LearnMoreMarketChartProps } from '../types';
import { formatCurrency } from '../utils';
import { Resizable } from '../Resizable';
import { SliderLeft } from '../SliderLeft';
import { SliderRight } from '../SliderRight';
import './index.scss';
import { CURRENCIES } from 'common/consts';

export function ETAChart(props: LearnMoreMarketChartProps) {
  const {
    activeSecurity,
    perspective,
    eta,
    profile,
    dividendForecastData,
    etaData,
    etaDataMaturity,
    sliderRight,
    setSliderLeft,
    setSliderRight
  } = props;

  const isGrowth = eta === 'growth';

  /**
   * compute and memoized the position and height
   * of maturity loss bar chart based on given
   * and payoff profile
   * @returns position and height of maturity loss bar chart
   */
  const maturiyLossStyle = useMemo(() => {
    switch (perspective) {
      case 'red':
        if (isGrowth) {
          return {
            bottom: `${etaDataMaturity.maturityLossStartPercentage}%`,
            height: `${etaDataMaturity.maturityLossStopPercentage - etaDataMaturity.maturityLossStartPercentage}%`
          }
        } else {
          return {
            bottom: `${etaDataMaturity.maturityLossStartPercentage}%`,
            height: `${etaDataMaturity.maturityLossStopPercentage - etaDataMaturity.maturityLossStartPercentage}%`
          }
        }

      case 'green':
        return {
          bottom: `${etaDataMaturity.maturityLossStartPercentage}%`,
          top: 0
        }

      case 'blue':
        if (isGrowth) {
          return {
            bottom: `${etaDataMaturity.maturityLossStartPercentage}%`,
            height: `${etaDataMaturity.maturityLossStopPercentage - etaDataMaturity.maturityLossStartPercentage}%`
          }
        } else {
          return {
            bottom: `${etaDataMaturity.maturityLossStartPercentage}%`,
            height: `${etaDataMaturity.maturityLossStopPercentage - etaDataMaturity.maturityLossStartPercentage}%`
          }
        }

      case 'purple':
        if (isGrowth) {
          return {
            bottom: `${etaDataMaturity.maturityLossStartPercentage}%`,
            height: `${etaDataMaturity.maturityLossStopPercentage - etaDataMaturity.maturityLossStartPercentage}%`
          }
        } else {
          return {
            bottom: `${etaDataMaturity.maturityLossStartPercentage}%`,
            height: `${etaDataMaturity.maturityLossStopPercentage - etaDataMaturity.maturityLossStartPercentage}%`
          }
        }
    }
  }, [perspective, sliderRight, etaDataMaturity]);

  /**
   * compute for the next value of the cube left hand slider
   * in percentage given the next growth price
   * @param value next growth price
   * @returns next value of the cube left hand slider
   * in percentage
   */
  const calculateNextCubePercentage = (value: number) => {
    const bottomOriginal = eta === 'growth'
      ? profile.growthEstablishmentPrice
      : profile.growthEstablishmentPrice;

    const ratioBottom = 50 / profile.growthEstablishmentPrice;
    const ratioTop = 50 / profile.incomeEstablishmentPrice;

    const nextValue = value > bottomOriginal
      ? 50 + ((value - bottomOriginal) * ratioTop)
      : value * ratioBottom;

    return nextValue;
  }

  const handleForecastItemMouseEvent = (event: MouseEvent<HTMLSpanElement>, end = false) => {
    const el = event.currentTarget;
    const sibling = el.nextElementSibling as HTMLElement;
    const rect = el.getBoundingClientRect();

    if (sibling) {
      sibling.style.display = end ? 'none' : 'flex';
      sibling.style.top = `${event.clientY - rect.top}px`;
      sibling.style.left = `${event.clientX - rect.left}px`;
    }
  }

  /**
   * render x-axis lines based on the given value
   * @param lines number of x-axis lines
   * @returns 
   */
  const renderAxisLines = (lines: number) => {
    return Array(lines)
      .fill('')
      .map((_, i) => (
        <span
          key={i}
          className={'w-[0.5px] h-[5px] bg-white'}
        />
      ));
  }

  /**
   * render the growth or dividend value
   * @returns 
   */
  const renderIndicatorMultiple = () => {
    const growthEta = isGrowth;
    const multiples = growthEta
      ? Number(etaData.growthValue || 0).toFixed(2)
      : etaData.dividentValue;

    return multiples?.split('.').map((item, index) => (
      <span key={index} className={`font-bold ${index === 0 ? 'text-[16px]' : 'text-[12px]'}`}>
        {item}{index === 0 ? '.' : growthEta ? 'x' : '%'}
      </span>
    ));
  }

  /**
   * render the dividend forecast chart until maturity
   * @param tickWidth width of an x-axis line
   * @param height height of the diagram/chart
   * @returns 
   */
  const renderDividendForecast = (tickWidth: number, height: number) => {
    return dividendForecastData.map((item, i) => {
      const tempHeight = ((height * item) / activeSecurity.lastPrice) * 5;
      const nextheight = tempHeight > height ? tempHeight / height : tempHeight;

      return (
        <motion.div
          key={`${perspective}-${eta}-${i}`}
          variants={{
            hidden: { height: 0 },
            show: {
              height: nextheight,
              transition: {
                delay: i * 0.075
              }
            },
          }}
          initial={'hidden'}
          animate={'show'}
          className={'flex items-center justify-center relative w-full'}
        >
          <span
            className={'h-full'}
            style={{ width: tickWidth * 0.15 }}
            onMouseOver={(event) => handleForecastItemMouseEvent(event)}
            onMouseMove={(event) => handleForecastItemMouseEvent(event)}
            onMouseOut={(event) => handleForecastItemMouseEvent(event, true)}
          />
          <span className={'absolute px-[10px] py-[4px] mt-[10px] rounded-lg bg-[#background] text-white'}>
            {formatCurrency(item, CURRENCIES.get(activeSecurity.region))}
          </span>
        </motion.div>
      );
    });
  }

  return (
    <div className={'learn-more-market-eta-diagram flex flex-1 flex-col px-[27px] mt-[35px] mb-[25px]'}>
      <Resizable
        render={(width, height) => {
          const xAxisTickWidth = Math.min(width / 13, 50);

          return (
            <div
              className={`learn-more-market-eta-chart ${perspective} ${eta} flex flex-1 flex-col relative`}
              style={{
                width,
                height,
                flex: `0 0 ${height}px`
              }}
            >
              {/** left hand side slider */}
              <div
                className={'learn-more-market-eta-chart-slider-left absolute bottom-0 left-0 z-[1]'}
                style={{
                  width: xAxisTickWidth,
                  height: height / 2
                }}
              >
                <SliderLeft
                  value={etaData.growthETAPrice}
                  minValue={0}
                  maxValue={activeSecurity.lastPrice}
                  iconFill={slidersStyleConfig[perspective][eta].iconFill}
                  flip={perspective === 'blue' || perspective === 'purple'}
                  style={{
                    width: height / 2,
                    height: xAxisTickWidth,
                    zIndex: 1,
                  }}
                  trackThumbPointerStyle={slidersStyleConfig[perspective][eta].trackThumbPointerStyle}
                  onChange={(value) => {
                    const nextValue = calculateNextCubePercentage(value);
                    setSliderLeft([nextValue, 100 - nextValue]);
                  }}
                />

                <div
                  className={'learn-more-market-eta-chart-slider-left-indicator flex items-center absolute h-[27px] rounded-[25px] border border-[#C0C1C6] whitespace-nowrap text-white bg-[#343741]'}
                  style={{
                    bottom: perspective === 'blue' || perspective === 'purple'
                      ? `calc(${((activeSecurity.lastPrice - etaData.growthETAPrice) / activeSecurity.lastPrice) * 100}% - 15px)`
                      : `calc(${((etaData.growthETAPrice) / activeSecurity.lastPrice) * 100}% - 15px)`,
                    left: xAxisTickWidth + 10
                  }}
                >
                  <span
                    className={'font-semibold leading-[22px] pt-[3px] px-[15px] rounded-[15px] text-[18px]'}
                    onClick={(e) => e.currentTarget.classList.add('hidden')}
                  >
                    {formatCurrency(isGrowth ? etaData.growthETAPrice : etaData.incomeETAPrice, CURRENCIES.get(activeSecurity.region))}
                  </span>

                  <span
                    className={'leading-[13px] px-[10px] mt-[1px] text-[11px]'}
                    onClick={(e) => {
                      const el = e.currentTarget.parentElement?.firstElementChild as HTMLElement;
                      if (el) {
                        el.classList.remove('hidden');
                      }
                    }}
                  >
                    Price per {profile.pairingMap.first}{profile.pairingMap.second} ETA
                  </span>

                  <div className={`flex items-center gap-x-1 absolute right-0 ${isGrowth ? 'bottom-[-25px]' : 'top-[-25px]'} text-white`}>
                    <span className={'text-[12px]'}>
                      {isGrowth ? 'Mutiplier' : 'Running Yield Lost'}
                    </span>

                    <span className={'font-bold text-[16px]'}>
                      {renderIndicatorMultiple()}
                    </span>
                  </div>
                </div>

                <div
                  className={'learn-more-market-eta-chart-maturity-establishment z-[-1] relative'}
                  style={{
                    width: xAxisTickWidth,
                    height: height / 2
                  }}
                >
                  {
                    (perspective === 'blue' || perspective === 'purple') ? (
                      <>
                        <div
                          className={'learn-more-market-eta-chart-maturity-establishment-growth absolute right-0 bottom-0 left-0'}
                          style={{
                            height: `${((activeSecurity.lastPrice - etaData.growthETAPrice) / activeSecurity.lastPrice) * 100}%`,
                            bottom: 0
                          }}
                        />

                        <div
                          className={'learn-more-market-eta-chart-maturity-establishment-income absolute right-0 left-0'}
                          style={{
                            bottom: `${((activeSecurity.lastPrice - etaData.growthETAPrice) / activeSecurity.lastPrice) * 100}%`,
                            top: 0,
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <div
                          className={'learn-more-market-eta-chart-maturity-establishment-growth absolute right-0 bottom-0 left-0'}
                          style={{
                            top: 0,
                            bottom: 0
                          }}
                        />

                        <div
                          className={'learn-more-market-eta-chart-maturity-establishment-income absolute right-0 left-0'}
                          style={{
                            top: 0,
                            bottom: `${((etaData.growthETAPrice) / activeSecurity.lastPrice) * 100}%`
                          }}
                        />
                      </>
                    )
                  }
                </div>
              </div>

              {/** right hand side slider */}
              <div
                className={'learn-more-market-eta-chart-slider-right absolute bottom-0 z-[1]'}
                style={{ right: 0 }}
              >
                <SliderRight
                  value={sliderRight}
                  minValue={0}
                  maxValue={200}
                  style={{
                    width: height,
                    height: 20,
                    zIndex: 1
                  }}
                  onChange={(value) => setSliderRight(value)}
                />

                <div
                  className={'learn-more-market-eta-chart-slider-right-indicator flex items-center absolute h-[27px] rounded-[25px] border border-[#C0C1C6] whitespace-nowrap text-white bg-[#343741]'}
                  style={{ bottom: `calc(${sliderRight}% - 15px)`, right: xAxisTickWidth + 10 }}
                >
                  <span
                    className={'leading-[13px] px-[10px] mt-[1px] text-[11px]'}
                    onClick={(e) => {
                      const el = e.currentTarget.parentElement?.lastElementChild as HTMLElement;
                      if (el) {
                        el.classList.remove('hidden');
                      }
                    }}
                  >
                    {profile.pairingMap.first}{profile.pairingMap.second} Maturity per  ETA
                  </span>

                  <span
                    className={'font-semibold leading-[22px] pt-[3px] px-[15px] rounded-[15px] text-[18px]'}
                    onClick={(e) => e.currentTarget.classList.add('hidden')}
                  >
                    {formatCurrency(isGrowth ? etaDataMaturity.maturityGrowthETAPrice : etaDataMaturity.maturityIncomeETAPrice, CURRENCIES.get(activeSecurity.region))}
                  </span>
                </div>

                <div
                  className={'learn-more-market-eta-chart-maturity-original relative'}
                  style={{
                    width: xAxisTickWidth,
                    height: height / 2
                  }}
                >
                  <div
                    className={'learn-more-market-eta-chart-maturity-original-income absolute right-0 left-0'}
                    style={{
                      bottom: `${etaDataMaturity.maturityIncomeStartPercentage}%`,
                      height: `${etaDataMaturity.maturityIncomeStopPercentage - etaDataMaturity.maturityIncomeStartPercentage}%`
                    }}
                  />

                  <div
                    className={'learn-more-market-eta-chart-maturity-original-growth absolute right-0 bottom-0 left-0'}
                    style={{
                      bottom: `${etaDataMaturity.maturityGrowthStartPercentage}%`,
                      height: `${etaDataMaturity.maturityGrowthStopPercentage - etaDataMaturity.maturityGrowthStartPercentage}%`
                    }}
                  />
                </div>

                <div
                  className={'learn-more-market-eta-chart-maturity-loss absolute right-0 bottom-0 left-0'}
                  style={{
                    width: xAxisTickWidth,
                    height: height / 2
                  }}
                >
                  <div className={'absolute right-0 bottom-0 left-0'} style={maturiyLossStyle} />
                </div>

                <div
                  className={'learn-more-market-eta-chart-maturity-upside absolute right-0 left-0'}
                  style={{
                    width: xAxisTickWidth,
                    height: height / 2,
                    bottom: height / 2
                  }}
                >
                  <div
                    className={'absolute bottom-0 w-full'}
                    style={{
                      height: `${isGrowth
                        ? etaDataMaturity.maturityGrowthUpsideStopPercentage - etaDataMaturity.maturityGrowthUpsideStartPercentage
                        : etaDataMaturity.maturityIncomeUpsideStopPercentage - etaDataMaturity.maturityIncomeUpsideStartPercentage}%`
                    }} />
                </div>
              </div>

              {/** dividend forecast */}
              <div
                className={`learn-more-market-chart-dividends-forecast ${perspective} flex items-end justify-between absolute right-0 bottom-0 left-0`}
                style={{
                  height: height / 2,
                  right: xAxisTickWidth,
                  left: xAxisTickWidth
                }}
              >
                {renderDividendForecast(xAxisTickWidth, height)}
              </div>

              {/** x-axis lines */}
              <div className={'learn-more-market-chart-xaxis flex justify-between absolute right-0 bottom-0 left-0'}>
                {renderAxisLines(13)}
              </div>

              {/** y-axis lines on left hand side */}
              <div
                className={'learn-more-market-chart-yaxis flex justify-between absolute top-0 bottom-full left-[1px] rotate-90 translate-y-full origin-bottom-left'}
                style={{ width: height }}
              >
                {renderAxisLines(11)}
              </div>

              {/** y-axis lines on right hand side */}
              <div
                className={'learn-more-market-chart-yaxis flex justify-between absolute top-0 bottom-full left-full ml-[4px] rotate-90 translate-y-full origin-bottom-left'}
                style={{ width: height }}
              >
                {renderAxisLines(11)}
              </div>

              <div className={'learn-more-market-chart-divider absolute top-[50%] right-0 left-0 h-[1px]'} />
            </div>
          )
        }}
      />

      <div className={`learn-more-market-eta-chart-label flex justify-between leading-[13px] mt-[10px] text-[11px] text-white`}>
        <span>Establishment Date</span>
        <span>Maturity Date</span>
      </div>
    </div>
  );
}