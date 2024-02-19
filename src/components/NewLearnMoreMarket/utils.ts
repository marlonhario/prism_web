import { isUndefined, max } from 'lodash';

import Security from 'common/interfaces/Security';
import ETAData from 'common/interfaces/ETAData';
import { prismAnnualFee } from 'components/Canyon/utils';
import { Perspective } from 'components/NewCubeModel';
import { ETAs, PerspectiveConfig } from './types';
import { perspectiveConfig } from './config';

/**
 * compute for the income price at maturity
 * @param etaConfig loss or upside config
 * @param underlyingTep given tep
 * @param incomeETAEstablishmentPrice establishment income price
 * @param maturityUnderlyingPrice underlying price at maturity
 * @returns income price at maturity
 */
export const calculateMaturityIncomeIncomePrice = (
  etaConfig: PerspectiveConfig,
  underlyingTep: number,
  incomeETAEstablishmentPrice: number,
  maturityUnderlyingPrice: number
) => {
  if (maturityUnderlyingPrice > underlyingTep) {
    return incomeETAEstablishmentPrice + (etaConfig.sharedUpside ? (maturityUnderlyingPrice - underlyingTep) / 2 : 0);
  } else {
    if (etaConfig.income) {
      return Math.max(incomeETAEstablishmentPrice + maturityUnderlyingPrice - underlyingTep, 0);
    } else {
      if (etaConfig.growth) {
        if (maturityUnderlyingPrice > incomeETAEstablishmentPrice) {
          return incomeETAEstablishmentPrice;
        } else {
          return maturityUnderlyingPrice;
        }
      } else {
        return maturityUnderlyingPrice * incomeETAEstablishmentPrice / underlyingTep;
      }
    }
  }
}

/**
 * compute for the data to be used in chart and other
 * parts of the learn more market
 * @param etaData 
 * @param lastPrice establishment last price
 * @param yieldValueFromObject 
 * @param slider slider value on left side of the cube
 * @returns data to be used in chart and other
 * parts of the learn more market
 */
export const calculateETAData = (
  etaData: ETAData,
  lastPrice: number,
  yieldValueFromObject: number,
  slider: number,
): ETAData => {
  const growthEstablishmentPrice = etaData.growthEstablishmentPrice;
  const incomeEstablishmentPrice = etaData.incomeEstablishmentPrice;
  const growthLastPrice = etaData.growthLastPrice;
  const incomeLastPrice = etaData.incomeLastPrice;

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
    adjustGrowthPrice * (normalisedScale / impliedUnderlyingPrice); // This will be used while rendering the cube
  const growthValue = multipler.toFixed(2);

  const growthETAPrice = adjustGrowthPrice;
  const growthPercentageofShare =
    (100 * adjustGrowthPrice) / impliedUnderlyingPrice;
  const incomeETAPrice = adjustedIncomePrice;
  const incomePercentageofShare =
    (100 * adjustedIncomePrice) / impliedUnderlyingPrice;
  const derivedDivident =
    (100 *
      (lastPrice * yieldValueFromObject -
        prismAnnualFee *
        (growthEstablishmentPrice + incomeEstablishmentPrice))) /
    adjustedIncomePrice;
  const dividentValue = derivedDivident.toFixed(2);
  const growthSymbol = etaData.growthSymbol;
  const incomeSymbol = etaData.incomeSymbol;
  return {
    growthValue,
    dividentValue,
    growthETAPrice,
    growthPercentageofShare,
    incomeETAPrice,
    incomePercentageofShare,
    growthSymbol,
    incomeSymbol,
    normalisedGrowthPrice,
    growthLastPrice,
    growthEstablishmentPrice,
    incomeEstablishmentPrice,
    incomeLastPrice,
    etaValueInCirculation: etaData.etaValueInCirculation,
  };
}

/**
 * compute for the data to be used in chart and other
 * parts of the learn more market
 * @param activeSecurity current security
 * @param perspective current perspective
 * @param eta current payoff profile
 * @param etaData eta data from api 
 * @param dividends total of dividends
 * @param investment investment value
 * @param sliderValue slider value on left side of the cube
 * @returns data to be used in chart and other
 * parts of the learn more market
 */
