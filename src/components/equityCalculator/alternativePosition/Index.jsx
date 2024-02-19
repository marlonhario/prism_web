/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Statistic } from 'antd';
import {ReactComponent as Equal} from 'assets/svg/equal.svg'
import { PlusOutlined } from '@ant-design/icons';
import './Styles.scss'
import { isEmpty, toInteger } from 'lodash';
import { ALL_GROWTH, ALL_YIELD } from '../selectStrategy/Constant';
import { setStrategyTitle } from '../utils';

const AlternativePosition = (props) => {
  const { growthTitle, incomeTitle, capitalInvested, annualDividend, growthLastPrice, valueHeld, incomeLastPrice, totalPriceExposure, totalYieldExposure, setGrowthUnitHeldCallback, setIncomeUnitHeldCallback, strategyType, increaseGrowth, increaseYield, maxGrowthUnitsIncrease, maxIncomeUnitsIncrease } = props;
  const numberHeld = parseFloat(props.numberHeld);
  const [growthUnitHeld, setGrowthUnitHeld] = useState('');
  const [incomeUnitHeld, setIncomeUnitHeld] = useState('');
  const [incomeValueHolding, setIncomeValueHolding] = useState('');
  const [growthValueHolding, setGrowthValueHolding] = useState('');
  const [cashReturned, setCashRetured] = useState('');

  /**
   * Function to set income unit held and growth unit held whenever capitalInvested or annualDividend values are updated
   */
  useEffect(() => {
    let growthUnitHeldcal = 0;
    /* Calculation for growth unit held */
    if (strategyType === ALL_GROWTH) {
      growthUnitHeldcal = numberHeld + (((increaseGrowth || 0) / 100) * maxGrowthUnitsIncrease);
    } else {
      growthUnitHeldcal = increaseGrowth / 100 * maxGrowthUnitsIncrease;
    }
    setGrowthUnitHeld(toInteger(growthUnitHeldcal));
    setGrowthUnitHeldCallback(toInteger(growthUnitHeldcal));

    let incomeUnitHeldCal = 0;
    /* Calculation for income unit held */
    if (strategyType === ALL_YIELD) {
      incomeUnitHeldCal = numberHeld + (((increaseYield || 0) / 100) * maxIncomeUnitsIncrease);
    } else {
      incomeUnitHeldCal = increaseYield / 100 * maxIncomeUnitsIncrease;
    }

    setIncomeUnitHeld(toInteger(incomeUnitHeldCal));
    setIncomeUnitHeldCallback(toInteger(incomeUnitHeldCal));
  }, [capitalInvested, annualDividend]);

  /**
   * Function to set income value holding and growth value holding
   */
  useEffect(() => {
    let incomeValueHoldingCal = 0;
    /* Calculation for income value holding */
    if (strategyType !== '') {
      incomeValueHoldingCal = incomeUnitHeld * incomeLastPrice;
    }
    setIncomeValueHolding(incomeValueHoldingCal);
    setGrowthValueHolding(growthUnitHeld * growthLastPrice);
  }, [incomeUnitHeld, growthUnitHeld]);

  /**
   * Used to set cash returnred value
   */
  useEffect(() => {
    /* Calculation for cash returned */
    const cashReturnedCal = Math.abs(valueHeld - growthValueHolding - incomeValueHolding);

    setCashRetured(cashReturnedCal.toFixed(2));
  }, [growthValueHolding, incomeValueHolding])

  return (
    <div className='py-4 px-6 border border-solid border-gray-300 bg-white boxStyle alternativePosition'>
      <div className='flex font-medium text-lg py-1 border-b border-gray-300'>Alternative Position</div>
      
      <div className='flex flex-row space-x-8 pt-8'>
        <div className="w-4/12">
          {(!isEmpty(growthTitle) && setStrategyTitle(growthTitle))}
        </div>
        <div className="w-4/12">
          {(!isEmpty(incomeTitle) && setStrategyTitle(incomeTitle))}
        </div>
        <div className="w-4/12">
          <label>Net Position</label>
        </div>
      </div>

      <div className='flex flex-row space-x-8 pt-2 pb-2'>
        <div className="w-4/12">
          <label>ETA Units Held</label>
          <Statistic value={growthUnitHeld} />
        </div>
        <div className="w-4/12">
          <label>ETA Units Held</label>
          <Statistic value={parseFloat(incomeUnitHeld)} />
        </div>
        <div className="w-4/12">
          <label>Total Price Exposure</label>
          <Statistic suffix='x' value={totalPriceExposure} precision={1} />
        </div>
      </div>

      <div className='flex flex-row space-x-8 pt-2 pb-2'>
        <div className="w-4/12">
          <label>Value of Holding</label>
          <Statistic prefix='$' value={growthValueHolding} precision={2} />
        </div>
        <div className="w-4/12">
          <label>Value of Holding</label>
          <Statistic prefix='$' value={incomeValueHolding} precision={2} />
        </div>
        <div className="w-4/12">
          <label>Total Yield Exposure</label>
          <Statistic suffix='%' value={totalYieldExposure.toFixed(2)} />
        </div>
      </div>

      <div className='flex flex-row-reverse ml-14 pt-2 pb-2'>
        <div className='w-4/12'>
          <label>Cash Returned</label>
          <Statistic prefix='$' value={cashReturned} precision={2} />
        </div>
      </div>
      {/* <img src={equal} className='equal' alt='' /> */}
      <Equal className='equal' fill="#c4c4c4" width={50} />
      <PlusOutlined className='plus' />
      {/* <img src={plus} className='plus' alt='' /> */}
    </div>
  );
};

export default AlternativePosition;

