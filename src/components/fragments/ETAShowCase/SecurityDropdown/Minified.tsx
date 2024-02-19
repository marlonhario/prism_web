import { FC } from 'react';
import { MinifiedSecurityDropdownProps } from './minified.props';
import './styles.scss';

export const MinifiedSecurityDropdown: FC<MinifiedSecurityDropdownProps> = ({
  lastPrice,
  yieldPercent,
}) => {
  return (
    <div className="minifiedSecurityDropdown-wrapper flex flex-col gap-[3px]">
      <div className="flex">
        <label className="uppercase flex-1 text-center font-semibold text-xs tracking-wider text-[#343741]">
          last price
        </label>
        <label className="uppercase flex-1 text-center font-semibold text-xs tracking-wider text-[#343741]">
          yield
        </label>
      </div>
      <div className="security-value-wrapper flex flex-auto items-center h-7 ">
        <label className="uppercase flex-1 text-center font-semibold text-base text-white">
          {lastPrice}
        </label>
        <label className="uppercase flex-1 text-center font-semibold text-base text-white">
          {yieldPercent}
        </label>
      </div>
    </div>
  );
};
