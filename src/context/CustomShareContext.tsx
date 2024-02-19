import { useState, createContext, useContext, PropsWithChildren, useEffect } from 'react';

import { Perspective } from 'components/NewCubeModel';

export type CustomShareProfileView = 'default' | 'options' | 'payoff';

type CustomShareSecurity = {
  growthETALastPrice: number;
  incomeETALastPrice: number;
  growthMaturityAllocation: number;
  incomeMaturityAllocation: number;
}

type CustomShareStateContext = {
  eta?: Perspective;
  security: CustomShareSecurity;
  underlyingShare: number;
  dividendYield: number;
  lastPriceSlider: number;
  maturityPriceSlider: number;
  maturityTermSlider: number;
  profileView: CustomShareProfileView;
  currency: string;
  setCurrency: (currency: string) => void;
  setETA(eta?: Perspective): void;
  setUnderlyingShare(value: number): void;
  setDividendYield(value: number): void;
  setLastPriceSlider(value: number): void;
  setMaturityPriceSlider(value: number): void;
  setMaturityTermSlider(value: number): void;
  setProfileView(view: CustomShareProfileView): void;
};

const customShareETAConfig = {
  red: {
    growth: 60,
    income: 40,
  },
  green: {
    growth: 50,
    income: 50,
  },
  blue: {
    growth: 40,
    income: 60,
  },
  purple: {
    growth: 25,
    income: 75,
  }
};

export const contextDefaultValues: CustomShareStateContext = {
  security: {
    growthETALastPrice: 0,
    incomeETALastPrice: 0,
    growthMaturityAllocation: 0,
    incomeMaturityAllocation: 0
  },
  underlyingShare: 100,
  dividendYield: 4.5,
  lastPriceSlider: 50,
  maturityPriceSlider: 50,
  maturityTermSlider: 5,
  profileView: 'default',
  currency: 'AUD',
  setCurrency: () => { },
  setETA: () => { },
  setUnderlyingShare: () => { },
  setDividendYield: () => { },
  setLastPriceSlider: () => { },
  setMaturityPriceSlider: () => { },
  setMaturityTermSlider: () => { },
  setProfileView: () => { }
};

export const CustomShareContext =
  createContext<CustomShareStateContext>(contextDefaultValues);

const { Provider } = CustomShareContext;

const CustomShareContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [eta, setETA] = useState<Perspective>();
  const [security, setSecurity] = useState<CustomShareSecurity>(contextDefaultValues.security);
  const [underlyingShare, setUnderlyingShare] = useState<number>(contextDefaultValues.underlyingShare);
  const [dividendYield, setDividendYield] = useState<number>(contextDefaultValues.dividendYield);
  const [lastPriceSlider, setLastPriceSlider] = useState<number>(contextDefaultValues.lastPriceSlider);
  const [maturityPriceSlider, setMaturityPriceSlider] = useState<number>(contextDefaultValues.maturityPriceSlider);
  const [maturityTermSlider, setMaturityTermSlider] = useState<number>(contextDefaultValues.maturityTermSlider);
  const [profileView, setProfileView] = useState<CustomShareProfileView>(contextDefaultValues.profileView);
  const [currency, setCurrency] = useState(contextDefaultValues.currency);

  useEffect(() => {
    if (eta) {
      const customShareETA = customShareETAConfig[eta];
      const growthPrice = customShareETA.growth * (underlyingShare / 100);
      const incomePrice = customShareETA.income * (underlyingShare / 100);

      setSecurity({
        growthETALastPrice: growthPrice,
        incomeETALastPrice: incomePrice,
        growthMaturityAllocation: growthPrice,
        incomeMaturityAllocation: incomePrice
      });
    } else {
      setSecurity({
        growthETALastPrice: 0,
        incomeETALastPrice: 0,
        growthMaturityAllocation: 0,
        incomeMaturityAllocation: 0
      });
      setLastPriceSlider(contextDefaultValues.lastPriceSlider);
      setMaturityPriceSlider(contextDefaultValues.maturityPriceSlider);
      setMaturityTermSlider(contextDefaultValues.maturityTermSlider);
      setProfileView(contextDefaultValues.profileView);
    }
  }, [eta, underlyingShare]);

  return (
    <Provider
      value={{
        eta,
        security,
        underlyingShare,
        dividendYield,
        lastPriceSlider,
        maturityPriceSlider,
        maturityTermSlider,
        profileView,
        currency,
        setCurrency,
        setETA,
        setUnderlyingShare,
        setDividendYield,
        setLastPriceSlider,
        setMaturityPriceSlider,
        setMaturityTermSlider,
        setProfileView
      }}
    >
      {children}
    </Provider>
  );
};

const useCustomShareContext = () => useContext(CustomShareContext);

export { CustomShareContextProvider, useCustomShareContext };