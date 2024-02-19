import { Fragment } from 'react';
import { ETAListGroupProps } from './ETAListGroup.props';
import MarketsETAContent from '../MarketsETAContent';
import MarketsETAHeader from '../MarketsETAHeader';
import { Virtuoso } from 'react-virtuoso';
import { map } from 'lodash';

const ETAListGroupView: React.FC<ETAListGroupProps> = (
  props: ETAListGroupProps
) => {
  return (
    <div className="flex flex-col h-full">
      <MarketsETAHeader
        allShown={true}
        type={props.type}
        setEtas={props.setEtas}
      />
      {/* Virtualize the security ETAs */}
      <Virtuoso
        className="prism-scrollbar prism-scrollbar-markets rtl all-etas-list"
        data={props.etas.filter((eta) =>
          props.selectedEtas.includes(eta.etaType)
        )}
        itemContent={(index, eta) => {
          return (
            <MarketsETAContent
              eta={eta}
              ticker={eta?.ticker || ''}
              selectedEtas={props.selectedEtas}
              type={props.type}
              handleETAClick={props.handleETAClick}
              key={index}
            />
          );
        }}
      />
    </div>
  );
};

export default ETAListGroupView;
