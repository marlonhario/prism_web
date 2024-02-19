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

const RiskMitigation: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <article {...props}>
      <h5 className="mb-6">Risk Mitigation</h5>
      <p>
        Existing share market investors concerned with market volatility and
        downside risk have the option to reduce their current exposure by
        selling all or part of their share portfolio. However, capital gains tax
        implications and the loss of dividend income are important
        considerations when divesting a share portfolio. In some instances, such
        outcomes can be prohibitive to deploying a more defensive strategy.
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
        Prism's ETAs allow investors to continue to participate in the share
        market and mitigate the risk of a market downturn. A range of ETA
        strategies providing varied levels of market exposure and downside
        protection are available, supporting market participation commensurate
        with the investor's risk profile and investment objectives.
      </p>
      <p>
        Growth focused investors can access Prism's GrowthGuard ETA (Prism Red
        Growth), which provides access to a growth multiple and offers a degree
        of downside protection; this means investors can potentially outperform
        the market on both the upside and the downside.
      </p>
      <p>
        Income focused investors can access Prism's DivGuard (Prism Blue Income)
        ETA, a defensive strategy for income investors that provides access to
        future income with a degree of downside protection.
      </p>

      <div className="flex mt-10 mb-8 w-full items-center text-center justify-center">
        <CubeBox name="DivGuard" />
        <CubeBox name="GrowthGuard" />
      </div>
    </article>
  );
};

export default RiskMitigation;