export const calculateEtaMaturityData = (
  activeSecurity: Security,
  perspective: Perspective,
  eta: ETAs,
  etaData: ETAData,
  dividends: number,
  investment: number,
  sliderValue: number
) => {
  const etaConfig = perspectiveConfig[perspective];
  const lastPrice = activeSecurity.lastPrice;
  const etaGrowth = eta === 'growth';

  const growthStart = etaData.incomeLastPrice * etaConfig.growth;
  const growthStop = growthStart + etaData.growthLastPrice + (etaData.incomeLastPrice * etaConfig.sharedLoss);
  const incomeStart = etaData.growthLastPrice * etaConfig.income;
  const incomeStop = incomeStart + etaData.incomeLastPrice + (etaData.growthLastPrice * etaConfig.sharedLoss);
  const growthStartPercentage = (growthStart / lastPrice) * 100;
  const growthStopPercentage = (growthStop / lastPrice) * 100;
  const incomeStartPercentage = (incomeStart / lastPrice) * 100;
  const incomeStopPercentage = (incomeStop / lastPrice) * 100;

  const underlyingTep = lastPrice;
  const maturityUnderlyingPrice = underlyingTep * sliderValue / 100;
  const maturityIncomeETAPrice = calculateMaturityIncomeIncomePrice(etaConfig, underlyingTep, etaData.incomeEstablishmentPrice, maturityUnderlyingPrice);
  const maturityGrowthETAPrice = maturityUnderlyingPrice - maturityIncomeETAPrice;
  const maturityIncomeStart = etaData.growthEstablishmentPrice * etaConfig.income;
  const maturityIncomeStop = maturityIncomeStart +
    Math.min(maturityIncomeETAPrice, etaData.incomeEstablishmentPrice) +
    (Math.min(maturityGrowthETAPrice, etaData.growthEstablishmentPrice) * etaConfig.sharedLoss);

  const maturityGrowthStart = etaData.incomeEstablishmentPrice * etaConfig.growth
  const maturityGrowthStop = maturityGrowthStart +
    Math.min(maturityGrowthETAPrice, etaData.growthEstablishmentPrice) +
    (Math.min(maturityIncomeETAPrice, etaData.incomeEstablishmentPrice) * etaConfig.sharedLoss);

  const maturityIncomeStartPercentage = (maturityIncomeStart / underlyingTep) * 100;
  const maturityIncomeStopPercentage = (maturityIncomeStop / underlyingTep) * 100;
  const maturityGrowthStartPercentage = (maturityGrowthStart / underlyingTep) * 100;
  const maturityGrowthStopPercentage = (maturityGrowthStop / underlyingTep) * 100;

  const maturityLossStart =
    etaGrowth
      ? maturityGrowthStop
      : maturityIncomeStop;
  const maturityLossStop = maturityLossStart + Math.max(0,
    etaGrowth
      ? etaData.growthEstablishmentPrice - maturityGrowthETAPrice
      : etaData.incomeEstablishmentPrice - maturityIncomeETAPrice);

  const maturityLossStartPercentage = (maturityLossStart / underlyingTep) * 100;
  const maturityLossStopPercentage = (maturityLossStop / underlyingTep) * 100;

  const maturityGrowthUpsideStart = underlyingTep;
  const maturityGrowthUpsideStop = Math.max(maturityGrowthUpsideStart, maturityUnderlyingPrice);
  const maturityIncomeUpsideStart = underlyingTep;
  const maturityIncomeUpsideStop = Math.max(underlyingTep, maturityUnderlyingPrice * etaConfig.sharedUpside);
  const maturityGrowthUpsideStartPercentage = (maturityGrowthUpsideStart / underlyingTep) * 100;
  const maturityGrowthUpsideStopPercentage = (maturityGrowthUpsideStop / underlyingTep) * 100;
  const maturityIncomeUpsideStartPercentage = (maturityIncomeUpsideStart / underlyingTep) * 100;
  const maturityIncomeUpsideStopPercentage = (maturityIncomeUpsideStop / underlyingTep) * 100;

  const unitsBought = Math.trunc(investment / (etaGrowth ? etaData.growthETAPrice : etaData.incomeETAPrice));
  const priceGrowth = (etaGrowth
    ? (maturityGrowthETAPrice - etaData.growthLastPrice) / etaData.growthLastPrice
    : (maturityIncomeETAPrice - etaData.incomeLastPrice) / etaData.incomeLastPrice) * 100;
  const maturityAllocation = (etaGrowth ? maturityGrowthETAPrice : maturityIncomeETAPrice) * unitsBought;
  const accumilatedForecastDividends = dividends * unitsBought;
  const totalReturn = maturityAllocation + accumilatedForecastDividends;
  const roi = ((totalReturn - investment) / investment) * 100;
  const irr = 0;

  return {
    growthStartPercentage,
    growthStopPercentage,
    incomeStartPercentage,
    incomeStopPercentage,
    maturityUnderlyingPrice,
    maturityIncomeETAPrice,
    maturityGrowthETAPrice,
    maturityIncomeStart,
    maturityIncomeStop,
    maturityIncomeStartPercentage,
    maturityIncomeStopPercentage,
    maturityGrowthStart,
    maturityGrowthStop,
    maturityGrowthStopPercentage,
    maturityGrowthStartPercentage,
    maturityLossStartPercentage,
    maturityLossStopPercentage,
    maturityGrowthUpsideStart,
    maturityIncomeUpsideStart,
    maturityGrowthUpsideStartPercentage,
    maturityGrowthUpsideStopPercentage,
    maturityIncomeUpsideStartPercentage,
    maturityIncomeUpsideStopPercentage,
    unitsBought,
    priceGrowth,
    maturityAllocation,
    accumilatedForecastDividends,
    totalReturn,
    roi,
    irr
  };
}

/**
 * format the given value to currency
 * @param value value to be formatted
 * @param currency currency to be used, defaults to AUD
 * @returns formatted value
 */
export const formatCurrency = (value: number, currency = 'AUD') => {
  const whole = isNaN(value) ? 0 : value;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === 'AUD' ? 'USD' : currency,
  });

  return formatter.format(whole);
}

/**
 * format the given value to percentage
 * @param value value to be formatted 
 * @returns formatted value
 */
export const formatPercentage = (value: number) => {
  const whole = isNaN(value) ? 0 : value;
  const formatted = whole.toFixed(2);

  if (formatted === '0.00' || formatted === '-0.00') {
    return '0%';
  }

  return `${formatted}%`;
}

/**
 * format the given value to whole number / decimal
 * @param value value to be formatted
 * @param decimal number of decimal places
 * @returns formatted value in whole number/decimal
 */
export const formatNumber = (value: number, decimal?: number) => {
  const whole = isNaN(value) ? 0 : value;

  return whole.toLocaleString('en-US', {
    minimumFractionDigits: decimal ?? 0,
    maximumFractionDigits: decimal ?? 0
  });
}