import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';

import { DefaultShares, ETAPairingColors, PrismAnnualFee, SliderDecreasingRate, SliderMaxValue } from 'common/consts';
import { ISecurity } from 'common/interfaces';
import { ETAPairing, Nullable } from 'common/types';

export interface EquityOptimiserSliders {
  income: number;
  growth: number;
}

export interface EquityReleaseCalculator {
  forwardDivYield: number;
  netDividendYield: number;
  valueOfSharesHeld: number;
  maxGrowthUnitsIncrease: number;
  maxIncomeUnitsIncrease: number;
  growthETAUnitsHeld: number;
  incomeETAUnitsHeld: number;
  growthValueOfHolding: number;
  incomeValueOfHolding: number;
  cashReturned: number;
  totalPriceExposure: number;
  totalYieldExposure: number;
  growthSqrLength: number;
  incomeSqrLength: number;
  cashSqrLength: number;
  growthGuard: number;
  divGuard: number;
  adjustedGrowthPrice: number;
  adjustedIncomePrice: number;
  normalisedGrowthPrice: number;
  growthPercentageofShare: number;
  incomePercentageofShare: number;
}

function equityReleaseCalculator(
  security: Nullable<ISecurity>,
  etaDetails: any,
  sliders: EquityOptimiserSliders,
  totalShares: number
): EquityReleaseCalculator {
  const calc: EquityReleaseCalculator = {
    forwardDivYield: 0,
    netDividendYield: 0,
    valueOfSharesHeld: 0,
    maxGrowthUnitsIncrease: 0,
    maxIncomeUnitsIncrease: 0,
    growthETAUnitsHeld: 0,
    incomeETAUnitsHeld: 0,
    growthValueOfHolding: 0,
    incomeValueOfHolding: 0,
    cashReturned: 0,
    totalPriceExposure: 0,
    totalYieldExposure: 0,
    growthSqrLength: 0,
    incomeSqrLength: 0,
    cashSqrLength: 0,
    growthGuard: 0,
    divGuard: 0,
    adjustedGrowthPrice: 0,
    adjustedIncomePrice: 0,
    normalisedGrowthPrice: 0,
    growthPercentageofShare: 0,
    incomePercentageofShare: 0
  };
  if (etaDetails && security && totalShares) {
    const { growthLastPrice = 0, incomeLastPrice = 0, incomeEstablishmentPrice = 0, growthEstablishmentPrice = 0 } = etaDetails;
    const { forwardDivYield = 0, lastPrice = 0 } = security;
    const growthIncrease = _.max([0, sliders.growth - SliderMaxValue]) || 0;
    const incomeIncrease = _.max([0, sliders.income - SliderMaxValue]) || 0;
    const growthToKeep = _.min([SliderMaxValue, sliders.growth]) || 0;
    const incomeToKeep = _.min([SliderMaxValue, sliders.income]) || 0;
    const etaPairing = _.capitalize(etaDetails?.seriesPair) as ETAPairing;
    const impliedUnderlyingPrice = growthLastPrice + incomeLastPrice; // lastPrice;
    const scaledValue = 10000;
    const sliderMidScale = 100;
		

    calc.forwardDivYield = forwardDivYield * 100;
    calc.netDividendYield = calc.forwardDivYield - PrismAnnualFee;
    calc.valueOfSharesHeld = totalShares * lastPrice;
    calc.maxGrowthUnitsIncrease = calc.valueOfSharesHeld / growthLastPrice - totalShares;
    calc.maxIncomeUnitsIncrease = calc.valueOfSharesHeld / incomeLastPrice - totalShares;

    const calGrowthETAUnitsHeld = totalShares * (growthToKeep / SliderMaxValue) + (growthIncrease / SliderMaxValue) * calc.maxGrowthUnitsIncrease;
		const calIncomeETAUnitsHeld = totalShares * (incomeToKeep / SliderMaxValue) + (incomeIncrease / SliderMaxValue) * calc.maxIncomeUnitsIncrease;
    
    calc.growthETAUnitsHeld = calGrowthETAUnitsHeld;
    calc.incomeETAUnitsHeld = calIncomeETAUnitsHeld;
    calc.growthValueOfHolding = calc.growthETAUnitsHeld * growthLastPrice;
    calc.incomeValueOfHolding = calc.incomeETAUnitsHeld * incomeLastPrice;
    calc.totalPriceExposure = calc.growthETAUnitsHeld / totalShares;
    calc.totalYieldExposure = calc.netDividendYield * (calc.incomeETAUnitsHeld / totalShares);
    calc.cashReturned = calc.valueOfSharesHeld - (calc.growthValueOfHolding + calc.incomeValueOfHolding);
    calc.growthSqrLength = Math.sqrt((calc.growthValueOfHolding / calc.valueOfSharesHeld) * scaledValue);
    calc.incomeSqrLength = Math.sqrt((calc.incomeValueOfHolding / calc.valueOfSharesHeld) * scaledValue);
    calc.cashSqrLength = Math.sqrt((calc.cashReturned / calc.valueOfSharesHeld) * scaledValue);

    if (etaPairing === ETAPairingColors.GrowthGuard) {
      calc.growthGuard = (incomeEstablishmentPrice / impliedUnderlyingPrice) * 100;
    }
    else if (etaPairing === ETAPairingColors.DivGuard) {
      calc.divGuard = (growthEstablishmentPrice / impliedUnderlyingPrice) * 100;
    }
  
    if (sliders.growth >= sliderMidScale) {
      const incomeCalcPrice = incomeLastPrice * (1 - (sliders.growth - sliderMidScale) / sliderMidScale);
      const temp = _.max<number>([0.01, incomeCalcPrice]);
      const maxValue = !_.isUndefined(temp) ? temp : 0.01;
      calc.adjustedGrowthPrice = impliedUnderlyingPrice - maxValue;
    } else {
      const growthCalcPrice = growthLastPrice * (1 - (sliderMidScale - sliders.growth) / sliderMidScale);
      const temp = _.max<number>([0.01, growthCalcPrice]);
      calc.adjustedGrowthPrice = !_.isUndefined(temp) ? temp : 0.01;
    }

    if (!sliders.income) {
      calc.adjustedIncomePrice = impliedUnderlyingPrice - calc.adjustedGrowthPrice;
    } else {
      if (sliders.income >= sliderMidScale) {
        const growthCalcPrice = growthLastPrice * (1 - (sliders.income - sliderMidScale) / sliderMidScale);
        const temp = _.max<number>([0.01, growthCalcPrice]);
        const maxValue = !_.isUndefined(temp) ? temp : 0.01;
        calc.adjustedIncomePrice = impliedUnderlyingPrice - maxValue;
      } else {
        const incomeCalcPrice = incomeLastPrice * (1 - (sliderMidScale - sliders.income) / sliderMidScale);
        const temp = _.max<number>([0.01, incomeCalcPrice]);
        calc.adjustedIncomePrice = !_.isUndefined(temp) ? temp : 0.01;
      }
    }

    // const multiplier = lastPrice / calc.adjustedGrowthPrice;
    // calc.growthValue = multiplier.toFixed(2);
    calc.normalisedGrowthPrice = calc.adjustedGrowthPrice * (sliderMidScale / impliedUnderlyingPrice); 
    calc.growthPercentageofShare =  (100 * calc.adjustedGrowthPrice) / impliedUnderlyingPrice;
    calc.incomePercentageofShare = (100 * calc.adjustedIncomePrice) / impliedUnderlyingPrice;
  }
  return calc;
}

