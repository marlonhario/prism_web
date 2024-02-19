import React, { useMemo, useState, useEffect } from 'react';
import { Tabs } from 'antd';
import clsx from 'classnames';

import { EquityReleaseCalculator } from 'hooks/useEquityOptimiser';
import { Nullable } from 'common/types';
import { IETAData } from 'common/interfaces';
import { CurrencyText } from 'components/primitives';
import { CURRENCY_SYMBOLS, CURRENCIES } from 'common/consts';

import './EquityTabPanels.scss';

const adjustmentText = (unitsHeld = 0, totalShares = 0) => {
  if (unitsHeld > totalShares) return 'Buy';
  return 'Sell';
};

const adjustedUnits = (unitsHeld = 0, totalShares = 0) => {
  let val = totalShares - unitsHeld;
  if (val < 0) val = val * -1;
  return Math.floor(val)
    .toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const EquityTabPanels = React.forwardRef(
  (
    {
      calc,
      className,
      etaDetails,
      totalAmount = 0,
      totalShares = 0,
      region = 'AU',
      ...props
    }: {
      calc: EquityReleaseCalculator;
      etaDetails: Nullable<IETAData>;
      totalAmount?: number;
      totalShares?: number;
      region?: string;
    } & React.HTMLAttributes<HTMLDivElement>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { growthSymbol, incomeSymbol, growthLastPrice, incomeLastPrice } =
      etaDetails || {};
    const adjustments = useMemo(
      () => ({
        growth: adjustedUnits(calc.growthETAUnitsHeld, totalShares),
        income: adjustedUnits(calc.incomeETAUnitsHeld, totalShares),
      }),
      [calc.growthETAUnitsHeld, calc.incomeETAUnitsHeld, totalShares]
    );
    const [sortAdjustment, setSortAdjustment] = useState<any>([]);
    const [tabKey, setTabKey] = useState('1');
    const [showTabContent, setShowTabContent] = useState(true);

    const checkStatus = () => {
      const incomeLabel = adjustmentText(calc.incomeETAUnitsHeld, totalShares);
      const growthLabel = adjustmentText(calc.growthETAUnitsHeld, totalShares);

      if (growthLabel === 'Buy' && incomeLabel === 'Sell') {
        setSortAdjustment([
          {
            unitsHeld: calc.incomeETAUnitsHeld,
            adjustment: adjustments.income,
            symbol: incomeSymbol,
            lastPrice: incomeLastPrice,
            totalShares,
          },
          {
            unitsHeld: calc.growthETAUnitsHeld,
            adjustment: adjustments.growth,
            symbol: growthSymbol,
            lastPrice: growthLastPrice,
            totalShares,
          },
        ]);
      } else {
        setSortAdjustment([]);
      }
    };

    const triggerShow = () => {
      if (tabKey === '1') {
        setShowTabContent(!showTabContent);
      } else {
        setShowTabContent(!showTabContent);
      }
    };

    useEffect(() => {
      checkStatus();
    }, [calc, totalShares]);

    return (
      <div
        ref={ref}
        className={clsx('optimiser-tabs w-full font-din2014', className)}
        {...props}
      >
        <Tabs
          onChange={(key) => setTabKey(key)}
          type="card"
          className={showTabContent ? '' : 'show-content'}
          centered
        >
          <Tabs.TabPane
            tab={<span onClick={triggerShow}>Order Sequence</span>}
            key="1"
          >
            <div className="flex w-full h-full">
              <div className="w-1/3">
                <div className="flex items-center pr-10">
                  <strong className="text-gray-600 text-base">Convert</strong>
                  <div className="horizontal-line flex-shrink ml-2 w-full h-[1px]" />
                </div>
                <ul className="text-base">
                  <CurrencyText
                    symbol={CURRENCY_SYMBOLS.get(region)}
                    value={Math.round(totalAmount)}
                    decimalScale={0}
                    renderText={(x: string) => (
                      <li>{`Shares Valued @ ${x} ${CURRENCIES.get(
                        region
                      )}`}</li>
                    )}
                  />
                </ul>
              </div>
              <div className="w-1/3">
                <div className="flex items-center pr-10">
                  <strong className="text-gray-600 text-base">Receive</strong>
                  <div className="horizontal-line flex-shrink ml-2 w-full h-[1px]" />
                </div>
                <ul className="text-base">
                  <li>
                    <CurrencyText
                      decimalScale={0}
                      symbol=""
                      // value={calc.growthETAUnitsHeld}
                      value={100000}
                      renderText={(x: string) => `${x} ${growthSymbol}`}
                    />{' '}
                    +{' '}
                    <CurrencyText
                      decimalScale={0}
                      symbol=""
                      // value={calc.incomeETAUnitsHeld}
                      value={100000}
                      renderText={(x: string) => `${x} ${incomeSymbol}`}
                    />
                  </li>
                </ul>
              </div>
              <div className="w-1/3">
                <strong className="text-gray-600 text-base">
                  Position Adjustments
                </strong>
                {sortAdjustment.length ? (
                  <ul
                    className={`text-base ${
                      totalShares > 0 ? 'block' : 'hidden'
                    }`}
                  >
                    {sortAdjustment.map(
                      (value: any, i: number) =>
                        value.unitsHeld !== value.totalShares && (
                          <li key={i}>
                            <span className="text-gray-600">
                              {adjustmentText(
                                value.unitsHeld,
                                value.totalShares
                              )}
                            </span>
                            <CurrencyText
                              symbol={CURRENCY_SYMBOLS.get(region)}
                              decimalScale={2}
                              value={value.lastPrice || 0}
                              renderText={(x: string) =>
                                `${value.adjustment} ${value.symbol} ${x} per ETA`
                              }
                            />
                          </li>
                        )
                    )}
                  </ul>
                ) : (
                  <ul className={totalShares > 0 ? 'block' : 'hidden'}>
                    {calc.growthETAUnitsHeld !== totalShares && (
                      <li>
                        <span className="text-gray-600">
                          {adjustmentText(calc.growthETAUnitsHeld, totalShares)}
                        </span>
                        <CurrencyText
                          symbol={CURRENCY_SYMBOLS.get(region)}
                          decimalScale={2}
                          value={growthLastPrice || 0}
                          renderText={(x: string) =>
                            `${adjustments.growth} ${growthSymbol} ${x} per ETA`
                          }
                        />
                      </li>
                    )}
                    {calc.incomeETAUnitsHeld !== totalShares && (
                      <li>
                        <span className="text-gray-600">
                          {adjustmentText(calc.incomeETAUnitsHeld, totalShares)}
                        </span>
                        <CurrencyText
                          symbol={CURRENCY_SYMBOLS.get(region)}
                          decimalScale={2}
                          value={incomeLastPrice || 0}
                          renderText={(x: string) =>
                            `${adjustments.income} ${incomeSymbol} ${x} per ETA`
                          }
                        />
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Execute Trade" key="2" disabled></Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
);

export default EquityTabPanels;
