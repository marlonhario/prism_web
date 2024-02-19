/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import { filter, isEmpty, upperCase, capitalize, isUndefined } from 'lodash';
import cn from 'classnames';
import CurrencyFormat from 'react-currency-format';
import { Button, Statistic } from 'antd';
import { APIPath, etaDropdownData, etaTitleMapping, whiteSecurityImageSuffix } from '../utils';
import CustomImage from 'components/common/CustomImage';
import axios from 'axios';
import './styles.scss';
import ETADropdown from '../utils/ETADropdown';
import initialSectionLogo from 'assets/images/white-eta-icon.png';
import arrowRightSmall from 'assets/images/arrow-right-small.png';
import Typography from '../Typography';

const AlternatePosition = ({
  activeSecurity,
  activeSecurityContent,
  updateETALogo,
  updateETADetails,
  updateETAValue,
  triggerOptimiseBlock,
  growthETA,
  incomeETA,
  className,
  activeETAList
}) => {

  const sectionTitle = 'Alternate ETA Position';
  const sectionDescription = '.';
  const stepInfo = 'Choose an ETA pairing to convert your shares to';
  const dropdownPlaceHolder = 'SELECT AN ETA';

  const [sectionLogo, setSectionLogo] = useState(initialSectionLogo);
  const [eta, setETA] = useState('');
  const [etaLastGrowthPrice, setEtaLastGrowthPrice] = useState('');
  const [etaLastIncomePrice, setEtaLastIncomePrice] = useState('');
  const [hideNextStep, setHideNextStep] = useState(true);

  useEffect(() => {
    if (!isEmpty(activeSecurity) && !isEmpty(eta)) {
      axios.get(`${APIPath.etaDetails}/${activeSecurity}/${upperCase(eta)}`).then((response) => {
        if (response?.status === 200) {
          const etaMetaDataResponse = response.data;
          updateETADetails(etaMetaDataResponse);
          setEtaLastGrowthPrice(etaMetaDataResponse.growthLastPrice);
          setEtaLastIncomePrice(etaMetaDataResponse.incomeLastPrice)
        }
      });
    }
  }, [activeSecurity, eta]);


  useEffect(() => {
    if (!isEmpty(activeETAList)) {
      onChangeDivision(activeETAList.etaType, true);
      updateETADetails(activeETAList);
      setEtaLastGrowthPrice(activeETAList.growthLastPrice);
      setEtaLastIncomePrice(activeETAList.incomeLastPrice)
    }
  }, [activeETAList]);



  const onChangeDivision = (value, skipResettingMarketListFlag) => {
    if (value === dropdownPlaceHolder) {
      value = '';
    }
    setETA(value);
    updateETAValue(value);
    const activeETA = filter(etaDropdownData, ['id', value])[0];
    if (!isEmpty(activeETA)) {
      setSectionLogo(activeETA.imagePath);
      updateETALogo(activeETA.imagePath);
    } else {
      setSectionLogo(initialSectionLogo);
      updateETALogo("");
    }
    triggerNextStep()
  }
  const triggerNextStep = () => {
    setHideNextStep(true);
    triggerOptimiseBlock(true);
  }

  return (
    <>
      <div className={cn('alternate-position w-full', className)}>
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
                STEP 2
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
              <img src={sectionLogo} alt='title' />
            </div>
            <div className='eta-dropdown flex justify-center pt-4'>
              <ETADropdown
                data={etaDropdownData}
                selected={eta}
                placeholder={dropdownPlaceHolder}
                isDisabled={isUndefined(growthETA) ? isEmpty(growthETA) : isEmpty(growthETA.toString())}
                onChange={onChangeDivision}
              />
              {/* <Dropdown
                placeHolder={dropdownPlaceHolder}
                type={"eta"}
                data={etaDropdownData}
                handleChange={onChangeDivision}
                selectedItem={eta}
                className='eta-dropdown-option'
                isDisabled={isUndefined(growthETA) ? isEmpty(growthETA) : isEmpty(growthETA.toString())}
              /> */}
            </div>
            <div className='security-info pt-2 invisible'></div>
            {!isEmpty(eta) && !isEmpty(etaLastGrowthPrice.toString()) && !isEmpty(etaLastIncomePrice.toString()) && (
              <>
                <div className='security-logo py-12 flex justify-center'>
                  <div className='w-4/12 justify-center flex'>
                    <CustomImage
                      src={`/logos/${activeSecurityContent.region}/${activeSecurityContent.ticker}${whiteSecurityImageSuffix}.svg`}
                      alt={activeSecurityContent.ticker}
                      defaultPath={`/logos/logoPending.svg`}
                      width="83%"
                      defaultWidth={125}
                    />
                  </div>
                </div>
                <div className='eta-details p-3'>
                  <div className='flex justify-between'>
                    <span className='eta-header'>
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
                        ETA HOLDINGS
                      </Typography>
                    </span>
                    <span className='eta-header'>
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
                        ETA SECURITY
                      </Typography>
                    </span>
                    <span className='eta-header'>
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
                        PRICE PER ETA
                      </Typography>
                    </span>
                  </div>
                  <div className='flex justify-between eta-info'>
                    <span>
                      <Typography
                        fontFamily={'Graphik'}
                        fontSize={13}
                        fontWeight={400}
                        style={{
                          lineHeight: '17px',
                          letterSpacing: '0.05em'
                        }}
                      >
                        <Statistic className='statistic-content' value={growthETA} />
                      </Typography>
                    </span>
                    <span className='eta-label'>
                      <Typography
                        fontFamily={'Graphik'}
                        fontSize={14}
                        fontWeight={400}
                        style={{
                          lineHeight: '19px',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {etaTitleMapping[capitalize(eta)].growthTitle}
                        <span className='eta-logo inline-flex items-center ml-1.5 justify-center px-2 py-1 text-xs font-bold leading-none text-white rounded' style={{ background: etaTitleMapping[capitalize(eta)].growthColor }}> ETA </span>
                      </Typography>
                    </span>
                    <span>
                      <Typography
                        fontFamily={'Graphik'}
                        fontSize={14}
                        fontWeight={400}
                        style={{
                          lineHeight: '19px',
                          letterSpacing: '0.05em'
                        }}
                      >
                        <CurrencyFormat value={etaLastGrowthPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                      </Typography>
                    </span>
                  </div>
                  <div className='flex justify-between eta-info mt-3'>
                    <span>
                      <Typography
                        fontFamily={'Graphik'}
                        fontSize={13}
                        fontWeight={400}
                        style={{
                          lineHeight: '17px',
                          letterSpacing: '0.05em'
                        }}
                      >
                        <Statistic className='statistic-content' value={incomeETA} />
                      </Typography>
                    </span>
                    <span className='eta-label'>
                      <Typography
                        fontFamily={'Graphik'}
                        fontSize={14}
                        fontWeight={400}
                        style={{
                          lineHeight: '19px',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {etaTitleMapping[capitalize(eta)].incomeTitle}
                        <span className='eta-logo inline-flex items-center ml-1.5 justify-center px-2 py-1 text-xs font-bold leading-none text-white rounded' style={{ background: etaTitleMapping[capitalize(eta)].incomeColor }}> ETA </span>
                      </Typography>
                    </span>
                    <span>
                      <Typography
                        fontFamily={'Graphik'}
                        fontSize={14}
                        fontWeight={400}
                        style={{
                          lineHeight: '19px',
                          letterSpacing: '0.05em'
                        }}
                      >
                        <CurrencyFormat value={etaLastIncomePrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                      </Typography>
                    </span>
                  </div>
                </div>
                {!hideNextStep && (
                  <div className='footer-info pt-6'>
                    <Button type="primary" onClick={() => triggerNextStep()} >
                      NEXT STEP
                      <img className='next-icon' src={arrowRightSmall} alt='next-icon'></img>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AlternatePosition;