function useEquityOptimiser(): {
  calc: EquityReleaseCalculator;
  etaDetails: any;
  security: Nullable<ISecurity>;
  sliders: EquityOptimiserSliders;
  totalShares: number;
  setTotalShares: Dispatch<SetStateAction<number>>;
  setETADetails: Dispatch<SetStateAction<any>>;
  setSecurity: Dispatch<SetStateAction<Nullable<ISecurity>>>;
  updateSliders: (name: keyof EquityOptimiserSliders, value: number) => void;
} {
  const [etaDetails, setETADetails] = useState<any>(null);
  const [security, setSecurity] = useState<Nullable<ISecurity>>(null);
  const [sliderControl, setSliderControl] = useState<keyof EquityOptimiserSliders>('growth');
  const [sliders, setSliders] = useState<EquityOptimiserSliders>({
    income: SliderMaxValue,
    growth: SliderMaxValue,
  });
  const [totalShares, setTotalShares] = useState<number>(DefaultShares);
  const calc: EquityReleaseCalculator = useMemo(
    () => equityReleaseCalculator(security, etaDetails, sliders, totalShares),
    [etaDetails, security, totalShares, sliders]
  );

  const updateSliders = (name: keyof EquityOptimiserSliders, value: number) => {
    setSliderControl(name);
    setSliders({ ...sliders, [name]: value });
  };

  useEffect(() => {
    if (calc.cashReturned < 0) {
      if (sliderControl === 'growth') {
        const activeGrowth = sliders.growth - 100;
        if (activeGrowth > 0) {
          const income = 100 - activeGrowth - SliderDecreasingRate;
          setSliders({ ...sliders, income: income < 0 ? 0 : income });
        } else {
          const income = sliders.income - SliderDecreasingRate;
          setSliders({ ...sliders, income: income < 0 ? 0 : income });
        }
      }
      else {
        const activeIncome = sliders.income - 100;
        if (activeIncome > 0) {
          const growth = 100 - activeIncome - SliderDecreasingRate;
          setSliders({ ...sliders, growth: growth < 0 ? 0 : growth });
        } else {
          const growth = sliders.growth - SliderDecreasingRate;
          setSliders({ ...sliders, growth: growth < 0 ? 0 : growth });
        }
      }
    }
  }, [calc.cashReturned, sliderControl, sliders])

  useEffect(() => {
    if (security && etaDetails) {
      // Reset slider on ETA
      setSliders({
        income: SliderMaxValue,
        growth: SliderMaxValue,
      });
    }
  }, [security, etaDetails]);

  return {
    calc,
    etaDetails,
    security,
    sliders,
    totalShares,
    setTotalShares,
    setETADetails,
    setSecurity,
    updateSliders,
  };
}

export default useEquityOptimiser;
