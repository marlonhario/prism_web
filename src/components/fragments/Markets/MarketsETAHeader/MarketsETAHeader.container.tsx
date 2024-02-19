import { MarketsETA } from 'common/interfaces/Markets/MarketsETA';
import { orderBy } from 'lodash';
import { useState } from 'react';
import {
  ETASort,
  ETASortType,
  MarketsETAHeaderProps,
  MarketsETAHeaderPublicProps,
} from './MarketsETAHeader.props';
import MarketsETAHeaderView from './MarketsETAHeader.view';

const MarketsETAHeaderContainer: React.FC<MarketsETAHeaderPublicProps> = (
  props: MarketsETAHeaderPublicProps
) => {
  const [etaSort, setEtaSort] = useState({
    remainingTerm: 'asc',
    change: 'asc',
    last: 'asc',
    offer: 'asc',
    matchDistance: 'asc',
    valueInCirculation: 'asc',
  } as ETASort);

  const sortEtas = (column: string, order: 'asc' | 'desc') => {
    if (props.setEtas)
      props.setEtas((prev: MarketsETA[]) => orderBy(prev, [column], [order]));
  };

  const handleSortOnClick = (column: ETASortType, order: 'asc' | 'desc') => {
    setEtaSort((prev: ETASort) => {
      prev[column] = order;
      return prev;
    });
    sortEtas(column, order);
  };

  const combinedProps: MarketsETAHeaderProps = {
    ...props,
    etaSort,
    handleSortOnClick,
  };

  return <MarketsETAHeaderView {...combinedProps} />;
};

export default MarketsETAHeaderContainer;
