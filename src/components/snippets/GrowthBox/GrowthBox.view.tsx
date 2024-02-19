import React from "react";
import clsx from "classnames";
import ETALabel from "../ETALabel";

const GrowthBoxView: React.FC<
  { name: string; growth: number } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ className, name, growth, ...props }) => (
  <div {...props} className={clsx("flex flex-col w-40 h-36", className)}>
    <div className="cubes" data-cube={name} style={{ maxHeight: 102 }} />
    <p className="mt-2 mb-0 text-xs">
      <ETALabel name={name} />
      <br />
      <strong>{growth}x</strong> growth
    </p>
  </div>
);

export default GrowthBoxView;
