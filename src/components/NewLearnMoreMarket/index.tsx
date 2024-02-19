import { useEffect, useState } from 'react';

import apiFetch, { GetAnnualForecast, GetEstablishment, GetETADetails } from 'services/apiFetch';
import { DividendForecast } from 'common/interfaces/ETAShowcase/DividendForecast';
import { ETAs, LearnMoreMarketProps } from './types';
import { perspectivePairingMap } from './config';
import { Resizable } from './Resizable';
import { ETATabs } from './ETATabs';
import './index.scss';

interface State {
  eta: ETAs;
  profile: any;
  establishment: any;
  loading: boolean;
}

export function NewLearnMoreMarket(props: LearnMoreMarketProps) {
  const { activeSecurity, perspective } = props;

  const [state, setState] = useState<State>({
    eta: 'growth',
    profile: {},
    establishment: {},
    loading: true
  });

  const [dividendForecast, setDividendForecast] = useState<DividendForecast[]>([]);

  const [selectedTab, setSelectedTab] = useState<number>(0);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      eta: props.activeEtaType || 'growth'
    }));
  }, [props.activeEtaType]);

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));

    Promise.all([
      apiFetch(GetETADetails(activeSecurity.ticker, perspective.toUpperCase())),
      apiFetch(GetEstablishment(activeSecurity.ticker))
    ]).then(([detailsData, establishmentData]) => {
      const establishment = establishmentData.data.find((item: any) =>
        item.seriesPair === perspective.toUpperCase());
      setState((prev) => ({
        ...prev,
        profile: detailsData.data,
        establishment: establishment,
        loading: false
      }));
    });
  }, [activeSecurity, perspective]);

  useEffect(() => {
    if (state.eta === 'income') {
      apiFetch(GetAnnualForecast(activeSecurity.ticker))
        .then((res) => {
          const data = res.data as DividendForecast[];
          const forecast = data.sort((a, b) =>
            new Date(a.declareDate).getMilliseconds() - new Date(b.declareDate).getMilliseconds()
          );
          setDividendForecast(forecast);
        });
    } else {
      setDividendForecast([]);
    }
  }, [activeSecurity, state.eta]);

  /**
   * render header based on selected tab
   * @returns 
   */
  const renderHeader = () => {
    switch (selectedTab) {
      case 0:
        return (
          <div className={'learn-more-market-header-title overview flex items-center gap-x-[30px] relative'}>
            <div className={'font-semibold relative leading-[19px] text-[27px] text-[#353639] tracking-wide'}>
              <span>
                {perspectivePairingMap[perspective][state.eta].first}
              </span>

              <span className={'font-light'}>
                {perspectivePairingMap[perspective][state.eta].second}
              </span>
            </div>

            <div className={'flex flex-col leading-[15px]'}>
              <span>
                {activeSecurity.ticker}
              </span>

              <span className={'text-white uppercase whitespace-nowrap'}>
                {activeSecurity.longName}
              </span>
            </div>
          </div>
        );

      case 1:
      case 2:
        return (
          <div className={'learn-more-market-header-title flex items-center gap-x-[30px] relative'}>
            <div className={'flex flex-col leading-[15px]'}>
              <span>
                {activeSecurity.ticker}
              </span>

              <span className={'text-white uppercase whitespace-nowrap'}>
                {activeSecurity.longName}
              </span>
            </div>
          </div>
        );

      default: return null;
    }
  }

  return (
    <Resizable
      render={(width, height) => (
        <div className={'learn-more-market font-din2014 w-full h-full'}>
          <div className={'learn-more-market-content flex flex-col w-full h-full'}>
            <div className={'learn-more-market-header relative'}>
              {renderHeader()}
            </div>

            <div className={'learn-more-market-body flex flex-1 flex-col relative h-full'}>
              <ETATabs
                {...props}
                eta={state.eta}
                dividendForecast={dividendForecast}
                profile={{
                  ...state.profile,
                  pairingMap: perspectivePairingMap[perspective][state.eta]
                }}
                dimensions={{ width, height }}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            </div>
          </div>
        </div>
      )}
    />
  );
}