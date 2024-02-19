import strategiesHeaderBg from "../../images/strategiesHeaderBg.png";
import MaxGrowth from '../../images/cubes/MaxGrowth.png';
import DivGuard from '../../images/cubes/DivGuard.png';
import PureDiv from '../../images/cubes/PureDiv.png';
import PureGrowth from '../../images/cubes/PureGrowth.png';
import GrowthGuard from '../../images/cubes/GrowthGuard.png';
import MaxDiv from '../../images/cubes/MaxDiv.png';
import RedPairing from '../../images/cubes/RedPairing.png';
import BluePairing from '../../images/cubes/BluePairing.png';
import GreenPairing from '../../images/cubes/GreenPairing.png';
import { EtaColorCode } from '../payoff-chart/constants';
import { map, includes } from 'lodash';
import cn from 'classnames';

const EtaTypeImages = {
  MaxGrowth, DivGuard, PureDiv, PureGrowth, GrowthGuard, MaxDiv, RedPairing, BluePairing, GreenPairing
};

const contentHeding = "text-lg leading-10 font-light py-2";

export const CORE_STRATEGIES = "CORE STRATEGIES";
export const USE_CASES = "USE CASES";
export const BEAR_AND_BULL = "BEAR & BULL";

const getCubeBasedOnEtaType = (etaTypeArray = [], showMultiplier = false) => (
  <div className="py-8">
    <div className='flex w-full items-center text-center justify-around'>
      {map(etaTypeArray, etaType => (
        <div className='w-1/6 flex flex-col' key={etaType}>
          <img src={EtaTypeImages[etaType]} alt={etaType} />
        </div>
      ))}
    </div>
    <div className='flex w-full items-center text-center pb-4 pt-4 justify-around  text-xs'>
      {map(etaTypeArray, etaType => (
        <div className='w-2/6 flex flex-col' key={etaType}>
          <div>{etaType} <span className='font-bold' style={{ color: EtaColorCode[etaType] }}>ETA</span></div>
          {(showMultiplier) && (
            <div className="font-semibold">
              {`${(includes(['GrowthGuard'], etaType) ? 4 : '')}${(includes(['PureDiv'], etaType) ? 2 : '')}${(includes(['MaxGrowth'], etaType) ? 1.5 : '')}x `}
              <span className="font-extralight text-xs">growth</span>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const getHeaderImage = (classname = "") => (<img src={strategiesHeaderBg} alt={classname} className={cn(classname, "w-full")} style={{ 'height': '70px' }} />);

export const ACCELERATE_GROWTH = <><div className={contentHeding}>Accelerate Growth</div>
  <p>Many share investors seek long-term capital growth. At the same time, despite this growth objective, those investors typically receive dividend income and franking credits as a consequence of their investment. For investors with a high marginal tax rate, the after-tax dividend can be negligible.</p>

  <p>To align with their growth strategy, investors typically reinvest dividends; however, this comes at a price - administration, tax implications and time.</p>

  <p><u>How ETAs can help</u></p>

  <p><strong>All ETAs are purchased at a lower price than the underlying share.</strong></p>
  <p>Growth ETA investors trade out of the dividend stream (exposed to their investor's marginal tax rate), for an accelerated exposure to growth. By trading out of the dividends, investors can receive upfront value for their future dividend, that can enhance their portfolios today, without many of the costs of DRP schemes.</p>
  <p>Using Prism's Growth ETAs these investors can now isolate their exposure to the growth ONLY component of an underlying share. </p>
  <p>There are three Growth ETA strategies for growth investors to consider:</p>

  {getCubeBasedOnEtaType(['GrowthGuard', 'PureDiv', 'MaxGrowth'], true)}

  <p>The choice of risk profile determines the price paid for each ETA and, therefore, the overall growth exposure it will provide. Multiples of two or four times can be achieved, allowing for greater portfolio diversification across the market, with the reassurance of daily liquidity.</p>
</>

export const AMPLIFIED_YIELD = <>
  <div className={contentHeding}>Amplified Yield</div>
  <p>Low interest rate environments can be challenging for investors seeking yield. All Income ETAs provide an alternate approach for investors, enabling them opportunities to maximise income across risk profiles of their choice.</p>
  <p><strong>How ETAs can help</strong></p>
  <p><strong>All ETAs are purchased at a lower price than the underlying share.</strong></p>
  <p>Income ETAs receive the full dividend distributions (and franking credits) of the underlying company for a period of 10-years, inclusive of any dividend increases. The choice of capital risk exposure determines the price paid for each ETA and the overall yield it will generate.</p>
  <p>Investors can choose from three Income ETAs, each reflecting a different exposure to capital risk:</p>

  <ul className='pl-8 list-disc'>
    <li><strong>Aggressive yield chasers</strong> - MaxDiv ETA (Prism Red Income)</li>
    <li><strong>Investors with a tolerance for market risk</strong> - DivGuard ETA (Prism Blue Income)</li>
    <li><strong>Conservative investors seeking bond like returns</strong> - PureDiv ETA (Prism Green Income)</li>
  </ul>

  {getCubeBasedOnEtaType(['MaxDiv', 'DivGuard', 'PureGrowth'])}
</>

export const SHARE_CAPITAL_RELEASE = <>
  <div className={contentHeding}>Share Capital Release</div>
  <p>Shares offer investors 100% of the growth, 100% of the dividend and 100% of the risk. Yet, few investors prioritise growth, dividends and risk equally.</p>
  <p>Prism allows investors to unlock value from their exiting portfolios by trading out of elements that are not aligned to their objectives.</p>
  <p><strong>How ETAs can help</strong></p>

  <p>Investors can convert their current shares into a pair of ETAs. They can retain the ETA element aligned to their objectives and gain upfront value by selling the other. These instruments provide investors with far greater precision to design portfolios with optimal capital efficiency.</p>
</>

export const BEAR_MARKET_STRATEGIES = <><div className={contentHeding}>Bear Market Outlook</div>
  <p>Investors who are keen to deploy more capital into the share market but are concerned with future market direction face a challenge.  Doing nothing is not a viable strategy however continuing to invest seems counter intuitive.</p>

  <p><strong>How ETAs can help</strong></p>
  <p><strong>All ETAs are purchased at a lower price than the underlying share.</strong></p>
  <p>Prism ETAs provide investors with a simple way to invest defensively and protect against a falling Australian share market.</p>
  <p>Growth investors can access Prism's GrowthGuard ETA (Prism Red Growth), which provides access to a capital appreciation with a degree of downside protection. This means investors can potentially outperform the market on both the upside and the downside.</p>
  <p>Income investors can access Prism's DivGuard (Prism Blue Income) ETA, a defensive strategy that provides access to future dividend income with a degree of downside protection to capital invested.</p>

  {getCubeBasedOnEtaType(['DivGuard', 'GrowthGuard'])}
</>

export const BULL_MARKET_STRATEGIES = <><div className={contentHeding}>Bull Market Strategy</div>
  <p>Investors who remain bullish about the future prospects for the Australian share market are looking for opportunities to take advantage of rising prices.</p>
  <p><strong>How ETAs can help</strong></p>
  <p><strong>All ETAs are purchased at a lower price than the underlying share.</strong></p>
  <p>Prism's Growth ETAs offer accelerated capital growth participation and Prism Income ETAs offer amplified dividends returns. Both are achieved without margin calls, interest payments or option premiums.</p>
  <p>The following ETAs support the outlook for bullish investors.</p>

  {getCubeBasedOnEtaType(['GreenPairing', 'MaxGrowth', 'MaxDiv'])}
</>

export const ESTATE_PLANNING = <><div className={contentHeding}>Estate Planning</div>
  <p>The largest intergenerational wealth transfer in history is expected over the next 20 years when an estimated $3.5 trillion will change hands from baby boomers to their millennial offspring. Many investors are looking to deploy strategies to meet their future estate planning needs and satisfy wealth transfer and philanthropic ambitions.</p>
  <p>The challenge faced by is the timing of such transfers. There are numerous considerations:</p>
  <p>Liquidity and Volatility of the asset base</p>
  <p>Need to preserve income to sustain current and future lifestyle needs.</p>
  <p><strong>How ETAs can help</strong></p>
  <p><strong>All ETAs are purchased at a lower price than the underlying share.</strong></p>
  <p>Prism's ETAs provide a mechanism to:</p>
  <p>Unlock tax efficient liquidity</p>
  <p>Reduce market and downside exposure and</p>
  <p>Improve yield on the asset base to maintain lifestyle needs.</p>
  <p>Investors can continue to satisfy their income requirements by retaining the income ETA and transfer the value of their growth components to other members of their estate. The following Income ETAs provide different levels of capital release to meet estate planning needs.</p>
  {getCubeBasedOnEtaType(['MaxDiv', 'MaxGrowth', 'PureGrowth'])}
</>

export const NEXT_GEN_INVESTORS = <><div className={contentHeding}>Next Gen Investors</div>
  <p>Next Gen investors increasingly seek more innovative ways to invest, to maximise upside returns while retaining liquidity and access to funds.</p>
  <p><strong>How ETAs can help</strong></p>
  <p><strong>All ETAs are purchased at a lower price than the underlying share.</strong></p>
  <p>Prism Growth ETAs enable next gen investors to own the upside in the growth of a listed company for a portion of the actual cost of the underlying share. Similar to a 'buy now, pay later' approach, this strategy maximises the use of available capital. This accelerates growth participation through long term passive leverage that is not exposed to margin calls.</p>
  <p>Investors can choose from:</p>
  {getCubeBasedOnEtaType(['GrowthGuard', 'PureDiv', 'MaxGrowth'], true)}
</>

export const OVERSEAS_INVESTORS = <><div className={contentHeding}>Overseas Investors</div>
  <p>Each trading day, Australian investors seek growth opportunities within the share markets. However, for many investors a dividend payment is a consequence of their investment rather than a primary motivator.</p>
  <p>This is particularly relevant to non-resident investors holding Australian shares who are unable to utilise franking credits on dividends, often placing them at a disadvantage to resident investors.</p>
  <p><strong>How ETAs can help</strong></p>
  <p>All ETAs are purchased at a lower price than the underlying share.</p>
  <p>Prism Growth ETAs enable non-resident investors to isolate the growth component, trading out of the dividend, in return for a greater participation in the upside.</p>
  <p>Non-resident investors can select from:</p>
  {getCubeBasedOnEtaType(['GrowthGuard', 'PureDiv', 'MaxGrowth'], true)}
</>

export const RISK_MITIGATION = <><div className={contentHeding}>Risk Mitigation</div>
  <p>Existing share market investors concerned with market volatility and downside risk have the option to reduce their current exposure by selling all or part of their share portfolio. However, capital gains tax implications and the loss of dividend income are important considerations when divesting a share portfolio. In some instances, such outcomes can be prohibitive to deploying a more defensive strategy.</p>
  <p><strong>How ETAs can help</strong></p>
  <p><strong>All ETAs are purchased at a lower price than the underlying share.</strong></p>
  <p>Prism's ETAs allow investors to continue to participate in the share market and mitigate the risk of a market downturn. A range of ETA strategies providing varied levels of market exposure and downside protection are available, supporting market participation commensurate with the investor's risk profile and investment objectives.</p>
  <p>Growth focused investors can access Prism's GrowthGuard ETA (Prism Red Growth), which provides access to a growth multiple and offers a degree of downside protection; this means investors can potentially outperform the market on both the upside and the downside.</p>
  <p>Income focused investors can access Prism's DivGuard (Prism Blue Income) ETA, a defensive strategy for income investors that provides access to future income with a degree of downside protection.</p>
  {getCubeBasedOnEtaType(['DivGuard', 'GrowthGuard'])}
</>

export const INSTITUTIONAL_INVESTOR = <><div className={contentHeding}>Strategic Advantage to Out Perform Benchmarks</div>
  <p>Investors tracking a benchmark index can often find it challenging to consistently outperform the market.</p>
  <p><strong>How ETAs can help</strong></p>
  <p><strong>All ETAs are purchased at a lower price than the underlying share.</strong></p>
  <p>Prism ETAs offer benchmark investors a strategic advantage, empowering them with new instruments to reweight risk, accelerate growth or amplify yield. By accessing strategies designed to both enhance returns and reduce downside risk, ETAs allow investors to deploy capital more efficiently.</p>
</>

export const ACCESS_LIQUIDITY = <><div className={contentHeding}>Access Liquidity without selling your holding</div>
  <p>Investors regularly require access to liquidity, often at short notice. This may be event driven, such as a speculative acquisition, to support children with a first home purchase or education funding, or to meet more generic cash flow needs.</p>
  <p>Most traditional means to raise capital require extensive paperwork, lengthy approval processes, plus a range of fees and interest charges. Some, such as margin loans, carry significant risk factors. Selling a share portfolio may also create tax consequences and negatively impact dividend strategies.</p>
  <p><strong>How ETAs can help</strong></p>
  <p>Accessing Prism's range of ETAs provides a solution to address the challenges of:</p>
  <p>Liquidity -T+2</p>
  <p>Tax efficient access to capital</p>
  <p>Maintenance of portfolio objectives</p>
  <p>The Prism share converter can illustrate how much liquidity is available in your investment portfolio while still meeting your investment objectives.</p>
</>

export const FEES = <><div className={contentHeding}>Fees</div>
  <p>Fees are a necessary part of investing. Investors should be aware of the following fees when considering an investment:</p>
  <p><strong>Administration Fee</strong></p>
  <p>The Issuer receives a fixed Administration Fee equivalent to 0.30% pa of the Total Establishment Price (TEP).</p>
  <p>The TEP is the Growth ETA Establishment Price plus the Income ETA Establishment Price at the Issue Date.  The Issuer deducts Administration Fees from Listed Entity Dividends and Special Dividends (which are not returns of capital).</p>
  <p>To the extent that the Dividends or Special Dividends (not including returns of capital) paid in an income year are less than the Administration Fee charged by the Issuer in that income year, the unpaid Administration Fee will be rolled forward up to the next Anniversary Date of the Income ETA Series. Any Administration Fee still unpaid at the Anniversary Date will be accommodated for by an adjustment to the Income ETA Establishment and Redemption and Early Redemption Prices.</p>

  <p><strong>Early Redemption Fee</strong></p>
  <p>The Issuer will charge Holders for this facility an Early Redemption Fee, for each ETA Pair, of 0.25% of the previous day’s closing price of the corresponding Underlying Security, increased by the amount of any accrued but unpaid Administration Fee, where, prior to Maturity, a Holder exchanges both Income and Growth ETAs in a Series Pair for the Underlying Securities.</p>

  <p><strong>Holder Dealing Costs and Brokerage</strong></p>
  <p>ETAs are tradable on the Chi-X exchange.  Holders may incur brokerage and other costs with the intermediary through whom they offer to buy or sell their ETAs.  Any dealing fees or brokerage prior to Maturity are between Holders and their advisers and not a cost of the Issuer.</p>
  <p>Please refer to Section 10 of the PDS for further information</p>
</>