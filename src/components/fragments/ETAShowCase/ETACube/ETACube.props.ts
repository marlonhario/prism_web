import { ETAData } from 'common/interfaces/ETAShowcase/ETAData';
import HeaderInterface from 'common/interfaces/ETAShowcase/HeaderInterface';
import { ProfileInterface } from 'common/interfaces/ETAShowcase/Profile';
import { Security } from 'common/interfaces/ETAShowcase/Security';
import { Content } from 'common/interfaces/ETAShowcase/Content';
import { Perspective, Profile } from 'components/NewCubeModel';

export interface Dimensions {
  width: number;
  height: number;
  margin: number;
}

export interface ETACubePublicProps {
  dimensions: Dimensions;
  activeEtaType: Profile | '';
  activeSecurity: Security;
  etaType?: Perspective | '';
  viewMode: string;
  lastPrice: number;
  yieldValue: number;
  greenContent: Content;
  blueContent: Content;
  redContent: Content;
  purpleContent: Content;
  growthProfile: {
    red: ProfileInterface;
    blue: ProfileInterface;
    green: ProfileInterface;
    purple: ProfileInterface;
    [key: string]: ProfileInterface;
  };
  incomeProfile: {
    red: ProfileInterface;
    blue: ProfileInterface;
    green: ProfileInterface;
    purple: ProfileInterface;
    [key: string]: ProfileInterface;
  };
  initialSliderPosition: number;
  sliderPercentage: [number, number];
  lockETA?: boolean;
  setShowLogin: (showLogin: boolean) => void;
  setSliderPercentage: (sliderPercentage: [number, number]) => void;
  setEtaType: (etaType: Perspective | '') => void;
  updateETAType: (
    newEtaType: Perspective | '',
    activeEtaTypeValue: Profile | '',
    skipResetExpandedETA?: boolean,
    derivedETAContent?: ETAData
  ) => void;
  setActiveEtaType: (etaType: Profile | '') => void;
  setViewMode: (viewMode: string) => void;
  fetchEtaContent: (etaType: Perspective | '') => {
    etaContent: ETAData;
    etaCallback: (calculatedContent: ETAData) => void;
  };
  calculateETAData: (
    etaData: ETAData,
    lastPrice: number,
    yieldValueFromObject: number,
    slider: number,
    slider2: number
  ) => {
    growthValue: string;
    dividentValue: string;
    growthETAPrice: number;
    growthPercentageofShare: number;
    incomeETAPrice: number;
    incomePercentageofShare: number;
    growthSymbol: string;
    incomeSymbol: string;
    normalisedGrowthPrice: number;
    growthLastPrice: number;
    growthEstablishmentPrice: number;
    incomeEstablishmentPrice: number;
    incomeLastPrice: number;
  };
  isMobileCubeView?: boolean | undefined;
  handleSecurityChange?(securitty: Security): void;
  setShowMarkets(show: boolean): void;
}

export interface ETACubeCalcedProps {
  dimensions: Dimensions;
  activeSecurity: Security;
  eta: any;
  etaPairs: string[];
  getActiveContent: () => Content;
  handleETAPercentageChange: (value: [number, number], etaType: Perspective | '') => void;
  updateCubePercentage: (
    newEtaType: Perspective | '',
    activeEtaTypeValue: Profile | '',
    skipResetExpandedETA?: boolean,
    derivedETAContent?: ETAData
  ) => void;
  showIntro: boolean;
  setShowIntro: (isShow: boolean) => void;
  isLastView: boolean;
  setIsLastView: (isShow: boolean) => void;
}

export type ETACubeProps = ETACubePublicProps & ETACubeCalcedProps;
