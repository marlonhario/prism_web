import classNames from 'classnames';

import { ETAProfiles } from 'common/consts';
import { CustomShareProfileView } from 'context/CustomShareContext';
import NewColorButton from 'components/primitives/NewColorButton';
import MaturityTermSlider from 'components/primitives/MaturityTermSlider';
import { NewCubeModel, Perspective, Profile } from 'components/NewCubeModel';
import { CubeConfig } from 'components/NewCubeModel/config';
import { Slider } from 'components/NewCubeModel/Slider';
import {
  formatCurrency,
  formatNumber,
} from 'components/NewLearnMoreMarket/utils';
import DefaultCube from 'assets/images/cubes/eta-default.png';
import CustomShareETAMarkets from 'assets/images/custom-share-eta-market.png';
import { Typography } from './Typography';
import { CustomShareProps } from './CustomShare.props';
import './CustomShare.scss';
import PayoffChart from 'components/fragments/ETAShowCase/PayoffChart';
import { Bar, BarChart, ReferenceLine, Tooltip } from 'recharts';
import { useEffect } from 'react';

export default function CustomShareView({
  eta,
  etaColors,
  currency: propsCurrency,
  underlyingShare,
  dividendYield,
  etaData,
  etaMaturityData,
  dividendForecastData,
  cubePercentage,
  lastPrice,
  maturityPrice,
  maturityTerm,
  growthProfile,
  incomeProfile,
  growthChartColor,
  divChartColor,
  growthRiskExposure,
  incomeRiskExposure,
  profileView,
  onChangeETA,
  onChangeLastPrice,
  onChangeMaturityPrice,
  onChangeMaturityTerm,
  onChangeProfileView,
  onShowMarkets
}: CustomShareProps) {
  useEffect(() => {
    document
      .querySelector(
        `.recharts-surface .recharts-reference-line .recharts-label tspan`
      )
      ?.setAttribute('x', '240');
  }, [profileView]);

  const handleSliderChange = (
    slider: 'lastPrice' | 'maturityPrice',
    profile: Profile,
    value: number
  ) => {
    const isGrowth = profile === 'growth';

    if (value <= 0 || value >= 100) {
      return;
    }

    if (slider === 'lastPrice') {
      onChangeLastPrice(isGrowth ? value : 100 - value);
    }

    if (slider === 'maturityPrice') {
      onChangeMaturityPrice(isGrowth ? value : 100 - value);
    }
  };

  /**
   * render the formatted currency
   * @param currency formatter currency
   * @returns 
   */
  const renderFormattedCurrency = (currency: string) => {
    const symbol = currency.split('')[0];
    const price = currency.slice(1).split('.');

    return (
      <div>
        <sup className={'leading-[0.8] text-[24px] text-white'}>{symbol}</sup>

        <span
          className={'font-light flex-1 leading-[46px] text-[40px] text-white'}
        >
          {price[0]}
        </span>

        <span
          className={'font-light flex-1 leading-[46px] text-[25px] text-white'}
        >
          .{price[1]}
        </span>
      </div>
    );
  };

  /**
   * render interactive infographic of growth payoff profile of
   * current perspective
   * @returns 
   */
  const renderGrownInteractive = () => {
    const growthTitle = eta && CubeConfig.infographics.customShare[eta].growth;
    const growthSliderStyle = eta && CubeConfig.infographics.sliders[eta][0];

    return (
      <>
        <div className={'absolute top-0'}>
          <div className={'flex flex-col gap-y-[4px] mt-[26px]'}>
            <div className={'flex flex-col leading-[16px]'}>
              <Typography
                first={growthTitle?.first || ''}
                second={growthTitle?.second || ''}
                highlight={true}
              />

              <span
                className={
                  'leading-[16px] text-[13px] text-white eta-text-shadow'
                }
              >
                1ST Capital Exposure
              </span>
            </div>

            <div className={'flex flex-col'}>
              <span
                className={
                  'font-semibold leading-[40px] text-[13px] uppercase text-white'
                }
              >
                Growth Exposure
              </span>

              <span
                className={`leading-[40px] text-[41px]`}
                style={{ color: growthTitle?.color }}
              >
                {formatNumber(Number(etaData.growthValue), 2)}x
              </span>
            </div>
          </div>
        </div>

        {profileView === 'options' ? (
          <div className={'flex flex-col gap-y-[60px] w-full mt-[-65px]'}>
            <div className={'flex flex-col w-full gap-y-[22px]'}>
              <button
                className={`target-bid-btn w-full leading-[15px] py-[7px] text-[14px] uppercase text-white tracking-wider`}
              >
                Matched Price
              </button>

              <div className={'flex flex-col items-center gap-y-[19px]'}>
                {renderFormattedCurrency(formatCurrency(Math.abs(etaData.growthETAPrice), propsCurrency))}

                <Slider
                  {...growthSliderStyle}
                  value={lastPrice}
                  onChange={(value) =>
                    handleSliderChange('lastPrice', 'growth', Number(value))
                  }
                />
              </div>
            </div>

            <div className={'flex flex-col w-full gap-y-[22px]'}>
              <button
                className={`target-bid-btn w-full leading-[15px] py-[7px] text-[14px] uppercase text-white tracking-wider`}
              >
                Maturity Allocation
              </button>

              <div className={'flex flex-col items-center gap-y-[19px]'}>
                {renderFormattedCurrency(formatCurrency(Math.abs(etaMaturityData.maturityGrowthETAPrice), propsCurrency))}

                <Slider
                  {...growthSliderStyle}
                  value={maturityPrice}
                  onChange={(value) =>
                    handleSliderChange('maturityPrice', 'growth', value)
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <PayoffChart
              hasYAxis={true}
              color={growthChartColor.color}
              stroke={growthChartColor.stroke}
              content={{
                growthETAPrice: etaData.growthEstablishmentPrice,
                growthEstablishmentPrice: etaData.growthEstablishmentPrice,
                growthLastPrice: etaData.growthLastPrice,
                growthPercentageofShare: etaData.growthPercentageofShare,
                growthSymbol: '',
                incomeETAPrice: etaData.incomeEstablishmentPrice,
                incomeEstablishmentPrice: etaData.incomeEstablishmentPrice,
                incomeLastPrice: etaData.incomeLastPrice,
                incomePercentageofShare: etaData.incomePercentageofShare,
                incomeSymbol: '',
                normalisedGrowthPrice: etaData.normalisedGrowthPrice,
              }}
              profile={growthProfile}
              etaPercentFill={growthChartColor.etaPercentFill}
              riskExposure={growthRiskExposure}
              chartHeight={330}
              detailsPosition="h-[330px]"
              lastPrice={etaData.growthETAPrice}
              etaPrice={etaData.growthETAPrice}
              establishmentPrice={etaData.growthETAPrice}
              type="growth"
            />

            <div className={'flex flex-col items-center gap-y-[21px] mt-[39px]'}>
              <button
                className={`target-bid-btn w-full leading-[15px] py-[7px] text-[14px] uppercase text-white tracking-wider`}
              >
                Matched Price
              </button>

              {renderFormattedCurrency(formatCurrency(Math.abs(etaData.growthETAPrice), propsCurrency))}

              <Slider
                {...growthSliderStyle}
                value={lastPrice}
                onChange={(value) =>
                  handleSliderChange('lastPrice', 'growth', value)
                }
              />
            </div>
          </div>
        )}
      </>
    );
  };

  /**
   * render default infographic of growth payoff profile of
   * current perspective
   * @returns 
   */
  const renderGrowthDefault = () => {
    const growthProfiles = Object.values(ETAProfiles).filter(
      ({ profileType }) => profileType === 'growth'
    );

    return (
      <>
        <div className={'absolute top-0'}>
          <div className={'flex items-center gap-x-[8px]'}>
            <span
              className={'font-bold leading-[101px] text-[80px] text-[#C0C1C6]'}
            >
              {growthProfiles.length}
            </span>

            <div className={'flex flex-col gap-y-2 pt-1'}>
              <span
                className={'font-light leading-[25px] text-[38px] text-white'}
              >
                Growth
              </span>

              <span
                className={
                  'font-semibold leading-[25px] text-[27px] text-white'
                }
              >
                ETAs
              </span>
            </div>
          </div>

          <div>
            <span className={'leading-[20px] text-[17px] text-white'}>
              Offering full exposure
              <br />
              to <span className={'font-bold'}>price growth</span>
            </span>
          </div>
        </div>

        <div className={'flex flex-col gap-y-[72px] mt-[-70px]'}>
          {growthProfiles.map((profile, i) => {
            const selected = eta === profile.etaColor;
            const growthTitle =
              eta && CubeConfig.infographics.customShare[eta].growth;

            return (
              <div key={i}>
                <Typography
                  first={profile.name.first}
                  second={profile.name.last}
                  highlight={eta === profile.etaColor}
                  onClick={() => onChangeETA(profile.etaColor as Perspective)}
                />

                {selected && (
                  <div className={'flex flex-col gap-y-[2px]'}>
                    <div className={'flex flex-col'}>
                      <span
                        className={
                          'font-semibold leading-[22px] text-[13px] uppercase text-white'
                        }
                      >
                        Growth Exposure
                      </span>

                      <span
                        className={'leading-[40px] text-[41px]'}
                        style={{ color: growthTitle?.color }}
                      >
                        {formatNumber(Number(etaData.growthValue), 2)}x
                      </span>
                    </div>

                    <span
                      className={
                        'font-semibold text-[13px] uppercase text-white'
                      }
                    >
                      {profile.capitalExposure}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  /**
   * render infographic of growth payoff profile of
   * current perpective based on profile view
   * @returns 
   */
  const renderGrowthContent = () => {
    switch (profileView) {
      case 'default':
        return renderGrowthDefault();
      case 'options':
      case 'payoff':
        return renderGrownInteractive();
      default:
        return null;
    }
  };

  /**
   * render interactive infographic of income payoff profile of
   * current perspective
   * @returns 
   */
  const renderIncomeInteractive = () => {
    const incomeTitle = eta && CubeConfig.infographics.customShare[eta].income;
    const incomeSliderStyle = eta && CubeConfig.infographics.sliders[eta][1];

    return (
      <>
        <div className={'absolute top-0'}>
          <div className={'flex flex-col gap-y-[4px] mt-[26px]'}>
            <div className={'flex flex-col leading-[16px]'}>
              <Typography
                first={incomeTitle?.first || ''}
                second={incomeTitle?.second || ''}
                highlight={true}
              />

              <span
                className={
                  'leading-[16px] text-[13px] text-white eta-text-shadow'
                }
              >
                2nd Capital Exposure
              </span>
            </div>

            <div className={'flex flex-col'}>
              <span
                className={
                  'font-semibold leading-[40px] text-[13px] uppercase text-white'
                }
              >
                Running Yield
              </span>


              <span
                className={`leading-[40px] text-[41px]`}
                style={{ color: incomeTitle?.color }}
              >
                {formatNumber(Number(etaData.dividendValue), 2)}%
              </span>
            </div>
          </div>
        </div>

        {profileView === 'options' ? (
          <div className={'flex flex-col gap-y-[60px] w-full mt-[-65px]'}>
            <div className={'flex flex-col w-full gap-y-[22px]'}>
              <button
                className={`target-bid-btn w-full leading-[15px] py-[7px] text-[14px] uppercase text-white tracking-wider`}
              >
                Matched Price
              </button>

              <div className={'flex flex-col items-center gap-y-[19px]'}>
                {renderFormattedCurrency(formatCurrency(Math.abs(etaData.incomeETAPrice), propsCurrency))}

                <Slider
                  {...incomeSliderStyle}
                  value={100 - lastPrice}
                  onChange={(value) =>
                    handleSliderChange('lastPrice', 'income', value)
                  }
                />
              </div>
            </div>

            <div className={'flex flex-col w-full gap-y-[22px]'}>
              <button
                className={`target-bid-btn w-full leading-[15px] py-[7px] text-[14px] uppercase text-white tracking-wider`}
              >
                Maturity Allocation
              </button>

              <div className={'flex flex-col items-center gap-y-[19px]'}>
                {renderFormattedCurrency(formatCurrency(Math.abs(etaMaturityData.maturityIncomeETAPrice), propsCurrency))}

                <Slider
                  {...incomeSliderStyle}
                  value={100 - maturityPrice}
                  onChange={(value) =>
                    handleSliderChange('maturityPrice', 'income', value)
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="div-bar-chart">
              <BarChart
                id={`yield-graph-${eta}`}
                className="yield-graph"
                data={dividendForecastData}
                width={248}
                height={189}
                barSize={8}
                margin={{
                  top: 5,
                  bottom: 0,
                }}
              >
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="custom-tooltip div-bar-chart">
                          <p className={`label text-[${divChartColor.color}]`}>
                            {payload ? payload[0].payload.dividendETA : ''}
                          </p>
                        </div>
                      );
                    }
                  }}
                />
                <ReferenceLine
                  ifOverflow="extendDomain"
                  y={5}
                  stroke="white"
                  strokeDasharray="3 3"
                  position="end"
                  className="bar-reference-line"
                  label="5%"
                />
                <Bar
                  dataKey="dividendETA"
                  fill={divChartColor.barFill}
                  stroke={divChartColor.barStroke}
                  radius={[10, 10, 0, 0]}
                  name="Dividend ETA"
                />
              </BarChart>
            </div>
            <PayoffChart
              hasYAxis={false}
              color={divChartColor.color}
              stroke={divChartColor.stroke}
              content={{
                growthETAPrice: etaData.growthEstablishmentPrice,
                growthEstablishmentPrice: etaData.growthEstablishmentPrice,
                growthLastPrice: etaData.growthLastPrice,
                growthPercentageofShare: etaData.growthPercentageofShare,
                growthSymbol: '',
                incomeETAPrice: etaData.incomeEstablishmentPrice,
                incomeEstablishmentPrice: etaData.incomeEstablishmentPrice,
                incomeLastPrice: etaData.incomeLastPrice,
                incomePercentageofShare: etaData.incomePercentageofShare,
                incomeSymbol: '',
                normalisedGrowthPrice: etaData.normalisedGrowthPrice,
              }}
              profile={incomeProfile}
              etaPercentFill={divChartColor.etaPercentFill}
              riskExposure={incomeRiskExposure}
              chartHeight={189}
              detailsPosition="h-[189px]"
              lastPrice={etaData.incomeETAPrice}
              etaPrice={etaData.incomeETAPrice}
              establishmentPrice={etaData.incomeETAPrice}
              type="income"
            />

            <div className={'flex flex-col items-center gap-y-[21px] mt-[39px]'}>
              <button
                className={`target-bid-btn w-full leading-[15px] py-[7px] text-[14px] uppercase text-white tracking-wider`}
              >
                Matched Price
              </button>

              {renderFormattedCurrency(formatCurrency(Math.abs(etaData.growthETAPrice), propsCurrency))}

              <Slider
                {...incomeSliderStyle}
                value={100 - lastPrice}
                onChange={(value) =>
                  handleSliderChange('lastPrice', 'income', value)
                }
              />
            </div>
          </div>
        )}
      </>
    );
  };

  /**
   * render default infographic of income payoff profile of
   * current perspective
   * @returns 
   */
  const renderIncomeDefault = () => {
    const incomeProfiles = Object.values(ETAProfiles).filter(
      ({ profileType }) => profileType === 'income'
    );

    return (
      <>
        <div className={'absolute top-0'}>
          <div className={'flex items-center gap-x-[8px]'}>
            <span
              className={'font-bold leading-[101px] text-[80px] text-[#C0C1C6]'}
            >
              {incomeProfiles.length}
            </span>

            <div className={'flex flex-col text-right gap-y-2 pt-1'}>
              <span
                className={'font-light leading-[25px] text-[38px] text-white'}
              >
                Dividend
              </span>

              <span
                className={
                  'font-semibold leading-[25px] text-[27px] text-white'
                }
              >
                ETAs
              </span>
            </div>
          </div>

          <div className={'text-right'}>
            <span className={'leading-[20px] text-[17px] text-white'}>
              Offering full exposure <br />
              to <span className={'font-bold'}>dividend distributions</span>
            </span>
          </div>
        </div>

        <div className={'flex flex-col gap-y-[72px] mt-[-70px]'}>
          {incomeProfiles.map((profile, i) => {
            const selected = eta === profile.etaColor;
            const growthTitle =
              eta && CubeConfig.infographics.customShare[eta].income;

            return (
              <div key={i} className={'text-right'}>
                <Typography
                  first={profile.name.first}
                  second={profile.name.last}
                  highlight={eta === profile.etaColor}
                  onClick={() => onChangeETA(profile.etaColor as Perspective)}
                />

                {selected && (
                  <div className={'flex flex-col gap-y-[2px]'}>
                    <div className={'flex flex-col'}>
                      <span
                        className={
                          'font-semibold leading-[22px] text-[13px] uppercase text-white'
                        }
                      >
                        Running Yield
                      </span>

                      <span
                        className={'leading-[40px] text-[41px]'}
                        style={{ color: growthTitle?.color }}
                      >
                        {formatNumber(Number(etaData.dividendValue), 2)}%
                      </span>
                    </div>

                    <span
                      className={
                        'font-semibold text-[13px] uppercase text-white'
                      }
                    >
                      {profile.capitalExposure}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  /**
   * render infographic of income payoff profile of
   * current perpective based on profile view
   * @returns 
   */
  const renderIncomeContent = () => {
    switch (profileView) {
      case 'default':
        return renderIncomeDefault();
      case 'options':
      case 'payoff':
        return renderIncomeInteractive();
      default:
        return null;
    }
  };

  /**
   * render footer interactive content of current perpective 
   * based on profile view
   * @returns 
   */
  const renderFooterInteractive = () => {
    return (
      <>
        <div className={'flex flex-col w-1/2 gap-y-[15px] mb-[45px]'}>
          <div className={'flex items-center justify-between'}>
            <span className={'font-light flex-1 text-[14px] text-white'}>
              1 YEAR
            </span>

            <span
              className={
                'font-light flex-1 leading-[16px] text-center text-[16px] uppercase text-white opacity-60'
              }
            >
              Maturity <br />
              Term
            </span>

            <span
              className={'font-light flex-1 text-[14px] text-right text-white'}
            >
              10 YEARS
            </span>
          </div>

          <MaturityTermSlider
            value={maturityTerm}
            minValue={1}
            maxValue={10}
            showValue={true}
            onChange={onChangeMaturityTerm}
          />
        </div>

        <div className={'flex justify-between w-full'}>
          {etaColors.map((color, i) => (
            <NewColorButton
              key={i}
              eta={color}
              width={55}
              height={55}
              active={color === eta}
              onClick={onChangeETA}
            />
          ))}
        </div>
      </>
    );
  };

  /**
   * render footer default content of current perpective 
   * based on profile view
   * @returns 
   */
  const renderFooterDefault = () => {
    return (
      <>
        <span
          className={'font-bold leading-[101px] text-[80px] text-[#C0C1C6]'}
        >
          4
        </span>

        <span className={'text-[17px] text-center text-white'}>
          A choice of three risk profiles for either <br />
          <span className={'font-bold'}>Growth</span> OR{' '}
          <span className={'font-bold'}>Dividend</span> investors to choose from
        </span>
      </>
    );
  };

  /**
   * render footer content of current perpective 
   * based on profile view
   * @returns 
   */
  const renderFooterContent = () => {
    switch (profileView) {
      case 'default':
        return renderFooterDefault();
      case 'options':
      case 'payoff':
        return renderFooterInteractive();
      default:
        return null;
    }
  };

  return (
    <div className={'custom-share flex flex-col w-full h-full'}>
      <div
        className={
          'custom-share-header flex items-center gap-x-[20px] relative h-[75px] px-[15px] z-10'
        }
        style={{ flex: '0 0 75px' }}
      >
        <div
          className="market-container flex flex-row gap-x-3 items-center w-[22%] mr-auto cursor-pointer"
          onClick={onShowMarkets}
        >
          <img
            src={CustomShareETAMarkets}
            alt={''}
          />

          <div className="flex flex-col">
            <h3 className="mb-0 text-[white] text-[22px] leading-[22px] font-bold">
              ETA
            </h3>
            <span className="mb-0 text-[white] text-[17px] leading-[17px]">
              MARKETS
            </span>
          </div>
        </div>

        <div className={'flex-1'}>
          <div
            className={
              'custom-share-dropdown flex justify-between gap-x-[15px] relative h-[71px] cursor-pointer'
            }
          >
            <div
              className={
                'custom-share-dropdown-selected order-1 flex items-center justify-center gap-x-[10px] relative w-full h-full z-9'
              }
            >
              <img src={DefaultCube} alt={''} className={'order-1'} />

              <span className={'order-0 uppercase text-white tracking-widest'}>
                Whole
              </span>

              <span className={'order-2 uppercase text-white tracking-widest'}>
                Share
              </span>
            </div>

            <div
              className={
                'order-0 flex flex-col gap-y-[14px] py-[12px] pb-[8px] pl-[34px]'
              }
            >
              <span
                className={
                  'font-bold leading-[14px] text-[13px] text-white uppercase tracking-[0.03em]'
                }
              >
                Last Price
              </span>

              <span
                className={
                  'font-semibold leading-[20px] text-[17px] text-[#343741] uppercase tracking-wider'
                }
              >
                {formatCurrency(underlyingShare)}
              </span>
            </div>

            <div
              className={
                'order-2 flex flex-col gap-y-[14px] py-[12px] pr-[34px] pb-[8px] text-right'
              }
            >
              <span
                className={
                  'font-bold leading-[14px] text-[13px] text-white uppercase tracking-[0.03em]'
                }
              >
                Yield
              </span>

              <span
                className={
                  'font-semibold leading-[20px] text-[17px] text-[#343741] uppercase tracking-wider'
                }
              >
                {formatNumber(dividendYield, 2)}%
              </span>
            </div>
          </div>
        </div>

        <div className={'w-[22%]'} />
      </div>

      <div className={'custom-share-body w-full h-full'}>
        <div
          className={
            'custom-share-body-content flex gap-x-[20px] relative w-full h-full px-[20px]'
          }
        >
          {profileView !== 'default' && (
            <div
              className={
                'custom-share-view-toggler flex flex-col gap-y-[9px] absolute top-[45px] left-[50%] translate-x-[-50%] z-[10]'
              }
            >
              <div className={'flex cursor-pointer select-none'}>
                <span
                  className={
                    'leading-[16px] px-[24px] py-[8px] text-[19px] uppercase text-[#C0C1C6]'
                  }
                  onClick={() =>
                    onChangeProfileView(profileView === 'options' ? 'payoff' : 'options')
                  }
                >
                  {profileView === 'options'
                    ? 'View Payoff Profiles'
                    : 'View Option Profile'}
                </span>
              </div>

              <div className={'flex items-center justify-center gap-x-[13px]'}>
                {['options', 'payoff'].map((profile, i) => (
                  <span
                    key={i}
                    className={classNames(
                      'w-[7px] h-[7px] rounded-full bg-[#797D82] cursor-pointer',
                      {
                        ['bg-[#474C55]']: profileView === profile,
                      }
                    )}
                    onClick={() =>
                      onChangeProfileView(profile as CustomShareProfileView)
                    }
                  />
                ))}
              </div>
            </div>
          )}

          <div className={'order-1 flex items-center justify-center'}>
            <NewCubeModel
              perspective={eta}
              etaPairs={[]}
              etaType={eta}
              profile={'growth'}
              sliderProfile={'growth'}
              allocations={cubePercentage}
              sliderPercentage={cubePercentage}
              isDemo={false}
              hasActiveSecurity={true}
              hideViewText={true}
              hideBackground={profileView !== 'default'}
              canView={true}
              customShare={profileView === 'default'}
              onClickCube={() => onChangeProfileView('options')}
              onAllocationsChange={() => { }}
              updateCubePercentage={() => { }}
              onHover={(etaType, profileType, showType) => { }}
            />
          </div>

          <div
            className={
              'order-0 flex flex-col items-start justify-center gap-y-[40px] relative w-[20%] mt-[45px] mr-auto ml-[70px] z-10'
            }
          >
            {renderGrowthContent()}
          </div>

          <div
            className={
              'order-2 flex flex-col items-end justify-center gap-y-[40px] relative w-[20%] mt-[45px] mr-[70px] ml-auto text-right z-10'
            }
          >
            {renderIncomeContent()}
          </div>
        </div>
      </div>

      <div
        className={
          'custom-share-footer flex flex-col items-center space-between absolute bottom-[20px] left-[50%] translate-x-[-50%] w-2/3 z-10'
        }
      >
        {renderFooterContent()}
      </div>
    </div>
  );
}
