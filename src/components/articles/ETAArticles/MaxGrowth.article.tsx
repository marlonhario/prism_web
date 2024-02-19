import React from "react";

const MaxGrowthArticle: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  return (
    <article {...props}>
      <p>
        MaxGrowth ETAs are entitled to the capital appreciation of the
        underlying share during the term of the ETA, however do not receive any
        dividends distributions.
      </p>
      <p>
        MaxGrowth ETAs have full capital exposure if the market price of the
        underlying share has fallen at maturity. This full capital exposure
        results from the pairing with the DivGuard ETA which benefits from a
        guarded 2nd capital exposure.
      </p>
      <p>
        MaxGrowth ETAs can be deployed across single stock or Index strategies.
      </p>
      <p>
        Bought like a share and traded like a share, MaxGrowth ETAs can be
        traded on the stock exchange at any time throughout their 10-year
        duration.
      </p>
      <p>
        At maturity, MaxGrowth ETAs can be converted to the underlying stock or
        elect to receive a capital return.
      </p>
    </article>
  );
};

export default MaxGrowthArticle;
