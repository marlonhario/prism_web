import { ReactComponent as ArrowUp } from 'assets/svg/arrow-up.svg';
import { ReactComponent as ArrowDown } from 'assets/svg/arrow-down.svg';

const Sorting: React.FC<{
  sortProp: string;
}> = ({ sortProp }) => (
  <div className="flex">
    <ArrowUp fill={sortProp === 'asc' ? 'white' : 'none'} stroke={'white'} />
    <ArrowDown fill={sortProp === 'desc' ? 'white' : 'none'} stroke={'white'} />
  </div>
);

export default Sorting;