import * as React from 'react';
import cn from 'classnames';
import { useEffect } from 'react';
import { etaTitleMapping, totalLineLength } from '../utils';
import { Button } from 'antd';
import { capitalize } from 'lodash';
import CurrencyFormat from 'react-currency-format';
import './styles.scss';
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


const ConversionAllocation = ({
  allocationContent,
  eta,
  renderOrderForm,
  isOrderFormVisible
}) => {
const growthTitle = etaTitleMapping[capitalize(eta)].growthTitle;
const incomeTitle = etaTitleMapping[capitalize(eta)].incomeTitle;
const growthColor = etaTitleMapping[capitalize(eta)].growthColor;
const incomeColor = etaTitleMapping[capitalize(eta)].incomeColor;
const cashColor = "#A49E99";

const growthStartingPoint = parseInt(allocationContent.lineIncomeStart);
const growthStarting = growthStartingPoint;
let cashReturned = allocationContent.totalCashReturned;
let cashStartingPoint = parseInt(allocationContent.lineCashReturnStart);

const growthHoldingValue = allocationContent.growthValueofHolding;
const incomeHoldingValue = allocationContent.incomeValueofHolding;

let cashReturnedLength = totalLineLength - cashStartingPoint;

if(cashReturned <= 0) {
  cashReturned = 0;
  cashReturnedLength = 0;
}

let growthLength = growthHoldingValue > 0 ? growthStarting : 0;
let incomeLength = incomeHoldingValue > 0 ? totalLineLength - growthStarting - cashReturnedLength : 0;

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
    data: [growthLength],
    backgroundColor: growthColor
    }, 
    {
      data: [incomeLength],
      backgroundColor:incomeColor
    },
    {
      data: [cashReturnedLength],
      backgroundColor: cashColor,
    }, 
  ]
}

useEffect(() => {
  if (isOrderFormVisible) {
    triggerOrderForm()
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [growthHoldingValue, growthLength, incomeLength, cashReturnedLength, incomeHoldingValue, cashReturned]);



const triggerOrderForm = () => {
  const barContent = { growthLength, incomeLength, cashReturnedLength };
  const optimisedPrice = { growthHoldingValue, incomeHoldingValue, cashReturned };
  renderOrderForm( barContent, optimisedPrice );
};

  return (
    <div className='conversion-allocation'>
        <div className='my-2 chart-container'>
          <Bar options={options} data={data} height={30} >
            <Tooltip cursor={{fill: 'transparent'}}/>
          </Bar>
        </div>
        <div className='w-full flex flex-row mt-4'>
          <div className='justify-start'>
            <span className='growth-info'>
              <span className='growth-title mr-1'> {growthTitle} </span>
              <span className='eta-logo inline-flex items-center ml-1.5 justify-center px-1 py-1 text-xs font-bold leading-none text-white rounded mr-1' style={{background:etaTitleMapping[capitalize(eta)].growthColor}}> ETA </span>
            </span>
            <span className='income-info'>
              <span className='income-title mr-1'> {incomeTitle} </span>
              <span className='eta-logo inline-flex items-center ml-1.5 justify-center px-1 py-1 text-xs font-bold leading-none text-white rounded mr-1' style={{background:etaTitleMapping[capitalize(eta)].incomeColor}}> ETA </span>
              </span>
          </div>
          <div className='cash-returned justify-end ml-auto'>
            <span className='eta-logo inline-flex items-center ml-1.5 justify-center px-1 py-1 text-xs font-bold leading-none text-white rounded mr-2' style={{background:cashColor}}> CASH </span>
            <span className='pr-1 bold'> Capital Returned </span>
            <CurrencyFormat className='bold' value={cashReturned} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
          </div>
        </div>
        <div className={cn('order-form-button pt-12', { 'hidden' : isOrderFormVisible})}>
          <Button type="primary" className='mr-2' onClick={() => triggerOrderForm()} >
            Show Order form
          </Button>
          {/* <Button type="primary" className='ml-2' disabled={true}>
            Add to portfolio
          </Button> */}
        </div>
    </div>
  );
}

export default ConversionAllocation;