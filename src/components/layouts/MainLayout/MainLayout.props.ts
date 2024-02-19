import { EducationTabIndex } from "components/fragments/EducationTabs";
import React from "react";


export interface MainLayoutProps {
    children: React.ReactNode;
    expand: boolean;
    educationTabIndex: EducationTabIndex;
    showLightbox: boolean;
    setEducationTabIndex: (educationTabIndex: EducationTabIndex) => void;
    setExpand: (expand: boolean) => void;
    setShowLightbox(show: boolean): void;
}
