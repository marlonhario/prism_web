import { ETATabProps } from './ETATab.props';

const ETATabView: React.FC<ETATabProps> = (props: ETATabProps) => (
  <svg
    width={props.width}
    height="38"
    viewBox={`0 0 ${props.width} 38`}
    fill={props.fill}
    xmlns="http://www.w3.org/2000/svg"
    className='cursor-pointer'
  >
    {props.path}
    <foreignObject x="0" y="0" width={props.width} height="38">
      <div className='text-center pt-1'>{props.children}</div>
    </foreignObject>
  </svg>
);

export default ETATabView;
