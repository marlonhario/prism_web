import React from "react";

const Fees: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <article {...props}>
      <h5 className="mb-6">Fees</h5>
      <p>
        Fees are a necessary part of investing. Investors should be aware of the
        following fees when considering an investment:
      </p>
      <p>
        <strong>Administration Fee</strong>
      </p>
      <p>
        The Issuer receives a fixed Administration Fee equivalent to 0.30% pa of
        the Total Establishment Price (TEP).
      </p>
      <p>
        The TEP is the Growth ETA Establishment Price plus the Income ETA
        Establishment Price at the Issue Date. The Issuer deducts Administration
        Fees from Listed Entity Dividends and Special Dividends (which are not
        returns of capital).
      </p>
      <p>
        To the extent that the Dividends or Special Dividends (not including
        returns of capital) paid in an income year are less than the
        Administration Fee charged by the Issuer in that income year, the unpaid
        Administration Fee will be rolled forward up to the next Anniversary
        Date of the Income ETA Series. Any Administration Fee still unpaid at
        the Anniversary Date will be accommodated for by an adjustment to the
        Income ETA Establishment and Redemption and Early Redemption Prices.
      </p>

      <p>
        <strong>Early Redemption Fee</strong>
      </p>
      <p>
        The Issuer will charge Holders for this facility an Early Redemption
        Fee, for each ETA Pair, of 0.25% of the previous day’s closing price of
        the corresponding Underlying Security, increased by the amount of any
        accrued but unpaid Administration Fee, where, prior to Maturity, a
        Holder exchanges both Income and Growth ETAs in a Series Pair for the
        Underlying Securities.
      </p>

      <p>
        <strong>Holder Dealing Costs and Brokerage</strong>
      </p>
      <p>
        ETAs are tradable on the Chi-X exchange. Holders may incur brokerage and
        other costs with the intermediary through whom they offer to buy or sell
        their ETAs. Any dealing fees or brokerage prior to Maturity are between
        Holders and their advisers and not a cost of the Issuer.
      </p>
      <p className="mb-0">Please refer to Section 10 of the PDS for further information</p>
    </article>
  );
};

export default Fees;
