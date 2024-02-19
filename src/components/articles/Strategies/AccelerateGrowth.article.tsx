import React from "react";
import { GrowthBox } from "components/snippets";

const AccelerateGrowth: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <article {...props}>
      <h5 className="mb-6">Accelerate Growth</h5>
      <p>
        Many share investors seek long-term capital growth. At the same time,
        despite this growth objective, those investors typically receive
        dividend income and franking credits as a consequence of their
        investment. For investors with a high marginal tax rate, the after-tax
        dividend can be negligible.
      </p>
      <p>
        To align with their growth strategy, investors typically reinvest
        dividends; however, this comes at a price - administration, tax
        implications and time.
      </p>
      <p>
        <u>How ETAs can help</u>
      </p>
      <p>
        <strong>
          All ETAs are purchased at a lower price than the underlying share.
        </strong>
      </p>
      <p>
        Growth ETA investors trade out of the dividend stream (exposed to their
        investor's marginal tax rate), for an accelerated exposure to growth. By
        trading out of the dividends, investors can receive upfront value for
        their future dividend, that can enhance their portfolios today, without
        many of the costs of DRP schemes.
      </p>
      <p>
        Using Prism's Growth ETAs these investors can now isolate their exposure
        to the growth ONLY component of an underlying share.{" "}
      </p>
      <p>
        There are three Growth ETA strategies for growth investors to consider:
      </p>

      <div className="flex mt-10 mb-8 w-full items-center text-center justify-center">
        <GrowthBox name="GrowthGuard" growth={4} />
        <GrowthBox name="PureDiv" growth={2} />
        <GrowthBox name="MaxGrowth" growth={1.5} />
      </div>

      <p>
        The choice of risk profile determines the price paid for each ETA and,
        therefore, the overall growth exposure it will provide. Multiples of two
        or four times can be achieved, allowing for greater portfolio
        diversification across the market, with the reassurance of daily
        liquidity.
      </p>
    </article>
  );
};

export default AccelerateGrowth;
