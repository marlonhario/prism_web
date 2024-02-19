import React, { useEffect, useState }  from 'react';
import './Styles.scss';
import CurrentPortfolio from 'components/equityCalculator/currentPortfolio/Index';
import 'antd/dist/antd.css';
import SelectStrategy from 'components/equityCalculator/selectStrategy/Index';
import ReinvestmentStrategy from 'components/equityCalculator/reinvestmentStrategy/Index';
import AlternativePosition from 'components/equityCalculator/alternativePosition/Index';
import AddToPortfolio from 'components/equityCalculator/addToPortfolio/Index';
import { RightOutlined } from '@ant-design/icons';
import { addToPortfolio, APIPath } from 'components/equityCalculator/constants';
import { isEmpty, size, upperCase } from 'lodash';
import axios from 'axios';

const EquityCalculator = () => {
  const [valueHeld, setValueHeld] = useState(0);
  const [numberHeld, setNumberHeld] = useState(0);
  const [securityHeld, setSecurityHeld] = useState('');
  const [strategyType, setStrategyType] = useState('');
  const [etaType, setEtaType] = useState('');
  const [growthTitle, setGrowthTitle] = useState('');
  const [incomeTitle, setIncomeTitle] = useState('');
  const [growthLastPrice, setGrowthLastPrice] = useState(0);
  const [incomeLastPrice, setIncomeLastPrice] = useState(0);
  const [capitalInvested, setCapitalInvested] = useState(0);
  const [annualDividend, setAnnualDividend] = useState(0);
  const [totalPriceExposure, setTotalPriceExposure] = useState(0);
  const [totalYieldExposure, setTotalYieldExposure] = useState(0);
  const [growthUnitHeld, setGrowthUnitHeld] = useState(0);
  const [incomeUnitHeld, setIncomeUnitHeld] = useState(0);
  const [increaseGrowth, setIncreaseGrowth] = useState(0);
  const [increaseYield, setIncreaseYield] = useState(0);
  const [maxGrowthUnitsIncrease, setMaxGrowthUnitsIncrease] = useState(0);
  const [maxIncomeUnitsIncrease, setMaxIncomeUnitsIncrease] = useState(0);

  const onHandleEtaType = (etaObj) => {
    if (etaObj !== '') {
      /* Set Eta Type */
      setEtaType(etaObj.etaType);

      /* Set Growth Title */
      setGrowthTitle(etaObj.growthLegName);

      /* Set Income Title */
      setIncomeTitle(etaObj.incomeLegName);
    }
  }


  useEffect(() => {

    /**
     * TODO: Call ETA market price API with params (securityHeld, etaType) to get last growth and income price
     */
    if (!isEmpty(etaType) && !isEmpty(securityHeld)) {
      axios.get(`${APIPath.etaDetails}/${securityHeld.ticker}/${upperCase(etaType)}`).then((response) => {
        if (response?.status === 200) {
          /* setting growth last price */
          setGrowthLastPrice(response.data.growthLastPrice);

          /* setting income last price */
          setIncomeLastPrice(response.data.incomeLastPrice);
        }
      });
    }
  }, [etaType, securityHeld]);

  const onHandleAddPortfolio = () => {
    const values = {
      securityHeld,
      numberHeld,
      etaType,
      growthUnitHeld,
      incomeUnitHeld
    }
    
  };

  return (
    <div className='container mx-auto equityCalculator'>
      <div className='flex flex-col text-center'>
        <h2 className='text-3xl font-light'>ETA Equity Calculator</h2>
        <span className='text-xl font-light'>Accelerate your portfolio</span>
      </div>

      <div className='flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-12 py-6 relative'>
        <div className='w-full md:w-1/2'>
          <CurrentPortfolio
            valueHeldCallback={(val) => setValueHeld(val)}
            numberHeldCallback={(val) => setNumberHeld(val)}
            securityHeldCallback={(val) => setSecurityHeld(val)}
          />
          {/* <img className='arrow' src={arrow} alt='' /> */}
          <RightOutlined className='arrow' />
        </div>
        <div className='w-full md:w-1/2'>
          <SelectStrategy
            selectedStrategyTypeCallback={(strategyType) => setStrategyType(strategyType)}
            selectedEtaTypeCallback={(etaType) => onHandleEtaType(etaType)}
          />
          {/* <img className='md:hidden secondary-arrow' src={arrow} alt='' /> */}
          <RightOutlined className='md:hidden secondary-arrow' />
        </div>

      </div>
      <div className='flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-12 py-6 relative'>
        <div className='w-full md:w-1/2'>
          <ReinvestmentStrategy
            valueHeld={valueHeld}
            numberHeld={numberHeld}
            securityHeld={securityHeld}
            strategyType={strategyType}
            growthTitle={growthTitle}
            incomeTitle={incomeTitle}
            capitalInvestedCallback={(val) => setCapitalInvested(val)}
            annualDividendCallback={(val) => setAnnualDividend(val)}
            totalPriceExposureCallback={(val) => setTotalPriceExposure(val)}
            totalYieldExposureCallback={(val) => setTotalYieldExposure(val)}
            setIncreaseGrowthCallback={(val) => setIncreaseGrowth(val)}
            setIncreaseYieldCallback={(val) => setIncreaseYield(val)}
            growthLastPrice={growthLastPrice}
            incomeLastPrice={incomeLastPrice}
            maxGrowthUnitsIncreaseCallback={(val) => setMaxGrowthUnitsIncrease(val)}
            maxIncomeUnitsIncreaseCallback={(val) => setMaxIncomeUnitsIncrease(val)}
          />
          {/* <img className='arrow' src={arrow} alt='' /> */}
          <RightOutlined className='arrow' />
        </div>
        <div className='w-full md:w-1/2'>
          <AlternativePosition
            growthTitle={growthTitle}
            incomeTitle={incomeTitle}
            capitalInvested={capitalInvested}
            annualDividend={annualDividend}
            growthLastPrice={growthLastPrice}
            incomeLastPrice={incomeLastPrice}
            valueHeld={valueHeld}
            totalPriceExposure={totalPriceExposure}
            totalYieldExposure={totalYieldExposure}
            setGrowthUnitHeldCallback={(val) => setGrowthUnitHeld(val)}
            setIncomeUnitHeldCallback={(val) => setIncomeUnitHeld(val)}
            strategyType={strategyType}
            numberHeld={numberHeld}
            increaseGrowth={increaseGrowth}
            increaseYield={increaseYield}
            maxGrowthUnitsIncrease={maxGrowthUnitsIncrease}
            maxIncomeUnitsIncrease={maxIncomeUnitsIncrease}
          />
        </div>

      </div>
      <div className='flex flex-row-reverse space-y-12 md:space-y-0 md:space-x-12 py-6'>
        {(size(addToPortfolio) > 0 && addToPortfolio.display) &&
          <div className='w-2/12'>
            <AddToPortfolio
              title={addToPortfolio.title}
              addCallback={() => onHandleAddPortfolio()}
            />
          </div>
        }
      </div>
    </div>
  );
}

export default EquityCalculator;
