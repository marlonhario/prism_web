import React from "react";
import clsx from "classnames";
import { Checkbox } from "antd";
import { ETAColors, Nullable } from "common/types";

const REGIONS = [
  { name: "AU", subRegion: ["AU"] },
  { name: "UK", subRegion: ["LN"] },
  { name: "US", subRegion: ["UF", "US"] },
  {
    name: "EUR",
    subRegion: [
      "AV",
      "BB",
      "FH",
      "FP",
      "GR",
      "ID",
      "IM",
      "NA",
      "PL",
      "SM",
      "SW",
    ],
  },
];

const MarketFilterButton: React.FC<
  React.HTMLAttributes<HTMLButtonElement> & {
    checked?: boolean;
    etaColor?: string;
  }
> = ({ checked = false, children, etaColor, ...props }) => {
  let borderColor = etaColor ? `border-${etaColor}` : null as Nullable<ETAColors>;
  if (!borderColor) borderColor = 'border-gray-400';
  return (
    <button
      className={`select-button ${borderColor}`}
      style={{ maxWidth: 120 }}
      type="button"
    >
      {children}
      <Checkbox
        checked={checked}
        style={{ marginLeft: "auto" }}
        className="rounded"
        disabled
        // onChange={(e) => onChangeCheckBox(e, "DIVIDEND")}
      />
    </button>
  );
};

const MarketFilters: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div {...props} className={clsx("market-filters flex gap-x-2", className)}>
      <div className="flex flex-grow gap-x-1">
        <div className="w-1/3">
          <p className="mb-2 font-light text-sm tracking-wide">Dividend ETAs</p>
          <MarketFilterButton etaColor="MaxDiv" checked>
            <span className="font-bold">Max</span>
            <span className="font-light">Div</span>
          </MarketFilterButton>
          <MarketFilterButton etaColor="PureDiv" checked>
            <span className="font-bold">Pure</span>
            <span className="font-light">Div</span>
          </MarketFilterButton>
          <MarketFilterButton etaColor="DivGuard" checked>
            <span className="font-bold">Div</span>
            <span className="font-light">Guard</span>
          </MarketFilterButton>
          <button type="button" className="select-all active">
            Select All
          </button>
        </div>
        <div className="w-1/3">
          <p className="mb-2 font-light text-sm tracking-wide">Growth ETAs</p>
          <MarketFilterButton etaColor="MaxGrowth" checked>
            <span className="font-bold">Max</span>
            <span className="font-light">Growth</span>
          </MarketFilterButton>
          <MarketFilterButton etaColor="PureGrowth" checked>
            <span className="font-bold">Pure</span>
            <span className="font-light">Growth</span>
          </MarketFilterButton>
          <MarketFilterButton etaColor="GrowthGuard" checked>
            <span className="font-bold">Growth</span>
            <span className="font-light">Guard</span>
          </MarketFilterButton>
          <button type="button" className="select-all">
            Select All
          </button>
        </div>
        <div className="w-1/3">
          <p className="mb-2 font-light text-sm tracking-wide">Risk Profile</p>
          <MarketFilterButton>
            <span className="font-light">Market</span>
          </MarketFilterButton>
          <MarketFilterButton>
            <span className="font-light">Agressive</span>
          </MarketFilterButton>
          <MarketFilterButton>
            <span className="font-light">Conservative</span>
          </MarketFilterButton>
        </div>
      </div>
      <div style={{ maxWidth: 120 }}>
        <p className="mb-2 font-light text-sm tracking-wide">Regions</p>
        <div className="flex flex-wrap gap-3 text-gray-600">
          {REGIONS.map((r) => (
            <button key={r.name} type="button" className="select-region">
              {r?.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketFilters;
