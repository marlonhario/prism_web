import Sorting from 'components/snippets/Sorting';
import { MarketsTableHeaderProps } from './MarketsTableHeader.props';
import './styles.scss';

const MarketsTableHeaderView: React.FC<MarketsTableHeaderProps> = (
  props: MarketsTableHeaderProps
) => (
  <div className="flex flex-col w-full pl-[10px] text-white markets-table-header font-din2014 uppercase text-[8.5px] tracking-[0.03em] leading-[10px]">
    <div className="flex flex-row py-2 h-[51px] markets-table-container">
      <div className="w-[15%] flex items-center px-3 underlying-security-col">
        <span>Underlying Security</span>
      </div>
      <div
        className="w-[8%] flex flex-col justify-end cursor-pointer border-l border-solid border-[#4B5059] pl-2.5 last-price-col gap-y-1"
        onClick={() =>
          props.handleSortOnClick(
            'lastPrice',
            props.securitySort.lastPrice === 'desc' ? 'asc' : 'desc'
          )
        }
      >
        <span>LAST PRICE</span>
        <Sorting sortProp={props.securitySort.lastPrice} />
      </div>
      <div
        className="w-[7%] flex flex-col justify-end cursor-pointer border-l border-solid border-[#4B5059] pl-2.5 change-col gap-y-1"
        onClick={() =>
          props.handleSortOnClick(
            'chgNet1d',
            props.securitySort.chgNet1d === 'desc' ? 'asc' : 'desc'
          )
        }
      >
        <span>24HR CHANGE</span>
        <Sorting sortProp={props.securitySort.chgNet1d} />
      </div>
      <div
        className="w-[10%] flex flex-col justify-end cursor-pointer border-l border-solid border-[#4B5059] pl-2.5 divident-yield-col gap-y-1"
        onClick={() =>
          props.handleSortOnClick(
            'forwardDivYield',
            props.securitySort.forwardDivYield === 'desc' ? 'asc' : 'desc'
          )
        }
      >
        <span>DIVIDEND YIELD</span>
        <Sorting sortProp={props.securitySort.forwardDivYield} />
      </div>
      <div
        className="w-[10%] flex flex-col justify-end cursor-pointer border-l border-solid border-[#4B5059] pl-2.5 dividend-payout-ratio-col gap-y-1"
        onClick={() =>
          props.handleSortOnClick(
            'dvdPayoutRatio',
            props.securitySort.dvdPayoutRatio === 'desc' ? 'asc' : 'desc'
          )
        }
      >
        <span className='hidden xl:block'>
          DIVIDEND
          <br />
          PAYOUT RATIO
        </span>
        <span className='block xl:hidden'>
          DIVIDEND
          <br />
          PAYOUT
        </span>
        <Sorting sortProp={props.securitySort.dvdPayoutRatio} />
      </div>
      <div
        className="w-[10%] flex flex-col justify-end cursor-pointer border-l border-solid border-[#4B5059] pl-2.5 hide-mobile gap-y-1"
        onClick={() =>
          props.handleSortOnClick(
            'etaValueInCirculation',
            props.securitySort.etaValueInCirculation === 'desc' ? 'asc' : 'desc'
          )
        }
      >
        <span>
          ETA VALUE IN
          <br />
          CIRCULATION
        </span>
        <Sorting sortProp={props.securitySort.etaValueInCirculation} />
      </div>
      <div
        className="w-[8%] flex flex-col justify-end cursor-pointer border-l border-solid border-[#4B5059] pl-2.5 hide-mobile gap-y-1"
        onClick={() =>
          props.handleSortOnClick(
            'peRatioEod',
            props.securitySort.peRatioEod === 'desc' ? 'asc' : 'desc'
          )
        }
      >
        <span>P/E RATIO</span>
        <Sorting sortProp={props.securitySort.peRatioEod} />
      </div>
      <div
        className="w-[8%] flex flex-col justify-end cursor-pointer border-l border-solid border-[#4B5059] pl-2.5 hide-mobile gap-y-1"
        onClick={() =>
          props.handleSortOnClick(
            'marketCap',
            props.securitySort.marketCap === 'desc' ? 'asc' : 'desc'
          )
        }
      >
        <span>MARKET CAP</span>
        <Sorting sortProp={props.securitySort.marketCap} />
      </div>
      <div
        className="w-[6%] flex flex-col justify-end cursor-pointer border-l border-solid border-[#4B5059] pl-2.5 hide-mobile gap-y-1"
        onClick={() =>
          props.handleSortOnClick(
            'region',
            props.securitySort.region === 'desc' ? 'asc' : 'desc'
          )
        }
      >
        <span>REGION</span>
        <Sorting sortProp={props.securitySort.region} />
      </div>
      <div
        className="w-[8%] flex flex-col justify-end cursor-pointer border-l border-solid border-[#4B5059] pl-2.5 hide-mobile gap-y-1"
        onClick={() =>
          props.handleSortOnClick(
            'sector',
            props.securitySort.sector === 'desc' ? 'asc' : 'desc'
          )
        }
      >
        <span>SECTOR</span>
        <Sorting sortProp={props.securitySort.sector} />
      </div>
      <div
        className="w-[10%] flex flex-col justify-end cursor-pointer border-l border-solid border-[#4B5059] pl-2.5 hide-mobile gap-y-1"
        onClick={() =>
          props.handleSortOnClick(
            'industry',
            props.securitySort.industry === 'desc' ? 'asc' : 'desc'
          )
        }
      >
        <span>INDUSTRY</span>
        <Sorting sortProp={props.securitySort.industry} />
      </div>
    </div>
  </div>
);

export default MarketsTableHeaderView;
