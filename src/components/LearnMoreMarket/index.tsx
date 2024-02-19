import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { toUpper } from 'lodash';
import { addMonths, format } from 'date-fns';

import { ISecurity } from 'common/interfaces';
import {
  growthProfileContent,
  incomeProfileContent
} from 'pages/Perspective/utils';
import { GetEstablishment, GetETADetails } from 'services/apiEndpoints';
import apiFetch from 'services/apiFetch';
import { getSplitTitle } from 'common/utils/String';
import { formatPrice } from './utils';
import { LearnMoreMarketETAStats } from './ETAStats';
import { LearnMoreMarketETANotes } from './ETANotes';
import { AddButton } from './AddButton';
import { ReactComponent as ArrowLeftIcon } from './arrow-left.svg';
import './index.scss';

interface Props {
  security: ISecurity;
  etaTypeColor: string;
  expanded?: boolean;
  onGoBack(): void;
}

interface State {
  details: any;
  establishment: any;
  selectedETAIndex: number;
  selectedStasIndex: number;
  selectedNotesIndex: number;
  isLoading: boolean;
}

export function LearnMoreMarket({
  security,
  etaTypeColor,
  expanded,
  onGoBack
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<State>({
    details: {},
    establishment: {},
    selectedETAIndex: 0,
    selectedStasIndex: 0,
    selectedNotesIndex: 0,
    isLoading: true
  });

  const currentGrowthProfile = useMemo(() => {
    const growthProfile = growthProfileContent as any;
    return growthProfile[etaTypeColor] || {};
  }, [etaTypeColor]);

  const currentIncomeProfile = useMemo(() => {
    const incomeProfile = incomeProfileContent as any;
    return incomeProfile[etaTypeColor] || {};
  }, [etaTypeColor]);

  useEffect(() => {
    const fetchSecurityETADetails = async () => {
      try {
        const etaType = toUpper(etaTypeColor);
        const [
          { data: detailsData },
          { data: establishmentData }
        ] = await Promise.all<any[]>([
          apiFetch(GetETADetails(security.ticker, etaType)),
          apiFetch(GetEstablishment(security.ticker))
        ]);
        const establishment = establishmentData.find((item: any) => item.etaType === etaType);

        setState((prev) => ({
          ...prev,
          details: detailsData,
          establishment: establishment || {},
          isLoading: false
        }))
      } catch (err) {
        console.error('fetchSecurityETADetails', err);
      }
    }

    fetchSecurityETADetails();
  }, [security, etaTypeColor]);

  useEffect(() => {
    const containerEl = containerRef.current;
    const elements = document.getElementsByClassName('learnmore-market-eta-panel');
    if (
      containerEl &&
      !containerEl.classList.contains('expanded') &&
      elements
    ) {
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        element.style.display = i === state.selectedETAIndex ? 'flex' : 'none';
      }
    }
  }, [state.selectedETAIndex]);

  const handleSelectedIndexChange = (key: string, value: number) => {
    setState((prev) => ({
      ...prev,
      [key]: value
    }));
  }

  return (
    <div
      ref={containerRef}
      className={classNames('learnmore-market', {
        expanded: expanded
      })}
    >
      <div className={'learnmore-market-header'}>
        <span
          className={'learnmore-market-header-action'}
          onClick={onGoBack}
        >
          <ArrowLeftIcon fill={'#C4C4C4'} />

          <span>back</span>
        </span>

        <span className={'learnmore-market-header-title'}>
          Underlying Share
        </span>
      </div>

      <div className={'learnmore-market-info hidden'}>
        <div className={'learnmore-market-info-desc'}>
          <div className={'learnmore-market-info-desc-item'}>
            <div>
              <img
                className={'learnmore-market-security-logo'}
                src={`/logos/${security.region}/${security.ticker}.svg`}
              />
            </div>

            <div>
              <span>
                {security.ticker}
              </span>

              <span className={'whitespace-nowrap'}>
                {security.longName}
              </span>
            </div>
          </div>

          <div className={'learnmore-market-info-desc-item'}>
            <div>
              <span>ETA ISSUE DATE</span>

              <span className={'upercase'}>
                {state.establishment.issueDate &&
                  format(new Date(state.establishment.issueDate), 'do MMMM yyyy')}
              </span>
            </div>

            <div>
              <span>PRICE AT ISSUE DATE</span>

              <span>$100.00</span>
            </div>

            <div>
              <span>MATURITY DATE</span>

              <span>
                {state.establishment.issueDate &&
                  format(addMonths(new Date(state.establishment.issueDate), 9.5 * 12), 'do MMMM yyyy')}
              </span>
            </div>

            <div>
              <span>REMAINING TERM</span>

              <span>9.5YRS</span>
            </div>

          </div>
        </div>
      </div>

      <div className={'learnmore-market-body'}>
        <div className={'learnmore-market-eta'}>

          <div
            className={classNames('learnmore-market-eta-titles', {
              [etaTypeColor]: true
            })}
          >
            <div
              className={classNames('learnmore-market-eta-title', {
                active: state.selectedETAIndex === 0
              })}
              onClick={() => handleSelectedIndexChange('selectedETAIndex', 0)}
            >
              <span>{getSplitTitle(currentGrowthProfile.label, 0)}</span>

              <span>{getSplitTitle(currentGrowthProfile.label, 1)}</span>

              <span>{currentGrowthProfile.subLabel}</span>
            </div>

            <div
              className={classNames('learnmore-market-eta-title', {
                active: state.selectedETAIndex === 1
              })}
              onClick={() => handleSelectedIndexChange('selectedETAIndex', 1)}
            >
              <span>{getSplitTitle(currentIncomeProfile.label, 0)}</span>

              <span>{getSplitTitle(currentIncomeProfile.label, 1)}</span>

              <span>{currentIncomeProfile.subLabel}</span>
            </div>
          </div>

          <div className={'learnmore-market-eta-panels prism-scrollbar'}>
            <div className={'learnmore-market-eta-panels-scroll'}>
              <div className='learnmore-market-eta-panel'>
                <div className={'learnmore-market-eta-panel-body'}>
                  <div className={'learnmore-market-eta-info'}>
                    <div className={'learnmore-market-eta-panel-info-desc'}>
                      <div className={'learnmore-market-eta-panel-info-desc-item'}>
                        <div>
                          <span>ETA CODE</span>

                          <span>
                            {state.details.underlyingSymbol}
                          </span>
                        </div>

                        <div>
                          <span>EXCHANGE</span>

                          <span>
                            {state.details.growthSymbol}
                          </span>
                        </div>

                        <div>
                          <span>VALUE ALLOCATION</span>

                          <span className={'uppercase'}>
                            {currentGrowthProfile.valueAllocation}
                          </span>
                        </div>

                        <div>
                          <span>RISK ALLOCATION</span>

                          <span className={'uppercase'}>
                            {currentGrowthProfile.capitalExposure}
                          </span>
                        </div>
                      </div>

                      <div className={'learnmore-market-eta-panel-info-desc-item'}>
                        <div>
                          <span>REMAINING TERM</span>

                          <span>9.5YRS</span>
                        </div>

                        <div>
                          <span>ESTABLISHMENT PRICE</span>

                          {formatPrice(state.details.growthEstablishmentPrice)}
                        </div>

                        <div>
                          <span>MATCH DISTANCE</span>

                          <span>5.07% ($4.97)</span>
                        </div>

                        <div>
                          <span>VALUE IN CIRCULATION</span>

                          <span>$435M</span>
                        </div>
                      </div>

                      <div className={'learnmore-market-eta-panel-info-desc-item'}>
                        <div>
                          <span>GROWTH MULTIPLE</span>

                          <span>9.5YRS</span>
                        </div>

                        <div>
                          <span>
                            24HR CHANGE
                          </span>

                          <span className={'text-[#38D41F]'}>
                            +3.89%
                          </span>
                        </div>

                        <div>
                          <span>BEST OFFER</span>

                          <span>$100.00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <LearnMoreMarketETAStats
                    etaTypeColor={etaTypeColor}
                    activeSecurity={security}
                    profile={currentGrowthProfile}
                    details={state.details}
                    establishment={state.establishment}
                    selectedIndex={state.selectedStasIndex}
                    onSelectedIndexChange={(index) => handleSelectedIndexChange('selectedStasIndex', index)}
                  />

                  <LearnMoreMarketETANotes
                    selectedIndex={state.selectedNotesIndex}
                    onSelectedIndexChange={(index) => handleSelectedIndexChange('selectedNotesIndex', index)}
                  />
                </div>
              </div>

              <div className='learnmore-market-eta-panel'>
                <div className={'learnmore-market-eta-panel-body'}>
                  <div className={'learnmore-market-eta-info'}>
                    <div className={'learnmore-market-eta-panel-info-desc'}>
                      <div className={'learnmore-market-eta-panel-info-desc-item'}>
                        <div>
                          <span>ETA CODE</span>

                          <span>{state.details.underlyingSymbol}</span>
                        </div>

                        <div>
                          <span>EXCHANGE</span>

                          <span>
                            {state.details.incomeSymbol}
                          </span>
                        </div>

                        <div>
                          <span>VALUE ALLOCATION</span>

                          <span className={'uppercase'}>
                            {currentIncomeProfile.valueAllocation}
                          </span>
                        </div>

                        <div>
                          <span>RISK ALLOCATION</span>

                          <span className={'uppercase'}>
                            {currentIncomeProfile.capitalExposure}
                          </span>
                        </div>
                      </div>

                      <div className={'learnmore-market-eta-panel-info-desc-item'}>
                        <div>
                          <span>REMAINING TERM</span>

                          <span>9.5YRS</span>
                        </div>

                        <div>
                          <span>ESTABLISHMENT PRICE</span>

                          {formatPrice(state.details.incomeEstablishmentPrice)}
                        </div>

                        <div>
                          <span>MATCH DISTANCE</span>

                          <span>5.07% ($4.97)</span>
                        </div>

                        <div>
                          <span>VALUE IN CIRCULATION</span>

                          <span>$435M</span>
                        </div>
                      </div>

                      <div className={'learnmore-market-eta-panel-info-desc-item'}>
                        <div>
                          <span>GROWTH MULTIPLE</span>

                          <span>9.5YRS</span>
                        </div>

                        <div>
                          <span>24HR CHANGE</span>

                          <span className={'text-[#38D41F]'}>
                            +3.89%
                          </span>
                        </div>

                        <div>
                          <span>BEST OFFER</span>

                          <span>$100.00</span>
                        </div>

                        <div>
                          <AddButton />
                        </div>
                      </div>
                    </div>
                  </div>

                  <LearnMoreMarketETAStats
                    etaTypeColor={etaTypeColor}
                    activeSecurity={security}
                    profile={currentIncomeProfile}
                    details={state.details}
                    establishment={state.establishment}
                    selectedIndex={state.selectedStasIndex}
                    alternate={true}
                    onSelectedIndexChange={(index) =>
                      handleSelectedIndexChange('selectedStasIndex', index)}
                  />

                  <LearnMoreMarketETANotes
                    selectedIndex={state.selectedNotesIndex}
                    onSelectedIndexChange={(index) =>
                      handleSelectedIndexChange('selectedNotesIndex', index)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}