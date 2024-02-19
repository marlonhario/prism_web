import { DefaultOptionType } from 'antd/lib/select';
import { ETAData } from 'common/interfaces/ETAShowcase/ETAData';
import { Security } from 'common/interfaces/ETAShowcase/Security';
import { Undefinable } from 'common/types';
import { Perspective, Profile } from 'components/NewCubeModel';
import React from 'react';

export const StaticSecurityContent = {
  ticker: 'EXS',
  longName: 'Example Stock',
  forwardDivYield: 0.05,
  lastPrice: 100.0,
  marketCap: 10000.0,
  region: 'AU',
} as Security;

export interface OptionType extends DefaultOptionType {
  ticker: string;
  longname: string;
  region: string;
  lastprice: number;
  forwarddivyield: number;
  marketcap: number;
  text?: string;
  value?: string;
}

export interface ETAHeaderPublicProps {
  securityValue: Undefinable<string>;
  activeSecurity: Security;
  lastPrice: number;
  yieldValue: number;
  lockETA?: boolean;
  onHandleSecurityHeld: (
    selectedSecurityHeld: string,
    securityOption: Security,
    update?: boolean,
    skipETACall?: boolean
  ) => void;
  onLockETA: (lock?: boolean) => void;
  setShowMarkets: (showMarkets: boolean) => void;
  updateETAType?: (
    newEtaType: Perspective | '',
    activeEtaTypeValue: Profile | '',
    skipResetExpandedETA?: boolean,
    derivedETAContent?: ETAData
  ) => void;
  isMobileView?: boolean;
}

export interface ETAHeaderCalcedProps {
  securityList: Security[];
  handleClickMarkets: () => (e: React.MouseEvent) => void;
  handleSelectSecurity: (security: Security) => void
  handleLockETA?: (lock?: boolean) => void;
}

export type ETAHeaderProps = ETAHeaderPublicProps & ETAHeaderCalcedProps;
