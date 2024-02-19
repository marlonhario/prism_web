import { Profile } from 'components/NewCubeModel';
import { CubeConfig } from 'components/NewCubeModel/config';
import { formatCurrency } from 'components/NewLearnMoreMarket/utils';
import { Resizable } from 'components/NewLearnMoreMarket/Resizable';
import { CustomShareVariableProps } from './CustomShareVariable.props';
import './CustomShareVariable.scss';
import classNames from 'classnames';

export default function CustomShareVariableView({
  eta,
  underlyingShare,
  etaData,
  etaMaturityData,
  lastPrice,
  maturityPrice,
  maturityTerm,
}: CustomShareVariableProps) {
  /**
   * render an indicator beside bar chart
   * @param position position of the indicator
   * @param profile payoff profile
   * @param value value to show
   * @param width width of the indicator
   * @returns 
   */
  const renderIndicator = (
    position: 'left' | 'right',
    profile: Profile,
    value: number,
    width: number
  ) => {
    const isLeft = position === 'left';
    const title = eta && CubeConfig.infographics.customShare[eta][profile];
    const currency = formatCurrency(Math.abs(value));
    const price = currency.split('.');

    return (
      <div
        className={classNames(
          'custom-share-variable-chart-slider-indicator flex flex-col absolute top-1/2 pr-[6px] pb-[6px] mt-[-25px] -translate-y-1/2',
          {
            'left-1/2 text-right': isLeft,
            'right-1/2 text-left': !isLeft,
          }
        )}
        style={{ width: width * 2.25 }}
      >
        <div>
          <span
            className={'eta-text-shadow leading-[16px] text-[28px] text-white'}
          >
            {price[0]}
          </span>

          <span
            className={'eta-text-shadow leading-[16px] text-[17px] text-white'}
          >
            .{price[1]}
          </span>
        </div>

        <div>
          <span className={'eta-text-shadow font-bold text-[13px] text-white'}>
            {title?.first}
          </span>

          <span className={'eta-text-shadow font-light text-[13px] text-white'}>
            {title?.second}
          </span>
        </div>
      </div>
    );
  };

  /**
   * render x-axis lines based on the given value
   * @param lines number of x-axis lines
   * @returns 
   */
  const renderAxisLines = (lines: number) => {
    return Array(lines)
      .fill('')
      .map((_, i) => <span key={i} className={'w-[0.5px] h-[5px] bg-white'} />);
  };

  return (
    <div
      className={
        'custom-share-variable flex flex-col w-full h-full overflow-auto prism-scrollbar'
      }
    >
      <div className={'custom-share-variable-header'}>
        <div
          className={
            'custom-share-variable-title pt-[26px] pb-[33px] px-[24px]'
          }
        >
          <span className={'font-light leading-[51px] text-[41px] text-white'}>
            Design a bespoke
            <br />
            PRISM Allocation by
            <br />
            using the variable sliders.
          </span>
        </div>
      </div>

      <div
        className={
          'custom-share-variable-body flex flex-1 flex-col pr-[15px] pl-[13px] mt-[34px]'
        }
      >
        <div className={'flex items-center justify-between'}>
          <div className={'flex flex-col'}>
            <span className={'leading-[20px] text-[13px] text-white'}>
              Underlying Share Price
            </span>

            <span
              className={
                'flex items-center h-[32px] leading-[20px] pl-[13px] border-l-[1px] border-white text-[17px] text-white'
              }
            >
              {formatCurrency(underlyingShare)}
            </span>
          </div>

          <div className={'flex flex-col gap-y-[7px]'}>
            <span className={'leading-[20px] text-[13px] text-white'}>
              Maturity Value of Underlying
            </span>

            <span
              className={
                'flex items-center justify-end h-[32px] leading-[20px] pr-[13px] border-r-[1px] border-white text-[17px] text-white'
              }
            >
              {formatCurrency(maturityPrice)}
            </span>
          </div>
        </div>

        <div
          className={
            'custom-share-variable-diagram flex flex-col h-full min-h-[454px] mt-[7px]'
          }
        >
          <Resizable
            render={(width, height) => {
              const xAxisTickWidth = width / 10;

              return (
                <div
                  className={`custom-share-variable-chart ${eta} flex flex-1 flex-col relative`}
                  style={{
                    width,
                    height,
                    flex: `0 0 ${height}px`,
                  }}
                >
                  <div
                    className={'flex items-end justify-between min-h-[114px]'}
                  >
                    <div className={'flex flex-col pb-[24px] pl-[16px]'}>
                      <span
                        className={
                          'leading-[16px] text-[17px] uppercase text-white'
                        }
                      >
                        Matched
                      </span>

                      <span
                        className={
                          'font-bold leading-[16px] text-[17px] uppercase text-white'
                        }
                      >
                        Price
                      </span>
                    </div>

                    <div
                      className={'flex flex-col pr-[16px] pb-[24px] text-right'}
                    >
                      <span
                        className={
                          'leading-[16px] text-[17px] uppercase text-white'
                        }
                      >
                        Maturity
                      </span>

                      <span
                        className={
                          'font-bold leading-[16px] text-[17px] uppercase text-white'
                        }
                      >
                        Allocation
                      </span>
                    </div>
                  </div>

                  <div className={'flex flex-1 justify-between relative'}>
                    <div
                      className={
                        'custom-share-variable-chart-slider-left relative z-[10]'
                      }
                      style={{ width: xAxisTickWidth }}
                    >
                      <div
                        className={classNames('absolute right-0 left-0', {
                          'top-0': eta !== 'red',
                          'bottom-0': eta === 'red'
                        })}
                        style={{ height: `${lastPrice}%` }}
                      >
                        {renderIndicator(
                          'left',
                          'growth',
                          etaData.growthETAPrice,
                          xAxisTickWidth
                        )}
                      </div>

                      <div
                        className={classNames('absolute right-0 left-0', {
                          'top-0': eta === 'red',
                          'bottom-0': eta !== 'red'
                        })}
                        style={{ height: `${100 - lastPrice}%` }}
                      >
                        {renderIndicator(
                          'left',
                          'income',
                          etaData.incomeETAPrice,
                          xAxisTickWidth
                        )}
                      </div>
                    </div>

                    <div
                      className={
                        'custom-share-variable-chart-slider-right relative z-[10]'
                      }
                      style={{ width: xAxisTickWidth }}
                    >
                      <div
                        className={classNames('absolute right-0 left-0', {
                          'top-0': eta !== 'red',
                          'bottom-0': eta === 'red'
                        })}
                        style={{ [eta !== 'red' ? 'bottom' : 'top']: `${100 - maturityPrice}%` }}
                      >
                        {renderIndicator(
                          'right',
                          'growth',
                          etaMaturityData.maturityGrowthETAPrice,
                          xAxisTickWidth
                        )}
                      </div>

                      <div
                        className={classNames('absolute right-0 bottom-0 left-0', {
                          'top-0': eta === 'red',
                          'bottom-0': eta !== 'red'
                        })}
                        style={{ [eta !== 'red' ? 'top' : 'bottom']: `${maturityPrice}%` }}
                      >
                        {renderIndicator(
                          'right',
                          'income',
                          etaMaturityData.maturityIncomeETAPrice,
                          xAxisTickWidth
                        )}
                      </div>
                    </div>

                    <div
                      className={
                        'custom-share-variable-chart-xaxis flex justify-between absolute right-0 bottom-0 left-0'
                      }
                    >
                      {renderAxisLines(10)}
                    </div>
                  </div>
                </div>
              );
            }}
          />

          <div className={'flex items-center mt-[7px]'}>
            <span
              className={'flex-1 leading-[13px] mr-auto text-[11px] text-white'}
            >
              Establishment Date
            </span>

            <span className={'leading-[20px] text-[13px] text-white'}>
              {maturityTerm} {maturityTerm > 1 ? 'Years' : 'Year'} Term
            </span>

            <span
              className={
                'flex-1 leading-[13px] ml-auto text-[11px] text-right text-white'
              }
            >
              Maturity Date
            </span>
          </div>
        </div>
      </div>

      <div
        className={'custom-share-variable-footer px-[20px] pb-[24px] mt-[24px]'}
      >
        <div>
          <span className={'font-bold leading-[20px] text-[13px] text-white'}>
            Matched Price
          </span>
          &nbsp;
          <span className={'leading-[20px] text-[13px] text-white'}>
            Upfront cost of the ETA
          </span>
        </div>

        <div>
          <span className={'font-bold leading-[20px] text-[13px] text-white'}>
            Maturity Allocation
          </span>
          &nbsp;
          <span className={'leading-[20px] text-[13px] text-white'}>
            Capital returned to each ETA holder upon expiry
          </span>
        </div>
      </div>
    </div>
  );
}
