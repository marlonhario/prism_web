import { useContext, useState, Fragment, useEffect, useRef, useMemo } from 'react';
import cn from 'classnames';
import { isEmpty, map } from 'lodash';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { AuthContext } from 'context/AuthContext';
import { CURRENCIES, CURRENCY_SYMBOLS } from 'common/consts';
import { etaColorMap } from 'common/consts/etaColorMap';
import { ProfileInterface } from 'common/interfaces/ETAShowcase/Profile';
import useSelectorSafe from 'store/selectors/useSelectorSafe';
import { cubeAnimation } from 'pages/CustomShare/config';
import { NewCubeModel, Perspective } from 'components/NewCubeModel';
import { Slider } from 'components/NewCubeModel/Slider';
import { CubeConfig } from 'components/NewCubeModel/config';
import { formatCurrency, formatNumber } from 'components/NewLearnMoreMarket/utils';
import { ETACubeProps } from './ETACube.props';
import { ETACubeState } from './ETACube.view';
import NewDetailedView from '../NewDetailedView';
import { dropdownAnimation, dropdownItemAnimation, searchInputAnimation, searchTextAnimation } from './ETACube.animation';
import { ReactComponent as SearchIcon } from 'assets/svg/search.svg';
import CustomShareETAMarkets from 'assets/images/custom-share-eta-market.png';
import 'pages/ShowCase/styles.scss';
import './styles.mobile.scss'

interface ETACubeMobileProps
  extends ETACubeProps,
  Omit<ETACubeState, 'positionIndex'> {
  hasActiveSecurity: boolean;
  canView: boolean;
  setState: React.Dispatch<React.SetStateAction<ETACubeState>>;
  handleAllocationChange: (
    index: number,
    value: number,
    etaType: Perspective | '',
    skip: boolean
  ) => void;
}

