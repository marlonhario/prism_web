import { useMemo } from 'react';

import { useCustomShareContext } from 'context/CustomShareContext';
import { Resizable } from 'components/NewLearnMoreMarket/Resizable';
import { calculateETAData, calculateETAMaturityData } from 'pages/CustomShare/utils';
import CustomShareVariableView from './CustomShareVariable.view';

export default function CustomShareVariableContainer() {
  const {
    security,
    eta,
    underlyingShare,
    dividendYield,
    lastPriceSlider,
    maturityPriceSlider,
    maturityTermSlider
  } = useCustomShareContext();

  /**
   * compute and memoized eta data at maturity
   */
  const etaMaturityData = useMemo(() => {
    const { growthETALastPrice, incomeETALastPrice } = security;

    return calculateETAMaturityData(
      growthETALastPrice,
      incomeETALastPrice,
      maturityPriceSlider
    );
  }, [security, maturityPriceSlider]);

  const etaData = useMemo(() => {
    const { growthETALastPrice, incomeETALastPrice } = security;
    const { maturityGrowthETAPrice, maturityIncomeETAPrice } = etaMaturityData;
    const dividendYieldPercentage = dividendYield / 100;

    return calculateETAData(
      underlyingShare,
      dividendYieldPercentage,
      growthETALastPrice,
      incomeETALastPrice,
      maturityGrowthETAPrice,
      maturityIncomeETAPrice,
      lastPriceSlider
    );
  }, [security, underlyingShare, dividendYield, lastPriceSlider, etaMaturityData]);

  return (
    <Resizable render={() => (
      <CustomShareVariableView
        eta={eta}
        underlyingShare={underlyingShare}
        etaData={etaData}
        etaMaturityData={etaMaturityData}
        lastPrice={lastPriceSlider}
        maturityPrice={maturityPriceSlider}
        maturityTerm={maturityTermSlider}
      />
    )} />
  );
}