import React from "react";
import { Nullable } from "common/types";

export enum EducationTabIndex {
  HOME = 0,
  ABOUT = 1,
  CONTACT = 2,
  EQUITY_OPTIMISER = 100,
  CUSTOM_SHARE = 101
}

export interface EducationTabItem {
  name: string;
  component: Nullable<React.ReactNode>;
}

export interface EducationTabsProps {
  children: React.ReactNode;
}
