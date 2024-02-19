import { isUndefined, max } from 'lodash';

import { prismAnnualFee } from 'components/Canyon/utils';

/**
 * compute for the data to be used in chart and other
 * parts of the learn more market
 * @param lastPrice security last price
 * @param yieldValue security yield in percentage
 * @param growthETALastPrice last price of growth
 * @param incomeETALastPrice  last price of income
 * @param growthETAMaturityAllocation growth price at maturity
 * @param incomeETAMaturityAllocation incomme price at maturity
 * @param slider slider value on left side of the cube
 * @returns data to be used in chart and other
 * parts of the learn more market
 */
export const calculateETAData = (
  lastPrice: number,
  yieldValue: number,
  growthETALastPrice: number,
  incomeETALastPrice: number,
  growthETAMaturityAllocation: number,
  incomeETAMaturityAllocation: number,
  slider: number
) => {
  const growthEstablishmentPrice = growthETAMaturityAllocation;
  const incomeEstablishmentPrice = incomeETAMaturityAllocation;
  const growthLastPrice = growthETALastPrice;
  const incomeLastPrice = incomeETALastPrice;

  let impliedUnderlyingPrice = growthLastPrice + incomeLastPrice;
  let sliderRange = slider;
  let adjustGrowthPrice = 0.0;
  let adjustedIncomePrice = 0;
  if (sliderRange >= 50) {
    const incomeCalcPrice = incomeLastPrice * (1 - (sliderRange - 50) / 50);
    let temp = max<number>([0.01, incomeCalcPrice]);
    const maxValue = !isUndefined(temp) ? temp : 0.01;
    adjustGrowthPrice = impliedUnderlyingPrice - maxValue;
  } else {
    const growthCalcPrice = growthLastPrice * (1 - (50 - sliderRange) / 50);
    let temp = max<number>([0.01, growthCalcPrice]);
    adjustGrowthPrice = !isUndefined(temp) ? temp : 0.01;
  }
  const multipler = lastPrice / adjustGrowthPrice;
  adjustedIncomePrice = impliedUnderlyingPrice - adjustGrowthPrice;

  const normalisedScale = 100;
  const normalisedGrowthPrice =
    adjustGrowthPrice * (normalisedScale / impliedUnderlyingPrice);
  const growthValue = multipler.toFixed(2);

  const growthETAPrice = adjustGrowthPrice;
  const growthPercentageofShare =
    (100 * adjustGrowthPrice) / impliedUnderlyingPrice;
  const incomeETAPrice = adjustedIncomePrice;
  const incomePercentageofShare =
    (100 * adjustedIncomePrice) / impliedUnderlyingPrice;
  const derivedDivident =
    (100 *
      (lastPrice * yieldValue -
        prismAnnualFee *
        (growthEstablishmentPrice + incomeEstablishmentPrice))) /
    adjustedIncomePrice;
  const dividendValue = derivedDivident.toFixed(2);

  return {
    growthValue,
    dividendValue,
    growthETAPrice,
    growthPercentageofShare,
    incomeETAPrice,
    incomePercentageofShare,
    normalisedGrowthPrice,
    growthLastPrice,
    growthEstablishmentPrice,
    incomeEstablishmentPrice,
    incomeLastPrice,
  };
}

/**
 * compute for the growth and income price at maturity
 * @param growthETALastPrice last price of growth
 * @param incomeETALastPrice last price of income
 * @param slider slider value on left side of the cube
 * @returns growth and income price at maturity
 */
export const calculateETAMaturityData = (
  growthETALastPrice: number,
  incomeETALastPrice: number,
  slider: number
) => {
  const lastPrice = growthETALastPrice + incomeETALastPrice;
  const ratioLeft = growthETALastPrice / 50;
  const ratioRight = incomeETALastPrice / 50;
  const maturityGrowthETAPrice = slider > 50
    ? growthETALastPrice + ((slider - 50) * ratioRight)
    : growthETALastPrice - ((50 - slider) * ratioLeft);

  return {
    maturityGrowthETAPrice,
    maturityIncomeETAPrice: lastPrice - maturityGrowthETAPrice
  };
}