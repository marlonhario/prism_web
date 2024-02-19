import { useCallback, useState, Fragment, useEffect, useContext } from 'react';
import { AnimateSharedLayout, motion, Variants } from 'framer-motion';

import { ETACubeProps } from './ETACube.props';
import { NewCubeModel, Perspective, Profile } from 'components/NewCubeModel';
import { isEmpty, map } from 'lodash';
import cn from 'classnames';
import NewDetailedView from '../NewDetailedView';
import { ProfileInterface } from 'common/interfaces/ETAShowcase/Profile';
import { Slider } from 'components/NewCubeModel/Slider';
import { CubeConfig } from 'components/NewCubeModel/config';
import { usePerspectiveSliderContext } from 'context/PerspectiveSliderContext';
import { AuthContext } from 'context/AuthContext';
import { MainContext } from 'context/MainContext';
import ETACubeMobile from './ETACube.mobile';

export interface ETACubeState {
  etaType?: Perspective | '';
  etaTypeTemp?: Perspective;
  profileType?: Profile;
  positionIndex: number;
  showType?: 'interval' | 'hover';
}

const ETACube: React.FC<ETACubeProps> = (props: ETACubeProps) => {
  const { isLogin } = useContext(AuthContext);
  const { slider, setSlider } = usePerspectiveSliderContext();
  const {
    expand: isEducationPanelExpanded,
  } = useContext(MainContext);
  // const getETAInfo = () => {
  //   type ObjectKey = keyof typeof props.growthProfile;
  //   const etaType = props.etaType as ObjectKey;
  //   return `Connecting ${props.growthProfile[etaType].label} Investors with ${props.incomeProfile[etaType].label} Investors`;
  // };
  const [state, setState] = useState<ETACubeState>({
    positionIndex: 0,
  });

  const hasActiveSecurity = Object.keys(props.activeSecurity || {}).length > 0;

  const canView = hasActiveSecurity && !!props.etaType;

  const slidersInfographic =
    CubeConfig.infographics.sliders[props.etaType as Perspective];

  const growthTextMap: any = {
    red: 'GUARDED',
    green: 'NEUTRAL',
    blue: 'AGGRESSIVE',
    purple: 'AGGRESSIVE',
  };

  const incomeTextMap: any = {
    red: 'AGGRESSIVE',
    green: 'NEUTRAL',
    blue: 'GUARDED',
    purple: 'GUARDED',
  };

  const getMap = useCallback(
    (profileType: string = '') => {
      const map: any = {
        red: profileType === 'growth' ? 150 : -150,
        blue: profileType === 'growth' ? -150 : 150,
        green: 0,
      };

      return map[state?.etaTypeTemp || ''] || 0;
    },
    [state?.etaTypeTemp]
  );

  const variants = {
    initial: {
      color: '#474C55',
      opacity: 0.3,
      transition: {
        delay: 0.5,
      },
    },
    animate: {
      color: '#ffffff',
      opacity: 1,
    },
  };

  const aggressiveProfile: Variants = {
    initial: {
      y: getMap('growth'),
      color: '#474C55',
      opacity: 0,
      transition: {
        delay: 0.5,
      },
    },
    animate: {
      y: getMap('growth'),
      color: state?.profileType === 'growth' ? '#ffffff' : '#474C55',
      opacity: 1,
      transition: {
        bounce: 0,
        stiffness: 0,
      },
    },
  };

  const guardedProfile: Variants = {
    initial: {
      y: getMap('income'),
      color: '#474C55',
      opacity: 0,
      transition: {
        delay: 0.5,
      },
    },
    animate: {
      y: getMap('income'),
      color: state?.profileType === 'income' ? '#ffffff' : '#474C55',
      opacity: 1,
      transition: {
        bounce: 0,
        stiffness: 0,
      },
    },
  };

  useEffect(() => {
    if (props.etaType) {
      setState({ positionIndex: 0 });
    }
  }, [props.etaType]);

  /**
   * @description handles the allocation change of the sliders
   * @param index 
   * @param value 
   * @param etaType 
   * @param skip 
   */
  const handleAllocationChange = (
    index: number,
    value: number,
    etaType: Perspective | '',
    skip = false
  ) => {
    if (index === 0) {
      const nextValue = props.lockETA
        ? value > 100 - props.sliderPercentage[1]
          ? props.sliderPercentage[0]
          : value
        : value;
      props.handleETAPercentageChange(
        [nextValue, props.lockETA ? props.sliderPercentage[1] : 100 - value],
        etaType || ''
      );

      if (!skip) {
        setSlider([
          nextValue,
          props.lockETA ? props.sliderPercentage[1] : 100 - value,
        ]);
      }
    } else {
      const nextValue = props.lockETA
        ? value > 100 - props.sliderPercentage[0]
          ? props.sliderPercentage[1]
          : value
        : value;
      props.handleETAPercentageChange(
        [props.lockETA ? props.sliderPercentage[0] : 100 - value, nextValue],
        etaType || ''
      );

      if (!skip) {
        setSlider([
          props.lockETA ? props.sliderPercentage[0] : 100 - value,
          nextValue,
        ]);
      }
    }
  };

  useEffect(() => {
    handleAllocationChange(0, props.sliderPercentage[0], props.etaType || '', true);
  }, [slider, props.etaType]);

  return (
    <div
      id="eta-cube"
      className={`flex eta-content justify-center w-full relative eta-index-container xl:px-6 2xl:px-10 color-white h-full ${props.isMobileCubeView ? 'overflow-scroll overflow-x-hidden' : ''
        }`}
    >
      <div
        className={`flex flex-col w-full h-full ${props.isMobileCubeView ? 'justify-start' : 'justify-center'
          }`}
      >
        <AnimateSharedLayout>
          {props.isMobileCubeView ? (
            <ETACubeMobile
              {...props}
              hasActiveSecurity={hasActiveSecurity}
              canView={hasActiveSecurity}
              etaType={props.etaType}
              setState={setState}
              handleAllocationChange={handleAllocationChange}
              handleSecurityChange={props.handleSecurityChange}
            />
          ) : (
            <div className="eta-showcase-content flex flex-row justify-between w-full gap-x-2 sm:gap-x-5 xl:gap-x-0">
              {!isEmpty(props.activeEtaType) && !isEmpty(props.etaType) && (
                <div
                  className={cn(
                    'relative growth-col w-1/2 lg:w-1/4 flex order-1 self-start justify-center min-h-[680px] mt-[-50px]',
                    !isLogin ? 'invisible' : '',
                    {
                      flex:
                        !isEmpty(props.activeEtaType) &&
                        !isEmpty(props.etaType),
                    }
                  )}
                  style={{ position: 'relative', zIndex: 9, order: 1 }}
                >
                  <div
                    className={cn(
                      'growth-profile-container w-full self-center',
                      {
                        'opacity-30':
                          !isEmpty(props.activeEtaType) &&
                          isEmpty(props.etaType) &&
                          props.activeEtaType !== 'growth',
                      }
                    )}
                    style={{ zIndex: 9 }}
                  >
                    {map(props.growthProfile, (profile, i) => (
                      <Fragment key={i}>
                        {props.etaType === profile.type &&
                          !isEmpty(props.activeEtaType) &&
                          !isEmpty(props.etaType) && (
                            <NewDetailedView
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
                    className={`absolute w-11/12
              ${isEducationPanelExpanded
                        ? `${props.activeEtaType === 'growth' ? 'visible' : 'invisible'
                        } bottom-[-24px]`
                        : 'bottom-0'
                      }`}
                  >
                    <Slider
                      {...slidersInfographic?.[0]}
                      value={props.sliderPercentage[0]}
                      minValue={1}
                      maxValue={100}
                      step={1}
                      threshold={1}
                      // style={style}
                      // trackStyle={trackStyle}
                      // trackThumbStyle={trackThumbStyle}
                      onChange={(value) => {
                        handleAllocationChange(0, value, props.etaType || '');
                        props.setActiveEtaType('growth');
                      }}
                      onMouseDown={() => props.setActiveEtaType('growth')}
                    />
                  </div>
                </div>
              )}

              <div className="eta-showcase-content first-letter:flex flex-row justify-around gap-x-2 sm:gap-x-5 xl:gap-x-0 absolute top-0 bottom-0 left-0 right-0">
                <div>
                  <div
                    className={cn(
                      'flex items-center justify-center mx-auto w-[550px] h-[550px]',
                      !isLogin ? 'cursor-pointer' : ''
                    )}
                    onClick={() => {
                      if (!isLogin) props.setShowLogin(true);
                    }}
                  >
                    <NewCubeModel
                      showType={'hover'}
                      perspective={
                        !props.etaType || !isLogin
                          ? undefined
                          : (props.etaType as Perspective)
                      }
                      etaPairs={props.etaPairs}
                      etaType={state?.etaType}
                      profile={state?.profileType}
                      sliderProfile={props.activeEtaType || 'growth'}
                      allocations={props.eta.percentage}
                      sliderPercentage={props.sliderPercentage}
                      isDemo={props.lockETA}
                      hasActiveSecurity={hasActiveSecurity}
                      canView={canView}
                      onAllocationsChange={props.handleETAPercentageChange}
                      updateCubePercentage={props.updateCubePercentage}
                      onHover={(etaType, profileType, showType) => isLogin &&
                        setState((prev) => ({
                          ...prev,
                          showType: showType,
                          etaType: etaType,
                          etaTypeTemp: etaType || prev?.etaTypeTemp,
                          profileType,
                        }))
                      }
                    />
                  </div>
                </div>

                {!canView && (
                  <>
                    <div
                      className={cn(
                        'growth-rate-container z-10',
                        !isLogin ? 'invisible' : ''
                      )}
                    >
                      <div
                        className={
                          'flex items-center justify-end relative  h-full'
                        }
                      >
                        <motion.div
                          variants={variants}
                          initial={'initial'}
                          animate={
                            state?.profileType === 'growth'
                              ? 'animate'
                              : 'initial'
                          }
                          className={
                            'growth-rate flex flex-col w-[300px] h-[70px] rotate-[270deg]'
                          }
                        >
                          <div
                            className={
                              'font-extralight flex justify-center items-center absolute left-[50%] h-[80px] text-[90px] leading-[90px] translate-x-[-50%]'
                            }
                          >
                            GROWTH
                            <span
                              className={
                                'font-semibold absolute top-[-25px] left-[0px] text-[16px] leading-[16px]'
                              }
                            >
                              ALLOCATION
                            </span>
                          </div>
                        </motion.div>
                        {state.etaTypeTemp && (
                          <motion.div
                            variants={aggressiveProfile}
                            initial={'initial'}
                            animate={state?.profileType ? 'animate' : 'initial'}
                            className={
                              'growth-profile flex flex-col ml-5 text-center whitespace-pre'
                            }
                          >
                            <span className={'font-bold fonttext-[13px]'}>
                              RISK PROFILE
                            </span>

                            <span className={'text-[15px]'}>
                              {growthTextMap[state?.etaTypeTemp || '']}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div
                      className={cn(
                        'growth-rate-container z-10',
                        !isLogin ? 'invisible' : ''
                      )}
                    >
                      <div
                        className={
                          'flex flex-row-reverse items-center justify-end relative h-full'
                        }
                      >
                        <motion.div
                          variants={variants}
                          initial={'initial'}
                          animate={
                            state?.profileType === 'income'
                              ? 'animate'
                              : 'initial'
                          }
                          className={
                            'growth-rate flex flex-col w-[300px] h-[70px] rotate-[90deg]'
                          }
                        >
                          {state?.etaTypeTemp === 'purple' ? (
                            <div
                              className={
                                'font-extralight flex justify-center items-center absolute left-[50%] h-[80px] text-[63px] leading-[63px] whitespace-nowrap translate-x-[-50%]'
                              }
                            >
                              GROWTH & DIVIDEND
                              <span
                                className={
                                  'font-semibold absolute top-[-25px] left-[0px] text-[16px] leading-[16px]'
                                }
                              >
                                ALLOCATION
                              </span>
                            </div>
                          ) : (
                            <div
                              className={
                                'font-extralight flex justify-center items-center absolute left-[50%] h-[80px] text-[90px] leading-[90px] translate-x-[-50%]'
                              }
                            >
                              DIVIDEND
                              <span
                                className={
                                  'font-semibold absolute top-[-25px] left-[0px] text-[16px] leading-[16px]'
                                }
                              >
                                ALLOCATION
                              </span>
                            </div>
                          )}
                        </motion.div>
                        {state.etaTypeTemp && (
                          <motion.div
                            variants={guardedProfile}
                            initial={'initial'}
                            animate={state?.profileType ? 'animate' : 'initial'}
                            className={
                              'growth-profile flex flex-col mr-5 text-center whitespace-pre'
                            }
                          >
                            <span className={'font-bold fonttext-[13px]'}>
                              RISK PROFILE
                            </span>
                            <span className={'text-[15px]'}>
                              {incomeTextMap[state?.etaTypeTemp || '']}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {!isEmpty(props.activeEtaType) && !isEmpty(props.etaType) && (
                <div
                  className={cn(
                    'dividend-col dividend-items-align w-1/2 lg:w-1/4 flex self-start justify-center min-h-[680px] mt-[-50px]',
                    !isLogin ? 'invisible' : '',
                    {
                      'flex-row':
                        !isEmpty(props.activeSecurity) &&
                        !isEmpty(props.activeEtaType),
                    }
                  )}
                  style={{ position: 'relative', zIndex: 9 }}
                >
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

                  <div
                    className={`absolute w-11/12 text-[#FFFFFF]
              ${isEducationPanelExpanded
                        ? `${props.activeEtaType === 'income' ? 'visible' : 'invisible'
                        } bottom-[-24px]`
                        : 'bottom-0'
                      }`}
                  >
                    <Slider
                      {...slidersInfographic?.[1]}
                      value={props.sliderPercentage[1]}
                      minValue={1}
                      maxValue={100}
                      step={1}
                      threshold={1}
                      // style={style}
                      // trackStyle={trackStyle}
                      // trackThumbStyle={trackThumbStyle}
                      onChange={(value) => {
                        handleAllocationChange(1, value, props.etaType || '');
                        props.setActiveEtaType('income');
                      }}
                      onMouseDown={() => props.setActiveEtaType('income')}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </AnimateSharedLayout>
      </div>
    </div>
  );
};

export default ETACube;
