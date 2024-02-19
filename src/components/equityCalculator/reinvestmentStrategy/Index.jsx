/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Input, Slider, Statistic } from 'antd';
import './Styles.scss';
import { ALL_GROWTH, ALL_YIELD } from '../selectStrategy/Constant';
import { useState, useEffect } from 'react';
import { isEmpty, isNaN, sum } from 'lodash';
import { setStrategyTitle } from '../utils';

const ReinvestmentStrategy = (props) => {
  const { valueHeld, numberHeld, securityHeld, strategyType, growthTitle, incomeTitle, capitalInvestedCallback, annualDividendCallback, totalPriceExposureCallback, totalYieldExposureCallback, setIncreaseGrowthCallback, setIncreaseYieldCallback, growthLastPrice, incomeLastPrice, maxGrowthUnitsIncreaseCallback, maxIncomeUnitsIncreaseCallback } = props;
  const [totalPriceExposure, setTotalPriceExposure] = useState(0);
  const [totalYieldExposure, setTotalYieldExposure] = useState(0);
  const [increaseGrowth, setIncreaseGrowth] = useState(0);
  const [increaseYield, setIncreaseYield] = useState(0);
  const [capitalInvested, setCapitalInvested] = useState(0);
  const [annualDividend, setAnnualDividend] = useState(0);
  const [maxGrowthUnitsIncrease, setMaxGrowthUnitsIncrease] = useState(0);
  const [maxIncomeUnitsIncrease, setMaxIncomeUnitsIncrease] = useState(0);

  /**
   * Set starting captital invested value
   */
  const startingCapitalInvested = () => {
    let result = 0;
    if (strategyType === ALL_GROWTH) {
      result = growthLastPrice * numberHeld;
    } else {
      result = incomeLastPrice * numberHeld;
    }
    return result;
  };


  useEffect(() => {
    const maxGrowthUnitsIncreaseCalc = (valueHeld - startingCapitalInvested()) / growthLastPrice;
    const maxIncomeUnitsIncreaseCalc = (valueHeld - startingCapitalInvested()) / incomeLastPrice;
    setMaxGrowthUnitsIncrease(!isNaN(maxGrowthUnitsIncreaseCalc) ? maxGrowthUnitsIncreaseCalc : 0);
    setMaxIncomeUnitsIncrease(!isNaN(maxIncomeUnitsIncreaseCalc) ? maxIncomeUnitsIncreaseCalc : 0);
  }, [valueHeld, growthLastPrice, incomeLastPrice, strategyType]);

  /**
   * Function is to set total yield exposure, total price exposure, capital invested and annual dividend if value set for increase growth, increase yield, number Held, security Held, value Held, strategy Type
   */
  useEffect(() => {
    const numberHeldFloat = parseFloat(numberHeld);

    setTotalPriceExposure(0);
    setTotalYieldExposure(0);

    /* setting Total price exposure */
    let totalPriceExposureCal = 0;
    if (strategyType === ALL_GROWTH) {
      totalPriceExposureCal = (numberHeldFloat + (maxGrowthUnitsIncrease * increaseGrowth / 100)) / numberHeldFloat;
    } else {
      totalPriceExposureCal = (maxGrowthUnitsIncrease * increaseGrowth / 100) / numberHeldFloat;
    }
    setTotalPriceExposure((!isNaN(totalPriceExposureCal) ? totalPriceExposureCal : 0));

    /* Setting Total yield exposure */
    let totalYieldExposureCal = 0;
    if (strategyType === ALL_YIELD) {
      totalYieldExposureCal = 100 * securityHeld.forwardDivYield * (numberHeldFloat + (maxIncomeUnitsIncrease * increaseYield / 100)) / numberHeldFloat;
    } else {
      totalYieldExposureCal = 100 * securityHeld.forwardDivYield * (maxIncomeUnitsIncrease * increaseYield / 100) / numberHeldFloat;
    }
    setTotalYieldExposure((!isNaN(totalYieldExposureCal) ? totalYieldExposureCal : 0));

  }, [increaseGrowth, increaseYield, numberHeld, securityHeld, valueHeld, strategyType, maxGrowthUnitsIncrease, maxIncomeUnitsIncrease, incomeLastPrice, growthLastPrice]);

  /**
   * To set total price exposure callback and total yield exposure callback if the total price exposure and total yield exposure sets
   */
  useEffect(() => {

    if (strategyType !== '') {
      const cpInvestedCal = startingCapitalInvested() + (maxGrowthUnitsIncrease * (increaseGrowth / 100) * growthLastPrice) + (maxIncomeUnitsIncrease * (increaseYield / 100) * incomeLastPrice);
      const annualDividendCal = (totalYieldExposure * (valueHeld / 100)).toFixed(2);
      setCapitalInvested(cpInvestedCal);
      capitalInvestedCallback(cpInvestedCal);
      setAnnualDividend(annualDividendCal);
      annualDividendCallback(annualDividendCal);

      totalPriceExposureCallback(totalPriceExposure);
      totalYieldExposureCallback(totalYieldExposure);

      maxGrowthUnitsIncreaseCallback(maxGrowthUnitsIncrease);
      maxIncomeUnitsIncreaseCallback(maxIncomeUnitsIncrease);
    }
  }, [totalPriceExposure, totalYieldExposure, numberHeld, valueHeld]);

  /**
   * Function to set increase growth value and its callback (to get this value in parent component)
   */
  const onHandleGrowthSlider = (value) => {
    setIncreaseGrowth(value);
    setIncreaseGrowthCallback(value);
  }

  /**
   * Function to set increase yield value and its callback (to get this value in parent component)
   */
  const onHandleYieldSlider = (value) => {
    setIncreaseYield(value);
    setIncreaseYieldCallback(value);
  }

  const checkSliderValues = () => {
    return sum([increaseGrowth, increaseYield]);
  }

  return (
    <div className='py-4 px-6 border border-solid border-gray-300 bg-white boxStyle reinvestmentStrategy'>
      <div className='flex font-medium text-lg py-1 border-b border-gray-300'>Reinvestment Strategy</div>

      <div className='flex flex-row space-x-8 pt-8 pb-4'>
        <div className="w-4/12">
          <label>Total Price Exposure</label>
          <Input
            size='large'
            className='boxShadow textAlignRight'
            value={totalPriceExposure.toFixed(1)}
            placeholder='Total Price Exposure'
            suffix='x'
          />
        </div>
        <div className="w-4/12">
          {(!isEmpty(growthTitle) && setStrategyTitle(growthTitle))}
          <Slider
            min={0}
            max={100}
            className='mySlider'
            onChange={(val) => onHandleGrowthSlider(val)}
            value={typeof increaseGrowth === 'number' && checkSliderValues() <= 100 ? increaseGrowth : onHandleYieldSlider(0)}
          />
          <div className='w-full font-thin text-sm text-center'>Increase Growth</div>
        </div>
        <div className="w-4/12">
          <label>Capital Invested</label>
          <Statistic prefix='$' value={capitalInvested} precision={2} />
        </div>
      </div>

      <div className='flex flex-row space-x-8 pt-4 pb-8'>
        <div className="w-4/12">

          <label>Total Yield Exposure</label>
          <Input
            size='large'
            className='boxShadow textAlignRight'
            value={totalYieldExposure.toFixed(2)}
            placeholder='Total Yield Exposure'
            suffix='%'
          />
        </div>
        <div className="w-4/12">
          {(!isEmpty(incomeTitle) && setStrategyTitle(incomeTitle))}
          <Slider
            min={0}
            max={100}
            className='mySlider'
            onChange={(val) => onHandleYieldSlider(val)}
            value={typeof increaseYield === 'number' && checkSliderValues() <= 100 ? increaseYield : onHandleGrowthSlider(0)}
          />
          <div className='w-full font-thin text-sm text-center'>Increase Yield</div>
        </div>
        <div className="w-4/12">
          <label>Annual Dividend</label>
          <Statistic prefix='$' value={annualDividend} precision={2} />
        </div>
      </div>
    </div>
  );
};

export default ReinvestmentStrategy;
