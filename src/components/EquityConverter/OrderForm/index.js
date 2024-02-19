import React from 'react';
import { Button, Statistic } from 'antd';
import cn from 'classnames';
import CurrencyFormat from 'react-currency-format';
import {capitalize, isEmpty } from 'lodash';
import { etaTitleMapping, whiteSecurityImageSuffix } from '../utils';
import {sectionTitle, descriptionContent, secondaryDescriptionContent, stepTwoDescription } from './utils';
import './styles.scss';
import CustomImage from 'components/common/CustomImage';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const OrderForm = ({
  eta,
  barContent,
  optimisedPrice,
  orderSideContent,
  hideOrderForm,
  activeSecurityContent,
  className
}) => {
  const growthTitle = etaTitleMapping[capitalize(eta)].growthTitle;
  const incomeTitle = etaTitleMapping[capitalize(eta)].incomeTitle;
  const growthColor = etaTitleMapping[capitalize(eta)].growthColor;
  const incomeColor = etaTitleMapping[capitalize(eta)].incomeColor;
  const cashColor = "#A49E99";
  

const options = {
  plugins: {
    legend: {
      display: false
    },
  },
  animation: {
    duration: 1500
  },
  indexAxis : "y",
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem) {
        return tooltipItem.yLabel;
      }
    }
  },
  scales: {
    x: {
      display: false,
      stacked: true,
    },
    y: {
      display: false,
      stacked: true,
    },
  },
};

const labels = [1];
const data = {
  labels,
  datasets: [
    {
    data: [barContent.growthLength],
    backgroundColor: growthColor
    }, 
    {
      data: [barContent.incomeLength],
      backgroundColor:incomeColor
    },
    {
      data: [barContent.cashReturnedLength],
      backgroundColor: cashColor,
    }, 
  ]
}

  return (
    <>
    <div className={cn('order-form flex', className)}>
      <div className='section-header'>
        <div className="section-label">
          {sectionTitle}
        </div>
        <p className="section-description pt-2"> 
          { descriptionContent }
        </p>
        <p className='section-description'>
          { secondaryDescriptionContent }
        </p>
      
        <div className='section-body pt-4'>
          <div className='optimised-content p-6'>
            <div className='optimised-content-label text-right '> OPTIMISED POSITION </div>
            <div className='flex justify-around mt-6'>
              <div className='security-logo'>
                <CustomImage
                  src={`/logos/${activeSecurityContent.region}/${activeSecurityContent.ticker}${whiteSecurityImageSuffix}.svg`}
                  alt={activeSecurityContent.ticker}
                  defaultPath={`/logos/logoPending.svg`}
                  defaultWidth={100}
                  width="100"
                />
              </div>
              <div className='flex flex-col growth-price'>
                <span> {growthTitle} ETAs</span>
                <span> <CurrencyFormat value={optimisedPrice.growthHoldingValue} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></span>
              </div>
              <div className='flex flex-col income-price'>
                <span> {incomeTitle} ETAs</span>
                <span> <CurrencyFormat value={optimisedPrice.incomeHoldingValue} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></span>
              </div>
              <div className='flex flex-col cash-returned'>
                <span> Cash Balance</span>
                <span> <CurrencyFormat value={optimisedPrice.cashReturned} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></span>
              </div>
            </div>
            <div className='my-2 chart-container'>
            <Bar options={options} data={data} height={30} >
              <Tooltip cursor={{fill: 'transparent'}}/>
            </Bar>
          </div>
          </div>
          <div className='mt-20'>
            <span className='step-label bold'>
              Step Two
            </span>
            <p className="section-description pt-1"> 
              { stepTwoDescription }
            </p>
            <div className='order-info mt-6'>
              <p className='section-description'>The orders you will need to place to achieve your desired ratios are as below. </p>
              { !isEmpty(orderSideContent.growthSideOrder) && (
                <div className='buy-info content flex justify-between p-2 items-start'>
                  <span className='mr-2'> {orderSideContent.growthSideOrder}</span>
                  <span className='bold quantity px-2 mr-2'>
                    <Statistic className='statistic-content' value={orderSideContent.growthSideVolume} />
                  </span>
                  <span className='bold mr-2'>{orderSideContent.underlyingSymbol} {growthTitle} ({orderSideContent.growthSymbol}) </span>
                  <span className='mr-2'>FOR A PRICE OF</span>
                  <span>
                    <CurrencyFormat value={orderSideContent.growthLastPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                  </span>
                </div>
              )}
              { !isEmpty(orderSideContent.incomeSideOrder) && (
                <div className='seller-info content flex justify-between p-2 items-start'>
                  <span className='mr-2'>{orderSideContent.incomeSideOrder}</span>
                  <span className='bold quantity px-2 mr-2'> 
                    <Statistic className='statistic-content' value={orderSideContent.incomeSideVolume} />
                  </span>
                  <span className='bold mr-2'>
                    {orderSideContent.underlyingSymbol} {incomeTitle} ({orderSideContent.incomeSymbol})
                  </span>
                  <span className='mr-2'>FOR A PRICE OF</span>
                  <span>
                  <CurrencyFormat value={orderSideContent.incomeLastPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className='flex order-form-action mt-10 flex-wrap'>
            <Button type="primary " className='mr-2 uppercase' onClick={hideOrderForm}>
              Back
            </Button>
            <Button type="primary" className='mr-2 uppercase' disabled={true}>
              Link to Application
            </Button>
            <Button type="primary" className='mr-2 uppercase' disabled={true}>
              send to your broker
            </Button>
            <Button type="primary" className='uppercase' disabled={true}>
              Pdf order form
            </Button>
          </div>
        </div>
      </div>     
    </div> 
    </>
  );
};

export default OrderForm;