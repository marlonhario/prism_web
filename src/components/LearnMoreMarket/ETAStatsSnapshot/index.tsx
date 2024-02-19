import classNames from 'classnames';

import Security from 'common/interfaces/Security';
import NewDetailedView from 'components/fragments/ETAShowCase/NewDetailedView';
import './index.scss';

interface Props {
  activeSecurity: Security;
  etaTypeColor: string;
  profile: any;
  details: any;
  establishment: any;
  alternate?: boolean;
}


export function LearnMoreMarketETAStatsSnapshot({
  activeSecurity,
  etaTypeColor,
  profile,
  details,
  establishment,
  alternate
}: Props) {
  const renderPanelContent = () => {
    return (
      <NewDetailedView
        setActiveEtaType={(activeEtaType) => {}}
        className={'flex container'}
        profile={profile}
        profileType={alternate ? 'income' : 'growth'}
        content={{} as any}
        activeEtaType={etaTypeColor}
        activeSecurity={activeSecurity}
      />
    );
  }

  return (
    <div
      className={classNames('learnmore-market-eta-stats-snapshot', {
        alternate: alternate,
        [etaTypeColor]: true
      })}
    >
      {renderPanelContent()}
    </div>
  );
}