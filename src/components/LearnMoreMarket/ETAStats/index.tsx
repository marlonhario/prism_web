import classNames from 'classnames';

import Security from 'common/interfaces/Security';
import { LearnMoreMarketETAStatsDiagram } from '../ETAStatsDiagram';
import { LearnMoreMarketETAStatsSnapshot } from '../ETAStatsSnapshot';
import './index.scss';

interface Props {
  etaTypeColor: string;
  activeSecurity: Security;
  profile: any;
  details: any;
  establishment: any;
  selectedIndex: number;
  alternate?: boolean;
  onSelectedIndexChange(index: number): void;
}

export function LearnMoreMarketETAStats({
  activeSecurity,
  etaTypeColor,
  profile,
  details,
  establishment,
  selectedIndex,
  alternate,
  onSelectedIndexChange
}: Props) {
  const renderPanelContent = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <LearnMoreMarketETAStatsDiagram />
        );

      case 2:
        return (
          <LearnMoreMarketETAStatsSnapshot
            activeSecurity={activeSecurity}
            etaTypeColor={etaTypeColor}
            profile={profile}
            details={details}
            establishment={establishment}
            alternate={alternate}
          />
        );

      default: return null;
    }
  }
  return (
    <div
      className={'learnmore-market-eta-stats'}
    >
      <div className={classNames('learnmore-market-eta-stats-titles', {
        [etaTypeColor]: true
      })}>
        <span
          className={classNames({
            active: selectedIndex === 0
          })}
          onClick={() => onSelectedIndexChange(0)}
        >
          PRICE CHART
        </span>

        <span
          className={classNames({
            active: selectedIndex === 1
          })}
          onClick={() => onSelectedIndexChange(1)}
        >
          PAYOFF PROFILE / YIELD FORECAST
        </span>

        <span
          className={classNames({
            active: selectedIndex === 2
          })}
          onClick={() => onSelectedIndexChange(2)}
        >
          SNAPSHOT
        </span>
      </div>

      <div className={'learnmore-market-eta-stats-panels'}>
        <div className={'learnmore-market-eta-stats-panel'}>
          {renderPanelContent()}
        </div>
      </div>
    </div>
  );
}