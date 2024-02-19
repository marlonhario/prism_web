import { ETAListProps } from './ETAList.props';
import ETAListGroup from '../ETAListGroup';
import { useState, useContext } from 'react';
import { Tab } from '@headlessui/react';
import ETATab from '../ETATab';
import { GROWTH_ETAS, DIVIDEND_ETAS } from 'common/consts';
import { includes, map } from 'lodash';
import cn from 'classnames';
import { MainContext } from 'context/MainContext';


const ETAListView: React.FC<ETAListProps> = (props: ETAListProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { expand } = useContext(MainContext);

  /**
   * @param eta the selected
   */ 
  const updateSelectedEta = (eta: string) => (e:React.MouseEvent) => {
    let etas = [...props.selectedEtas];
    if(includes(props.selectedEtas, eta)) {
      etas = etas.filter(val => val !== eta);
    } else {
      etas.push(eta);
    }
    props.setSelectedEtas(etas);
  }

  return (
    <div className={cn("flex flex-col w-full text-white overflow-y-hidden h-full", expand ? 'eta-expand' : '')}>
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="justify-center markets-eta-tablist flex flex-row gap-x-3 pt-1">
          <Tab>
            <ETATab
              fill={selectedTab === 0 ? '#343741' : 'transparent'}
              path={
                !expand ? <path d="M11.0835 13.7964C13.7683 5.56777 21.4415 0 30.097 0L486.403 0C495.058 0 502.732 5.56779 505.417 13.7964L516.25 47H0.25L11.0835 13.7964Z" /> : <path d="M11.253 9.4925C13.5141 3.76419 19.0468 0 25.2053 0H190.795C196.953 0 202.486 3.76419 204.747 9.4925L216 38H0L11.253 9.4925Z" />
              }
              width={!expand ? 517 : 216}
            >
              <div className="flex gap-x-2 justify-center items-center">
                <span className={cn("text-lg", selectedTab !== 0 ? "text-[#FFFFFF4D]" : '')}>
                  <span className="font-semibold">GROWTH</span>{' '}
                  <span>ETAs</span>
                </span>
                {selectedTab === 0 ? (
                  map(GROWTH_ETAS, (eta) => (
                    <button
                      className={cn(
                        'eta-btn h-6 px-2 hide-mobile',
                        includes(
                          props.selectedEtas,
                          `${eta.first}${eta.second}`
                        )
                          ? `active active-${eta.first}${eta.second}`
                          : ''
                      )}
                      onClick={updateSelectedEta(`${eta.first}${eta.second}`)}
                      key={`${eta.first}${eta.second}`}
                    >
                      <span className="font-semibold">{eta.first}</span>
                      <span>{eta.second}</span>
                    </button>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </ETATab>
          </Tab>
          <Tab>
            <ETATab
              fill={selectedTab === 1 ? '#343741' : 'transparent'}
              path={
                !expand ? <path d="M11.0835 13.7964C13.7683 5.56777 21.4415 0 30.097 0L486.403 0C495.058 0 502.732 5.56779 505.417 13.7964L516.25 47H0.25L11.0835 13.7964Z" /> : <path d="M11.253 9.4925C13.5141 3.76419 19.0468 0 25.2053 0H190.795C196.953 0 202.486 3.76419 204.747 9.4925L216 38H0L11.253 9.4925Z" />
              }
              width={!expand ? 517 : 216}
            >
              <div className="flex gap-x-2 justify-center items-center">
                <span className={cn("text-lg", selectedTab !== 1 ? "text-[#FFFFFF4D]" : '')}>
                  <span className="font-semibold">DIVIDEND</span>{' '}
                  <span>ETAs</span>
                </span>
                {selectedTab === 1 ? (
                  map(DIVIDEND_ETAS, (eta) => (
                    <button
                      className={cn(
                        'eta-btn h-6 px-2 hide-mobile',
                        includes(
                          props.selectedEtas,
                          `${eta.first}${eta.second}`
                        )
                          ? `active active-${eta.first}${eta.second}`
                          : ''
                      )}
                      onClick={updateSelectedEta(`${eta.first}${eta.second}`)}
                      key={`${eta.first}${eta.second}`}
                    >
                      <span className="font-semibold">{eta.first}</span>
                      <span>{eta.second}</span>
                    </button>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </ETATab>
          </Tab>
        </Tab.List>
        <Tab.Panels className="bg-[#343741] h-full">
          <Tab.Panel className="h-full">
            <ETAListGroup
              etas={props.growthETAs}
              selectedEtas={props.selectedEtas}
              setEtas={props.setGrowthETAs}
              handleETAClick={props.handleETAClick}
              type="GROWTH MULTIPLE"
            />
          </Tab.Panel>
          <Tab.Panel className="h-full">
            <ETAListGroup
              etas={props.divETAs}
              selectedEtas={props.selectedEtas}
              setEtas={props.setDivETAs}
              handleETAClick={props.handleETAClick}
              type="YIELD"
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ETAListView;
