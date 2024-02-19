import { SecuritySort } from 'common/interfaces/Markets/SecuritySort';
import {
  MarketsTableHeaderProps,
  MarketsTableHeaderPublicProps,
  SecuritySortType,
} from './MarketsTableHeader.props';
import MarketsTableHeaderView from './MarketsTableHeader.view';

const MarketsTableHeaderContainer: React.FC<MarketsTableHeaderPublicProps> = (
  props: MarketsTableHeaderPublicProps
) => {

  /**
   * @description handles the sorting of the securities in the markets table when the table header is clicked
   * @param column the column selected
   * @param order ascending or descending
   */
  const handleSortOnClick = (column: SecuritySortType, order: 'asc' | 'desc') => {
    let tempSort = {...props.securitySort}
    tempSort[column] = order;
    props.setSecuritySort(tempSort);
    props.sortSecurities(column, order);
  };

  const combinedProps: MarketsTableHeaderProps = {
    ...props,
    handleSortOnClick,
  };

  return <MarketsTableHeaderView {...combinedProps} />;
};

export default MarketsTableHeaderContainer;
