/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'classnames';
import { Slider } from 'antd';
import _ from 'lodash';

import { ETATypes, Nullable } from 'common/types';
import { ETAPairingColors, SliderMaxValue } from 'common/consts';
import { CurrencyText } from 'components/primitives';
import { EquityDetail, EquityLayers } from 'components/snippets';
import {
  EquityOuterCube,
  EquityTabPanels,
  EquityToolbar,
  EquityTopBar,
} from './components';
import { EquityOptimiserProps } from './EquityOptimiser.props';
import Markets from 'components/Markets';
import './EquityOptimiser.scss';
import { ETAPairing } from 'common/types';

import cubeStyles from './CubeScene.module.scss';
import { MarketsSecurity } from 'common/interfaces/Markets/MarketsSecurity';
import { ISecurity } from 'common/interfaces';
import { CURRENCY_SYMBOLS } from 'common/consts';

const ETA_INCOME: ETATypes[] = ['MaxDiv', 'PureDiv', 'DivGuard'];
const ETA_GROWTH: ETATypes[] = ['MaxGrowth', 'PureGrowth', 'GrowthGuard'];

const EquityOptimiserView: React.FC<EquityOptimiserProps> = ({
  calc,
  dividendForecast = [],
  etaDetails,
  etaPairing,
  focusField,
  hideSecurities,
  growthSlider,
  incomeSlider,
  securities = [],
  security,
  totalAmount,
  totalShares,
  ...props
}: EquityOptimiserProps) => {
  const cubeRef = useRef<Nullable<HTMLDivElement>>(null);
  const sceneRef = useRef<Nullable<HTMLDivElement>>(null);
  const tabPanelsRef = useRef<Nullable<HTMLDivElement>>(null);
  const toolbarRef = useRef<Nullable<HTMLDivElement>>(null);
  const [cubeScale, setCubeScale] = useState<number>(1);
  const tabsHeight = tabPanelsRef.current?.getBoundingClientRect().height || 0;
  const toolbarHeight = toolbarRef.current?.getBoundingClientRect().height || 0;
  const enableOptimiser = !!security;
  const pairs = _.keysIn(
    _.pickBy(ETAPairingColors, (v, k) => v === etaPairing)
  );
  const incomeETA: Nullable<ETATypes> = _.find(pairs, (eta) =>
    _.includes(ETA_INCOME, eta)
  ) as ETATypes;
  const growthETA: Nullable<ETATypes> = _.find(pairs, (eta) =>
    _.includes(ETA_GROWTH, eta)
  ) as ETATypes;

  const onChangeAmount = (value: string) => {
    const amount = Number(value?.replace(/\D/g, ''));
    props.handleChangeAmount(amount);
  };

  const onChangeShare = (value: string) => {
    const shares = Number(value?.replace(/\D/g, ''));
    props.handleChangeShares(shares);
  };

  useEffect(() => {
    if (
      cubeRef?.current &&
      sceneRef?.current &&
      tabPanelsRef?.current &&
      toolbarRef?.current
    ) {
      // Fix scaling issue
      // Predict the height of the hidden elements
      const sceneRect = sceneRef.current.getBoundingClientRect();
      const tabsHeight =
        tabPanelsRef.current?.getBoundingClientRect().height || 0;
      const toolbarHeight =
        toolbarRef.current?.getBoundingClientRect().height || 0;
      const containerRect = {
        height: sceneRect.height - (tabsHeight + toolbarHeight),
        width: sceneRect.width,
      };
      // TODO: find the best approach to check the dimension by checking layout events
      let scale = containerRect.height / cubeRef.current.offsetHeight;
      // if (cubeRect.width * scale > containerRect.width) {
      //   scale = containerRect.width / cubeRect.width;
      // }
      setCubeScale(scale > 1 ? 1 : scale);
    }
  }, []);

  const hexDimension: any = {
    marginTop: toolbarHeight * -1,
  };

  if (enableOptimiser) {
    hexDimension.transform = `scale(${cubeScale})`;
  }


  return (
    <>
      {props.showMarkets ? (
        <Markets
          onCloseMarkets={() => {
            props.setShowMarkets(false);
          }}
          setShowMarkets={props.setShowMarkets}
          handleETAClick={(
            eta: string,
            security: MarketsSecurity | ISecurity
          ) => {
            props.handleSecurityChange(security);
            let etaTypeColor = '';

            switch (eta) {
              case 'MaxGrowth':
              case 'DivGuard':
                etaTypeColor = 'Blue';
                break;
              case 'PureGrowth':
              case 'PureDiv':
                etaTypeColor = 'Green';
                break;
              case 'GrowthGuard':
              case 'MaxDiv':
                etaTypeColor = 'Red';
                break;
              default:
                break;
            }
            props.handleETAChange(etaTypeColor as ETAPairing);
            props.setShowMarkets(false);
          }}
        />
      ) : (
        <div className="equity-optimiser flex flex-col w-full h-full font-din2014 select-none">
          {/* Equity Top Bar */}
          <div
            className={clsx(
              'equity-optimiser__header z-40',
              enableOptimiser ? 'shadow' : ''
            )}
          >
            <EquityTopBar
              calc={calc}
              etaPairing={etaPairing}
              hideSecurities={hideSecurities}
              security={security}
              securities={securities}
              handleETAChange={props.handleETAChange}
              handleSecurityChange={props.handleSecurityChange}
              toggleETASelector={props.toggleETASelector}
              handleClickMarkets={props.handleClickMarkets}
            />
          </div>

          {/* Equity Optimiser Scene */}
          <div ref={sceneRef} className="equity-optimiser__scene">
            <div className="equity-optimiser__background" />

            {/* Cube Scene */}
            <div className="relative flex items-center justify-center w-full h-full">
              <div className="absolute top-0 flex w-full h-full justify-center items-center overflow-hidden z-10">
                <div
                  className={clsx(
                    cubeStyles.overlay,
                    enableOptimiser ? 'z-50' : 'z-30'
                  )}
                />

                {/* Outer Cube */}
                <div
                  className={clsx(
                    `absolute -mt-[30px] z-20 hex-outer-dimension${!enableOptimiser ? ' hex-outer-dimension' : ''}`
                  )}
                  style={hexDimension}
                >
                  <EquityOuterCube shadowOnly={enableOptimiser} />
                </div>

                {/* ETA Cube */}
                <div
                  ref={cubeRef}
                  className={`absolute flex justify-center items-center z-50 -mt-[30px] h-[500px] w-[900px]${!enableOptimiser ? ' hex-inner-dimension' : ''}`}
                  style={hexDimension}
                >
                  {!enableOptimiser && (
                    <h2 className="absolute flex justify-center items-center mt-2 mb-0 w-[220px] h-[220px] font-extralight text-center">
                      Convert to an
                      <br />
                      ETA Perspective
                    </h2>
                  )}

                  <div
                    key={etaDetails?.seriesPair || 'unknown'}
                    className={clsx(cubeStyles.innerCube)}
                  >
                    {enableOptimiser && (
                      <EquityLayers
                        className={clsx('z-20')}
                        style={{ transform: 'scale(1.7)' }}
                        onSlide={props.handleSlide}
                        {...{
                          growthETA,
                          growthSlider,
                          incomeETA,
                          incomeSlider,
                        }}
                        cashSqrLength={calc.cashSqrLength}
                        growthSqrLength={calc.growthSqrLength}
                        incomeSqrLength={calc.incomeSqrLength}
                        cashReturned={calc.cashReturned}
                        incomeUnits={calc.incomeETAUnitsHeld}
                        growthUnits={calc.growthETAUnitsHeld}
                      />
                    )}

                    <div
                      className={clsx(
                        'absolute bottom-0 mb-0 flex flex-col items-center text-white',
                        enableOptimiser ? 'block' : 'hidden'
                      )}
                    >
                      <span className="w-48 tracking-wider text-center text-base uppercase capital-release">
                        Capital Release
                      </span>
                      <h3 className="mt-2 font-extralight text-white tracking-wide">
                        <CurrencyText
                          symbol={CURRENCY_SYMBOLS.get(
                            security?.region || 'AUS'
                          )}
                          value={Math.round(calc.cashReturned)}
                          decimalScale={0}
                        />
                      </h3>
                    </div>

                    <EquityDetail
                      className={clsx(
                        'left-0 z-20',
                        enableOptimiser ? 'block' : 'hidden'
                      )}
                      etaName={growthETA}
                      guardValue={calc?.growthGuard || 0}
                      lastPrice={etaDetails?.growthLastPrice || 0}
                      positionValue={Math.round(calc.growthValueOfHolding)}
                      totalPriceExposure={calc?.totalPriceExposure || 0}
                      totalYieldExposure={calc?.totalYieldExposure || 0}
                      symbol={etaDetails?.growthSymbol || ''}
                      volume={calc.growthETAUnitsHeld}
                      region={security?.region}
                    />
                    <Slider
                      min={0}
                      max={SliderMaxValue * 2}
                      tooltipVisible={false}
                      className={clsx(
                        'growth-slider',
                        growthETA,
                        enableOptimiser ? 'block' : 'hidden'
                      )}
                      value={growthSlider}
                      onChange={(val: number) =>
                        props.handleSlide('growth', val)
                      }
                      vertical
                    />
                    <Slider
                      min={0}
                      max={SliderMaxValue * 2}
                      tooltipVisible={false}
                      className={clsx(
                        'income-slider',
                        incomeETA,
                        enableOptimiser ? 'block' : 'hidden'
                      )}
                      value={incomeSlider}
                      onChange={(val: number) =>
                        props.handleSlide('income', val)
                      }
                      vertical
                    />
                    <EquityDetail
                      className={clsx(
                        'right-0 z-20',
                        enableOptimiser ? 'block' : 'hidden'
                      )}
                      etaName={incomeETA}
                      guardValue={calc.divGuard || 0}
                      lastPrice={etaDetails?.incomeLastPrice || 0}
                      positionValue={Math.round(calc.incomeValueOfHolding)}
                      totalPriceExposure={calc?.totalPriceExposure || 0}
                      totalYieldExposure={calc?.totalYieldExposure || 0}
                      symbol={etaDetails?.incomeSymbol || ''}
                      volume={calc.incomeETAUnitsHeld}
                      region={security?.region}
                    />
                  </div>
                </div>
              </div>

              <div
                className={clsx(
                  'equity-optimiser__toolbar absolute top-0 flex text-white transition-all ease-out duration-500 overflow-hidden z-20',
                  enableOptimiser ? 'h-auto' : 'h-0'
                )}
              >
                <EquityToolbar
                  ref={toolbarRef}
                  activeSecurity={security || null}
                  calc={calc}
                  dividendForecast={dividendForecast}
                  etaDetails={etaDetails}
                  totalAmount={totalAmount}
                  totalShares={totalShares}
                  onChangeAmount={onChangeAmount}
                  onChangeShare={onChangeShare}
                  onPresetAll={props.handleChangePresetAll}
                  onPresetRelease={props.handleChangePresetRelease}
                />
              </div>

              {/* Order Sequence */}
              <div
                className={clsx(
                  'absolute bottom-0 w-full overflow-hidden z-20',
                  enableOptimiser ? 'h-auto' : 'h-0'
                )}
              >
                <EquityTabPanels
                  ref={tabPanelsRef}
                  calc={calc}
                  etaDetails={etaDetails}
                  totalAmount={totalAmount}
                  totalShares={totalShares}
                  region={security?.region}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EquityOptimiserView;
