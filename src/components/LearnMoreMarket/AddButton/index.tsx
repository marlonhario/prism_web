import { PlusSvg } from 'components/NewCubeModel/assets';
import './index.scss';

export function AddButton() {
  return (
    <button className={'learnmore-market-add-button'}>
      <span>ADD</span>

      <span
        className={'learnmore-market-add-button-icon'}
        style={{ marginTop: 0 }}
      >
        <PlusSvg />
      </span>
    </button>
  );
}