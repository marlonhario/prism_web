import React from "react";

const DivGuardArticle: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  return (
    <article {...props}>
      <p>
        DivGuard ETAs receive all dividend distributions from the underlying
        listed security during the term of the ETA, however do not participate
        in any capital appreciation.
      </p>
      <p>
        As a result of pairing with the MaxGrowth ETA, which undertakes full
        capital exposure, DivGuard ETAs have a portion of their capital guarded
        against a fall in the market price of the underlying share at maturity.
      </p>
      <p>
        DivGuard ETAs can be deployed across single stock or Index strategies.
      </p>
      <p>
        Bought like a share and traded like a share, DivGuard ETAs can be traded
        on the stock exchange at any time throughout their 10-year duration.
      </p>
      <p>
        At maturity, DivGuard ETAs can be converted to the underlying stock or
        elect to receive a return of capital.
      </p>
    </article>
  );
};

export default DivGuardArticle;
