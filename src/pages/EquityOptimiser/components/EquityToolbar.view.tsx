import React, { useEffect, useState } from 'react';
import clsx from 'classnames';
import { Input } from 'antd';
import { BarChart, Bar, ReferenceLine } from 'recharts';
import _ from 'lodash';

import { PrismAnnualFee } from 'common/consts';
import { Nullable } from 'common/types';
import { IETAData, ISecurity } from 'common/interfaces';
import { ProfileInterface } from 'common/interfaces/ETAShowcase/Profile';
import { DividendForecast } from 'common/interfaces/ETAShowcase/DividendForecast';
import { growthProfileContent } from 'pages/Perspective/utils';
import {
  EquityOptimiserSliders,
  EquityReleaseCalculator,
} from 'hooks/useEquityOptimiser';
import PayoffChart from 'components/fragments/ETAShowCase/PayoffChart';
import { CURRENCY_SYMBOLS } from 'common/consts';

const getGrowthProfile = (seriesPair: string) => {
  switch (seriesPair) {
    case 'red':
      return growthProfileContent.red;
    case 'green':
      return growthProfileContent.green;
    case 'blue':
      return growthProfileContent.blue;
    default:
      return null;
  }
};

const EquityToolbar = React.forwardRef(
  (
    {
      activeSecurity = null,
      calc,
      className,
      dividendForecast = [],
      etaDetails,
      totalAmount = 0,
      totalShares = 0,
      ...props
    }: {
      activeSecurity: Nullable<ISecurity>;
      calc: EquityReleaseCalculator;
      dividendForecast: DividendForecast[];
      etaDetails: IETAData;
      totalAmount: number;
      totalShares: number;
      onChangeAmount: (value: string) => void;
      onChangeShare: (value: string) => void;
      onPresetAll: (slider: keyof EquityOptimiserSliders) => void;
      onPresetRelease: (slider: keyof EquityOptimiserSliders) => void;
    } & React.HtmlHTMLAttributes<HTMLDivElement>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [focusField, setFocusField] = useState<string>('shares');
    const [profile, setProfile] = useState<Nullable<ProfileInterface>>(null);

    const getDividendChartContent = (): DividendForecast[] => {
      const growthPrice = etaDetails?.growthEstablishmentPrice || 0;
      const incomeProfile = etaDetails?.incomeEstablishmentPrice || 0;
      // const incomePercentageofShare = calc.incomePercentageofShare;
      const establishmentPrice = growthPrice + incomeProfile;
      // const derivedPrice = establishmentPrice * PrismAnnualFee;
      const feeAmount = establishmentPrice * PrismAnnualFee;

      _.each(dividendForecast, (dividendContent, i) => {
        const divETA = parseFloat(
          (
            (100 * (dividendContent.perShareAmount - feeAmount)) /
            calc.adjustedIncomePrice
          ).toFixed(2)
        );
        dividendContent.dividendETA = divETA >= 0 ? divETA : 0;
      });


      return dividendForecast;
    };

    useEffect(() => {
      if (etaDetails) {
        const { seriesPair } = etaDetails;
        let profile = null;
        if (seriesPair) {
          profile = getGrowthProfile(seriesPair?.toLowerCase());
        }
        setProfile(profile);
      }
    }, [etaDetails]);

    return (
      <div
        ref={ref}
        className={clsx('flex w-full h-16', className)}
        {...props}
      >
        <div className="flex uppercase">
          <div className="flex flex-col justify-center items-center w-16 h-full text-center text-xxs">
            <span className="block font-semibold leading-3">Presets</span>
            <span>Growth</span>
          </div>
          <div className="flex flex-col justify-center gap-y-1 text-xxxs">
            <button onClick={() => props.onPresetAll('growth')}>
              All Growth
            </button>
            <button onClick={() => props.onPresetRelease('growth')}>
              Release Growth
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-evenly items-center">
          <div className="payoff-chart">
            {profile && (
              <PayoffChart
                hasYAxis={true}
                color="text-[#474C55]"
                stroke="#474C55"
                content={{
                  growthETAPrice: etaDetails.growthEstablishmentPrice,
                  growthEstablishmentPrice: etaDetails.growthEstablishmentPrice,
                  growthLastPrice: etaDetails.growthLastPrice,
                  growthPercentageofShare: calc.growthPercentageofShare,
                  growthSymbol: etaDetails.growthSymbol,
                  incomeETAPrice: etaDetails.incomeEstablishmentPrice,
                  incomeEstablishmentPrice: etaDetails.incomeEstablishmentPrice,
                  incomeLastPrice: etaDetails.incomeLastPrice,
                  incomePercentageofShare: calc.incomePercentageofShare,
                  incomeSymbol: etaDetails.incomeSymbol,
                  normalisedGrowthPrice: calc.normalisedGrowthPrice,
                }}
                profile={profile}
                activeSecurity={{
                  forwardDivYield: activeSecurity?.forwardDivYield || 0,
                  lastPrice: activeSecurity?.lastPrice || 0,
                  longName: activeSecurity?.longName || '',
                  marketCap: activeSecurity?.marketCap || 0,
                  region: activeSecurity?.region || '',
                  text: undefined,
                  ticker: activeSecurity?.ticker || '',
                  value: [activeSecurity?.longName, activeSecurity?.ticker]
                    .filter(Boolean)
                    .join(' '),
                }}
                etaPercentFill={{
                  type: 'radial',
                  color1: '#474C55',
                  offset1: '0',
                  opacity1: '1',
                  color2: '#474C55',
                  offset2: '1',
                  opacity2: '1',
                }}
                riskExposure=""
                chartHeight={220}
                detailsPosition=""
                lastPrice={calc.adjustedGrowthPrice}
                etaPrice={calc.adjustedGrowthPrice}
                establishmentPrice={calc.adjustedGrowthPrice}
                type="growth"
                hideDetails
              />
            )}
          </div>
          <div className="flex flex-col gap-y-1 w-64">
            <div className="flex text-xxs text-white text-center uppercase">
              <span className="flex-1">Value of shares</span>
              <span className="flex-1">Volume of shares</span>
            </div>
            <div className="relative flex items-center">
              <Input
                className={clsx(
                  'amount',
                  focusField === 'amount' ? 'active' : ''
                )}
                value={
                  totalAmount > 0
                    ? `${CURRENCY_SYMBOLS.get(activeSecurity?.region || 'AUS')} ${totalAmount
                        .toFixed(0)
                        ?.toString()
                        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                    : ''
                }
                onChange={(e) => props.onChangeAmount(e.target.value)}
                onFocus={() => setFocusField('amount')}
                autoFocus
              />
              <Input
                className={clsx(
                  'shares',
                  focusField === 'shares' ? 'active' : ''
                )}
                value={
                  totalShares > 0
                    ? totalShares
                        ?.toString()
                        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : ''
                }
                onChange={(e) => props.onChangeShare(e.target.value)}
                onFocus={() => setFocusField('shares')}
                autoFocus
              />
            </div>
          </div>
          <div className="barchart-box">
            <BarChart
              data={getDividendChartContent()}
              width={100}
              height={50}
              barSize={3}
            >
              <ReferenceLine
                ifOverflow="extendDomain"
                y={5}
                // stroke="white"
                // strokeDasharray="3 3"
                position="end"
                className="hidden"
                label="5%"
              />
              <Bar
                dataKey="dividendETA"
                fill="#474C55" //{props.barFill}
                stroke="#474C55" //{props.barStroke}
                radius={[10, 10, 0, 0]}
                name="Dividend ETA"
              />
            </BarChart>
          </div>
        </div>
        <div className="flex uppercase">
          <div className="flex flex-col justify-center gap-y-1 text-xxxs">
            <button onClick={() => props.onPresetAll('income')}>
              All Dividend
            </button>
            <button onClick={() => props.onPresetRelease('income')}>
              Release Dividened
            </button>
          </div>
          <div className="flex flex-col justify-center items-center w-16 h-full text-center text-xxs">
            <span className="block font-semibold leading-3">Presets</span>
            <span>Dividend</span>
          </div>
        </div>
      </div>
    );
  }
);

export default EquityToolbar;
