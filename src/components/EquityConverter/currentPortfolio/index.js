import React from 'react';
import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import { Input, Button, Tabs, Statistic, Select } from 'antd';
import CurrencyFormat from 'react-currency-format';
import { isEmpty, isUndefined, round, sortBy } from 'lodash';
import { APIPath, currencyFormat, whiteSecurityImageSuffix } from '../utils';
import { sectionTitle, sectionDescription, stepInfo, parseSecurityData, securityAutoComplete, moreInformationContent } from './utils';
import axios from 'axios';
import './styles.scss';
import sectionLogo from 'assets/images/white-division.png';
import CustomImage from 'components/common/CustomImage';
import arrowRight from 'assets/images/arrow-right.png';
import arrowRightSmall from 'assets/images/arrow-right-small.png';
import Typography from '../Typography';

const { TabPane } = Tabs;

const CurrentPortfolio = ({
  updateActiveSecurity,
  updateTotalShare,
  triggerShowAlternate,
  updateETA,
  className,
  activeContent
}) => {
  const selectRef = useRef(null);
  const [securityHeld, setSecurityHeld] = useState('');
  const [activeSecurityContent, setActiveSecurityContent] = useState();
  const [lastPrice, setLastPrice] = useState(0.00);
  const [yieldValue, setYieldValue] = useState(0.00);
  const [growthETA, setGrowthETA] = useState(0);
  const [dividentETA, setDividentETA] = useState(0);
  const [securityList, setSecurityList] = useState([]);
  const [forcastDivident, setForcastDivident] = useState(0);
  const [totalHolding, setTotalHolding] = useState(0);
  const [shareQuantity, setShareQuantity] = useState('');
  const [hideNextStep, setHideNextStep] = useState(true);
  const [shareDisplayText, setShareDisplayText] = useState('');
  const [securityValue, setSecurityValue] = useState(undefined);
  const defaultShareQuantity = 1000;

  /* Security list API */
  useEffect(() => {
    axios.get(APIPath.listOfSecurities).then((response) => {
      if (response?.status === 200) {
        setSecurityList(sortBy(response?.data, ['longName']));
      }
    });
  }, []);

  useEffect(() => {
    if (!isEmpty(activeContent)) {
      onHandleSecurityHeld(activeContent, defaultShareQuantity)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeContent]);


  const onHandleSecurityHeld = (option, initialShareQuantity) => {
    setSecurityHeld(option.ticker);
    setSecurityValue(`${option.longName} (${option.ticker})`)
    const activeSecurity = option;
    setActiveSecurityContent(activeSecurity);
    updateActiveSecurity(activeSecurity);
    if (!isEmpty(activeSecurity)) {
      const activeLastPrice = activeSecurity.lastPrice.toFixed(2);
      setLastPrice(activeLastPrice);
      const forwardYield = activeSecurity.forwardDivYield * 100;
      setYieldValue(forwardYield.toFixed(2));

      const shareQuantityValue = !isUndefined(initialShareQuantity) ? initialShareQuantity : shareQuantity;
      if (!isUndefined(shareQuantityValue) && !isEmpty(shareQuantityValue.toString())) {
        onHandleNumberHeld(shareQuantityValue, activeLastPrice, forwardYield.toFixed(2));
      }
    } else {
      setLastPrice(0.00);
      setYieldValue(0.00);
    }
  }

  const onHandleNumberHeld = (value, activeLastPrice, activeForwardYield) => {
    setShareDisplayText(currencyFormat(value));
    setShareQuantity(value);
    updateTotalShare(value);
    const growthETA = value;
    const incomeETA = value;
    setGrowthETA(growthETA);
    setDividentETA(incomeETA);
    const lastPriceValue = !isUndefined(activeLastPrice) ? activeLastPrice : lastPrice;
    const yieldContentValue = !isUndefined(activeForwardYield) ? activeForwardYield : yieldValue;
    const totalHoldingValue = value * lastPriceValue;
    const forCastDividentValue = ((totalHoldingValue * yieldContentValue) / 100);
    setTotalHolding(totalHoldingValue.toFixed(2));
    setForcastDivident(round(forCastDividentValue, 2));
    updateETA(growthETA, incomeETA);
  }

  const triggerNextStep = () => {
    triggerShowAlternate(true);
    setHideNextStep(true);
  }

  return (
    <div className={cn('current-portfolio', className)}>
      <div>
        <Typography
          fontFamily={'OpenSans'}
          fontSize={36}
          fontWeight={300}
          className="text-5xl font-bold flex intro-label"
          style={{ lineHeight: '59px' }}
        >
          Equity Optimiser
        </Typography>
      </div>
      <div>
        <div className='section-header'>
          <div className="section-label">
            <Typography
              fontFamily={'Graphik'}
              fontSize={21}
              fontWeight={900}
              className="text-5xl font-bold flex intro-label"
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
                STEP 1
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
          <div className='section-body pt-4'>
            <div className='section-logo py-4 flex justify-center'>
              <img src={sectionLogo} alt='current portofolio' />
            </div>
            <div className='secuirty-autocomplete flex justify-center pt-4'>
              <Select ref={selectRef}
                showSearch
                options={parseSecurityData(securityList)}
                placeholder={securityAutoComplete}
                optionFilterProp="children"
                dropdownClassName={'autcomplete-dropdown'}
                dropdownMatchSelectWidth={true}
                filterOption={(inputValue, option) => {
                  return option.longName.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 || option.ticker.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                }
                showArrow={false}
                onSelect={(value, option) => {
                  selectRef.current.blur();
                  onHandleSecurityHeld(option)
                }}
                value={securityValue}
              />
            </div>
            <div className='security-info pt-2'>
              <span className='float-left'>
                <Typography
                  fontFamily={'Graphik'}
                  fontSize={10}
                  fontWeight={900}
                  style={{
                    lineHeight: '15px',
                    letterSpacing: '0.1em'
                  }}
                >
                  Last Price
                </Typography>

                <Typography
                  fontFamily={'Graphik'}
                  fontSize={10}
                  fontWeight={400}
                  style={{
                    lineHeight: '15px',
                    letterSpacing: '0.1em'
                  }}
                >
                  <CurrencyFormat className='pl-1' value={lastPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                </Typography>
              </span>

              <span className='float-right'>
                <Typography
                  fontFamily={'Graphik'}
                  fontSize={10}
                  fontWeight={900}
                  style={{
                    lineHeight: '15px',
                    letterSpacing: '0.1em'
                  }}
                >
                  Yield
                </Typography>

                <Typography
                  fontFamily={'Graphik'}
                  fontSize={10}
                  fontWeight={400}
                  className={'pl-1'}
                  style={{
                    lineHeight: '15px',
                    letterSpacing: '0.1em'
                  }}
                >
                  {yieldValue}%
                </Typography>
              </span>
            </div>

            {!isEmpty(securityHeld) && (
              <>
                <div className='security-logo py-12 flex justify-center'>
                  <CustomImage
                    src={`/logos/${activeSecurityContent.region}/${activeSecurityContent.ticker}${whiteSecurityImageSuffix}.svg`}
                    alt={activeSecurityContent.ticker}
                    defaultPath={`/logos/logoPending.svg`}
                    defaultWidth={125}
                  />
                </div>
                <div className='share-info p-4'>
                  <div className='share-info-header flex w-100'>
                    <div className='flex flex-col label'>
                      <Typography
                        fontFamily={'Graphik'}
                        fontSize={10}
                        fontWeight={900}
                        className={'mb-1 text-center'}
                        style={{
                          lineHeight: '14px',
                          letterSpacing: '0.05em'
                        }}
                      >
                        SHARES TO BE CONVERTED
                      </Typography>

                      <div className='share-content-section my-auto'>
                        <Input
                          className='share-input'
                          placeholder='SHARE HOLDING QTY'
                          onChange={(e) => onHandleNumberHeld(e.target.value.replace(/[^0-9.-]+/g, ""))}
                          value={shareDisplayText}
                        />
                      </div>
                    </div>

                    <div className='arrow px-2 pt-5 self-center'>
                      <img src={arrowRight} alt='' />
                    </div>

                    <div className='flex flex-1 flex-col label'>
                      <Typography
                        fontFamily={'Graphik'}
                        fontSize={10}
                        fontWeight={900}
                        className={'mb-1 text-center'}
                        style={{
                          lineHeight: '14px',
                          letterSpacing: '0.05em'
                        }}
                      >
                        THIS HOLDING CAN BE CONVERTED INTO
                      </Typography>

                      <div className='share-content-section w-100'>
                        <div className='eta-content flex gap-x-1 mb-2'>
                          <span className='growth-count w-1/2 flex items-center justify-center'>
                            <Typography
                              fontFamily={'Graphik'}
                              fontSize={13}
                              fontWeight={400}
                              className={'text-center'}
                              style={{
                                lineHeight: '17px',
                                letterSpacing: '0.05em'
                              }}
                            >
                              <Statistic className='statistic-content' value={growthETA} />
                            </Typography>
                          </span>

                          <Typography
                            fontFamily={'Graphik'}
                            fontSize={14}
                            fontWeight={400}
                            className={'mb-1 text-center'}
                            style={{
                              lineHeight: '19px',
                              letterSpacing: '0.05em'
                            }}
                          >
                            <span className='growth-text w-1/2 text-center'>Growth ETAs</span>
                          </Typography>
                        </div>

                        <div className='eta-content flex gap-x-1'>
                          <span className='income-count w-1/2 flex items-center justify-center'>
                            <Typography
                              fontFamily={'Graphik'}
                              fontSize={13}
                              fontWeight={400}
                              className={'text-center'}
                              style={{
                                lineHeight: '17px',
                                letterSpacing: '0.05em'
                              }}
                            >
                              <Statistic className='statistic-content' value={dividentETA} />
                            </Typography>
                          </span>

                          <Typography
                            fontFamily={'Graphik'}
                            fontSize={14}
                            fontWeight={400}
                            className={'mb-1 text-center'}
                            style={{
                              lineHeight: '19px',
                              letterSpacing: '0.05em'
                            }}
                          >
                            <span className='income-text w-1/2 text-center'>Dividend ETAs</span>
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='derived-content mt-4'>
                  <div className='values flex justify-around'>
                    <div className='p-2'>
                      <Typography
                        fontFamily={'Graphik'}
                        fontSize={12}
                        fontWeight={400}
                        style={{ lineHeight: '12px' }}
                      >
                        <CurrencyFormat value={forcastDivident} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                      </Typography>
                    </div>
                    <div className='p-2'>
                      <Typography
                        fontFamily={'Graphik'}
                        fontSize={12}
                        fontWeight={400}
                        style={{ lineHeight: '12px' }}
                      >
                        <CurrencyFormat value={totalHolding} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                      </Typography>
                    </div>
                  </div>
                  <div className='flex justify-around'>
                    <div className='label m-2'>
                      <Typography
                        fontFamily={'Graphik'}
                        fontSize={10}
                        fontWeight={900}
                        style={{
                          lineHeight: '14px',
                          letterSpacing: '0.05em'
                        }}
                      >
                        FORCAST ANNUAL DIVIDEND
                      </Typography>
                    </div>
                    <div className='label m-2'>
                      <Typography
                        fontFamily={'Graphik'}
                        fontSize={10}
                        fontWeight={900}
                        style={{
                          lineHeight: '14px',
                          letterSpacing: '0.05em'
                        }}
                      >
                        TOTAL HOLDING VALUE
                      </Typography>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {!isEmpty(shareQuantity) && (
            // PBT-29
            <div className='hidden'>
              <div className='security-tabs pt-4'>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="More information" key="1">
                    <p className='content'>
                      {moreInformationContent}
                    </p>
                    {/* <Button type="text" className='read-more'>
                      Read more...
                    </Button> */}
                  </TabPane>
                </Tabs>
              </div>
              {!hideNextStep && (
                <div className='footer-info pt-6'>
                  <Button type="primary" onClick={() => triggerNextStep()}>
                    NEXT STEP
                    <img className='next-icon' src={arrowRightSmall} alt='next-icon'></img>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentPortfolio;