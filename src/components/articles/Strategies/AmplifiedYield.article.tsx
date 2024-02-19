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

const AmplifiedYield: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <article {...props}>
      <h5 className="mb-6">Amplified Yield</h5>
      <p>Low interest rate environments can be challenging for investors seeking yield. All Income ETAs provide an alternate approach for investors, enabling them opportunities to maximise income across risk profiles of their choice.</p>
      <p><strong>How ETAs can help</strong></p>
      <p><strong>All ETAs are purchased at a lower price than the underlying share.</strong></p>
      <p>Income ETAs receive the full dividend distributions (and franking credits) of the underlying company for a period of 10-years, inclusive of any dividend increases. The choice of capital risk exposure determines the price paid for each ETA and the overall yield it will generate.</p>
      <p>Investors can choose from three Income ETAs, each reflecting a different exposure to capital risk:</p>

      <ul className='pl-8 list-disc'>
        <li><strong>Aggressive yield chasers</strong> - MaxDiv ETA (Prism Red Income)</li>
        <li><strong>Investors with a tolerance for market risk</strong> - DivGuard ETA (Prism Blue Income)</li>
        <li><strong>Conservative investors seeking bond like returns</strong> - PureDiv ETA (Prism Green Income)</li>
      </ul>

      <div className="flex mt-10 mb-8 w-full items-center text-center justify-center">
        <CubeBox name="MaxDiv" />
        <CubeBox name="DivGuard" />
        <CubeBox name="PureGrowth" />
      </div>
    </article>
  );
};

export default AmplifiedYield;
