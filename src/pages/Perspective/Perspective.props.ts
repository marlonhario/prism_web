import { ProfileInterface } from 'common/interfaces/ETAShowcase/Profile';
import { Content } from 'common/interfaces/ETAShowcase/Content';
import { Security } from 'common/interfaces/ETAShowcase/Security';
import { ETAData } from 'common/interfaces/ETAShowcase/ETAData';
import { ETATypes, Nullable, Undefinable } from 'common/types';
import { Perspective, Profile } from 'components/NewCubeModel';


export interface PerspectiveProps {
  securityValue: Undefinable<string>;
  activeSecurity: Security;
  lastPrice: number;
  yieldValue: number;
  activeEtaType: Profile | '';
  etaType: Perspective | '';
  viewMode: string;
  greenContent: Content;
  blueContent: Content;
  redContent: Content;
  purpleContent: Content;
  growthProfile: {
    red: ProfileInterface;
    blue: ProfileInterface;
    green: ProfileInterface;
    purple: ProfileInterface;
  };
  incomeProfile: {
    red: ProfileInterface;
    blue: ProfileInterface;
    green: ProfileInterface;
    purple: ProfileInterface;
  };
  initialSliderPosition: number;
  sliderPercentage: [number, number];
  showMarkets: boolean;
  lockETA: boolean | undefined;
  setEta: (eta: ETATypes) => void;
  setShowLogin: (showLogin: boolean) => void;
  setShowMarkets: (showMarkets: boolean) => void;
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
  onHandleSecurityHeld: (
    selectedSecurityHeld: string,
    securityOption: Security,
    updateETA?: boolean,
    updateETAContent?: boolean,
    skipETACall?: boolean
  ) => void;
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
  setLockETA: (isLock: boolean | undefined) => void;
}
