import React from "react";

const AccessLiquidity: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <article {...props}>
      <h5 className="mb-6">Access Liquidity without selling your holding</h5>
      <p>
        Investors regularly require access to liquidity, often at short notice.
        This may be event driven, such as a speculative acquisition, to support
        children with a first home purchase or education funding, or to meet
        more generic cash flow needs.
      </p>
      <p>
        Most traditional means to raise capital require extensive paperwork,
        lengthy approval processes, plus a range of fees and interest charges.
        Some, such as margin loans, carry significant risk factors. Selling a
        share portfolio may also create tax consequences and negatively impact
        dividend strategies.
      </p>
      <p>
        <strong>How ETAs can help</strong>
      </p>
      <p>
        Accessing Prism's range of ETAs provides a solution to address the
        challenges of:
      </p>
      <p>Liquidity -T+2</p>
      <p>Tax efficient access to capital</p>
      <p>Maintenance of portfolio objectives</p>
      <p>
        The Prism share converter can illustrate how much liquidity is available
        in your investment portfolio while still meeting your investment
        objectives.
      </p>
    </article>
  );
};

export default AccessLiquidity;
