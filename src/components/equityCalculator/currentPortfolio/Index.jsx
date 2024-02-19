/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import { Input, Select, Statistic } from 'antd';
import { find, isEmpty } from 'lodash';
import { APIPath, currencyFormat } from '../constants';
import axios from 'axios';
import './Styles.scss';
const { Option } = Select;

const CurrentPortfolio = (props) => {
  const { valueHeldCallback, numberHeldCallback, securityHeldCallback } = props;
  const [securityHeld, setSecurityHeld] = useState('');
  const [numberHeld, setNumberHeld] = useState({});
  const [valueHeld, setValueHeld] = useState({});
  const [forcastAnnualDividend, setForcastAnnualDividend] = useState('');
  const [securityList, setSecurityList] = useState([]);

  /* Security list API */
  useEffect(() => {
    axios.get(APIPath.listOfSecurities).then((response) => {
      if(response?.status === 200) {
        setSecurityList(response?.data);
      }
    });
  }, []);

  /**
   * Function to handle security held onclick
   */
  const onHandleSecurityHeld = (selectedSecurityHeld) => {
    const selectedSecuritydetails = find(securityList, list => list.ticker === selectedSecurityHeld);
    setSecurityHeld(selectedSecuritydetails)
    setValueHeld({'value': '', 'displayValue': ''});
    setNumberHeld({'value': '', 'displayValue': ''});
  }

  /**
   * function to set number held and value held on typing number held
   */
  const onHandleNumberHeld = (value) => {
    setNumberHeld({ 'value': value, 'displayValue': currencyFormat(value) });
    if (!isEmpty(securityHeld)) {
      /* Set value held - cal (number held * lastpx) */
      const valueHeldCalc = value * securityHeld.lastPrice;
      setValueHeld((!isEmpty(value)) ? { 'value': valueHeldCalc, 'displayValue': currencyFormat(valueHeldCalc) } : '');
    }
  }

  /**
   * function to set value held and number held on typing value held
   */
  const onHandleValueHeld = (value) => {
    setValueHeld({ 'value': value, 'displayValue': currencyFormat(value) });
    if (!isEmpty(securityHeld)) {
      /* Set number held - cal (value held / lastpx) */
      setNumberHeld((!isEmpty(value)) ? (value / securityHeld.lastPrice) : '');
    }
  }

  /**
   * function to cal and set forcast annual dividend and callback to send the data to parent component
   * this function will get trigger once we got these value (numberHeld, valueHeld, securityHeld)
   */
  useEffect(() => {
    if (!isEmpty(securityHeld)) {
      valueHeldCallback(valueHeld.value);
      numberHeldCallback(numberHeld.value);
      securityHeldCallback(securityHeld);

      /* Set forcast annual dividend */
      setForcastAnnualDividend((numberHeld.value * securityHeld.lastPrice * (securityHeld.forwardDivYield )).toFixed(2));
    }
  }, [numberHeld, valueHeld])

  return (
    <div className='py-4 px-6 border border-solid border-gray-300 bg-white boxStyle'>
      <div className='flex font-medium text-lg py-1 border-b border-gray-300'>Current Portfolio</div>
      <div className='flex flex-row space-x-8 py-8'>
        <div className="w-8/12">
          <label>
            Security Held
          </label>
          <Select className='boxShadow w-10/12' size='large' onChange={(e) => onHandleSecurityHeld(e)}>
            {securityList.map(list => (
              <Option key={list.ticker} value={list.ticker}>
                <div className='font-bold text-sm'>{list.ticker}</div>
                <div className='text-xs'>{list.longName}</div>
              </Option>
            ))}
          </Select>
        </div>
        <div className='w-4/12'>
          <label>Last Closing Price</label>
          <Statistic prefix='$' value={securityHeld.lastPrice} precision={2} />
        </div>
      </div>
      <div className='flex flex-row space-x-4 py-8'>
        <div className='w-4/12'>
          <label>Number of Shares Held</label>
          <Input
            size='large'
            className='boxShadow'
            placeholder='Number of Shares Held'
            value={numberHeld.displayValue} onChange={(e) => onHandleNumberHeld(e.target.value.replace(/[^0-9.-]+/g,""))}
          />
        </div>
        <div className='w-4/12'>
          <label>$ Value of Shares Held</label>
          <Input
            size='large'
            className='boxShadow'
            placeholder='$ Value of Shares Held'
            value={valueHeld.displayValue} onChange={(e) => onHandleValueHeld(e.target.value.replace(/[^0-9.-]+/g,""))}
          />
        </div>
        <div className='w-4/12'>
          <label>Forecast Annual Dividend</label>
          <Statistic prefix='$' value={forcastAnnualDividend} precision={2} />
        </div>
      </div>
    </div>
  );
};

export default CurrentPortfolio;