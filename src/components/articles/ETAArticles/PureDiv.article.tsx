import React from "react";

const PureDivArticle: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  return (
    <article {...props}>
      <p>
        PureDiv ETA investors are entitled to receive all dividend distributions
        from the underlying share during the term of the ETA, however do not
        participate in any capital appreciation.
      </p>
      <p>
        PureDiv ETAs share the same capital risk profile with that of the
        PureGrowth ETA and participate equally if the market price of the
        underlying share has fallen at maturity.
      </p>
      <p>
        PureDiv ETAs can be deployed across single stock or Index strategies.
      </p>
      <p>
        Bought like a share and traded like a share, PureDiv ETAs can be traded
        on the stock exchange at any time throughout their 10-year duration.
      </p>
      <p>
        At maturity, PureDiv ETAs can be converted to the underlying stock or
        elect to receive a return of capital.
      </p>
    </article>
  );
};

export default PureDivArticle;
