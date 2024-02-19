import React from "react";
import { GrowthBox } from "components/snippets";

const NextGenInvestors: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <article {...props}>
      <h5 className="mb-6">Next Gen Investors</h5>
      <p>
        Next Gen investors increasingly seek more innovative ways to invest, to
        maximise upside returns while retaining liquidity and access to funds.
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
        Prism Growth ETAs enable next gen investors to own the upside in the
        growth of a listed company for a portion of the actual cost of the
        underlying share. Similar to a 'buy now, pay later' approach, this
        strategy maximises the use of available capital. This accelerates growth
        participation through long term passive leverage that is not exposed to
        margin calls.
      </p>
      <p>Investors can choose from:</p>

      <div className="flex mt-10 mb-8 w-full items-center text-center justify-center">
        <GrowthBox name="GrowthGuard" growth={4} />
        <GrowthBox name="PureDiv" growth={2} />
        <GrowthBox name="MaxGrowth" growth={1.5} />
      </div>
    </article>
  );
};

export default NextGenInvestors;
