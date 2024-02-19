import { BackButtonProps } from '../types';
import { ArrowLeftIcon } from '../icons';
import './index.scss';

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <div
      className={'learn-more-market-header-action flex items-center gap-x-[6px] relative w-[80px] h-[28px] text-white'}
      onClick={onClick}
    >
      <ArrowLeftIcon fill={'#C4C4C4'} className={'ml-[10px]'} />

      <span className={'text-[16px]'}>back</span>
    </div>
  );
}