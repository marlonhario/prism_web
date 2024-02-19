import { DivColors, GrowthColors } from 'common/consts/chartColors';
import { ProfileInterface } from 'common/interfaces/ETAShowcase/Profile';
import { Allocations, Perspective } from 'components/NewCubeModel';
import { CustomShareProfileView } from 'context/CustomShareContext';
import React from 'react';

export interface ETAData {
  growthValue: string;
  dividendValue: string;
  growthETAPrice: number;
  growthPercentageofShare: number;
  incomeETAPrice: number;
  incomePercentageofShare: number;
  normalisedGrowthPrice: number;
  growthLastPrice: number;
  growthEstablishmentPrice: number;
  incomeEstablishmentPrice: number;
  incomeLastPrice: number;
}

export interface ETAMaturityData {
  maturityGrowthETAPrice: number;
  maturityIncomeETAPrice: number;
}

export interface CustomShareProps {
  eta?: Perspective;
  etaColors: (Perspective | undefined)[];
  currency: string;
  underlyingShare: number;
  dividendYield: number;
  etaData: ETAData;
  etaMaturityData: ETAMaturityData;
  dividendForecastData: string[];
  cubePercentage: Allocations;
  lastPrice: number;
  maturityPrice: number;
  maturityTerm: number,
  profileView: CustomShareProfileView;
  growthProfile: ProfileInterface;
  incomeProfile: ProfileInterface;
  growthChartColor: GrowthColors;
  divChartColor: DivColors;
  growthRiskExposure: React.ReactChild;
  incomeRiskExposure: React.ReactChild;
  onChangeETA(eta?: Perspective): void;
  onChangeLastPrice(value: number): void;
  onChangeMaturityPrice(value: number): void;
  onChangeMaturityTerm(value: number): void;
  onChangeProfileView(view: CustomShareProfileView): void;
  onShowMarkets(): void;
}

export type CustomShareMobileProps = CustomShareProps & {
  dimensions: {
    width: number;
    height: number
  };
  isMobile?: boolean;
  useMobileHeader?: boolean;
}