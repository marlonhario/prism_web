import React from "react";
import { ETAPairing, ETATypes, Nullable } from "common/types";

export interface EquityBoxPublicProps {
  etaPairing?: Nullable<ETAPairing>;
  hideCube?: boolean;
  hideMessage?: boolean;
  strokeColor?: string;
  onSelectETA?: (eta: ETATypes) => void;
}

export interface EquityBoxCalcedProps {
}

export type EquityBoxProps = React.SVGAttributes<SVGSVGElement> & EquityBoxPublicProps & EquityBoxCalcedProps;
