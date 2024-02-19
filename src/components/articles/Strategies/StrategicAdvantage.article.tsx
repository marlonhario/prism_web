import React from "react";

const StrategicAdvantage: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <article {...props}>
      <h5 className="mb-6">Strategic Advantage to Out Perform Benchmarks</h5>
      <p>
        Investors tracking a benchmark index can often find it challenging to
        consistently outperform the market.
      </p>
      <p>
        <strong>How ETAs can help</strong>
      </p>
      <p>
        <strong>
          All ETAs are purchased at a lower price than the underlying share.
        </strong>
      </p>
      <p>
        Prism ETAs offer benchmark investors a strategic advantage, empowering
        them with new instruments to reweight risk, accelerate growth or amplify
        yield. By accessing strategies designed to both enhance returns and
        reduce downside risk, ETAs allow investors to deploy capital more
        efficiently.
      </p>
    </article>
  );
};

export default StrategicAdvantage;
