import { useContext } from 'react';
import { ETAHeaderProps } from './ETAHeader.props';
import SmallCube from 'assets/svg/small_cube.svg';
import { Switch } from 'antd';
import { MainContext } from 'context/MainContext';
import { AuthContext } from 'context/AuthContext';
import { MinifiedSecurityDropdown } from '../SecurityDropdown';
import { SecurityDropdown } from 'components/snippets';
import { formatCurrency } from '../../../NewLearnMoreMarket/utils';
import { CURRENCIES } from 'common/consts';
import cn from 'classnames';

const ETAHeader: React.FC<ETAHeaderProps> = (props: ETAHeaderProps) => {
  const { expand } = useContext(MainContext);
  const { isLogin } = useContext(AuthContext);

  return (
    <>
      <div
        className={cn(
          'flex flex-row eta-index-container z-[5] relative px-5 xl:mb-0 min-h-[75px] justify-between',
          !isLogin ? 'is-login' : ''
        )}
        style={{ display: isLogin ? 'none' : '' }}
      >
        <span>ACCESS MARKETS</span>
      </div>
      <div
        className={cn(
          'flex flex-row eta-index-container z-[100] relative px-5 xl:mb-0 min-h-[75px] justify-between',
          !isLogin ? 'invisible' : ''
        )}
        style={{ display: !isLogin ? 'none' : '' }}
      >
        <div
          className="market-container flex flex-row gap-x-3 items-center cursor-pointer w-1/4 min-w-[141px] py-[10px]"
          onClick={props.handleClickMarkets()}
        >
          <img src={SmallCube} alt="small cube" />
          <div className="flex flex-col">
            <h3 className="mb-0 text-[#474C55] text-[22px] leading-[22px] font-bold">
              ETA
            </h3>
            <span className="mb-0 text-[#474C55] text-[17px] leading-[17px]">
              MARKETS
            </span>
          </div>
        </div>
        {/* Security Dropdown */}
        <div
          className={`dropdown-container ${expand ? 'w-[35%]' : 'w-1/2'} flex`}
        >
          <div className="security-autocomplete flex justify-center flex-col max-w-lg w-full m-auto">
            {/* <div className='security-autocomplete__label text-center pb-2 hide-mobile'> {securityHeaderLabel}</div> */}
            {!expand ? (
              <SecurityDropdown
                securities={props.securityList}
                security={props.activeSecurity}
                onSelect={props.handleSelectSecurity}
              />
            ) : (
              (props.lastPrice && (
                <MinifiedSecurityDropdown
                  lastPrice={`${formatCurrency(
                    props.lastPrice,
                    CURRENCIES.get(props.activeSecurity.region)
                  )}`}
                  yieldPercent={`${props.yieldValue.toFixed(2)}%`}
                />
              )) ||
              ''
            )}
          </div>
        </div>

        <div
          className={cn(
            'flex flex-row items-center justify-end min-w-[132px]',
            expand ? 'w-auto gap-x-2' : 'gap-x-4 w-[25%]'
          )}
        >
          <div className="flex flex-col text-right">
            <span
              className={`mb-0 text-[#343741] text-sm font-bold leading-none
          ${expand ? 'w-[51px]' : ''}`}
            >
              DEMO PRICING
            </span>
          </div>
          <Switch
            className="eta-perspective-switch"
            onChange={props.handleLockETA}
          />
        </div>
      </div>
    </>
  );
};

export default ETAHeader;
