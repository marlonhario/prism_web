import { learnMoreMarketTabs } from '../config';
import { LearnMoreMarketTabsProps } from '../types';
import { ETAOverview } from '../ETAOverview';
import { ETATimeline } from '../ETATimeline';
import './index.scss';
import { ETAHowToBuy } from '../ETAHowToBuy';

export function ETATabs(props: LearnMoreMarketTabsProps) {
  const {
    dimensions: { width },
    selectedTab,
    setSelectedTab
  } = props;

  const resize = width <= 564;

  // render tab content based on selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <ETAOverview {...props} />
        );

      case 1:
        return (
          <ETATimeline {...props} />
        );

      case 2:
        return (
          <ETAHowToBuy {...props} />
        );

      default: return null;
    }
  }

  return (
    <div className={'flex flex-col h-full'}>
      <div
        className={'learn-more-market-secondary-tabbar-titles flex items-center justify-around h-[40px] leading-[13px] text-[11px] text-white text-[10px] tracking-widest whitespace-nowrap'}
        // update letter spacing
        style={resize ? { fontSize: 8, letterSpacing: '0.05em' } : undefined}
      >
        {learnMoreMarketTabs.map((item, i) => (
          <span
            key={i}
            className={`learn-more-market-secondary-tabbar-title ${i === selectedTab ? 'active' : ''}`}
            // update padding
            style={resize ? { padding: '5px 5px 2px' } : { padding: '5px 10px 2px' }}
            onClick={() => setSelectedTab(i)}
          >
            {item}
          </span>
        ))}
      </div>

      <div className={'prism-scrollbar learn-more-market-secondary-tabbar-panel flex-1 rtl'}>
        <div className={'w-full h-full ltr'}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}