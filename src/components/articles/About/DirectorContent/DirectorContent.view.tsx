import { DirectorContentProps } from './DirectorContent.props';
import cn from 'classnames';

const DirectorContentView: React.FC<DirectorContentProps> = (
  props: DirectorContentProps
) => (
  <div className="flex flex-row gap-x-10">
    {/* {props.expanded && (
      <img className="h-fit" src={props.imageSource} alt={props.name} style={{ maxWidth: 236, maxHeight: 236 }} />
    )} */}

    <div className={cn('text-white font-din2014 text-base', props.expanded ? props.contentWidth : 'w-full')}>
      {props.summary}
    </div>
  </div>
);

export default DirectorContentView;
