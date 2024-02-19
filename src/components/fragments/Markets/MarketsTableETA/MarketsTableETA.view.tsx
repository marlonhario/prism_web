import { MarketsTableETAProps } from './MarketsTableETA.props';
import MarketsTableETAContent from '../MarketsTableETAContent';
import cn from 'classnames';
import { useContext, useState } from 'react';
import { Tab } from '@headlessui/react';
import ETATab from '../ETATab';
import { MainContext } from 'context/MainContext';
import './styles.scss';

const MarketsTableETAView: React.FC<MarketsTableETAProps> = (
  props: MarketsTableETAProps
) => {
  const { expand } = useContext(MainContext);
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div
      className={cn(
        'flex-row bg-[#474C55] markets-eta-container markets-table-eta-container',
        props.shown ? 'flex' : 'hidden',
        expand ? 'eta-expand' : ''
      )}
    >
      <div className="flex flex-col w-full">
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="justify-center text-lg markets-eta-tablist pt-4 flex flex-row gap-x-6">
            <Tab>
              <ETATab
                fill={selectedTab === 0 ? '#343741' : 'transparent'}
                width={216}
                path={
                  <path d="M11.253 9.4925C13.5141 3.76419 19.0468 0 25.2053 0H190.795C196.953 0 202.486 3.76419 204.747 9.4925L216 38H0L11.253 9.4925Z" />
                }
              >
                <span className="font-semibold">GROWTH</span> ETAs
              </ETATab>
            </Tab>
            <Tab>
              <ETATab
                fill={selectedTab === 1 ? '#343741' : 'transparent'}
                width={216}
                path={
                  <path d="M11.253 9.4925C13.5141 3.76419 19.0468 0 25.2053 0H190.795C196.953 0 202.486 3.76419 204.747 9.4925L216 38H0L11.253 9.4925Z" />
                }
              >
                <span className="font-semibold">DIVIDEND</span> ETAs
              </ETATab>
            </Tab>
          </Tab.List>
          {/* The content of the eta table */}
          <Tab.Panels className="px-3 bg-[#343741]">
            <Tab.Panel>
              <MarketsTableETAContent
                etas={props.growthETAs}
                ticker={props.security.ticker}
                selectedEtas={props.selectedEtas}
                security={props.security}
                type="GROWTH MULTIPLE"
                handleETAClick={props.handleETAClick}
              />
            </Tab.Panel>
            <Tab.Panel>
              <MarketsTableETAContent
                etas={props.divETAs}
                ticker={props.security.ticker}
                selectedEtas={props.selectedEtas}
                security={props.security}
                type="YIELD"
                handleETAClick={props.handleETAClick}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default MarketsTableETAView;
