import { IconProps } from './Icon.props';
import ExpandIcon from './Expand.icon';
import LogoutIcon from './Logout.icon';

export type IconNames = 'expand' | 'logout';

const IconView: React.FC<{ name: IconNames } & IconProps> = ({
  name,
  ...props
}) => {
  switch (name) {
    case 'expand':
      return <ExpandIcon {...props} />;
    default:
      return <LogoutIcon {...props} />;
  }
};

export default IconView;
