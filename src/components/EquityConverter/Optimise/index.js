/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import cn from 'classnames';
import { isEmpty, min, max, round, capitalize } from 'lodash';
import { primsAnnualFee, etaTitleMapping, totalLineLength } from '../utils';
import { Button, Slider } from 'antd';
import CurrencyFormat from 'react-currency-format';
import Typography from '../Typography';
import './styles.scss';

const OptimiseETA = ({
  etaLogo,
  activeSecurityContent,
  totalShare,
  etaContent,
  eta,
  updateAllocationContent,
  growthETA,
  incomeETA,
  updateETA,
  updateOrderFormContent,
  className
}) => {

  const sectionTitle = 'Optimise';
  const sectionDescription = '.';
  const stepInfo = 'Optimise to suit your objectives';
  const [growthSlider, setGrowthSlider] = useState(100);
  const [incomeSlider, setIncomeSlider] = useState(100);
  const [totalPriceExposure, setTotalPriceExposure] = useState('');
  const [totalYieldExposure, setTotalYieldExposure] = useState('');
  const [priceExposureDollars, setPriceExposureDollars] = useState('');
  const [annualDividend, setAnnualDividend] = useState('');
  const [growthValueofHolding, setGrowthValueofHolding] = useState('');
  const [incomeValueofHolding, setIncomeValueofHolding] = useState('');
  const sliderDecreasingRange = 10;


  useEffect(() => {
    if (!isEmpty(activeSecurityContent) && !isEmpty(totalShare.toString()) && !isEmpty(etaContent)) {
      const points = calculateETAPoints(activeSecurityContent, totalShare, etaContent, growthSlider, incomeSlider);
      setTotalPriceExposure(points.totalPriceExposure);
      setTotalYieldExposure(points.totalYieldExposure);
      setPriceExposureDollars(points.priceExposureDollars);
      setAnnualDividend(points.annualDividend);
      setGrowthValueofHolding(points.growthValueofHolding);
      setIncomeValueofHolding(points.incomeValueofHolding);
    }
  }, [etaContent, totalShare]);


  const calculateETAPoints = (activeSecurityContent, totalShare, etaContent, growthSlider, incomeSlider, updateAllocationUnits, type) => {
    totalShare = parseFloat(totalShare);
    const lastPrice = activeSecurityContent.lastPrice;
    const forwardYield = parseFloat((activeSecurityContent.forwardDivYield * 100).toFixed(2));
    const shareHoldingValues = totalShare * lastPrice;
    const growthLastPrice = etaContent.growthLastPrice;
    const incomeLastPrice = etaContent.incomeLastPrice;
    const maxGrowthIncrease = parseInt(((shareHoldingValues / growthLastPrice) - totalShare).toFixed(1));
    const maxIncomeIncrease = parseInt(((shareHoldingValues / incomeLastPrice) - totalShare).toFixed(1));
    const netDividend = forwardYield - primsAnnualFee;




    const growthTokeep = min([100, growthSlider]);
    const incomeTokeep = min([100, incomeSlider]);
    const increasedGrowth = max([0, growthSlider - 100]);
    const increasedIncome = max([0, incomeSlider - 100]);
    const growthUnits = round((totalShare * (growthTokeep / 100)) + (maxGrowthIncrease * (increasedGrowth / 100)));
    const incomeUnits = round((totalShare * (incomeTokeep / 100)) + (maxIncomeIncrease * (increasedIncome / 100)));

    const totalPriceExposure = (growthUnits / totalShare).toFixed(2);
    const totalYieldExposure = (netDividend * (incomeUnits / totalShare)).toFixed(2);
    const priceExposureDollars = (growthUnits * lastPrice).toFixed(2);
    const annualDividend = (totalYieldExposure * shareHoldingValues / 100).toFixed(2);
    const growthValueofHolding = (growthUnits * growthLastPrice).toFixed(2);
    const incomeValueofHolding = (incomeUnits * incomeLastPrice).toFixed(2);
    const lineIncomeStart = growthValueofHolding / shareHoldingValues * totalLineLength;
    const totalCombinedHolding = parseFloat(growthValueofHolding) + parseFloat(incomeValueofHolding);
    const lineCashReturnStart = (totalCombinedHolding / shareHoldingValues) * totalLineLength;
    const totalCashReturned = (shareHoldingValues - parseFloat(growthValueofHolding) - parseFloat(incomeValueofHolding)).toFixed(2);

    if (type && type === "growth") {
      if (parseFloat(totalCashReturned) < 0) {
        const activeGrowth = growthSlider - 100;
        if (activeGrowth > 0) {
          let incomePosition = 100 - activeGrowth - sliderDecreasingRange;
          if (incomePosition < 0) {
            incomePosition = 0;
          }
          setIncomeSlider(incomePosition);
        } else {
          let incomePosition = incomeSlider - sliderDecreasingRange;
          if (incomePosition < 0) {
            incomePosition = 0;
          }
          setIncomeSlider(incomePosition);
        }
      }
    }

    if (type && type === "income") {
      if (parseFloat(totalCashReturned) < 0) {
        const activeIncomePosition = incomeSlider - 100;
        if (activeIncomePosition > 0) {
          let growthPosition = 100 - activeIncomePosition - sliderDecreasingRange;
          if (growthPosition < 0) {
            growthPosition = 0;
          }
          setGrowthSlider(growthPosition);
        } else {
          let growthPosition = growthSlider - sliderDecreasingRange;
          if (growthPosition < 0) {
            growthPosition = 0;
          }
          setGrowthSlider(growthPosition);
        }
      }
    }


    const allocationContent = { lineIncomeStart, lineCashReturnStart, totalCashReturned, growthValueofHolding, incomeValueofHolding };
    updateAllocationContent(allocationContent);
    if (updateAllocationUnits) {
      updateETA(parseInt(growthUnits), parseInt(incomeUnits));
    }
    const orderFormContents = {
      growthSideOrder: growthSlider === 100 ? "" : growthSlider > 100 ? "BUY" : "SELL",
      incomeSideOrder: incomeSlider === 100 ? "" : incomeSlider > 100 ? "BUY" : "SELL",
      growthSideVolume: Math.abs(growthUnits - totalShare),
      incomeSideVolume: Math.abs(incomeUnits - totalShare),
      growthLastPrice: growthLastPrice,
      incomeLastPrice: incomeLastPrice,
      growthSymbol: etaContent.growthSymbol,
      incomeSymbol: etaContent.incomeSymbol,
      underlyingSymbol: etaContent.underlyingSymbol
    };
    updateOrderFormContent(orderFormContents);
    return { totalPriceExposure, totalYieldExposure, priceExposureDollars, annualDividend, growthValueofHolding, incomeValueofHolding };
  }

  const updateSliderState = (growthSliderValue, incomeSliderValue) => {
    setGrowthSlider(growthSliderValue);
    setIncomeSlider(incomeSliderValue);
    handleSliderChange(growthSliderValue, incomeSliderValue);
  }

  const handleSliderChange = (growthSlideValue, incomeSliderValue, sliderType) => {
    if (sliderType === 'growth') {
      setGrowthSlider(growthSlideValue);
    }
    if (sliderType === "income") {
      setIncomeSlider(incomeSliderValue)
    }

    const points = calculateETAPoints(activeSecurityContent, totalShare, etaContent, growthSlideValue, incomeSliderValue, true, sliderType);
    setTotalPriceExposure(points.totalPriceExposure);
    setTotalYieldExposure(points.totalYieldExposure);
    setPriceExposureDollars(points.priceExposureDollars);
    setAnnualDividend(points.annualDividend);
    setGrowthValueofHolding(points.growthValueofHolding);
    setIncomeValueofHolding(points.incomeValueofHolding)
  }

  return (
    <>
      <div className={cn('optimise', className)}>
        <div className='section-header'>
          <div className="section-label">
            <Typography
              fontFamily={'Open Sans'}
              fontSize={22}
              fontWeight={300}
              style={{
                lineHeight: '6px',
                letterSpacing: '0.05em'
              }}
            >
              {sectionTitle}
            </Typography>
          </div>
          <p className="section-description pt-2">
            <Typography
              fontFamily={'Graphik'}
              fontSize={12}
              className="text-5xl font-bold flex intro-label"
              style={{
                lineHeight: '15px',
                letterSpacing: '0.05em'
              }}
            >
              {sectionDescription}
            </Typography>
          </p>
          <div className='step-info flex mt-4'>
            <span className='step-label flex items-center shrink-0'>
              <Typography
                fontFamily={'Open Sans'}
                fontSize={13}
                fontWeight={700}
                style={{
                  lineHeight: '17px',
                  letterSpacing: '0.05em'
                }}
              >
                STEP 3
              </Typography>
            </span>
            <span className='step-description flex items-center pl-4'>
              <Typography
                fontFamily={'Graphik'}
                fontSize={14}
                style={{
                  lineHeight: '19px',
                  letterSpacing: '0.05em'
                }}
              >
                {stepInfo}
              </Typography>
            </span>
          </div>
        </div>
        <div className='section-body'>
          <div className='section-logo flex justify-center py-4 hidden'>
            <img src={etaLogo} alt='title' />
          </div>
          <div className='section-details mt-8'>
            <div className='action-label'>
              <Typography
                fontFamily={'Open Sans'}
                fontSize={10}
                fontWeight={600}
                style={{
                  lineHeight: '14px',
                  letterSpacing: '0.05em'
                }}
              >
                Strategy Presets
              </Typography>
            </div>
            <div className='action-list'>
              <Button type="primary" onClick={() => updateSliderState(100, 100)}>
                <Typography
                  fontFamily={'Open Sans'}
                  fontSize={9}
                  fontWeight={400}
                  style={{ lineHeight: '6px' }}
                >
                  Reset
                </Typography>
              </Button>
              <Button type="primary" onClick={() => updateSliderState(200, 0)}>
                <Typography
                  fontFamily={'Open Sans'}
                  fontSize={9}
                  fontWeight={400}
                  style={{ lineHeight: '6px' }}
                >
                  All Growth
                </Typography>
              </Button>
              <Button type="primary" onClick={() => updateSliderState(0, 100)}>
                <Typography
                  fontFamily={'Open Sans'}
                  fontSize={9}
                  fontWeight={400}
                  style={{ lineHeight: '6px' }}
                >
                  Release Grow
                </Typography>th
              </Button>
              <Button type="primary" onClick={() => updateSliderState(0, 200)}>
                <Typography
                  fontFamily={'Open Sans'}
                  fontSize={9}
                  fontWeight={400}
                  style={{ lineHeight: '6px' }}
                >
                  All Dividend
                </Typography>
              </Button>
              <Button type="primary" onClick={() => updateSliderState(100, 0)}>
                <Typography
                  fontFamily={'Open Sans'}
                  fontSize={9}
                  fontWeight={400}
                  style={{ lineHeight: '6px' }}
                >
                  Release Dividend
                </Typography>
              </Button>
            </div>
            <div className='section-info flex mt-4 p-4 mx-4 gap-x-3'>
              <div className='exposure w-1/2 flex justify-center items-center'>
                <span className='exposure-label'>
                  <Typography
                    fontFamily={'Open Sans'}
                    fontSize={14}
                    fontWeight={600}
                    style={{ letterSpacing: '0.05em' }}
                  >
                    Total Price Exposure
                  </Typography>
                </span>
                <span className='exposure-value ml-4 py-1 px-4'>
                  <Typography
                    fontFamily={'Graphik'}
                    fontSize={12}
                    fontWeight={900}
                    style={{ letterSpacing: '0.05em' }}
                  >
                    {totalPriceExposure}x
                  </Typography>
                </span>
              </div>
              <div className='yield w-1/2 flex justify-center items-center'>
                <span className='yield-label'>
                  <Typography
                    fontFamily={'Open Sans'}
                    fontSize={14}
                    fontWeight={600}
                    style={{ letterSpacing: '0.05em' }}
                  >
                    Total Yield Exposure
                  </Typography>
                </span>
                <span className='yield-value ml-4 py-1 px-4'>
                  <Typography
                    fontFamily={'Graphik'}
                    fontSize={12}
                    fontWeight={900}
                    style={{ letterSpacing: '0.05em' }}
                  >
                    {totalYieldExposure}%
                  </Typography>
                </span>
              </div>
            </div>
            <div className='price-info flex p-4 mx-2'>
              <div className='w-1/2'>
                <div className='price-exposure-label label'>
                  <Typography
                    fontFamily={'Open Sans'}
                    fontSize={8}
                    fontWeight={400}
                    style={{ lineHeight: '14px' }}
                  >
                    Price exposure in $
                  </Typography>
                </div>
                <div className='price-exposure-amount amount'>
                  <Typography
                    fontFamily={'Open Sans'}
                    fontSize={15}
                    fontWeight={600}
                    style={{ lineHeight: '16px' }}
                  >
                    <CurrencyFormat value={priceExposureDollars} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                  </Typography>
                </div>
              </div>
              <div className='w-1/2'>
                <div className='forecast-divident-label label ml-4'>
                  <Typography
                    fontFamily={'Open Sans'}
                    fontSize={8}
                    fontWeight={400}
                    style={{ lineHeight: '14px' }}
                  >
                    Forcasted annual dividend distributions
                  </Typography>
                </div>
                <div className='forecast-divident-amount amount ml-4'>
                  <Typography
                    fontFamily={'Open Sans'}
                    fontSize={15}
                    fontWeight={600}
                    style={{ lineHeight: '16px' }}
                  >
                    <CurrencyFormat value={annualDividend} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                  </Typography>
                </div>
              </div>
            </div>
            {!isEmpty(eta) && (
              <div className='invested-info flex p-4 mx-2'>
                <div className='w-1/2 flex justify-between mr-4 p-3 items-center' style={{ background: etaTitleMapping[capitalize(eta)].growthColor }}>
                  <div className='label'>
                    <Typography
                      fontFamily={'Open Sans'}
                      fontSize={11}
                      fontWeight={600}
                      style={{
                        lineHeight: '14px',
                        letterSpacing: '0.05em'
                      }}
                    >
                      Capital Invested
                    </Typography>
                  </div>

                  <div className='amount'>
                    <Typography
                      fontFamily={'Open Sans'}
                      fontSize={19}
                      fontWeight={600}
                      style={{
                        lineHeight: '16px',
                        letterSpacing: '0.05em'
                      }}
                    >
                      <CurrencyFormat value={growthValueofHolding} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                    </Typography>
                  </div>
                </div>
                <div className='w-1/2 flex justify-between ml-4 p-3 items-center' style={{ background: etaTitleMapping[capitalize(eta)].incomeColor }}>
                  <div className='label'>
                    <Typography
                      fontFamily={'Open Sans'}
                      fontSize={11}
                      fontWeight={600}
                      style={{
                        lineHeight: '14px',
                        letterSpacing: '0.05em'
                      }}
                    >
                      Capital Invested
                    </Typography>
                  </div>

                  <div className='amount'>
                    <Typography
                      fontFamily={'Open Sans'}
                      fontSize={19}
                      fontWeight={600}
                      style={{
                        lineHeight: '16px',
                        letterSpacing: '0.05em'
                      }}
                    >
                      <CurrencyFormat value={incomeValueofHolding} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                    </Typography>
                  </div>
                </div>
              </div>
            )}
            <div className='slider flex p-4 mx-2'>
              <div className='growth-slider w-1/2'>
                <Slider
                  min={0}
                  max={200}
                  className='mySlider'
                  value={growthSlider}
                  onChange={(val) => handleSliderChange(val, incomeSlider, "growth")}
                />
              </div>
              <div className='income-slider w-1/2 ml-4'>
                <Slider
                  min={0}
                  max={200}
                  className='mySlider'
                  value={incomeSlider}
                  onChange={(val) => handleSliderChange(growthSlider, val, "income")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptimiseETA;