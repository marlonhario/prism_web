import { useEffect, useMemo, useState } from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { usePerspectiveSliderContext } from 'context/PerspectiveSliderContext';
import { prismAnnualFee } from 'pages/Perspective/utils';
import { LearnMoreMarketTabsProps, } from '../types';
import { calculateETAData, calculateEtaMaturityData, formatCurrency, formatNumber, formatPercentage } from '../utils';
import { EqualsIcon, PlusIcon } from '../icons';
import { Resizable } from '../Resizable';
import { CURRENCIES, CURRENCY_SYMBOLS, REGIONS } from 'common/consts';
import { ETAChart } from '../ETAChart';
import './index.scss';

export function ETATimeline(props: LearnMoreMarketTabsProps) {
  const { slider: sliderLeft, setSlider: setSliderLeft } = usePerspectiveSliderContext();

  const {
    activeSecurity,
    perspective,
    eta,
    dividendForecast,
    profile,
    dimensions: { width },
    expanded
  } = props;

  const isGrowth = eta === 'growth';
  const resize = width <= 564;

  const [investment, setInvestment] = useState<number>(100000);
  const [sliderRight, setSliderRight] = useState<number>(100);

  useEffect(() => {
    setSliderLeft([50, 50]);
    setSliderRight(100);
  }, [activeSecurity, perspective]);

  /**
   * compute and memoized initial eta data 
   */
  const etaData = useMemo(() => {
    return calculateETAData(
      profile,
      activeSecurity.lastPrice,
      activeSecurity.forwardDivYield,
      sliderLeft[0],
    );
  }, [activeSecurity, profile, sliderLeft]);

  /**
   * compute and memoized dividend forecast individual price
   */
  const dividendForecastData = useMemo(() => {
    const establishmentPrice =
      etaData.growthEstablishmentPrice +
      etaData.incomeEstablishmentPrice;
    const feeAmount = establishmentPrice * prismAnnualFee;

    return dividendForecast.map(({ perShareAmount }) =>
      Number((perShareAmount - feeAmount).toFixed(2)));
  }, [etaData, dividendForecast]);

  /**
   * compute and memoized eta data at maturity
   */
  const etaDataMaturity = useMemo(() => {
    const dividends = dividendForecastData.reduce((prev, item) => prev + item, 0);

    return calculateEtaMaturityData(
      activeSecurity,
      perspective,
      eta,
      etaData,
      dividends,
      investment,
      sliderRight
    );
  }, [activeSecurity, perspective, eta, etaData, dividendForecastData, investment, sliderRight]);

  return (
    <div className={'learn-more-market-eta-timeline flex flex-col h-full'}>
      <div className={`learn-more-market-eta-timeline-header ${perspective} ${eta}`}>
        <div className={'learn-more-market-eta-timeline-header-title flex flex-col items-center justify-center gap-y-[9px] tracking-wider'}>
          <span className={'flex leading-[25px] leading-[25px] mt-[14px] text-[13px] text-white'}>
            <span className={'font-bold'}>{profile.pairingMap.first}</span>{profile.pairingMap.second} ETA CODE
          </span>

          <motion.span
            key={`${perspective}-${eta}`}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className={'font-extralight leading-[25px] text-[41px] tracking-wider'}
          >
            {isGrowth ? profile.growthSymbol : profile.incomeSymbol}
          </motion.span>
        </div>


        <div className={'learn-more-market-eta-timeline-header-subheader flex items-center justify-center pt-[6px] pb-[5px] gap-x-[10px] mt-[13px] leading-[13px] text-[11px] text-white tracking-widest bg-[#474C55]'}>
          <div className={'flex items-center'}>
            <span className={'font-bold text-[#C0C1C6]'}>EXCHANGE</span>
            <span className={'flex mt-[-1px] ml-[5px] text-[10px]'}>
              {REGIONS.find((region) => region.value === activeSecurity.region)?.name}
            </span>
          </div>

          <div>•</div>

          <div className={'flex items-center'}>
            <span className={'font-bold text-[#C0C1C6]'}>VALUE IN CIRCULATION</span>
            <span className={'flex mt-[-1px] ml-[5px] text-[10px]'}>{etaData.etaValueInCirculation}</span>
          </div>
        </div>

        <div className={'flex flex-col px-[27px] pt-[15px] pb-[27px] leading-[20px] text[-17px] text-white tracking-wider'}>
          <span>
            The chart below demonstrates the maturity allocation of the <span className={'font-bold'}>{activeSecurity.ticker} </span>
            <span className={'font-bold'}>{profile.pairingMap.first}{profile.pairingMap.second} ETA </span>
            based upon the initial price paid for the ETA and the underlying share price at maturity.
          </span>

          <br />

          <span>
            ETAs may be freely traded throughout their term subject to market pricing and liquidity.
            <span className={'font-bold'}> ETA holders are NOT exposed to margin calls throughout the term.</span>
          </span>
        </div>
      </div>

      <div className={'learn-more-market-eta-timeline-calcs relative'}>
        <Resizable render={(width) =>
          <div
            className={`flex items-center justify-between gap-x-5 px-[28px] pt-[13px] pb-[15px]`}
            style={width < 500 ? { paddingRight: 5, paddingLeft: 5 } : undefined}
          >
            <div
              className={'flex items-center gap-x-[11px] text-white'}
              style={width < 500 ? { columnGap: 5 } : undefined}
            >
              <Input
                value={
                  investment > 0
                    ? `${CURRENCY_SYMBOLS.get(activeSecurity.region)} ${investment
                      .toFixed(0)
                      ?.toString()
                      ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                    : ''
                }
                placeholder={`${CURRENCY_SYMBOLS.get(activeSecurity.region)} Total investment`}
                autoFocus={true}
                className={'learn-more-market-input h-[27px]'}
                onChange={({ target: { value } }) => setInvestment(Number(value?.replace(/\D/g, '')))}
              />

              <PlusIcon />

              <Input
                value={formatCurrency(isGrowth ? etaData.growthETAPrice : etaData.incomeETAPrice, CURRENCIES.get(activeSecurity.region))}
                placeholder={`${CURRENCY_SYMBOLS.get(activeSecurity.region)} Target bid`}
                className={'learn-more-market-input h-[27px]'}
              />

              <EqualsIcon />

              <span className={'leading-[12px] mt-[4px] text-[13px] text-[#8B8E94] italic'}>
                {formatNumber(etaDataMaturity.unitsBought)}
              </span>
            </div>

            <div className={'flex justify-end gap-x-[10px]'}>
              <div className={`font-semibold flex items-center leading-[15px] ${expanded ? 'mt-[2.5px]' : ''} text-[13px] text-[#8B8E94] text-right whitespace-nowrap`}>
                {activeSecurity.ticker} Edit your {!expanded && <br />}
                price prediction
              </div>

              <Input
                value={formatCurrency(etaDataMaturity.maturityUnderlyingPrice, CURRENCIES.get(activeSecurity.region))}
                placeholder={`${CURRENCY_SYMBOLS.get(activeSecurity.region)}200.0`}
                className={'learn-more-market-input h-[27px]'}
                style={{ width: '40%', color: '#8B8E94' }}
              />
            </div>
          </div>
        } />
      </div>

      <ETAChart
        {...props}
        etaData={etaData}
        etaDataMaturity={etaDataMaturity}
        dividendForecastData={dividendForecastData}
        sliderLeft={sliderLeft}
        sliderRight={sliderRight}
        setSliderLeft={setSliderLeft}
        setSliderRight={setSliderRight}
      />

      <Resizable
        render={(width) => {
          const resizeCols = (width / 2) < 500;

          return (
            <div
              className={classNames(`learn-more-market-eta-timeline-footer flex gap-y-[17px] pr-[25px] pb-[25px] pl-[30px]`, {
                'flex-col': !expanded,
              })}
              style={resize ? { padding: 10 } : undefined}
            >
              <div className={classNames(`flex items-center self-center divide-x divide-white`, {
                'w-[92%]': !expanded && !resizeCols,
                'w-[75%]': expanded && !resizeCols,
                'w-[60%]': expanded && resizeCols
              })}>
                <div className={'flex flex-col items-center justify-center leading-none pr-4 text-[white]'}>
                  <span className={'leading-[15px] text-[16px]'}>MATURITY</span>

                  <span className={'leading-[22px] text-[12px] tracking-wider'}>ALLOCATION</span>
                </div>

                <div className={'leading-[17px] pl-4 text-[14px] text-[#C0C1C6]'}>
                  If you invested&nbsp;
                  <span className={'font-bold text-white'}>{formatCurrency(investment, CURRENCIES.get(activeSecurity.region))}</span>
                  &nbsp;at a price of&nbsp;
                  <span className={'font-bold text-white'}>
                    {formatCurrency(isGrowth ? etaData.growthETAPrice : etaData.incomeETAPrice, CURRENCIES.get(activeSecurity.region))}
                  </span> per ETA and {!resize && <br />}
                  the underlying share price is <span className={'font-bold text-white'}>{formatCurrency(etaDataMaturity.maturityUnderlyingPrice, CURRENCIES.get(activeSecurity.region))}</span> upon ETA expiry you will receive:
                </div>
              </div>


              <div className={`learn-more-market-eta-timeline-footer-table w-full ${expanded ? 'pl-[5%]' : ''}`}>
                <div className={classNames(`learn-more-market-eta-timeline-footer-table-header rounded-[50px] bg-[#5F6369] text-[16px] text-white`, {
                  resize: resize,
                  'resize-cols': resizeCols
                })}>
                  <div>
                    {formatPercentage(etaDataMaturity.priceGrowth)}
                  </div>

                  <div>
                    {formatCurrency(etaDataMaturity.maturityAllocation, CURRENCIES.get(activeSecurity.region))}
                  </div>

                  <div>
                    {formatCurrency(etaDataMaturity.accumilatedForecastDividends, CURRENCIES.get(activeSecurity.region))}
                  </div>

                  <div>
                    {formatCurrency(etaDataMaturity.totalReturn, CURRENCIES.get(activeSecurity.region))}
                  </div>

                  <div className={'text-[#4FD83A]'}>
                    {formatPercentage(etaDataMaturity.roi)}
                  </div>

                  <div className={'text-[#FF0000]'}>
                    {etaDataMaturity.irr}
                  </div>
                </div>

                <div
                  className={classNames(`learn-more-market-eta-timeline-footer-table-body leading-[12px] text-[13px] text-white`, {
                    resize: resize,
                    'resize-cols': resizeCols
                  })}
                  style={resize ? { fontSize: 13 } : undefined}
                >
                  <div>Price growth</div>
                  <div>Maturity Allocation</div>
                  <div>Accumulated Forecasted Dividend Distributions</div>
                  <div>Total Return</div>
                  <div>ROI</div>
                  <div>IRR</div>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}