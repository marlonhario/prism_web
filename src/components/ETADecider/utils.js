const contentHeding = "text-2xl leading-9 font-light";

export const INVESTMENT_TEXT = <><div className={contentHeding}>Do you invest primarily for income or for growth?</div>
  <p>Consider the purpose of your investment strategy <br />Is income essential to your ongoing cashflow requirements, or are you investing for the future?</p></>

export const CATEGORIES_TEXT = <><div className={contentHeding}>How would you categorise your appetite to risk?</div>
  <p>Consider the purpose of your investment strategy <br />Is income essential to your ongoing cashflow requirements, or are you investing for the future?</p></>

export const ETA_TEXT = <><div className={contentHeding}>ETAs that may suit your investment strategy</div></>

export const ETA_TYPE_DETAILS = [
  {
    riskProfile: 'Market',
    income: ['PureDiv'],
    growth: ['PureGrowth'],
  },
  {
    riskProfile: 'Aggressive',
    income: ['MaxDiv', 'PureDiv'],
    growth: ['MaxGrowth', 'PureGrowth'],
  },
  {
    riskProfile: 'Conservative',
    income: ['DivGuard', 'PureDiv'],
    growth: ['GrowthGuard', 'PureGrowth'],
  }
];

export const MARKET = 'market';
export const AGGRESSIVE = 'aggressive';
export const CONSERVATIVE = 'conservative';
export const INCOME = 'income';
export const GROWTH = 'growth';