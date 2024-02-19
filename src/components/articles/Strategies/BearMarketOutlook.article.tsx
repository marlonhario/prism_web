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

const BearMarketOutlook: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <article {...props}>
      <h5 className="mb-6">Bear Market Outlook</h5>
      <p>
        Investors who are keen to deploy more capital into the share market but
        are concerned with future market direction face a challenge. Doing
        nothing is not a viable strategy however continuing to invest seems
        counter intuitive.
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
        Prism ETAs provide investors with a simple way to invest defensively and
        protect against a falling Australian share market.
      </p>
      <p>
        Growth investors can access Prism's GrowthGuard ETA (Prism Red Growth),
        which provides access to a capital appreciation with a degree of
        downside protection. This means investors can potentially outperform the
        market on both the upside and the downside.
      </p>
      <p>
        Income investors can access Prism's DivGuard (Prism Blue Income) ETA, a
        defensive strategy that provides access to future dividend income with a
        degree of downside protection to capital invested.
      </p>

      <div className="flex mt-10 mb-8 m-auto w-full max-w-md items-center text-center justify-between">
        <CubeBox name="DivGuard" />
        <CubeBox name="GrowthGuard" />
      </div>
    </article>
  );
};

export default BearMarketOutlook;
