import { PropsWithChildren } from 'react';

import './index.scss';

export function OverviewButton({ children }: PropsWithChildren<{}>) {
  return (
    <button className={'learn-more-market-overview-button flex items-center justify-center gap-x-[5px] h-[27px] leading-[17px] px-[10px] py-[5px] text-[14px] text-white tracking whitespace-nowrap'}>
      {children}
    </button>
  );
}