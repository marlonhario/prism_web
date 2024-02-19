import React from "react";

const ShareCapitalRelease: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <article {...props}>
      <h5 className="mb-6">Share Capital Release</h5>
      <p>
        Shares offer investors 100% of the growth, 100% of the dividend and 100%
        of the risk. Yet, few investors prioritise growth, dividends and risk
        equally.
      </p>
      <p>
        Prism allows investors to unlock value from their exiting portfolios by
        trading out of elements that are not aligned to their objectives.
      </p>
      <p>
        <strong>How ETAs can help</strong>
      </p>

      <p>
        Investors can convert their current shares into a pair of ETAs. They can
        retain the ETA element aligned to their objectives and gain upfront
        value by selling the other. These instruments provide investors with far
        greater precision to design portfolios with optimal capital efficiency.
      </p>
    </article>
  );
};

export default ShareCapitalRelease;