const ETACubeMobile: React.FC<ETACubeMobileProps> = (props) => {
  const { isLogin } = useContext(AuthContext);

  const { prism } = useSelectorSafe((state) => state) || {};

  const inputRef = useRef<HTMLInputElement>(null);

  const [direction, setDirection] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const etaColors = useMemo(() => {
    return props.etaPairs.slice().sort().reverse();
  }, [props.etaPairs]);

  const slidersInfographic =
    CubeConfig.infographics.sliders[props.etaType as Perspective];

  const etaData = props.getActiveContent();
  const etaGrowthData = props.growthProfile[props.etaType || ''] || {};
  const etaIncomeData = props.incomeProfile[props.etaType || ''] || {};

  const handleCubeSwipe = (info: PanInfo) => {
    const currentIndex = etaColors.indexOf(props.etaType || '');
    const direction = info.offset.x < 0 ? 1 : -1;
    const nextIndex = currentIndex + direction;

    setDirection(direction);
    props.setEtaType(etaColors[
      nextIndex < 0 ? etaColors.length - 1 : nextIndex % etaColors.length
    ] as Perspective);
  };

  useEffect(() => {
    props.updateCubePercentage(props.etaType || etaColors[0] as Perspective, 'growth');
  }, [etaColors]);

  useEffect(() => {
    if (showSearch) {
      inputRef.current?.focus();
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    }
  }, [showSearch]);

  const renderFormattedCurrency = (currency: string) => {
    const price = currency.slice(1).split('.');

    return (
      <div>
        <sup className={'leading-[0.8] text-[14px] text-white'}>
          {CURRENCY_SYMBOLS.get(props.activeSecurity.region)}
        </sup>

        <span
          className={'font-light flex-1 leading-[25px] text-[22px] text-white'}
        >
          {price[0]}
        </span>

        <span
          className={'font-light flex-1 leading-[25px] text-[14px] text-white'}
        >
          .{price[1]}
        </span>
      </div>
    );
  };

  return (
    <div className={cn('mobile-etaCube-component flex flex-col relative h-full ', {
      'h-full overflow-hidden': !isLogin
    })}>
      <div className={'mobile-perspective-header flex items-center gap-x-[20px] relative px-[15px] z-[12]'}>
        <div
          className={cn(
            'market-container flex flex-row gap-x-3 items-center w-[35%] cursor-pointer',
          )}
          onClick={() => props.setShowMarkets(true)}
          style={{ display: !isLogin ? 'none' : '' }}
        >
          <img
            src={CustomShareETAMarkets}
            alt={''}
            style={{ width: 30 }}
          />

          <div className="flex flex-col font-din2014">
            <h3
              className={'mb-0 text-[white] font-light leading-[11px] text-[11px]'}
            >
              ETA
            </h3>
            <span
              className={'mb-0 text-[white] font-light leading-[11px] text-[11px]'}
            >
              MARKETS
            </span>
          </div>
        </div>

        <div
          className={
            'flex items-center absolute top-0 bottom-0 left-1/2 translate-x-[-50%]'
          }
        >
          <span
            className={
              'leading-[12px] text-[13px] uppercase text-[#5F6369] tracking-[0.03em]'
            }
          >
            Perspective
          </span>
        </div>

        {isLogin && (
          <div className={cn('flex items-center absolute right-[22px] top-0 bottom-0', {
            'w-[62%]': showSearch
          })}>
            <div
              className={cn('flex items-center justify-end gap-x-[9px] w-full', {
                'flex-col': !showSearch
              })}
            >
              <SearchIcon
                stroke={showSearch ? '#797D82' : 'white'}

                onClick={() => setShowSearch(!showSearch)}
              />

              <AnimatePresence>
                {showSearch ? (
                  <motion.input
                    {...searchInputAnimation}
                    ref={inputRef}
                    type={'search'}
                    value={search}
                    className={'mobile-perspective-search w-full h-[26px] px-[12px]'}
                    onChange={({ target: { value } }) => setSearch(value)}
                  />
                ) : (
                  <motion.span
                    {...searchTextAnimation}
                    className={'leading-[14px] text-[11px] text-white'}
                    onClick={() => setShowSearch(!showSearch)}
                  >
                    Search
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {isLogin ? (
        <div className={'mobile-perspective-body flex flex-col h-full overflow-x-hidden overflow-y-auto'}>
          <div className={'mobile-perspective-slider flex flex-col gap-y-[10px] relative mt-[15px] px-5 z-5'}>
            <div className={'mobile-perspective-slider-content flex items-center justify-center relative'}>
              <div
                className={'mobile-perspective-cube order-1 flex items-center justify-between'}
                style={{ zoom: (props.dimensions.width / 1200) * 1.25 }}
              >
                <motion.div
                  {...cubeAnimation}
                  key={props.etaType}
                  custom={direction}
                  drag={'x'}
                  className={
                    'order-1 flex flex-col relative w-[550px] h-[550px]'
                  }
                  onDragEnd={(_, info) => handleCubeSwipe(info)}
                >
                  <NewCubeModel
                    perspective={props.etaType || undefined}
                    etaPairs={[]}
                    etaType={props.etaType}
                    profile={'growth'}
                    sliderProfile={'growth'}
                    allocations={props.sliderPercentage}
                    sliderPercentage={props.sliderPercentage}
                    isDemo={false}
                    hasActiveSecurity={true}
                    hideViewText={true}
                    hideBackground={true}
                    canView={true}
                    onAllocationsChange={() => { }}
                    updateCubePercentage={() => { }}
                    onHover={(etaType, profileType, showType) => { }}
                  />
                </motion.div>
              </div>

              <div
                className={
                  'mobile-perspective-cube-growth order-0 flex flex-col justify-center relative w-[140px] px-[17px] py-[16px]'
                }
              >
                <span
                  className={
                    'leading-[1.4] text-[14px] uppercase text-white tracking-[0.04em]'
                  }
                >
                  Growth
                </span>

                <span
                  className={
                    'leading-[1.4] text-[23px] text-white tracking-[0.04em]'
                  }
                >
                  {props.etaType ? formatNumber(parseFloat(etaGrowthData.multipler.join('.')), 2) : '0.00'}x
                </span>

              </div>

              <div
                className={
                  'mobile-perspective-cube-yield order-2 flex flex-col justify-center relative w-[140px] px-[17px] py-[16px] text-right'
                }
              >
                <span
                  className={
                    'leading-[1.4] text-[14px] uppercase text-white tracking-[0.04em]'
                  }
                >
                  Yield
                </span>

                <span
                  className={
                    'leading-[1.4] text-[23px] text-white tracking-[0.04em]'
                  }
                >
                  {props.etaType ? formatNumber(parseFloat(etaIncomeData.yield.join('.')), 2) : '0.00'}%
                </span>
              </div>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {showSearch && (
              <motion.div
                {...dropdownAnimation}
                className={'mobile-perspective-dropdown absolute top-[47px] right-0 bottom-0 left-0 w-full bg-[#5F6369] z-[11] overflow-auto'}
              >
                {prism
                  ?.securities
                  .filter((security) => security.ticker.toLowerCase().includes(search.toLocaleLowerCase()) ||
                    security.longName.toLowerCase().includes(search.toLowerCase()))
                  .map((security, i) => (
                    <motion.div
                      {...dropdownItemAnimation}
                      key={security.ticker}
                      animate={{
                        ...dropdownItemAnimation.animate,
                        transition: {
                          delay: Math.min(i * 0.05, 0.05 * 35)
                        }
                      }}
                      className={cn('grid gap-x-3 h-[58px] px-[15px] items-center text-white', {
                        'bg-[#797D82]': i % 2 === 0
                      })}
                      onClick={() => {
                        props.updateCubePercentage('red', 'growth');
                        props.handleSecurityChange?.(security);
                        setShowSearch(false);
                        setSearch('');
                      }}
                    >
                      <div className="flex flex-col gap-y-[3px] text-left">
                        <span className="font-bold leading-[13px] text-[14px]] tracking-wider">
                          LAST PRICE
                        </span>

                        <span className="font-bold leading-[13px] text-[14px] tracking-wider">
                          {formatCurrency(security.lastPrice, CURRENCIES.get(security.region))}
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center overflow-hidden">
                        {/* <CustomImage
                          src={`/logos/${security.region}/${security.ticker}${whiteSecurityImageSuffix}.svg`}
                          alt={security.ticker}
                          defaultPath={`/logos/logoPending.svg`}
                          defaultWidth={100}
                          width={'80px'}
                          className="cursor-pointer h-9"
                        /> */}
                        <span className='font-din2014 font-extrabold text-4xl tracking-wider'>{security.ticker}</span>

                        <span className="w-full leading-[13px] text-[11px] uppercase tracking-wider text-center truncate">
                          {security.longName}
                        </span>
                      </div>

                      <div className="flex flex-col gap-y-[3px] text-right">
                        <span className="font-bold leading-[13px] text-[14px]] tracking-wider">
                          YIELD
                        </span>

                        <span className="font-bold leading-[13px] text-[14px] tracking-wider">
                          {(security.forwardDivYield * 100).toFixed(2)}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col px-[30px] z-10">
            <div className={'flex items-center justify-between mt-[-25px] mb-[25px]'}>
              <div className={'order-1 flex justify-center gap-x-[13px]'}>
                {etaColors.map((color, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center justify-center gap-x-[5px] w-[7px] h-[7px] rounded-full cursor-pointer',
                      {
                        ['border border-white']: props.etaType === color,
                      }
                    )}
                    style={{
                      backgroundColor: color
                        ? etaColorMap[color as Perspective].color
                        : '#FFFFFF',
                    }}
                    onClick={() => props.setEtaType(color as Perspective)}
                  />
                ))}
              </div>

              <div className={'order-0 flex-1'}>
                {renderFormattedCurrency(
                  formatCurrency(Math.abs(etaData.growthETAPrice))
                )}
              </div>

              <div className={'order-2 flex-1 text-right'}>
                {renderFormattedCurrency(
                  formatCurrency(Math.abs(etaData.incomeETAPrice))
                )}
              </div>
            </div>

            <Slider
              {...slidersInfographic?.[1]}
              value={props.sliderPercentage[1]}
              minValue={1}
              maxValue={100}
              step={1}
              threshold={1}
              rangeStyle={{
                opacity: 1,
                ...slidersInfographic?.[0].trackStyle
              }}
              onChange={(value) => {
                props.handleAllocationChange(
                  1,
                  value,
                  props.etaType || '',
                  false
                );
                props.setActiveEtaType('income');
              }}
              onMouseDown={() => props.setActiveEtaType('income')}
            />
          </div>

          <div className="mobile-etaCube-detailedView h-full px-[30px] my-[25px] z-9">
            <div
              className="mobile-etaCube-graph-wrapper relative flex flex-row gap-x-[41px]"
              style={{
                zoom: (props.dimensions.width / 1200) * 1.875
              }}
            >
              <div
                className={cn('growth-profile-container w-full self-center', {
                  'opacity-30':
                    !isEmpty(props.activeEtaType) &&
                    isEmpty(props.etaType) &&
                    props.activeEtaType !== 'growth',
                })}
                style={{ zIndex: 9 }}
              >
                {map(props.growthProfile, (profile, i) => (
                  <Fragment key={i}>
                    {props.etaType === profile.type &&
                      !isEmpty(props.activeEtaType) &&
                      !isEmpty(props.etaType) && (
                        <NewDetailedView
                          isMobileDetailedView
                          className={
                            props.etaType === profile.type &&
                              !isEmpty(props.activeEtaType) &&
                              !isEmpty(props.etaType)
                              ? 'flex container'
                              : 'hidden'
                          }
                          profile={profile as ProfileInterface}
                          profileType={'growth'}
                          content={props.getActiveContent()}
                          activeEtaType={props.activeEtaType}
                          activeSecurity={props.activeSecurity}
                          textColor={
                            props.activeEtaType === 'growth'
                              ? '#FFFFFF'
                              : '#C0C1C6'
                          }
                          setActiveEtaType={props.setActiveEtaType}
                        />
                      )}
                  </Fragment>
                ))}
              </div>

              <div
                className={cn(
                  'relative income-profile-container w-full self-center',
                  {
                    'opacity-30':
                      !isEmpty(props.activeEtaType) &&
                      isEmpty(props.etaType) &&
                      props.activeEtaType !== 'income',
                  }
                )}
              >
                {map(props.incomeProfile, (profile, i) => (
                  <Fragment key={i}>
                    {props.etaType === profile.type &&
                      !isEmpty(props.activeEtaType) &&
                      !isEmpty(props.etaType) && (
                        <NewDetailedView
                          isMobileDetailedView
                          className={
                            props.etaType === profile.type &&
                              !isEmpty(props.activeEtaType) &&
                              !isEmpty(props.etaType)
                              ? 'flex flex-col container items-end'
                              : 'hidden'
                          }
                          profile={profile as ProfileInterface}
                          profileType={'income'}
                          content={props.getActiveContent()}
                          activeEtaType={props.activeEtaType}
                          activeSecurity={props.activeSecurity}
                          textColor={
                            props.activeEtaType === 'income'
                              ? '#FFFFFF'
                              : '#C0C1C6'
                          }
                          setActiveEtaType={props.setActiveEtaType}
                        />
                      )}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={'mobile-perspective-cube order-1 flex items-center justify-between'}
          style={{ zoom: (props.dimensions.width / 1200) * 2.5 }}
        >
          <NewCubeModel
            perspective={undefined}
            etaPairs={[]}
            etaType={props.etaType}
            profile={'growth'}
            sliderProfile={'growth'}
            allocations={props.sliderPercentage}
            sliderPercentage={props.sliderPercentage}
            isDemo={false}
            hasActiveSecurity={true}
            hideBackground={true}
            canView={true}
            onAllocationsChange={() => { }}
            updateCubePercentage={() => { }}
            onHover={(etaType, profileType, showType) => { }}
            onClickCube={() => props.setShowLogin(true)}
          />
        </div>
      )}
    </div>
  );
}

export default ETACubeMobile;
