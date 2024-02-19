import { useState } from 'react';
import { MarketsTableBodyContentProps } from './MarketsTableBodyContent.props';
import { REGIONS } from 'common/consts';
import MarketsTableETA from '../MarketsTableETA';
import { CURRENCY_SYMBOLS, CURRENCIES } from 'common/consts';
import cn from 'classnames';
import { numberFormatter } from 'common/utils/String';
import { Tooltip } from 'antd';

const MarketsTableBodyContentView: React.FC<MarketsTableBodyContentProps> = (
  props: MarketsTableBodyContentProps
) => {
  const [shown, setShown] = useState<boolean>(false);
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);

  return (
    <div
      className={cn(
        'markets-table-row ltr cursor-pointer',
        props.index % 2 === 0 ? 'odd-background' : 'even-background'
      )}
      onMouseOver={() => {
        setOpenTooltip(true);
      }}
      onMouseLeave={() => {
        setOpenTooltip(false);
      }}
    >
      <div
        className="flex flex-row text-base markets-table-row-content"
        onClick={() => {
          setShown(!shown);
        }}
      >
        <div className="w-[15%] p-2 flex items-center justify-center underlying-security-col">
          {/* <CustomImage
            src={logo}
            width="80%"
            alt={props.security.ticker}
            defaultPath={`/logos/logoPending.svg`}
          /> */}
          <Tooltip
            title={props.security.longName}
            placement="right"
            overlayClassName="font-din2014 uppercase markets-tooltip"
            color="black"
            open={openTooltip}
            destroyTooltipOnHide
          >
            <span className="font-din2014 font-extrabold text-4xl xl:text-4xl tracking-wider">
              {props.security.ticker}
            </span>
          </Tooltip>
        </div>
        <div className="w-[8%] flex items-center pl-2.5 last-price-col">
          <div>
            <span className="font-dinCondensed text-xs">
              {CURRENCIES.get(props.security.region)}
            </span>{' '}
            {props.security.lastPrice.toFixed(2)}
          </div>
        </div>
        <div className="w-[7%] flex items-center pl-2.5 change-col">
          <span
            className={cn(
              'w-[50%]',
              props.security.chgNet1d > 0 ? 'text-[#38D41F]' : 'text-red-500'
            )}
          >
            {props.security.chgNet1d > 0 ? '+' : ''}
            {props.security.chgNet1d}
          </span>
        </div>
        <div className="w-[10%] flex items-center pl-2.5 divident-yield-col">
          {(props.security.forwardDivYield * 100).toFixed(2)}%
        </div>
        <div className="w-[10%] flex items-center pl-2.5 dividend-payout-ratio-col">
          {props.security.dvdPayoutRatio}%
        </div>
        <div className="w-[10%] lowercase flex items-center pl-2.5 hide-mobile">
          {CURRENCY_SYMBOLS.get(props.security.region)}
          {numberFormatter(props.security.etaValueInCirculation)}
        </div>
        <div className="w-[8%] flex items-center pl-2.5 hide-mobile">
          {props.security.peRatioEod}
        </div>
        <div className="w-[8%] flex items-center pl-2.5 hide-mobile">
          {CURRENCY_SYMBOLS.get(props.security.region)}
          {numberFormatter(props.security.marketCap).replace('K', 'B')}
        </div>
        <div className="w-[6%] flex items-center pl-2.5 hide-mobile">
          {/* {props.security.region} */}
          {
            REGIONS.find((region) => region.value === props.security.region)
              ?.name
          }
        </div>
        <div className="w-[8%] flex items-center pl-2.5 hide-mobile">
          {props.security.sector}
        </div>
        <div className="w-[10%] flex items-center pl-2.5 hide-mobile">
          {props.security.industry}
        </div>
      </div>
      {/* <div className="flex mb-4">
          <div className="w-[12%]">
            <div className="border border-[#DDDDDD] rounded-[1.5px] w-[fit-content] m-auto px-2 py-1 gray-btn">
              <span className="font-normal">CODE</span>{' '}
              <span className="font-semibold">{props.security.ticker}</span>
            </div>
          </div>
          <div className="w-auto">
            <div className="w-full">
              <div className="border border-[#DDDDDD] rounded-[1.5px] w-[fit-content] px-2 py-1 gray-btn">
                <span className="capitalize font-semibold">
                  {props.security.longName}
                </span>
              </div>
            </div>
          </div>
        </div> */}
      {/* The ETAs of the security shown in tabular form */}
      <MarketsTableETA
        security={props.security}
        shown={shown}
        selectedEtas={props.selectedEtas}
        handleETAClick={props.handleETAClick}
      />
    </div>
  );
};

export default MarketsTableBodyContentView;
