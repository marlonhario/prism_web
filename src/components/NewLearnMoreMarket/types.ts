import { CSSProperties } from 'react';

import ETAData from 'common/interfaces/ETAData';
import Security from 'common/interfaces/Security';
import { Perspective, Profile } from 'components/NewCubeModel';
import { DividendForecast } from 'common/interfaces/ETAShowcase/DividendForecast';

export type ETAs = 'growth' | 'income';

export interface BackButtonProps {
  onClick: () => void;
}

export interface SliderProps {
  value: number;
  minValue: number;
  maxValue: number;
  /**
   * value to prevennt sliding to max and miin values
   */
  threshold?: number;
  iconFill?: string;
  flip?: boolean;
  /**
   * additional main style
   */
  style?: CSSProperties;
  /**
   * additional style for track thumb pointer
   */
  trackThumbPointerStyle?: CSSProperties;
  onChange(value: number, change?: number): void;
}

export interface ETAPairingMap {
  growth: {
    first: string;
    second: string;
  },
  income: {
    first: string,
    second: string,
  };
}

export interface ETADataMaturity {
  growthStartPercentage: number;
  growthStopPercentage: number;
  incomeStartPercentage: number;
  incomeStopPercentage: number;
  maturityUnderlyingPrice: number;
  maturityIncomeETAPrice: number;
  maturityGrowthETAPrice: number;
  maturityIncomeStart: number;
  maturityIncomeStop: number;
  maturityIncomeStartPercentage: number;
  maturityIncomeStopPercentage: number;
  maturityGrowthStart: number;
  maturityGrowthStop: number;
  maturityGrowthStopPercentage: number;
  maturityGrowthStartPercentage: number;
  maturityLossStartPercentage: number;
  maturityLossStopPercentage: number;
  maturityGrowthUpsideStart: number;
  maturityIncomeUpsideStart: number;
  maturityGrowthUpsideStartPercentage: number;
  maturityGrowthUpsideStopPercentage: number;
  maturityIncomeUpsideStartPercentage: number;
  maturityIncomeUpsideStopPercentage: number;
  priceGrowth: number;
  maturityAllocation: number;
  accumilatedForecastDividends: number;
  totalReturn: number;
  roi: number;
  irr: number;
}

export interface LearnMoreMarketProps {
  activeEtaType: Profile | '';
  activeSecurity: Security;
  perspective: Perspective;
  expanded?: boolean;
}

export interface LearnMoreMarketTabsProps extends LearnMoreMarketProps {
  eta: ETAs;
  dividendForecast: DividendForecast[];
  profile: ETAData & {
    chgNet1d?: number;
    pairingMap: {
      first: string;
      second: string;
    };
  };
  dimensions: {
    width: number;
    height: number;
  };
  selectedTab: number;
  setSelectedTab(index: number): void;
}

export interface LearnMoreMarketChartProps extends LearnMoreMarketTabsProps {
  dividendForecastData: number[];
  etaData: ETAData;
  etaDataMaturity: ETADataMaturity;
  sliderLeft: [number, number];
  sliderRight: number;
  setSliderLeft(value: [number, number]): void;
  setSliderRight(value: number): void;
}

export interface LearnMoreFooterProps extends LearnMoreMarketTabsProps {
  dividendForecastData: number[];
  etaData: ETAData;
  etaDataMaturity: ETADataMaturity;
  investment: number;
  width: number;
}

export interface PerspectiveConfig {
  growth: number;
  income: number;
  sharedLoss: number;
  sharedUpside: number;
}
