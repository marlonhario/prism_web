import React from "react";
import { ETALabel } from "components/snippets";

const CubeBox: React.FC<{ name: string }> = ({ name }) => (
  <div className="w-40 h-36 flex flex-col">
    <div className="cubes" data-cube={name} style={{ maxHeight: 102 }} />
    <p className="mt-2 mb-0 text-xs">
      <ETALabel name={name} />
    </p>
  </div>
)

const BullMarketStrategy: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <article {...props}>
      <h5 className="mb-6">Bull Market Strategy</h5>
      <p>
        Investors who remain bullish about the future prospects for the
        Australian share market are looking for opportunities to take advantage
        of rising prices.
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
        Prism's Growth ETAs offer accelerated capital growth participation and
        Prism Income ETAs offer amplified dividends returns. Both are achieved
        without margin calls, interest payments or option premiums.
      </p>
      <p>The following ETAs support the outlook for bullish investors.</p>

      <div className="flex mt-10 mb-8 w-full items-center text-center justify-center">
        <CubeBox name="GreenPairing" />
        <CubeBox name="MaxGrowth" />
        <CubeBox name="MaxDiv" />
      </div>
    </article>
  );
};

export default BullMarketStrategy;
