import { useMemo, useState } from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';

import { usePerspectiveSliderContext } from 'context/PerspectiveSliderContext';
import { prismAnnualFee } from 'pages/Perspective/utils';
import { LearnMoreMarketTabsProps, } from '../types';
import { overviewTextMapping } from '../mapping';
import { calculateETAData, calculateEtaMaturityData, formatCurrency, formatNumber, formatPercentage } from '../utils';
import { ArrowLeftIcon, ArrowRightIcon, BorderBottomColor, BorderRightColor, EqualsIcon, PlusIcon } from '../icons';
import { ETAChart } from '../ETAChart';
import { Resizable } from '../Resizable';
import { OverviewButton } from '../Buttons';
import { CURRENCY_SYMBOLS, CURRENCIES, REGIONS } from 'common/consts';
import './index.scss';

export function ETAOverview(props: LearnMoreMarketTabsProps) {
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

  const resize = width <= 768;
  const isGrowth = eta === 'growth';

  const [investment, setInvestment] = useState<number>(100000);
  const [sliderRight, setSliderRight] = useState<number>(100);
  const [showChart, setShowChart] = useState<boolean>(false);

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
      Number(((perShareAmount - feeAmount)).toFixed(2)));
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
    <div className={'learn-more-market-eta-overview flex flex-col h-full'}>
      <div className={`learn-more-market-eta-overview-header ${perspective} ${eta}`}>
        <div className={`learn-more-market-eta-overview-header-title ${expanded ? 'hidden' : 'flex'} flex-col items-center justify-center gap-y-[9px] tracking-wider`}>
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

        <div className={`learn-more-market-eta-overview-header-subheader ${expanded ? 'hidden' : 'flex'} items-center justify-center pt-[6px] pb-[5px] gap-x-[10px] mt-[13px] leading-[13px] text-[11px] text-white tracking-widest bg-[#474C55]`}>
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

        <div className={classNames('learn-more-market-eta-overview-header-overview flex flex-col pb-[20px] mx-auto tracking-widest', {
          'w-[80%]': width >= 500,
          'w-[85%]': width < 500
        })}>
          <div className={`learn-more-market-eta-overview-header-overview-info grid gap-x-[10px] relative  ${expanded ? 'expanded grid-cols-4 pt-[30px]' : 'collapse grid-cols-3 order-2 pt-[70px]'}`}>
            <div className={`flex flex-col items-start justify-center relative ${expanded ? 'flex' : 'hidden'}`}>
              <div className={'learn-more-market-eta-overview-header-title flex-col items-center justify-center gap-y-[9px] tracking-wider'}>
                <span className={'flex leading-[25px] leading-[25px] text-[13px] text-white'}>
                  <span className={'font-bold'}>{profile.pairingMap.first}</span>{profile.pairingMap.second} ETA CODE
                </span>

                <motion.span
                  key={`${perspective}-${eta}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={'font-extralight leading-[25px] text-[41px] tracking-wider'}
                >
                  {isGrowth ? profile.growthSymbol : profile.incomeSymbol}
                </motion.span>
              </div>

              <div className={'learn-more-market-eta-overview-header-subheader flex flex-col pt-[6px] pb-[5px] gap-x-[10px] mt-[9px] leading-[13px] text-[11px] text-white tracking-widest'}>
                <div className={'flex items-center'}>
                  <span className={'font-bold text-[#C0C1C6]'}>EXCHANGE</span>
                  <span className={'flex mt-[-1px] ml-[5px] text-[10px]'}>{activeSecurity.region}</span>
                </div>

                <div className={'flex items-center'}>
                  <span className={'font-bold text-[#C0C1C6]'}>VALUE IN CIRCULATION</span>
                  <span className={'flex mt-[-1px] ml-[5px] text-[10px]'}>{etaData.etaValueInCirculation}</span>
                </div>
              </div>

              {expanded && (
                <div className={'border-color border-right'}>
                  <BorderRightColor />
                </div>
              )}
            </div>

            <div className={`flex flex-col items-start justify-center ${expanded ? 'mx-auto' : 'ml-0'} text-white`}>
              <AnimatePresence exitBeforeEnter>
                <motion.span
                  key={`${perspective}-${eta}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className={'flex leading-[22px] text-[28px] text-left'}
                >
                  {
                    isGrowth
                      ? `${formatNumber(Number(etaData.growthValue), 1)}x`
                      : `${formatNumber(Number(etaData.dividentValue), 2)}%`
                  }
                </motion.span>
              </AnimatePresence>

              <span className={'leading-[22px] text-[14px]'}>
                {
                  isGrowth
                    ? 'Growth Multiple'
                    : 'Running Yield'
                }
              </span>
            </div>

            <div className={'flex flex-col items-center justify-center relative text-white'}>
              <span className={'leading-[22px] text-[28px]'}>
                {formatCurrency(activeSecurity.lastPrice, CURRENCIES.get(activeSecurity.region))}
              </span>

              <span className={'leading-[22px] text-[14px]'}>
                Last Price
              </span>

              <span className={'leading-[16px] text-[14px] text-center text-[#797D82]'}>
                Hover for Best Price
              </span>

              {expanded && (
                <>
                  <div className={'border-color border-left'}>
                    <BorderRightColor />
                  </div>

                  <div className={'border-color border-right'}>
                    <BorderRightColor />
                  </div>
                </>
              )}
            </div>

            <div className={'flex flex-col items-end justify-center text-white'}>
              <span className={`leading-[22px] text-[28px] ${((profile.chgNet1d || activeSecurity.chgNet1d) ?? 0) > 0 ? 'text-[#38D41F]' : 'text-red-500'}`}>
                {((profile.chgNet1d || activeSecurity.chgNet1d) ?? 0) > 0 ? '+' : ''}
                {((profile.chgNet1d || activeSecurity.chgNet1d) ?? 0)}
              </span>

              <span className={'leading-[22px] text-[14px]'}>
                24h Change
              </span>
            </div>

            <div className={'border-color'}>
              <BorderBottomColor />
            </div>
          </div>

          <div className={`grid grid-flow-col w-full min-h-[130px] ${expanded ? 'mt-[80px]' : 'mt-[40px]'} text-white`} style={{
            gridTemplateColumns: 'minmax(15%, 1fr) minmax(180px, 1fr) minmax(15%, 1fr)'
          }}>
            <div className={'flex flex-1 flex-col justify-between gap-y-[13px] mr-auto'}>
              <div className={'flex flex-col h-1/2'}>
                <span className={'font-bold text-[11px] text-[#c0c1c6] tracking-wide'}>
                  VALUE ALLOCATION
                </span>

                <span className={'text-[15px] tracking-normal'}>
                  PRICE GROWTH ONLY
                </span>
              </div>

              <div className={'flex flex-col h-1/2'}>
                <span className={'font-bold text-[11px] text-[#c0c1c6] tracking-wide'}>
                  RISK ALLOCATION
                </span>

                <span className={'text-[15px] tracking-normal'}>
                  1<sup>st</sup> CAPITAL EXPOSURE
                </span>
              </div>
            </div>

            <div className={'flex items-center justify-center w-full h-[90px]'}>
              <motion.div
                key={`${perspective}-${eta}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className={'overview-cube'}
              >
                <div className={'cube-view top-view'} />
                <div className={'cube-view right-view'} />
                <div className={'cube-view left-view'} />
              </motion.div>
            </div>

            <div className={'flex flex-1 flex-col justify-between gap-y-[13px] ml-auto text-right text-white'}>
              <div className={'flex flex-col h-1/2'}>
                <span className={'font-bold text-[11px] text-[#c0c1c6] tracking-wide'}>
                  REMAINING TERM
                </span>

                <span className={'text-[15px] tracking-normal'}>
                  {formatNumber(moment(etaData.maturityDate).diff(moment(), 'years', true), 1)}YRS
                </span>
              </div>

              <div className={'flex flex-col h-1/2'}>
                <span className={'font-bold text-[11px] text-[#c0c1c6] tracking-wide text-white'}>
                  MATURITY ALLOCATION
                </span>

                <span className={'text-[15px] tracking-normal'}>
                  {formatCurrency(isGrowth ? etaData.growthEstablishmentPrice : etaData.incomeEstablishmentPrice, CURRENCIES.get(activeSecurity.region))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={'learn-more-market-eta-overview-controls flex items-center justify-center relative h-[61px]'}>
        {showChart ?
          (
            <Resizable render={(width) =>
              <div
                className={`flex items-center gap-x-5 px-[28px] pt-[13px] pb-[15px]`}
                style={width < 500 ? { paddingRight: 5, paddingLeft: 5 } : undefined}
              >

                {(width > 450) && (
                  <span
                    className={`see-maturity-timeline h-[22px] flex items-center leading-[22px] px-[10px] ${resize ? 'ml-[-20px]' : ''} border-1 border-white text-[15px] text-white whitespace-nowrap`}
                    onClick={() => setShowChart(false)}
                  >
                    {
                      resize
                        ? <ArrowLeftIcon />
                        : 'see ETA overview'
                    }
                  </span>
                )}

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
                    placeholder={'$ Total investment'}
                    autoFocus={true}
                    className={'learn-more-market-input h-[27px]'}
                    onChange={({ target: { value } }) => setInvestment(Number(value?.replace(/\D/g, '')))}
                  />

                  <PlusIcon />

                  <Input
                    value={formatCurrency(isGrowth ? etaData.growthETAPrice : etaData.incomeETAPrice, CURRENCIES.get(activeSecurity.region))}
                    placeholder={'$ Target bid'}
                    className={'learn-more-market-input h-[27px]'}
                  />

                  <EqualsIcon />

                  <span className={'leading-[12px] mt-[4px] text-[13px] text-[#8B8E94] italic'}>
                    {formatNumber(etaDataMaturity.unitsBought)}
                  </span>
                </div>

                <div className={'flex justify-end gap-x-[10px] ml-auto'}>
                  <div className={`font-semibold flex items-center leading-[15px] ${expanded ? 'mt-[2.5px]' : ''} text-[13px] text-[#8B8E94] text-right whitespace-nowrap`}>
                    {activeSecurity.ticker} Edit your {!expanded && <br />}
                    price prediction
                  </div>

                  <Input
                    value={formatCurrency(etaDataMaturity.maturityUnderlyingPrice, CURRENCIES.get(activeSecurity.region))}
                    placeholder={'$200.0'}
                    className={'learn-more-market-input h-[27px]'}
                    style={{ width: '40%', color: '#8B8E94' }}
                  />
                </div>
              </div>
            } />
          ) : (
            <div className={'flex items-center justify-center gap-x-[25px]'}>
              <span
                className={'see-maturity-timeline h-[22px] leading-[22px] px-[10px] border-1 border-white text-[15px] text-white'}
                onClick={() => setShowChart(true)}
              >
                see ETA maturity timeline
              </span>


              <OverviewButton>
                <PlusIcon />

                <span className={'mt-[2px] whitespace-nowrap'}>ADD TO PORTFOLIO</span>
              </OverviewButton>
            </div>
          )
        }
      </div>

      {showChart ?
        (
          <>
            <div className={'flex items-center justify-between px-[27px] mt-[25px] mb-[-10px]'}>
              <div className={'flex items-center gap-x-[9px]'}>
                <div className={'w-[20px] h-[20px] border-4 border-[#5F6369] rounded-full background-[#474C55]'} />

                <span className={'font-extralight leading-[45px] text-[36px] tracking-wider text-white'}>
                  ETA Timeline
                </span>
              </div>

              <div className={`flex ${resize ? 'flex-col items-end gap-y-[10px] ' : 'items-center gap-x-[34px]'} justify-center`}>
                <OverviewButton>
                  <ArrowRightIcon width={14} />

                  <span className={'mt-[2px] whitespace-nowrap'}>SEND TO BROKER</span>
                </OverviewButton>

                <OverviewButton>
                  <PlusIcon width={14} />

                  <span className={'mt-[2px] whitespace-nowrap'}>ADD TO PORTFOLIO</span>
                </OverviewButton>
              </div>
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
          </>
        ) : (
          <div className={`learn-more-market-eta-overview-texts`}>
            <div className={`learn-more-market-eta-overview-texts-header ${perspective} ${eta} leading-[25px] text-[23px] mb-[15px]`}>
              <span className={'font-semibold'}>About</span>
              <span className={'font-semibold'}> {profile.pairingMap.first}</span>
              <span className={'font-light'}>{profile.pairingMap.second}</span>
            </div>

            <div className={'learn-more-market-eta-overview-texts-body'}>
              {overviewTextMapping[perspective][eta]}
            </div>
          </div>
        )
      }

      {showChart && (
        <Resizable
          render={(width) => {
            const resizeCols = (width / 2) < 500;

            return (
              <div
                className={classNames(`learn-more-market-eta-overview-footer flex gap-y-[17px] pr-[25px] pb-[25px] pl-[30px]`, {
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


                <div className={`learn-more-market-eta-overview-footer-table w-full ${expanded ? 'pl-[5%]' : ''}`}>
                  <div className={classNames(`learn-more-market-eta-overview-footer-table-header rounded-[50px] bg-[#5F6369] text-[16px] text-white`, {
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
                    className={classNames(`learn-more-market-eta-overview-footer-table-body leading-[12px] text-[13px] text-white`, {
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
      )}
    </div>
  );
}