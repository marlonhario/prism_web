import React from "react";

const UltraGuardArticle: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  return (
    <article {...props}>
      <p>
        UltraGuard ETAs are entitled to receive all dividend distributions from the
        underlying share during the term of the ETA, however do not participate
        in any capital appreciation.
      </p>
      <p>
      UltraGuard ETAs have full capital exposure if the market price of the
        underlying share has fallen at maturity. This full capital exposure
        results from the pairing with the GrowthGuard ETA which benefits from a
        guarded 2nd capital exposure.
      </p>
      <p>
      UltraGuard ETAs can be deployed across single stock or Index strategies.
      </p>
      <p>
        Bought like a share and traded like a share, UltraGuard ETAs can be traded
        on the stock exchange at any time throughout their 10-year duration.
      </p>
      <p>
        At maturity, UltraGuard ETAs can be converted to the underlying stock or
        elect to receive a return of capital.
      </p>
    </article>
  );
};

export default UltraGuardArticle;
