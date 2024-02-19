import React from "react";
import { ETATypes } from "common/types";

import DivGuardArticle from "./DivGuard.article";
import GrowthGuardArticle from "./GrowthGuard.article";
import MaxDivArticle from "./MaxDiv.article";
import MaxGrowthArticle from "./MaxGrowth.article";
import PureDivArticle from "./PureDiv.article";
import PureGrowthArticle from "./PureGrowth.article";
import UltraGuardArticle from "./UltraGuard.article";
import UltraGrowthArticle from "./UltraGrowth.article";

const Articles = {
  DivGuard: DivGuardArticle,
  GrowthGuard: GrowthGuardArticle,
  MaxDiv: MaxDivArticle,
  MaxGrowth: MaxGrowthArticle,
  PureDiv: PureDivArticle,
  PureGrowth: PureGrowthArticle,
  UltraGrowth: UltraGrowthArticle,
  UltraGuard: UltraGuardArticle
};

const ETAProfileView: React.FC<
  { name: ETATypes } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ name, ...props }) => {
  if (typeof Articles[name] !== "undefined") {
    return React.createElement(Articles[name], {
      key: name,
      ...props,
    });
  }
  return <React.Fragment />;
};

export default ETAProfileView;
