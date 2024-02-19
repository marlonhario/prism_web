import { Nullable } from "common/types";

export interface MarketsModalFilterPublicProps {
  showModal: boolean;
  industry: Nullable<string>;
  sector: Nullable<string>;
  selectedRegions: string[];
  sectors: string[],
  industries: string[],
  setIndustry: (industry: Nullable<string>) => void;
  setSector: (sector: Nullable<string>) => void;
  setSelectedRegions: (selectedRegions: string[]) => void;
  setShowModal: (showModal: boolean) => void;
}

export interface MarketsModalFilterCalcedProps {
  tempIndustry: Nullable<string>;
  tempSector: Nullable<string>;
  setTempIndustry: (tempIndustry: Nullable<string>) => void;
  setTempSector: (sector: Nullable<string>) => void;
  addToRegionsRefs: (el: HTMLInputElement) => void;
  onFilter: () => void;
}

export type MarketsModalFilterProps = MarketsModalFilterPublicProps &
  MarketsModalFilterCalcedProps;
