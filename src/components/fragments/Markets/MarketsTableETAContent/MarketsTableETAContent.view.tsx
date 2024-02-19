import { map } from 'lodash';
import { MarketsTableETAContentProps } from './MarketsTableETAContent.props';
import MarketsETAContent from '../MarketsETAContent';
import MarketsETAHeader from '../MarketsETAHeader';

const MarketsTableETAContent: React.FC<MarketsTableETAContentProps> = (
  props: MarketsTableETAContentProps
) => {
  return (
    <div className="flex flex-col">
      <MarketsETAHeader allShown={false} type={props.type} />
      {map(props.etas, (eta, index) => {
        return (
          <MarketsETAContent
            security={props.security}
            eta={eta}
            ticker={props.ticker}
            selectedEtas={props.selectedEtas}
            type={props.type}
            handleETAClick={props.handleETAClick}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default MarketsTableETAContent;
