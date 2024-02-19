import { useState } from 'react';
import { Tab } from '@headlessui/react';
import cn from 'classnames';

const STEPS: { title: string; content: string }[] = [
  {
    title: 'Identify',
    content: 'Select an underlying share and quantity to be converted to ETAs',
  },
  {
    title: 'Convert',
    content: 'Select an ETA colour pair to convert your holding to',
  },
  {
    title: 'Optimise',
    content:
      'Use the sliders to increase or decrease exposure to either element or unlock capital',
  },
];

const EquityOptimiserEducationView: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="h-full w-full overflow-y-auto optimiser-bg bg-[#464b54]">
      {/* // TODO: Create an article */}
      <div className="optimiser-container pt-6 text-white h-full overflow-y-hidden flex flex-col">
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="z-10">
            <Tab
              className={cn(
                'optimiser-tab text-left pl-12 w-[55%] h-16 relative text-2xl 2xl:text-3xl 4xl:text-[35px] top-[6px] font-light',
                selectedTab === 0
                  ? 'bg-transparent'
                  : 'bg-[#464b54] skew-x-[-20deg] origin-top'
              )}
            >
              <p
                className={cn(
                  'mb-0',
                  selectedTab === 0 ? '' : 'origin-top skew-x-[20deg]'
                )}
              >
                Equity Optimiser
              </p>
            </Tab>
            {/* <Tab
              className={cn(
                'optimiser-tab w-[45%] h-16 relative text-lg 2xl:text-xl 4xl:text-2xl font-light top-[2px]',
                selectedTab === 1
                  ? 'bg-transparent'
                  : 'bg-[#464b54] skew-x-[20deg] origin-top'
              )}
            >
              <p
                className={cn(
                  'mb-0',
                  selectedTab === 1 ? '' : 'origin-top skew-x-[-20deg]'
                )}
              >
                How does it work?
              </p>
            </Tab> */}
          </Tab.List>

          <Tab.Panels className="pt-20 4xl:pt-24 pr-7 pl-12 optimiser-tab-panels prism-scrollbar about-scrollbar overflow-y-auto overflow-x-hidden absolute mt-[6px] h-full">
            <div className="optimiser-overlay"></div>
            <Tab.Panel
              className={cn(
                'optimiser-tab-content overflow-y-auto overflow-x-hidden h-full prism-scrollbar about-scrollbar',
                selectedTab === 0 ? 'active' : ''
              )}
            >
              <div>
                <p className="mb-3 text-base light-text">
                  Prism has created a unique financial infrastructure, which
                  enables the separation of income and growth and realigns the
                  risk and reward from individual shares.
                </p>
                <p className="mb-6 text-base light-text">
                  With the ability to sell specific elements within the share,
                  investors can retain one element and forego another, unlocking
                  value from existing portfolios.
                </p>
                <div className="w-1/2 ">
                  {STEPS.map((step, i) => (
                    <div
                      className="flex flex-col step-container mb-5 text-[#9b9ea3] py-2"
                      key={i}
                    >
                      <span className="text-[21px]">
                        <span className="font-semibold">Step {i + 1}</span>{' '}
                        <span className="font-thin">{step.title}</span>
                      </span>
                      <span className="text-base step-content font-thin">
                        {step.content}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel
              className={cn(
                'optimiser-tab-content',
                selectedTab === 1 ? 'active' : ''
              )}
            >
              <div>
                <p className="text-base light-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default EquityOptimiserEducationView;
