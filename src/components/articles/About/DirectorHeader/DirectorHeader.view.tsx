import { DirectorHeaderProps } from './DirectorHeader.props';
import cn from 'classnames';

const DirectorHeaderView: React.FC<DirectorHeaderProps> = (props: DirectorHeaderProps) => {
  return (
    <div
      className={cn('flex flex-row gap-x-5', props.expanded ? 'py-4' : 'py-0')}
    >
      {/* {!props.expanded && (
        <img src={props.imageSource} alt={props.name} className="w-32" />
      )} */}
      <span className="text-[23px] self-center">
        <span className="text-[#A2A4A9] uppercase">{props.position}</span>
        <br />
        <span className="text-white uppercase">{props.name}</span>
      </span>
    </div>
  );
};

export default DirectorHeaderView;
