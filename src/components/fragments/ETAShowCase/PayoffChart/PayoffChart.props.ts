import { ProfileInterface } from 'common/interfaces/ETAShowcase/Profile';
import { Content } from 'common/interfaces/ETAShowcase/Content';
import { Security } from 'common/interfaces/ETAShowcase/Security';

export interface Point {
    underlyingChange: number;
    underlyingPrice: number;
    eta1Return: number;
    eta1Percent: number;
    eta2Return: number;
    eta2Percent: number;
    combinedPercent: number;
    xAxisValue: number;
    eta1YAxisValue: number;
    eta2YAxisValue: number;
    combinedYAxisValue: number;
  }
  
  export interface PointData {
    underlyingChange: number;
    etaPercent: number;
  }

export interface PayoffChartProps {
    hasYAxis: boolean;
    color: string;
    stroke: string;
    content: Content;
    profile: ProfileInterface;
    profile2?: ProfileInterface;
    activeSecurity?: Security;
    etaPercentFill: {
      type: 'radial' | 'linear';
      color1: string;
      offset1: string;
      opacity1: string;
      color2: string;
      offset2: string;
      opacity2: string;
    };
    riskExposure: React.ReactChild;
    chartHeight: number;
    detailsPosition: string;
    lastPrice: number;
    lastPrice2?: number;
    etaPrice: number;
    etaPrice2?: number;
    establishmentPrice: number;
    type: string;
    hideDetails?: boolean;
  }
  