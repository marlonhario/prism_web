import React from "react";

const GrowthGuardArticle: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  return (
    <article {...props}>
      <p>
        GrowthGuard ETAs are entitled to the capital appreciation of the
        underlying share during the term of the ETA, however do not receive any
        dividends distributions.
      </p>
      <p>
        GrowthGuard ETAs have a portion of their capital guarded against a fall
        in the market price of the underlying share at maturity. This 2nd
        capital exposure results from the pairing with the MaxDiv ETA which
        undertakes full capital exposure.
      </p>
      <p>
        GrowthGuard ETAs can be deployed across single stock or Index
        strategies.
      </p>
      <p>
        Bought like a share and traded like a share, GrowthGuard ETAs can be
        traded on the stock exchange at any time throughout their 10-year
        duration.
      </p>
      <p>
        At maturity, GrowthGuard ETAs can be converted to the underlying stock
        or elect to receive a capital return.
      </p>
    </article>
  );
};

export default GrowthGuardArticle;
