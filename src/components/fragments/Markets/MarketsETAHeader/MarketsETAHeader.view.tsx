import Sorting from 'components/snippets/Sorting';
import { MarketsETAHeaderProps } from './MarketsETAHeader.props';
import cn from 'classnames';
import './styles.scss';

const MarketsETAHeaderView: React.FC<MarketsETAHeaderProps> = (
  props: MarketsETAHeaderProps
) => (
  <div className={`flex flex-row w-full pb-3 pt-5 text-white font-din2014 text-xs leading-3 market-eta-header ${props.allShown ? 'pl-5 pr-3' : ''}`}>
    <div
      className={cn(
        'flex flex-col justify-end items-start w-[10%] eta-type-col pl-4',
        props.allShown ? 'pb-1.5' : ''
      )}
    >
      ETA TYPE
    </div>
    <div
      className="flex flex-col justify-end w-[14%] pl-2 eta-remaining-term-col cursor-pointer"
      onClick={() => {
        if (props.allShown)
          props.handleSortOnClick(
            'remainingTerm',
            props.etaSort.remainingTerm === 'desc' ? 'asc' : 'desc'
          );
      }}
    >
      REMAINING TERM
      {props.allShown && <Sorting sortProp={props.etaSort.remainingTerm} />}
    </div>
    <div
      className="flex flex-col justify-end w-[14%] eta-change-col cursor-pointer"
      onClick={() => {
        if (props.allShown)
          props.handleSortOnClick(
            'change',
            props.etaSort.change === 'desc' ? 'asc' : 'desc'
          );
      }}
    >
      24HR CHANGE
      {props.allShown && <Sorting sortProp={props.etaSort.change} />}
    </div>
    <div
      className="flex flex-col justify-end w-[14%] eta-growth-multiple-last-col cursor-pointer"
      onClick={() => {
        if (props.allShown)
          props.handleSortOnClick(
            'last',
            props.etaSort.last === 'desc' ? 'asc' : 'desc'
          );
      }}
    >
      {props.type} LAST
      {props.allShown && <Sorting sortProp={props.etaSort.last} />}
    </div>
    <div
      className="flex flex-col justify-end w-[14%] eta-growth-multiple-offer-col cursor-pointer"
      onClick={() => {
        if (props.allShown)
          props.handleSortOnClick(
            'offer',
            props.etaSort.offer === 'desc' ? 'asc' : 'desc'
          );
      }}
    >
      {props.type} OFFER
      {props.allShown && <Sorting sortProp={props.etaSort.offer} />}
    </div>
    <div
      className="flex flex-col justify-end w-[14%] eta-match-distance-col cursor-pointer"
      onClick={() => {
        if (props.allShown)
          props.handleSortOnClick(
            'matchDistance',
            props.etaSort.matchDistance === 'desc' ? 'asc' : 'desc'
          );
      }}
    >
      MATCH DISTANCE
      {props.allShown && <Sorting sortProp={props.etaSort.matchDistance} />}
    </div>
    <div
      className="flex flex-col justify-end w-[14%] eta-value-in-circulation-col cursor-pointer"
      onClick={() => {
        if (props.allShown)
          props.handleSortOnClick(
            'valueInCirculation',
            props.etaSort.valueInCirculation === 'desc' ? 'asc' : 'desc'
          );
      }}
    >
      VALUE IN CIRCULATION
      {props.allShown && (
        <Sorting sortProp={props.etaSort.valueInCirculation} />
      )}
    </div>
    <div
      className={cn(
        'flex flex-col justify-end w-[6%] items-center eta-add-col',
        props.allShown ? 'pb-1.5' : ''
      )}
    >
      ADD
    </div>
  </div>
);

export default MarketsETAHeaderView;
