import { IETAData, ISecurity } from 'common/interfaces';
import { ETAPairing, Nullable } from 'common/types';
import { DividendForecast } from 'common/interfaces/ETAShowcase/DividendForecast';
import { EquityOptimiserSliders, EquityReleaseCalculator } from 'hooks/useEquityOptimiser';


export interface EquityOptimiserProps {
  securities: ISecurity[];
  calc: EquityReleaseCalculator;
  dividendForecast: DividendForecast[];
  etaPairing: Nullable<ETAPairing>;
  // TODO: create common interface
  etaDetails: IETAData;
  hideSecurities: boolean;
  focusField: string;
  growthSlider: number;
  incomeSlider: number;
  security: Nullable<ISecurity>;
  totalAmount: number;
  totalShares: number;
  showMarkets: boolean;
  setShowMarkets: (showMarkets: boolean) => void;
  handleClickMarkets: () => (e: React.MouseEvent) => void;
  handleChangeAmount: (amount: number) => void;
  handleChangeShares: (shares: number) => void;
  handleETAChange: (etaColor: ETAPairing) => void;
  handleFocusField: (name: string) => void;
  handleSecurityChange: (security: ISecurity) => void;
  handleSlide: (field: string, val: number) => void;
  handleChangePresetAll: (slider: keyof EquityOptimiserSliders) => void;
  handleChangePresetRelease: (slider: keyof EquityOptimiserSliders) => void;
  toggleETASelector: (hidden: boolean) => void;
}
