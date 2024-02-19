import React from "react";

const PureGrowthArticle: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  return (
    <article {...props}>
      <p>
        PureGrowth ETAs are entitled to the capital appreciation of the
        underlying security during the term of the ETA, however do not receive
        any dividends distributions.
      </p>
      <p>
        PureGrowth ETAs share the same capital risk profile with that of the
        PureDiv ETA and participate equally if the market price of the
        underlying share has fallen at maturity.
      </p>
      <p>
        PureGrowth ETAs can be deployed across single stock or Index strategies.
      </p>
      <p>
        Bought like a share and traded like a share, PureGrowth ETAs can be
        traded on the stock exchange at any time throughout their 10-year
        duration.
      </p>
      <p>
        At maturity, PureGrowth ETAs can be converted to the underlying stock or
        elect to receive a capital return.
      </p>
    </article>
  );
};

export default PureGrowthArticle;
