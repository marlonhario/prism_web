import { useMemo } from 'react';
import { motion } from 'framer-motion';

import { usePerspectiveSliderContext } from 'context/PerspectiveSliderContext';
import { REGIONS } from 'common/consts';
import { LearnMoreMarketTabsProps, } from '../types';
import { calculateETAData } from '../utils';
import './index.scss';

export function ETAHowToBuy(props: LearnMoreMarketTabsProps) {
  const { slider: sliderLeft } = usePerspectiveSliderContext();

  const {
    activeSecurity,
    perspective,
    eta,
    profile,
  } = props;

  const isGrowth = eta === 'growth';

  const etaData = useMemo(() => {
    return calculateETAData(
      profile,
      activeSecurity.lastPrice,
      activeSecurity.forwardDivYield,
      sliderLeft[0],
    );
  }, [activeSecurity, profile, sliderLeft]);

  return (
    <div className={'learn-more-market-eta-howtobuy flex flex-col h-full'}>
      <div className={`learn-more-market-eta-howtobuy-header ${perspective} ${eta}`}>
        <div className={'learn-more-market-eta-howtobuy-header-title flex flex-col items-center justify-center gap-y-[9px] tracking-wider'}>
          <span className={'flex leading-[25px] leading-[25px] mt-[14px] text-[13px] text-white'}>
            <span className={'font-bold'}>{profile.pairingMap.first}</span>{profile.pairingMap.second} ETA CODE
          </span>

          <motion.span
            key={`${perspective}-${eta}`}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className={'font-extralight leading-[25px] text-[41px] tracking-wider'}
          >
            {isGrowth ? profile.growthSymbol : profile.incomeSymbol}
          </motion.span>
        </div>


        <div className={'learn-more-market-eta-howtobuy-header-subheader flex items-center justify-center pt-[6px] pb-[5px] gap-x-[10px] mt-[13px] leading-[13px] text-[11px] text-white tracking-widest bg-[#474C55]'}>
          <div className={'flex items-center'}>
            <span className={'font-bold text-[#C0C1C6]'}>EXCHANGE</span>
            <span className={'flex mt-[-1px] ml-[5px] text-[10px]'}>
              {REGIONS.find((region) => region.value === activeSecurity.region)?.name}
            </span>
          </div>

          <div>•</div>

          <div className={'flex items-center'}>
            <span className={'font-bold text-[#C0C1C6]'}>VALUE IN CIRCULATION</span>
            <span className={'flex mt-[-1px] ml-[5px] text-[10px]'}>{etaData.etaValueInCirculation}</span>
          </div>
        </div>
      </div>

      <div className={'flex flex-col gap-y-[20px] w-[80%] leading-[20px] py-[50px] mx-auto tracking-wider'}>
        <div className={'flex flex-col gap-y-[20px]'}>
          <span className={'text-[37px] text-white lead leading-none'}>
            How to buy and sell ETAs
          </span>

          <span className={'font-semibold text-[17px] text-white'}>
            Buying and selling ETAs is very similar to buying and selling shares. There are three key steps for investors to consider:
          </span>
        </div>

        <div className={'flex flex-col gap-y-[20px]'}>
          <div className={'flex flex-col gap-y-[20px]'}>
            <span className={'font-semibold text-[27px] text-white'}>
              1. Select your ETAs
            </span>

            <div className={'font-light flex flex-col gap-y-[20px] text-[16px] text-white'}>
              <span>Investors should begin by exploring the range of ETAs available. ETAs cover globally recognised securities, both single equities and ETFs.</span>

              <span>
                Use the Prism pricing tools to understand ETA pricing and determine an investment.
              </span>
            </div>
          </div>

          <div className={'flex flex-col gap-y-[20px] text-[16px] text-white'}>
            <span className={'font-semibold text-[27px] text-white'}>
              2. Review available information
            </span>

            <div className={'font-light flex flex-col gap-y-[20px] text-[16px] text-white'}>
              <span>
                Always read the Product Disclosure Statement (PDS) for the ETAs you are going to invest in. Be aware of the brokerage fee to trade on the exchange – this will vary depending on the broker you use and the size of the transaction. There are no custody fees involved.
              </span>
            </div>
          </div>

          <div className={'flex flex-col gap-y-[20px]'}>
            <span className={'font-semibold text-[27px] text-white'}>
              3. Trade using a broker
            </span>

            <div className={'font-light flex flex-col gap-y-[20px] text-[16px] text-white'}>
              <span>
                Investing in ETAs is like investing in shares. There is no minimum investment amount and no additional paperwork to set up accounts.
              </span>

              <span>
                To trade just find the 6-digit ticker code for the ETA you want to invest in and use it to find the ETA on your broker platform. The ETA codes can be found in a number of places on the Prism website, including the Available ETAs table and the Prism pricing tools.
              </span>
            </div>
          </div>

          <div className={'flex flex-col gap-y-[20px]'}>
            <span className={'font-semibold text-[17px] text-white'}>
              ETAs can be traded through any broker that trades securities on the Exchange.
            </span>

            <div className={'flex flex-col'}>
              <span className={'font-semibold text-[17px] text-white'}>
                First time trading?
              </span>

              <span className={'font-semibold text-[17px] text-white'}>
                For new investors there are a few terms to be aware of:
              </span>
            </div>
          </div>

          <div className={'flex flex-col gap-y-[20px]'}>
            <div className={'flex gap-x-[10px]'}>
              <span className={'font-semibold w-[80px] text-white text-right'} style={{ flexShrink: 0 }}>
                Code:
              </span>

              <span className={'font-light text-white'}>
                This refers to the 6-digit ETA ticker code which identifies the specific ETA to buy.
              </span>
            </div>
          </div>

          <div className={'flex flex-col gap-y-[20px]'}>
            <div className={'flex gap-x-[10px]'}>
              <span className={'font-semibold w-[80px] text-white text-right'} style={{ flexShrink: 0 }}>
                Quantity:
              </span>

              <span className={'font-light text-white'}>
                Enter the number of ETAs to buy. The exchange may impose a $500 minimum initial purchase for each ETA.
              </span>
            </div>
          </div>

          <div className={'flex flex-col gap-y-[20px]'}>
            <div className={'flex gap-x-[10px]'}>
              <span className={'font-semibold w-[80px] text-white text-right'} style={{ flexShrink: 0 }}>
                Price limit:
              </span>

              <span className={'font-light text-white'}>
                Tick the box ‘at market’ to buy at the ETA’s current price.
              </span>
            </div>
          </div>

          <div className={'flex flex-col gap-y-[20px]'}>
            <div className={'flex gap-x-[10px]'}>
              <span className={'font-semibold w-[80px] text-white text-right'} style={{ flexShrink: 0 }}>
                Expiry:
              </span>

              <span className={'font-light text-white'}>
                Tick the box ‘good for day’ to buy at the ETA’s closing trade for that day.
              </span>
            </div>
          </div>

          <div className={'flex flex-col mt-[20px]'}>
            <span className={'font-semibold text-[17px] text-white'}>
              Any questions? Visit our FAQs page for more information about buying ETAs.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}