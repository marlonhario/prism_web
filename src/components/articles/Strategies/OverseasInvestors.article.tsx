import React from "react";
import { GrowthBox } from "components/snippets";

const OverseasInvestors: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <article {...props}>
      <h5 className="mb-6">Overseas Investors</h5>
      <p>
        Each trading day, Australian investors seek growth opportunities within
        the share markets. However, for many investors a dividend payment is a
        consequence of their investment rather than a primary motivator.
      </p>
      <p>
        This is particularly relevant to non-resident investors holding
        Australian shares who are unable to utilise franking credits on
        dividends, often placing them at a disadvantage to resident investors.
      </p>
      <p>
        <strong>How ETAs can help</strong>
      </p>
      <p>All ETAs are purchased at a lower price than the underlying share.</p>
      <p>
        Prism Growth ETAs enable non-resident investors to isolate the growth
        component, trading out of the dividend, in return for a greater
        participation in the upside.
      </p>
      <p>Non-resident investors can select from:</p>

      <div className="flex mt-10 mb-8 w-full items-center text-center justify-center">
        <GrowthBox name="GrowthGuard" growth={4} />
        <GrowthBox name="PureDiv" growth={2} />
        <GrowthBox name="MaxGrowth" growth={1.5} />
      </div>
    </article>
  );
};

export default OverseasInvestors;
