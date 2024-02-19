import classNames from 'classnames';

import { etaColorMap } from 'common/consts/etaColorMap';
import CubeDefault from 'assets/images/cubes/eta-default.png';
import { NewColorButtonProps } from './NewColorButton.props';
import './NewColorButton.scss';

export default function NewColorButton({
  eta,
  width = 40,
  height = 40,
  className,
  active,
  onClick
}: NewColorButtonProps) {
  return (
    <button
      className={classNames('eta-button flex items-center justify-center relative', className, {
        'active': !!active
      })}
      style={{ width, height }}
      onClick={() => onClick?.(eta)}
    >
      <img
        src={eta ? etaColorMap[eta].image : CubeDefault}
        className={'mt-[1px]'}
        alt={''}
      />
    </button>
  );
}