import React from "react";
import { ETALabel } from "components/snippets";

const CubeBox: React.FC<{ name: string }> = ({ name }) => (
  <div className="w-40 h-36 flex flex-col">
    <div className="cubes" data-cube={name} style={{ maxHeight: 102 }} />
    <p className="mt-2 mb-0 text-xs">
      <ETALabel name={name} />
    </p>
  </div>
);

const EstatePlanning: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <article {...props}>
      <h5 className="mb-6">Estate Planning</h5>
      <p>
        The largest intergenerational wealth transfer in history is expected
        over the next 20 years when an estimated $3.5 trillion will change hands
        from baby boomers to their millennial offspring. Many investors are
        looking to deploy strategies to meet their future estate planning needs
        and satisfy wealth transfer and philanthropic ambitions.
      </p>
      <p>
        The challenge faced by is the timing of such transfers. There are
        numerous considerations:
      </p>
      <p>Liquidity and Volatility of the asset base</p>
      <p>
        Need to preserve income to sustain current and future lifestyle needs.
      </p>
      <p>
        <strong>How ETAs can help</strong>
      </p>
      <p>
        <strong>
          All ETAs are purchased at a lower price than the underlying share.
        </strong>
      </p>
      <p>Prism's ETAs provide a mechanism to:</p>
      <p>Unlock tax efficient liquidity</p>
      <p>Reduce market and downside exposure and</p>
      <p>Improve yield on the asset base to maintain lifestyle needs.</p>
      <p>
        Investors can continue to satisfy their income requirements by retaining
        the income ETA and transfer the value of their growth components to
        other members of their estate. The following Income ETAs provide
        different levels of capital release to meet estate planning needs.
      </p>

      <div className="flex mt-10 mb-8 w-full items-center text-center justify-center">
        <CubeBox name="MaxDiv" />
        <CubeBox name="MaxGrowth" />
        <CubeBox name="PureGrowth" />
      </div>
    </article>
  );
};

export default EstatePlanning;
